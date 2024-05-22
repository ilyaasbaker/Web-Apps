const express = require('express');
const app = express();
app.listen(9037, () => console.log('listening at port 9037'));

//serve unspecified static pages from our public dir
app.use(express.static('public'))
//make express middleware for json available
app.use(express.json())

//allows us to process post info in urls
app.use(express.urlencoded({ extended: false }));

const path = require('path');

//importing our own node module
const users = require('./models/users.js')

//consts to hold expiry times in ms
const threeMins = 1000 * 60 * 3;
const oneHour = 1000 * 60 * 60;

//use the sessions module and the cookie parser module
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

//make cookie parser middleware available
app.use(cookieParser());

//load sessions middleware, with some config
app.use(sessions({
    secret: "a secret that only i know",
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: false
}));

require('dotenv').config()
const mongoDBPassword = process.env.MONGODBPASSWORD
const myUniqueDatabase = "PoetsCorner"

const mongoose = require('mongoose')
const connectionString = `mongodb+srv://CCO6005-00:${mongoDBPassword}@cluster0.lpfnqqx.mongodb.net/${myUniqueDatabase}?retryWrites=true&w=majority`
mongoose.connect(connectionString)

//mongoose.connect(`mongodb+srv://CCO6005-00:${mongoDBPassword}@cluster0.lpfnqqx.mongodb.net/DJWApp?retryWrites=true&w=majority`)
const postData = require('./models/post-data.js')

// IMPORT MULTER
const multer = require('multer')
const { request } = require('http')
const upload = multer({ dest: './public/uploads' })

//test that user is logged in with a valid session
function checkLoggedIn(request, response, nextAction) {
    if (request.session) {
        if (request.session.userid) {
            nextAction()
        } else {
            request.session.destroy()
            return response.redirect('/login.html')
        }
    }
}

//controller for the main app view, depends on user logged in state
app.get('/app', checkLoggedIn, (request, response) => {
    response.redirect('./application.html')
})

// LOGOUT CONTROLLER
app.post('/logout', async (request, response) => {
    request.session.destroy()
    console.log(await users.getUsers())
    response.redirect('./login.html')
})

// LOGIN CONTROLLER
app.post('/login', async (request, response)=>{

    console.log(request.body)
    let userData=request.body
    console.log(userData)

    if(await users.findUser(userData.username)){

        console.log('user found')

        await users.checkPassword(userData.username, userData.password, async function(isMatch){

            if(isMatch){

                console.log('password matches')
                request.session.userid=userData.username
                // await users.setLoggedIn(userData.username, true)
                response.redirect('/application.html')
            } else {
                console.log('password wrong')
                response.redirect('./login.html')
            }
        })
    }
    console.log(await users.getUsers())
})

// app.post('/login', async (request, response) => {
//     console.log(request.body)
//     let userData = request.body
//     console.log(userData)
//     if (await users.findUser(userData.username)) {
//         console.log('user found')
//         if (await users.checkPassword(userData.username, userData.password)) {
//             console.log('password matches')
//             request.session.userid = userData.username
//             response.redirect('/application.html')
//         } else {
//             console.log('password wrong')
//             response.redirect('/login.html')
//         }
//     }
//     console.log(await users.getUsers())
// })

// POST CONTROLLER

app.post('/newpost', (request, response) => {
    console.log(request.body)
    console.log(request.session.userid)
    postData.addNewPost(request.session.userid, request.body)
    response.redirect('/application.html')
})

app.get('/getposts', async (request, response) => {
    response.json(
        { posts: await postData.getPosts(5) }
    )
})

// REGISTER NEW USER CONTROLLER

app.post('/register', async (request, response) => {
    console.log(request.body)
    let userData = request.body
    if (await users.findUser(userData.username)) {
        console.log('user exists')
        response.json({
            status: 'failed',
            error: 'user exists'
        })
    } else {
        await users.newUser(userData.username, userData.password)
        response.redirect('/login.html')
    }
    console.log(await users.getUsers())
})

app.post('/like', checkLoggedIn, async (request, response) => {
    const { postId } = request.body;
    const userId = request.session.userid;
    const success = await postData.toggleLike(postId, userId);
    response.json({ success });
})

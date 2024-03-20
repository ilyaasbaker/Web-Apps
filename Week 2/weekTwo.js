const express = require('express'); //imports express

const app = express();  // invokes the express module/fetches it 

app.listen(3000, ()=> console.log('listening on port 3000')); //listens at port 300 for https requests

app.use(express.static('Public')); // directs the http request to the folder public

// express has a load of files that are already coded. we can use 
// them by calling for them "middlewear"
app.use(express.urlencoded({extended: false}))


// adding a route that listens out for a post request
// the information that is filled on in the forms on the login page are
// retrieved by our backend server (this is it)
// once the login button is clicked, it redirects you to the loggedinpage
app.post('/login', (request, response) => {

    console.log(request.body)
    response.redirect('loggedin.html')

})

// this block of code is similair to the one above but goes through a different route (/post) which is a form
// when something is typed and sumbitted an empty object is sent to the server 
// which will contain a whole load of metadata
app.post('/post', (request, response) => {

    console.log("New Message: "+request.body.message)

})
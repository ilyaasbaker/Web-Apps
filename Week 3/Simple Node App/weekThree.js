const express = require('express')

const simpleNodeApp = express()

//exported functions from a different js file
const utils = require('./utils.js')
console.log(utils.addTwo(10))
console.log(utils.addTen(10))

simpleNodeApp.listen(3001, ()=> console.log('listening on port 3001'))

simpleNodeApp.use(express.static('./Public'))

simpleNodeApp.use(express.urlencoded({extended: false}))

// Controller
simpleNodeApp.post('/sentPost', (request, response)=> {

    // requests the name but both inputs need to share the same id
    console.log("new message: " + request.body.message)
    console.log("new message: " + request.body.otherthing)
    response.redirect('postRecieved.html')

})
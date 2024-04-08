const mongoose = require('mongoose')

const {Schema, model} = mongoose

const postSchema = new Schema({

    postedBy: String,
    message: String, 
    time: Date

})

const Post = model('Snippet', postSchema)

function addNewPost(userID, post){

    let myPost={

        postedBy: userID,
        message: post.message,
        time: Date.now()
    }

    Post.create(myPost)
        .catch(err=>{

        console.log("Error" +err)
    })
}

async function getPosts(n=3){
    let data=[]
    await Post.find({})
        .sort({'time': -1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            data=mongoData
        })
    return data
}

module.exports={
    addNewPost,
    getPosts
}
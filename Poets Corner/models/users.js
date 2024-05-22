const mongoose=require('mongoose')
const {Schema, model} = mongoose

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    username: String,
    password: String,
    loggedin: Boolean,
    profilePicUrl: String
});

async function updateUsername(currentUsername, newUsername) {
    await User.findOneAndUpdate({ username: currentUsername }, { username: newUsername }).exec();
}

async function updateProfilePic(username, profilePicUrl) {
    await User.findOneAndUpdate({ username }, { profilePicUrl }).exec();
}

// const users=[
//     {username:'user1', password:'123', loggedin:false},
//     {username:'user2', password:'123', loggedin:false}
// ]

userSchema.pre('save', function(next) {

    let user = this;

    // has passwaord if new or changed
    if(!user.isModified('password')) return next();

    // gen salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

        if (err) return next(err);

        // hash password with new salt
        bcrypt.hash(user.password, salt, function(err, hash) {

            if(err) return next(err);

            // override reg password with hashed oone
            user.password = hash;
            next();

        }); 

    })
})

const User = model('User', userSchema)

async function newUser(username, password){
    const user={username:username, password:password, loggedin:false}
    // users.push(user)
    await User.create(user)
    .catch(err=>{
        console.log('Error:'+err)
    })
}

async function getUsers(){
    // return users
    let users=[]
    await User.find({}).exec()
        .then(dataFromMongo =>{
            users=dataFromMongo
        })
        .catch(err=>{
            console.log('Error:'+err)
        })
    return users
}

async function findUser(userToFind){
    // return users.find(user=>user.username==username)
    let foundUser=null
    await User.findOne({username: userToFind}).exec()
        .then(mongoData =>{
            foundUser=mongoData
        })
        .catch(err=>{
            console.log('Error:'+err)
        })
    return foundUser
}


async function checkPassword(username, password, action) {


        let user = await findUser(username)
        bcrypt.compare(password, user.password)
        .then(isMatch => {

            action(isMatch)

        })
        .catch(err => {

            throw err

        })
}

// async function checkPassword(username, password){
//     let user=await findUser(username)
//     if(user){
//         return user.password==password
//     }
//     return false
// }

// function setLoggedIn(username, state){
//     let user=findUser(username)
//     if(user){
//         user.loggedin=state
//     }
// }

// function isLoggedIn(username){
//     let user=findUser(username)
//     if(user){
//         return user.loggedin=state
//     }
//     return false
// }

exports.newUser=newUser;
exports.getUsers=getUsers;
exports.findUser=findUser;
exports.checkPassword=checkPassword;
exports.updateUsername = updateUsername;
exports.updateProfilePic = updateProfilePic;
// exports.setLoggedIn=setLoggedIn;
// exports.isLoggedIn=isLoggedIn;
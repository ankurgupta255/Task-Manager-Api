const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         minlength: 6,
//         trim: true,
//         validate(value){
//             if(value.includes("password")){
//                 throw new Error('String should not contain password')
//             }
//         }
//     }
// })

// // const me = new User({
// //     name: '   Andrew  ',
// //     email: 'MYEMAIL@MEAD.IO   ',
// //     password: '     jdsmdsd'
// // })

// // me.save().then(() => {
// //     console.log(me)
// // }).catch((error) => {
// //     console.log('Error!', error)
// // })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true,

//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: 'Learn the Mongoose library',
//     completed: false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console .log(error)
// })
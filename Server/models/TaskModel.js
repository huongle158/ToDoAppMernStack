const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/originals/85/9f/52/859f5219ba0b8d67f399c0db5a648694.jpg'
    },
})

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
        
    }, { timestamps: true }
);
let TaskModel = mongoose.model('Task', taskSchema);
let UserModel = mongoose.model('User', userSchema);
module.exports = {TaskModel, UserModel};

const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{type:String,required:true},
    user_Id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{
    versionKey: fasle,
    timestamps: true
});

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;
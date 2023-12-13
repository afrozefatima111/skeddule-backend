const mongoose = require("mongoose");
const { Schema } = mongoose;
const tasksSchema = new Schema({
    taskName: {
        type: String,
        required: true,
        trim: true,
    },
    taskDescription: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        default: 'Todo',
        required: true,
    },

});
module.exports = mongoose.model("Task", tasksSchema);

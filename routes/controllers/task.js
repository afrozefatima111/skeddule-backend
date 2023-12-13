const httpStatus = require("http-status");
const Task = require("../../models/task");
const { sendResponse } = require("../../utils/response");

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = httpStatus;

const addTask = async (req, res) => {

    const { id } = req.query;
    let {
        task,
        taskDescription,
        dueDate,
        priority
    } = req.body;
    try {

        if (!task) sendResponse(res, "Task title is missing.", BAD_REQUEST);
        else if (!taskDescription) sendResponse(res, "Description is missing.", BAD_REQUEST);
        else if (!dueDate) sendResponse(res, "Due date is missing.", BAD_REQUEST);
        else if (!priority) sendResponse(res, "Priority is missing.", BAD_REQUEST);
        else {
            const insertedTask = await Task.create({
                taskName : task,
                taskDescription,
                dueDate,
                priority,
                userId: id
            });
            if (insertedTask) {
                sendResponse(res, insertedTask, OK);
            }
        }
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
};

const updateTask = async (req, res) => {

    let {
        task,
        taskDescription,
        dueDate,
        priority,
        id
    } = req.body;
    try {
        if (!task) sendResponse(res, "Task title is missing.", BAD_REQUEST);
        else if (!taskDescription) sendResponse(res, "Description is missing.", BAD_REQUEST);
        else if (!dueDate) sendResponse(res, "Due date is missing.", BAD_REQUEST);
        else if (!priority) sendResponse(res, "Priority is missing.", BAD_REQUEST);
        else {
            const isUpdated = await Task.findByIdAndUpdate({ _id: id },{
                taskName : task,
                taskDescription,
                dueDate,
                priority
            });
            if (isUpdated) {
                sendResponse(res, isUpdated, OK);
            }
        }        
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

const updateTaskStatus = async (req, res) => {
    let { id } = req.params;
    try {
        if (!id && typeof id === "undefined") sendResponse(res, "Task id missing.", BAD_REQUEST);
        else {
            const isUpdated = await Task.findByIdAndUpdate({ _id: id },{
                taskName : task,
                taskDescription,
                dueDate,
                priority
            });
            if (isUpdated) {
                sendResponse(res, isUpdated, OK);
            }
        }        
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id && typeof id === "undefined") sendResponse(res, "Task id missing.", BAD_REQUEST);

        const result = await Task.deleteOne({ _id: id });
        if (!result) sendResponse(res, "Task deleted successfully", NOT_FOUND);
        else sendResponse(res, result, OK);
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

const get = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id && typeof id === "undefined") sendResponse(res, "User id missing.", BAD_REQUEST);

        const tasks = await Task.find(
            { userId: id });
        if (!tasks) sendResponse(res, "Tasks not found", NOT_FOUND);
        else sendResponse(res, tasks, OK);
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id && typeof id === "undefined") sendResponse(res, "Id is missing.", BAD_REQUEST);

        const task = await Task.findOne(
            { _id: id });
        if (!task) sendResponse(res, "Task not found", NOT_FOUND);
        else sendResponse(res, task, OK);
    } catch (err) {
        sendResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    get,
    getTaskById
}



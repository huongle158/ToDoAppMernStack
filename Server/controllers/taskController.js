const { TaskModel, UserModel } = require('../models/TaskModel');

const taskController = {
    addTask : async (req, res) => {
        try {
            const { taskName } = req.body;
            const existsName = await TaskModel.findOne({ taskName });
            if (existsName) {
                return res.status(400).send({ message: 'Exsits Task' });
            }
            
            await new TaskModel(req.body).save();
            res.status(200).json({ message: 'Add successfully' });

        } catch (err) {
            res.status(500).json({ error: err }); //HTTP REQUEST CODE
        }
    },

    getTask : async (req, res) => {
        try {
            const taskList = await TaskModel.find();
            res.status(200).json(taskList);

        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteTask: async (req, res) => {
        try {
            await TaskModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!")
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    editTask: async (req, res) => {
        try {
            // const { taskName } = req.body;
            // const existsName = await TaskModel.findOne({ taskName });
            // if (existsName) {
            //     return res.status(400).send({ message: 'Task name already exists' });
            // }
            
            const task = await TaskModel.findOneAndUpdate(
               { _id: req.params.id },
                req.body
            )
            res.status(200).json({
                task: task,
                message: "Update successfully"
            });
            
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
    editTaskName: async (req, res) => {
        try {
            const { taskName } = req.body;
            const existsName = await TaskModel.findOne({ taskName });
            if (existsName) {
                return res.status(400).send({ message: 'Task name already exists' });
            }
            
            const task = await TaskModel.findOneAndUpdate(
               { _id: req.params.id },
                req.body
            )
            res.status(200).json({
                task: task,
                message: "Update successfully"
            });
            
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }


}

module.exports = taskController;
const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();
//http://localhost:5000/tasks

// ADD TASK
router.post("/", taskController.addTask);
// GET TASK LIST
router.get("/", taskController.getTask);
// DELETE TASK
router.delete("/:id", taskController.deleteTask);
// EDIT TASK NAME
router.put("/editName/:id", taskController.editTaskName);
// EDIT TASK STATUS
router.put("/:id", taskController.editTask);



module.exports = router;
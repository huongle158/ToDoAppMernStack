import { taskService } from "../services/taskService";

export const getTaskListAction = () => {
    return taskService.getTaskList()
        .then((result) => result.data) 
        .catch(err => {
        console.log("This's ~ err", err)
    })
}

export const deleteTaskAction = (taskId) => {
    return taskService.deleteTask(taskId)
        .then((result) => result)
        .catch(err => {
        console.log("This's ~ err", err)
    })
}

export const addTaskAction = (task) => {
    return taskService.addTask(task)
        .then((result) => result)
        .catch(err => {
            console.log("This's ~ err", err.response)//
            return err?.response;
        })
}

export const updateTaskAction = (taskId, task) => {
    return taskService.updateTask(taskId, task)
        .then(result => { 
            return result;
        })
        .catch(err => {
            console.log("This's ~ err", err);
            return err?.response;

    })
}
export const updateTaskNameAction = (taskId, task) => {
    return taskService.updateTaskName(taskId, task)
        .then(result => { 
            console.log("This's ~ result", result)
            return result;
        })
        .catch(err => {
            console.log("This's ~ err", err);
            return err?.response;
    })
}




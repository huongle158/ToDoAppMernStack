import { baseService } from './baseServices';

 class TaskService extends baseService {
    
    constructor() {
        super();
    };

    getTaskList = () => {
        return this.get(`tasks`); 
    };

     addTask = (newTask) => {
         return this.post(`tasks`, newTask);
     };
     
     deleteTask = (taskId) => {
         return this.delete(`tasks/${taskId}`);
     };

     updateTask = (taskId, task) => {
         return this.put(`tasks/${taskId}`, task);
     };
     updateTaskName = (taskId, task) => {
         return this.put(`tasks/editName/${taskId}`, task);

     }

}
export const taskService = new TaskService();
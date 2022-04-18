export const addNewTask = (task) => {
   return {
       type: 'ADD_NEW_TASK',
       payload: task.data
   }
}
export const deleteTask = (task) => {
    return {
        type: 'DELETE_TASK',
        payload: task
    }
}
export const updateTask = (task) => {
    return {
        type: 'UPDATE_TASK',
        payload: task.data
    }
}
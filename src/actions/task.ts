export const addNewTask = (task: any) => {
   return {
       type: 'ADD_NEW_TASK',
       payload: task.data
   }
}
export const deleteTask = (task: any) => {
    return {
        type: 'DELETE_TASK',
        payload: task
    }
}
export const updateTask = (task: any) => {
    return {
        type: 'UPDATE_TASK',
        payload: task.data
    }
}
import React from 'react'
import './index.css'
const Task = ({ taskInfo, setTaskVisible, setSelectedTask }) => {
  return (
    <div className='task-info' onClick={() => {
      setTaskVisible(true)
      setSelectedTask(taskInfo)
    }}>
      <h3>{taskInfo.title}</h3>
      <span>Categories :</span>
      {
        taskInfo.categories.map(item => (
          <span className='category' key={item.id}>{item.name}</span>
        ))
      }
    </div>
  )
}

export default Task
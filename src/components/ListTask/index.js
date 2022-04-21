import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Task from '../Task/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import DisplayTask from '../Modal/DisplayTask'
import { useSelector } from 'react-redux'
import axiosInstance from '../../interceptors/axiosInstance'
import './index.css'
const ListTask = ({ search, page, setPage }) => {
    const [taskVisible, setTaskVisible] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [listTask, setListTask] = useState([])
    const newTask = useSelector(state => state.task)


    const removeTask = (task, listTask) => {
        for (let i = 0; i < listTask.length; i++) {
            if (listTask[i].id === task.id) {
                listTask.splice(i, 1)
                break
            }
        }
        return listTask
    }
    const updateTask = (task, listTask) => {
        for (let i = 0; i < listTask.length; i++) {
            if (listTask[i].id === task.id) {
                listTask.splice(i, 1, task)
                break
            }
        }
        return listTask
    }
    useEffect(() => {
        if (newTask) {
            if (newTask.type === 'add') {
                setListTask([newTask, ...listTask])
            }
            else if (newTask.type === 'delete') {
                const newList = removeTask(newTask, listTask)
                setListTask([...newList])
            }
            else {
                const newList = updateTask(newTask, listTask)
                setListTask([...newList])
            }
        }
    }, [newTask])


    const nextPage = () => {
        setTimeout(() => {
            setPage(page + 1)
        }, 1000)
    }
    useEffect(() => {

        axiosInstance.get(`api/tasks?limit=10&page=${page}${search.length > 0 ? `&search=${search}` : ``}`).then((res) => {
            if (page === 1) {
                setListTask(res.data.items)
            }
            else {
                setListTask([...listTask, ...res.data.items])

            }
        })
    }, [page, search])

    const Loader = () => {
        const [isLoader, setIsLoader] = useState(true)
        useEffect(() => {
            setTimeout(() => {
                setIsLoader(false)
            }, 1000)
        }, [])
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    isLoader && <Spin></Spin>
                }
            </div>
        )
    }
    return (
        <div className='container-list-task'>
            {
                search.length > 0 &&
                <div style={{
                    paddingLeft: '50px',
                    paddingBottom: '20px',
                    fontSize: '20px',
                    color: '#314659'
                }}>Search by task name "{search}"</div>
            }
            <InfiniteScroll
                className='list-task'
                dataLength={listTask.length} //This is important field to render the next data
                next={nextPage}
                hasMore={true}
                loader={<Loader></Loader>}

            >
                {
                    listTask.map(item => (
                        <Task key={item.id} taskInfo={item} setTaskVisible={setTaskVisible} setSelectedTask={setSelectedTask}></Task>
                    ))
                }
            </InfiniteScroll>
            <DisplayTask taskVisible={taskVisible} setTaskVisible={setTaskVisible} task={selectedTask}></DisplayTask>
        </div>
    )
}

export default ListTask
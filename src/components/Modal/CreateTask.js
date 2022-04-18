import { Alert, Form, Input, Modal, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTask } from '../../actions/task'
import { resetPage } from '../../actions/page'
const CreateTask = ({ visible, setVisible }) => {
    const token = localStorage.getItem('token')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState([])
    const [selectedCate, setSelectedCate] = useState([])
    const [msg, setMsg] = useState(null)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const clearState = () => {
        setTitle('')
        setSelectedCate([])
        setMsg('')
    }
    useEffect(() => {
        axios.get('https://mvn-task-manager.work/api/categories?limit=10&page=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setCategory(res.data.items)
        })
    }, [])
    const handleOk = () => {
        if (title.length === 0 || selectedCate.length === 0) {
            setMsg("Can't create Task, please enter the title & category")
        }
        else {
            axios.post('https://mvn-task-manager.work/api/tasks', {
                "title": title,
                "categoryIds": selectedCate
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    console.log(res)
                    dispatch(addNewTask(res))
                })
            setVisible(false)
            clearState()
            form.resetFields(['title', 'category'])
        }
    }
    const handleCancel = () => {
        setVisible(false)
        clearState()
        form.resetFields(['title', 'category'])
    }
    const handleChangeCate = (value) => {
        setSelectedCate([...value])
    }
    return (
        <Modal visible={visible} title='Create a new Task' onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                {
                    msg ? <Alert message={msg} type='error'></Alert> : <></>
                }
                <Form.Item name='title'>
                    <Input placeholder='Title' onChange={(e) => setTitle(e.target.value)}></Input>
                </Form.Item>
                <Form.Item name='category'>
                    <Select placeholder='Category' mode="multiple" onChange={handleChangeCate}>
                        {
                            category.map((item) => (
                                <Select.Option key={item.name} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateTask
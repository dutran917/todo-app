import { CreditCardTwoTone, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState, useRef } from 'react'
const TaskBar = ({ setCreateVisible, search, setSearch }) => {
    const [searchValue, setSearchValue] = useState('')
    const ref = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(searchValue)
    }
    return (
        <div className='task-bar'>
            <Button
                type='primary'
                className='create-btn'
                icon={<CreditCardTwoTone></CreditCardTwoTone>}
                onClick={() => setCreateVisible(true)}
            >
                Create a Task
            </Button>
            <form ref={ref} onSubmit={handleSubmit} className='search-bar'>
                <Input style={{ borderRadius: '20px' }} type='text' placeholder='Search task' onChange={e => setSearchValue(e.target.value)}></Input>
                <Button type='ghost' onClick={handleSubmit} icon={<SearchOutlined></SearchOutlined>}></Button>
            </form>
            
        </div>
    )
}

export default TaskBar
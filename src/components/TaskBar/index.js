import { CreditCardTwoTone, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import './index.css'
const TaskBar = ({ setCreateVisible, setSearch, setPage }) => {
    const [searchValue, setSearchValue] = useState('')
    const ref = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(searchValue)
        setPage(1)
    }
    useEffect(()=>{
        if(searchValue.length === 0) {
            setSearch('')
            setPage(1)
        }
    },[searchValue])
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
                <Input style={{ borderRadius: '20px' }} type='text' placeholder='Search task' onChange={e => setSearchValue(e.target.value)} allowClear></Input>
                <Button type='ghost' onClick={handleSubmit} icon={<SearchOutlined></SearchOutlined>}></Button>
            </form>
            
        </div>
    )
}

export default TaskBar
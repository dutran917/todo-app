import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../actions/user'
import Header from './Header'
import ListTask from './ListTask'
import CreateTask from './Modal/CreateTask'
import TaskBar from './TaskBar'
const Home = () => {
    const token = window.localStorage.getItem('token')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        window.localStorage.removeItem('token')
        dispatch(logout())
    }
    const [createVisible, setCreateVisible] = useState(false)
    // const [searchTask,setSearchTask] = useState([])
    const [search, setSearch] = useState('')
    return (
        <div>
            {
                token ?
                    <div>
                        <Header user={user} handleLogout={handleLogout}></Header>
                        <CreateTask visible={createVisible} setVisible={setCreateVisible}></CreateTask>
                        <TaskBar setCreateVisible={setCreateVisible} search={search} setSearch={setSearch}></TaskBar>
                        <ListTask search={search}></ListTask>
                    </div> :
                    <Redirect to='/login'></Redirect>

            }
        </div>
    )
}

export default Home
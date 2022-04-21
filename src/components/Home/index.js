import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../actions/auth'
import Header from '../Header/index'
import ListTask from '../ListTask/index'
import CreateTask from '../Modal/CreateTask'
import TaskBar from '../TaskBar/index'
const Home = () => {
    const token = window.localStorage.getItem('token')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(logout(false))
    }
    const [createVisible, setCreateVisible] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    return (
        <div>
            {
                token ?
                    <div>
                        <Header user={user} handleLogout={handleLogout}></Header>
                        <CreateTask visible={createVisible} setVisible={setCreateVisible}></CreateTask>
                        <TaskBar setCreateVisible={setCreateVisible} search={search} setSearch={setSearch} setPage={setPage}></TaskBar>
                        <ListTask search={search} page={page} setPage={setPage}></ListTask>
                    </div> :
                    <Redirect to='/login'></Redirect>

            }
        </div>
    )
}

export default Home
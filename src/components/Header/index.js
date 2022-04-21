import { LogoutOutlined } from '@ant-design/icons'
import './index.css'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../interceptors/axiosInstance'
const Header = ({ handleLogout }) => {
    const userLogin = useSelector(state => state.user)
    const [user, setUser] = useState(null)
    const uid = useMemo(() => {
        return localStorage.getItem('uid')
    }, [userLogin])
    useEffect(() => {
        axiosInstance.get(`api/users/${uid}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userLogin])
    return (
        <div className='header'>
            <p className='app-name'>TODO APP</p>
            <div className='user-info'>
                <p>{user ? user.username : ''}</p>
                <LogoutOutlined style={{ fontSize: '20px' }} onClick={handleLogout}></LogoutOutlined>
            </div>
        </div>
    )
}

export default Header
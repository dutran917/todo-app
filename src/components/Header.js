import { LogoutOutlined } from '@ant-design/icons'
const Header = ({ user, handleLogout }) => {

    return (
        <div className='header'>
            <p className='app-name'>TODO APP</p>
            <div className='user-info'>
                <p>{user ? user.username : ''}</p>
                <LogoutOutlined style={{fontSize: '20px'}} onClick={handleLogout}></LogoutOutlined> 
            </div>
        </div>
    )
}

export default Header
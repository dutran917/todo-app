import { Alert, Button, Form, Input, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { setNewUser } from '../actions/user'
const { Title } = Typography
const Login = ({ option }) => {
    const formStyle = {
        width: '500px',
        textAlign: 'center',
        padding: '50px',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '10px',
        boxShadow: '3px 6px rgba(0,0,0,0.2)'
    }
    const loginForm = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [registerErr, setRegisterErr] = useState(null)
    const history = useHistory()
    useEffect(() => {
        const tk = window.localStorage.getItem('token')
        setToken(tk)
    }, [isLogin])
    const handleLoginSubmit = () => {
        axios.post('https://mvn-task-manager.work/auth/login', {
            "username": username,
            "password": password
        })
            .then(res => {
                console.log(res)
                const user = res.data
                dispatch(setNewUser(user))
                localStorage.setItem('token', res.data.token)
                setIsLogin(true)
            })
            .catch(err => {
                console.log(err)
                setIsInvalid(true)
            })
        form.resetFields(['username', 'password'])
        setIsInvalid(false)
    }
    const handleRegisterSubmit = () => {
        axios.post('https://mvn-task-manager.work/auth/register', {
            "username": username,
            "password": password
        })
            .then(res => {
                console.log(res)
                history.push("/login")
            })
            .catch(err => {
                setRegisterErr(err.response.data.message)
                console.log(err.response.data.message)
            })
        form.resetFields(['username-register', 'password-register'])
    }
    const [form] = Form.useForm()
    return (
        <div style={loginForm}>

            {token ? <Redirect to='/'></Redirect> : <></>}
            {
                option == 'login' &&
                <Form style={formStyle} form={form}>
                    {
                        isInvalid && <Alert type='error' message='Username or Password is invalid' closable={true}></Alert>
                    }
                    <Title style={{ textAlign: 'center' }} level={2}>
                        Login
                    </Title>
                    <Form.Item label='Username' name='username'>
                        <Input placeholder='username' onChange={(e) => setUsername(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></Input>
                    </Form.Item>
                    <Button onClick={handleLoginSubmit}>Login</Button>
                    <div>
                        <Link to='/register'>Don't have an Account? Register</Link>
                    </div>
                </Form>
            }
            {
                option == 'register' &&
                <Form style={formStyle} form={form}>
                    {
                        registerErr ? <Alert type='error' message={registerErr}></Alert> : <></>
                    }
                    <Title style={{ textAlign: 'center' }} level={2}>
                        Register
                    </Title>
                    <Form.Item label='Username' name='username-register'>
                        <Input placeholder='username' onChange={(e) => setUsername(e.target.value)}></Input>
                    </Form.Item>
                    <Form.Item label='Password' name='password-register'>
                        <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></Input>
                    </Form.Item>
                    <Button onClick={handleRegisterSubmit}>Register</Button>
                    <div>
                        <Link to='/login'>Already have an account? Go to login page</Link>
                    </div>
                </Form>
            }
        </div>
    )
}

export default Login
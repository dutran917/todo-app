import { Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { setNewUser } from "../../actions/user";
import axiosInstance from "../../interceptors/axiosInstance";
import style from "./index.module.css";
const { Title } = Typography;

interface LoginProps {
    option: string;
}

const Login = ({ option }: LoginProps) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [registerErr, setRegisterErr] = useState(null);
    const history = useHistory();

    const handleLoginSubmit = () => {
        axiosInstance
            .post("auth/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                const user = res.data;
                dispatch(setNewUser(user));
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("uid", res.data.id);
                dispatch(login(true));
            })
            .catch((err) => {
                console.log(err);
                setIsInvalid(true);
            });
        form.resetFields(["username", "password"]);
        setIsInvalid(false);
    };

    const handleRegisterSubmit = () => {
        axiosInstance
            .post("auth/register", {
                username: username,
                password: password,
            })
            .then((res) => {
                history.push("/login");
            })
            .catch((err) => {
                setRegisterErr(err.response.data.message);
            });
        form.resetFields(["username-register", "password-register"]);
    };
    const [form] = Form.useForm();
    return (
        <div className={style.loginForm}>
            {option === "login" && (
                <Form className={style.formStyle} form={form}>
                    {isInvalid && (
                        <Alert
                            type="error"
                            message="Username or Password is invalid"
                            closable={true}
                        ></Alert>
                    )}
                    <Title style={{ textAlign: "center" }} level={2}>
                        Login
                    </Title>
                    <Form.Item label="Username" name="username">
                        <Input
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Button onClick={handleLoginSubmit}>Login</Button>
                    <div>
                        <Link to="/register">
                            Don't have an Account? Register
                        </Link>
                    </div>
                </Form>
            )}
            {option === "register" && (
                <Form className={style.formStyle} form={form}>
                    {registerErr ? (
                        <Alert type="error" message={registerErr}></Alert>
                    ) : (
                        <></>
                    )}
                    <Title style={{ textAlign: "center" }} level={2}>
                        Register
                    </Title>
                    <Form.Item label="Username" name="username-register">
                        <Input
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Password" name="password-register">
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Button onClick={handleRegisterSubmit}>Register</Button>
                    <div>
                        <Link to="/login">
                            Already have an account? Go to login page
                        </Link>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default Login;

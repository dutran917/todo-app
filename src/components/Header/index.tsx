import { LogoutOutlined } from "@ant-design/icons";
import style from "./index.module.css";
import { useEffect, useMemo, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axiosInstance from "../../interceptors/axiosInstance";
interface HeaderProps {
    handleLogout: () => void;
}
const Header = ({ handleLogout }: HeaderProps) => {
    const userLogin = useSelector((state: RootStateOrAny) => state.user);
    const [user, setUser] = useState<any>(null);
    const uid = useMemo(() => {
        return localStorage.getItem("uid");
    }, [userLogin]);

    useEffect(() => {
        axiosInstance
            .get(`api/users/${uid}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userLogin]);

    return (
        <div className={style.header}>
            <p className={style.appName}>TODO APP</p>
            <div className={style.userInfo}>
                <p>{user ? user.username : ""}</p>
                <LogoutOutlined
                    style={{ fontSize: "20px" }}
                    onClick={handleLogout}
                ></LogoutOutlined>
            </div>
        </div>
    );
};

export default Header;

import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import Header from "../Header";
import ListTask from "../ListTask/index";
import CreateTask from "../Modal/CreateTask";
import TaskBar from "../TaskBar/index";
const Home = () => {
    const [createVisible, setCreateVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const handleLogout = () => {
        window.localStorage.clear();
        dispatch(logout(false));
    };

    return (
        <div>
            <Header handleLogout={handleLogout}></Header>
            <CreateTask
                visible={createVisible}
                setVisible={setCreateVisible}
            ></CreateTask>
            <TaskBar
                setCreateVisible={setCreateVisible}
                setSearch={setSearch}
                setPage={setPage}
            ></TaskBar>
            <ListTask search={search} page={page} setPage={setPage}></ListTask>
        </div>
    );
};

export default Home;

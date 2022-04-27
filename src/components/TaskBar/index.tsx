import { CreditCardTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import style from "./index.module.css";

interface TaskBarProps {
    setCreateVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TaskBar = ({ setCreateVisible, setSearch, setPage }: TaskBarProps) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchValue);
        setPage(1);
    };

    useEffect(() => {
        if (searchValue.length === 0) {
            setSearch("");
            setPage(1);
        }
    }, [searchValue]);

    return (
        <div className={style.taskBar}>
            <Button
                type="primary"
                className={style.createBtn}
                icon={<CreditCardTwoTone></CreditCardTwoTone>}
                onClick={() => setCreateVisible(true)}
            >
                Create a Task
            </Button>
            <form onSubmit={handleSubmit} className={style.searchBar}>
                <Input
                    style={{ borderRadius: "20px" }}
                    type="text"
                    placeholder="Search task"
                    onChange={(e) => setSearchValue(e.target.value)}
                    allowClear
                ></Input>
                <Button
                    type="ghost"
                    onClick={handleSubmit}
                    icon={<SearchOutlined></SearchOutlined>}
                ></Button>
            </form>
        </div>
    );
};

export default TaskBar;

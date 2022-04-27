import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import Task from "../Task/index";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import DisplayTask from "../Modal/DisplayTask";
import { RootStateOrAny, useSelector } from "react-redux";
import axiosInstance from "../../interceptors/axiosInstance";
import style from "./index.module.css";

interface ListTaskProps {
    search: string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
}

const ListTask = ({ search, page, setPage }: ListTaskProps) => {
    const [taskVisible, setTaskVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [listTask, setListTask] = useState<any[]>([]);
    const newTask = useSelector((state: RootStateOrAny) => state.task);

    const removeTask = (task: any, listTask: any[]) => {
        for (let i = 0; i < listTask.length; i++) {
            if (listTask[i].id === task.id) {
                listTask.splice(i, 1);
                break;
            }
        }
        return listTask;
    };

    const updateTask = (task: any, listTask: any[]) => {
        for (let i = 0; i < listTask.length; i++) {
            if (listTask[i].id === task.id) {
                listTask.splice(i, 1, task);
                break;
            }
        }
        return listTask;
    };

    const nextPage = () => {
        setTimeout(() => {
            setPage(page + 1);
        }, 1000);
    };

    const Loader = () => {
        const [isLoader, setIsLoader] = useState(true);
        useEffect(() => {
            setTimeout(() => {
                setIsLoader(false);
            }, 1000);
        }, []);
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                {isLoader && <Spin></Spin>}
            </div>
        );
    };

    useEffect(() => {
        if (newTask) {
            if (newTask.type === "add") {
                setListTask([newTask, ...listTask]);
            } else if (newTask.type === "delete") {
                const newList = removeTask(newTask, listTask);
                setListTask([...newList]);
            } else {
                const newList = updateTask(newTask, listTask);
                setListTask([...newList]);
            }
        }
    }, [newTask]);

    useEffect(() => {
        axiosInstance
            .get("api/tasks", {
                params: {
                    limit: 10,
                    page: page,
                    search: search.length > 0 ? search : "",
                },
            })
            .then((res) => {
                if (page === 1) {
                    setListTask(res.data.items);
                } else {
                    setListTask([...listTask, ...res.data.items]);
                }
            });
    }, [page, search]);

    return (
        <div className={style.containerListTask}>
            {search.length > 0 && (
                <div
                    style={{
                        paddingLeft: "50px",
                        paddingBottom: "20px",
                        fontSize: "20px",
                        color: "#314659",
                    }}
                >
                    Search by task name "{search}"
                </div>
            )}
            <InfiniteScroll
                className={style.listTask}
                dataLength={listTask.length} //This is important field to render the next data
                next={nextPage}
                hasMore={true}
                loader={<Loader></Loader>}
            >
                {listTask.map((item) => (
                    <Task
                        key={item.id}
                        taskInfo={item}
                        setTaskVisible={setTaskVisible}
                        setSelectedTask={setSelectedTask}
                    ></Task>
                ))}
            </InfiniteScroll>
            <DisplayTask
                taskVisible={taskVisible}
                setTaskVisible={setTaskVisible}
                task={selectedTask}
            ></DisplayTask>
        </div>
    );
};

export default ListTask;

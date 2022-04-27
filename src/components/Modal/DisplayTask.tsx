import { deleteTask, updateTask } from "../../actions/task";
import { Alert, Form, Input, Modal, Select, Button } from "antd";
import axiosInstance from "../../interceptors/axiosInstance";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./index.module.css";

interface DisplayTaskProps {
    task: any;
    taskVisible: boolean;
    setTaskVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayTask = ({
    task,
    taskVisible,
    setTaskVisible,
}: DisplayTaskProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<any[]>([]);
    const [selectedCate, setSelectedCate] = useState<any[]>([]);
    const [msg, setMsg] = useState<string>("");
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        axiosInstance
            .get("api/categories", {
                params: {
                    limit: 10,
                    page: 1,
                },
            })
            .then((res) => {
                setCategory(res.data.items);
            });
    }, []);

    const clearState = () => {
        setTitle("");
        setEdit(false);
        setSelectedCate([]);
        setMsg("");
        form.resetFields(["title", "category"]);
    };

    const handleOk = () => {
        setTaskVisible(false);
        setEdit(false);
    };

    const handleCancel = () => {
        setTaskVisible(false);
        clearState();
        setEdit(false);
    };

    const handleDelete = () => {
        axiosInstance
            .delete(`https://mvn-task-manager.work/api/tasks/${task.id}`)
            .then((res) => {
                dispatch(deleteTask(task));
            });
        setTaskVisible(false);
    };

    const handleUpdate = () => {
        if (title.length === 0 || selectedCate.length === 0) {
            setMsg("Can't update Task, please enter the title & category");
        } else {
            axiosInstance
                .patch(`https://mvn-task-manager.work/api/tasks/${task.id}`, {
                    title: title,
                    categoryIds: selectedCate,
                    status: "IN_PROGRESS",
                })
                .then((res) => {
                    dispatch(updateTask(res));
                });
            setTaskVisible(false);
            clearState();
            form.resetFields(["title", "category"]);
        }
    };

    const handleChangeCate = (value: any) => {
        setSelectedCate([...value]);
    };

    return (
        <Modal
            visible={taskVisible}
            title={task ? task.title : ""}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
                edit === false
                    ? [
                          <Button type="primary" onClick={() => setEdit(true)}>
                              Edit
                          </Button>,
                          <Button type="primary" danger onClick={handleDelete}>
                              Delete this Task
                          </Button>,
                      ]
                    : [
                          <Button type="primary" onClick={handleUpdate}>
                              Update
                          </Button>,
                          <Button
                              type="ghost"
                              onClick={() => {
                                  // setTaskVisible(false)
                                  clearState();
                              }}
                          >
                              Cancel
                          </Button>,
                      ]
            }
        >
            {task ? (
                <div>
                    {edit ? (
                        <Form form={form} title={"Update"}>
                            {msg ? (
                                <Alert message={msg} type="error"></Alert>
                            ) : (
                                <></>
                            )}
                            <Form.Item name="title" label="Title">
                                <Input
                                    defaultValue={task.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></Input>
                            </Form.Item>
                            <Form.Item name="category" label="categories">
                                <Select
                                    placeholder="Category"
                                    mode="multiple"
                                    onChange={handleChangeCate}
                                >
                                    {category.map((item) => (
                                        <Select.Option
                                            key={item.name}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    ) : (
                        <>
                            <h4>Name: {task.title}</h4>
                            <h4>
                                Categories:{" "}
                                {task.categories.map((item: any) => (
                                    <span className={style.category}>
                                        {item.name}
                                    </span>
                                ))}
                            </h4>
                            <h4>Status: {task.status}</h4>
                            <h4>Created At: {task.createdAt}</h4>
                            <h4>Updated At: {task.updatedAt}</h4>
                        </>
                    )}
                </div>
            ) : (
                <></>
            )}
        </Modal>
    );
};

export default DisplayTask;

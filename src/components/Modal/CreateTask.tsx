import { Alert, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../actions/task";
import axiosInstance from "../../interceptors/axiosInstance";

interface CreateTaskProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTask = ({ visible, setVisible }: CreateTaskProps) => {
    const [title, setTitle] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [category, setCategory] = useState<any[]>([]);
    const [selectedCate, setSelectedCate] = useState<any[]>([]);
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
        setSelectedCate([]);
        setMsg("");
    };

    const handleOk = () => {
        if (title.length === 0 || selectedCate.length === 0) {
            setMsg("Can't create Task, please enter the title & category");
        } else {
            axiosInstance
                .post("api/tasks", {
                    title: title,
                    categoryIds: selectedCate,
                })
                .then((res) => {
                    dispatch(addNewTask(res));
                });
            setVisible(false);
            clearState();
            form.resetFields(["title", "category"]);
        }
    };

    const handleCancel = () => {
        setVisible(false);
        clearState();
        form.resetFields(["title", "category"]);
    };

    const handleChangeCate = (value: any) => {
        setSelectedCate([...value]);
    };

    return (
        <Modal
            visible={visible}
            title="Create a new Task"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form}>
                {msg ? <Alert message={msg} type="error"></Alert> : <></>}
                <Form.Item name="title">
                    <Input
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                </Form.Item>
                <Form.Item name="category">
                    <Select
                        placeholder="Category"
                        mode="multiple"
                        onChange={handleChangeCate}
                    >
                        {category.map((item) => (
                            <Select.Option key={item.name} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTask;

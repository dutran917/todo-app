import React from "react";
import style from "./index.module.css";

interface TaskProps {
    taskInfo: any;
    setTaskVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedTask: React.Dispatch<React.SetStateAction<any>>;
}

const Task = ({ taskInfo, setTaskVisible, setSelectedTask }: TaskProps) => {
    return (
        <div
            className={style.taskinfo}
            onClick={() => {
                setTaskVisible(true);
                setSelectedTask(taskInfo);
            }}
        >
            <h3>{taskInfo.title}</h3>
            <span>Categories :</span>
            {taskInfo.categories.map((item: any) => (
                <span className={style.category} key={item.id}>
                    {item.name}
                </span>
            ))}
        </div>
    );
};

export default Task;

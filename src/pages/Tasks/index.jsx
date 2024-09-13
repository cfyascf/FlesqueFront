import { useEffect } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"
import { useParams } from "react-router-dom"
import AddTask from "./components/AddTask"
import DeleteTask from "./components/DeleteTask"
import { taskModalHook } from "../../hooks/taskModal.hook"
import UpdateTask from "./components/UpdateTask"
import { useState } from "react"

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { isAddOpen, handleAddOpen, handleAddClose,
        isDeleteOpen, handleDeleteOpen, handleDeleteClose,
        isUpdateOpen, handleUpdateOpen, handleUpdateClose,
        currTask
    } = taskModalHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook()
    const [currTitle, setCurrTitle] = useState("");
    const [currDesc, setCurrDesc] = useState("");

    useEffect(() => {
        updateTasks()
    }, [])

    const updateTasks = async () => {
        const response = await handleRequest(`/task/group?id=${groupId}`, 'GET')
        console.log(response)
        fillTasks(response.data.group_tasks)
    }

    return <>
        <Navbar/>
        <div className={styled.page}>
            <div className={styled.tasksGrid}>
                {
                    tasks.map(t => {
                        console.log(t)
                        return(
                            <Task
                                key={t.task.task_id}
                                title={t.task.title}
                                responsible={t.user.fullname}
                                description={t.task.desc}
                                checkedButton={t.task.status_id}
                                deleteModal={handleDeleteOpen}
                                updateModal={handleUpdateOpen}
                                id={t.task.task_id}
                            />
                        )
                    })
                }
                <button className={styled.addBtn} onClick={handleAddOpen}>+</button>
            </div>
        </div>
        <AddTask open={isAddOpen} hideModal={handleAddClose}/>
        <DeleteTask open={isDeleteOpen} hideModal={handleDeleteClose} id={currTask}/>
        <UpdateTask open={isUpdateOpen} hideModal={handleUpdateClose} id={currTask}/>
    </>
}
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

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { isAddOpen, handleAddOpen, isDeleteOpen, handleAddClose, handleDeleteOpen, handleDeleteClose, currTask } = taskModalHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook()

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
                        return(
                            <Task key={t.task.task_id} title={t.task.title} responsible={t.user.fullname} description={t.task.desc} checkedButton={t.task.status} handleDeleteOpen={handleDeleteOpen} id={t.task.task_id}/>
                        )
                    })
                }
                <button className={styled.addBtn} onClick={handleAddOpen}>+</button>
            </div>
        </div>
        <AddTask open={isAddOpen} hideModal={handleAddClose}/>
        <DeleteTask open={isDeleteOpen} hideModal={handleDeleteClose} id={currTask}/>
    </>
}
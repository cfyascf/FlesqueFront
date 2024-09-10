import { useContext, useEffect } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"
import { GroupContext } from "../../contexts/group.context"
import { useParams } from "react-router-dom"
import { AddButton } from "../../components/AddButton"

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook(`/task/group?id=${groupId}`, 'GET')

    useEffect(() => {
        updateTasks()
    }, [])

    const updateTasks = async () => {
        const response = await handleRequest()
        console.log(response)
        fillTasks(response.data.group_tasks)
    }

    return <>
        <Navbar/>
        <div className={styled.page}>
            <div className={styled.tasksGrid}>
                {
                    tasks.map(t => {
                        return <>
                            <Task title={t.title} responsible={t.responsible} description={t.desc} checkedButton={t.status}/>
                        </>
                    })
                }

                <AddButton/>
            </div>
        </div>
    </>
}
import { useEffect } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { handleRequest } = requestHook('http://127.0.0.1', 'GET')

    useEffect(() => {
        const response = handleRequest()
        fillTasks(response.tasks)

    }, [tasks])

    return <>
        <Navbar/>
        <div className={styled.page}>
            <div className={styled.tasksGrid}>
                {/* {
                    tasks.forEach(t => {
                        return <>
                            <Task title={t.title} responsible={t.responsible} description={t.description} checkedButton={t.status}/>
                        </>
                    })
                } */}
            </div>
        </div>
    </>
}
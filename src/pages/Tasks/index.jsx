import { useContext, useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"
import { GroupContext } from "../../contexts/group.context"
import { useParams } from "react-router-dom"
import AddTask from "./components/AddTask"

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook(`http://127.0.0.1/groups/${groupId}`, 'GET')
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    // useEffect(async () => {
    //     const response = await handleRequest()
    //     fillTasks(response.tasks)

    // }, [tasks])

    return <>
        <Navbar/>
        <div className={styled.page}>
            <div className={styled.tasksGrid}>
                <Task title={'Teste'} responsible={'testando'} description={'testando descricao testando testando'} checkedButton={2}/>

                {/* {
                    tasks.forEach(t => {
                        return <>
                            <Task title={t.title} responsible={t.responsible} description={t.description} checkedButton={t.status}/>
                        </>
                    })
                } */}
                <button className={styled.addBtn} onClick={handleOpen}>+</button>
            </div>
        </div>
        <AddTask open={isOpen} hideModal={handleClose}/>
    </>
}
import { useContext, useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"
import { GroupContext } from "../../contexts/group.context"
import { useParams } from "react-router-dom"
import AddTask from "./components/AddTask"
import DeleteTask from "./components/DeleteTask"

export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook(`http://127.0.0.1/groups/${groupId}`, 'GET')
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currTask, setCurrTask] = useState(0)

    const handleAddOpen = () => setIsAddOpen(true);
    const handleAddClose = () => setIsAddOpen(false);
    const handleDeleteOpen = (currId) => {
        setIsDeleteOpen(true);
        setCurrTask(currId);
    }
    const handleDeleteClose = () => setIsDeleteOpen(false);

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
                <Task 
                    title={'Teste'}
                    responsible={'testando'}
                    description={'testando descricao testando testando'}
                    checkedButton={2}
                    open={handleDeleteOpen}
                    id={0}
                    // id={item.id} //adicionar quando estiver dentro do map
                />

                {/* {
                    tasks.forEach(t => {
                        return <>
                            <Task title={t.title} responsible={t.responsible} description={t.desc} checkedButton={t.status}/>
                        </>
                    })
                } */}
                <button className={styled.addBtn} onClick={handleAddOpen}>+</button>
            </div>
        </div>
        <AddTask open={isAddOpen} hideModal={handleAddClose}/>
        <DeleteTask open={isDeleteOpen} hideModal={handleDeleteClose} id={currTask}/>
    </>
}
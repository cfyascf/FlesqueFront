import { useEffect, useState } from "react"
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

    const [filterShowing, setFilterShowing] = useState(false)
    const [filterType, setFilterType] = useState('Sem filtro')
    const [hasTasks, setHasTasks] = useState(false)

    useEffect(() => {
        handleHasTasks()

        updateTasks()
        console.log(filterType)
    }, [filterType])

    const handleHasTasks = () => {
        if(tasks.length == 0)
            setHasTasks(false)
        else
            setHasTasks(true)
    }

    const updateTasks = async () => {
        const response = await handleRequest(`/task/group?id=${groupId}&filter=${filterType}`, 'GET')
        console.log(response)
        fillTasks(response.data.group_tasks)
    }

    return <>
        <Navbar />
        <div className={styled.page}>
            {/* DO HAS NO TASKS WARNING */}
            <div className={styled.tasksGrid}>
                {
                    tasks.map(t => {
                        return (
                            <Task key={t.task.task_id} title={t.task.title} responsible={t.user.fullname} description={t.task.desc} checkedButton={t.task.status} open={handleDeleteOpen} id={t.task.task_id} />
                        )
                    })
                }
            </div>
            <div className={styled.options}>
                <button className={styled.addBtn} onClick={handleAddOpen}>
                    <span class="material-symbols-outlined">add</span>
                </button>
                <button className={styled.addBtn} onClick={() => setFilterShowing(!filterShowing)}>
                    <span class="material-symbols-outlined">sort</span>
                </button>
                <div className={filterShowing ? styled.filter : styled.filter_hidden}>
                    <p onClick={(e) => setFilterType('Sem filtro')}>Sem filtro</p>
                    <p onClick={(e) => setFilterType('A fazer')}>A fazer</p>
                    <p onClick={(e) => setFilterType('Em andamento')}>Em andamento</p>
                    <p onClick={(e) => setFilterType('Finalizado')}>Finalizado</p>
                </div>
            </div>
        </div>
        <AddTask open={isAddOpen} hideModal={handleAddClose} />
        <DeleteTask open={isDeleteOpen} hideModal={handleDeleteClose} id={currTask} />
    </>
}
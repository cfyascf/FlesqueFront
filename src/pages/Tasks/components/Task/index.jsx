import styled from './styles.module.sass'
import editIcon from '/edit-icon.png'
import deleteIcon from '/delete-icon.png'
import { useState } from 'react'
import { requestHook } from '../../../../hooks/request.hook'

export const Task = ({ title, responsible, description, checkedButton, deleteModal, updateModal, id }) => {
    const [status, setStatus] = useState(0);
    const { handleRequest } = requestHook()

    async function handleStatus(sttsId){
        try {
            let stts = ({ "task_id": id, "status_id": sttsId })
            const response = await handleRequest(`/task/updateStatus`, 'PUT', stts)
            console.log(response, "QQQQQQQQQQQQQQWWWWWWWWWWWWWWWW")
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <div className={styled.task}>
            <div className={styled.header}>
                <p className={styled.title}>{ title }</p>
                <div className={styled.headerButtons}>
                    <img src={editIcon} className={styled.icon} onClick={() => updateModal(id)}></img>
                    <img src={deleteIcon} className={styled.icon} onClick={() => deleteModal(id)}></img>
                </div>
            </div>
            <p className={styled.responsible}>Para { responsible }</p>
            <p className={styled.description}>{ description }</p>

            <div className={styled.buttonGroup}>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 1 } onClick={() => handleStatus(1)} ></input>
                    <label>A fazer</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 2 } onClick={() => handleStatus(2)} ></input>
                    <label>Em andamento</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 3 } onClick={() => handleStatus(3)} ></input>
                    <label>Finalizado</label>
                </div>
            </div>
        </div>
    </>
}
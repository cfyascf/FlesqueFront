import styled from './styles.module.sass'
import editIcon from '/edit-icon.png'
import deleteIcon from '/delete-icon.png'

export const Task = ({ title, responsible, description, checkedButton, open, id }) => {
    return <>
        <div className={styled.task}>
            <div className={styled.header}>
                <p className={styled.title}>{ title }</p>
                <div className={styled.headerButtons}>
                    <span class="material-symbols-outlined" style={{fontSize: "22px", color:"#858585"}}>edit</span>
                    <span class="material-symbols-outlined" style={{fontSize: "22px", color:"#858585"}}>delete</span>
                </div>
            </div>
            <p className={styled.responsible}>Para { responsible }</p>
            <p className={styled.description}>{ description }</p>

            <div className={styled.buttonGroup}>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 1 } readOnly></input>
                    <label>A fazer</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 2 } readOnly></input>
                    <label>Em andamento</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" checked={ checkedButton === 3 } readOnly></input>
                    <label>Finalizado</label>
                </div>
            </div>
        </div>
    </>
}
import styled from './styles.module.sass'

export const Task = ({ title, responsible, description, checkedButton }) => {
    return <>
        <div className={styled.task}>
            <p className={styled.title}>{ title }</p>
            <p className={styled.responsible}>{ responsible }</p>
            <p className={styled.description}>{ description }</p>

            <div className={styled.buttonGroup}>
                <div className={styled.button}>
                    <input type="radio" { ...checkedButton == 1 ? checked : '' }></input>
                    <label>A fazer</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" { ...checkedButton == 2 ? checked : '' }></input>
                    <label>Em andamento</label>
                </div>
                <div className={styled.button}>
                    <input type="radio" { ...checkedButton == 3 ? checked : '' }></input>
                    <label>Finalizado</label>
                </div>
            </div>
        </div>
    </>
}
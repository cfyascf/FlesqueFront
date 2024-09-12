import styled from './styles.module.sass'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return <>
        <div className={styled.navbarContainer}>
            <ul className={styled.navbar}>
                <li>
                    <Link to='/home' className={styled.button}>Home</Link>
                </li>
                <li>
                    <Link to='/ ' className={styled.button}>Logout</Link>
                </li>
            </ul>
        </div>
    </>
}
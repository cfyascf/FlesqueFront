import { Navbar } from "../../components/Navbar"
import { requestHook } from "../../hooks/request.hook"
import { useContext, useEffect, useState } from "react"
import styled from './styles.module.sass'
import { groupsHook } from "../../hooks/groups.hook"
import { GroupContext } from "../../contexts/group.context"
import { useNavigate } from "react-router-dom"
import AddGroup from "./components/AddGroup"

export const Home = () => {
    const { handleRequest } = requestHook('http://127.0.0.1/groups', 'GET')
    const { groups, fillGroups } = groupsHook()
    const { groupId, setGroupId, groupName, setGroupName } = useContext(GroupContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    // useEffect(async () => {
    //     const response = await handleRequest()
    //     fillGroups(response.groups)
    // }, [groups])

    const handleClick = (groupId, groupName) => (e) => {
        e.preventDefault()
        setGroupId(groupId)
        setGroupName(groupName)
        navigate(`/group/${groupId}`)
    }

    return <>
        <Navbar />
        <div className={styled.page}>
            <div className={styled.groupGrid}>
                <div className={styled.group} onClick={handleClick(1, 'teste')}>
                    <p>{'teste'}</p>
                </div>
                {/* {
                    groups.forEach(g => {
                        return <>
                            <div className={styled.group} onClick={handleClick(g.id, g.name)}>
                                <p>{g.name}</p>
                            </div>
                        </>
                    })
                } */}

                <button className={styled.addBtn} onClick={handleOpen}>+</button>
            </div>
        </div>
        <AddGroup open={isOpen} hideModal={handleClose}/>
    </>
}

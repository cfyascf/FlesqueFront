import { Navbar } from "../../components/Navbar"
import { requestHook } from "../../hooks/request.hook"
import { useContext, useEffect, useState } from "react"
import styled from './styles.module.sass'
import { groupsHook } from "../../hooks/groups.hook"
import { GroupContext } from "../../contexts/group.context"
import { useNavigate } from "react-router-dom"
import AddGroup from "./components/AddGroup"
// import { AddButton } from "../../components/AddButton"
import { UserContext } from "../../contexts/user.context"
import { groupModalHook } from "../../hooks/groupModal.hook"

export const Home = () => {
    const { handleRequest } = requestHook()
    const { groups, fillGroups } = groupsHook()
    const { isOpen, handleOpen, handleClose } = groupModalHook()
    const { id } = useContext(UserContext)
    const { setGroupId, setGroupName } = useContext(GroupContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        updateGroups(id)
    }, [id])
    
    const updateGroups = async (id) => {
        const response = await handleRequest(`/group/get/user?id=${id}`, 'GET')
        fillGroups(response.data.user_groups)
    }

    const handleClick = (groupId, groupName) => (e) => {
        setGroupId(groupId)
        setGroupName(groupName)
        navigate(`/group/${groupId}`)
    }

    return <>
        <Navbar />
        <div className={styled.page}>
            <div className={styled.groupGrid}>
                {
                    groups.map(g => {
                        return (
                            <div key={g.group.group_id} className={styled.group} onClick={handleClick(g.group.group_id, g.group.name)}>
                                <p className={styled.title}>{g.group.name}</p>
                                <p className={styled.responsible}>De {g.user.fullname}</p>
                            </div>
                        )
                    })
                }

                <button className={styled.addBtn} onClick={handleOpen}>+</button>
            </div>
        </div>
        <AddGroup open={isOpen} hideModal={handleClose}/>
    </>
}

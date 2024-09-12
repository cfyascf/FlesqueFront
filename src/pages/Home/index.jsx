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
    const { id } = useContext(UserContext)
    const { handleRequest } = requestHook()
    const { groups, fillGroups } = groupsHook()
    const { groupId, setGroupId, groupName, setGroupName } = useContext(GroupContext)
    const navigate = useNavigate()
    const { isOpen, handleOpen, handleClose } = groupModalHook()
    
    useEffect(() => {
        updateGroups(id)
    }, [id])
    
    const updateGroups = async (id) => {
        const response = await handleRequest(`/group/get/user?id=${id}`, 'GET')
        console.log(response)
        // console.log("oi")
        fillGroups(response.data.user_groups)
    }

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
                {
                    groups.map(g => {
                        console.log(g.group_id)
                        return (
                            <div key={g.group_id} className={styled.group} onClick={handleClick(g.group_id, g.name)}>
                                <p>{g.name}</p>
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

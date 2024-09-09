import { Navbar } from "../../components/Navbar"
import { requestHook } from "../../hooks/request.hook"
import { useEffect } from "react"
import styled from './styles.module.sass'
import { groupsHook } from "../../hooks/groups.hook"

export const Home = () => {
    const { handleRequest } = requestHook('http://127.0.0.1/groups', 'GET')
    const { groups, fillGroups } = groupsHook()

    useEffect(() => {
        const response = handleRequest()
        fillGroups(response.groups)
    }, [groups])

    return <>
        <Navbar />
        <div className={styled.page}>
            <div className={styled.groupGrid}>
                {/* {
                    groups.forEach(g => {
                        return <>
                            <div className={styled.group}>
                                <p>{g.name}</p>
                            </div>
                        </>
                    })
                } */}
            </div>
        </div>
    </>
}
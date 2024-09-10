import { useState } from "react";

export const taskModalHook = () => {
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

    return { isAddOpen, handleAddOpen, isDeleteOpen, handleAddClose, handleDeleteOpen, handleDeleteClose, currTask }
}
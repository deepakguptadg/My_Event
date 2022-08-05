import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from './Components/Context/UserData'
const Auth = ({ Com }) => {
    const Components = Com
    const {user} = useUserInfo()
    const navigate = useNavigate()
    useEffect(() =>{
        if(!user){
            navigate('/login')
        }
    })
    return (
        <>
            <Components />
        </>
    )
}

export default Auth
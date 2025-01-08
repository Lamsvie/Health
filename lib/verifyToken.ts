'use server'

import axios from "axios"
import { cookies } from "next/headers"
import { GET_ONE_PERSONNALFOLDER_BYREF_URL, GET_PATIENTFOLDER_BYREF_URL } from "./endpoints"


export const verifyToken = async () =>  {

    try {
        
        const UserInfo = await axios.get('http://localhost:8000/api/health/user/checktoken/',
            {
                headers: {
                    Authorization: `${cookies().get('token')?.value}`
                }
            }
        )        

        if (!UserInfo) {
            return null
        }

        return UserInfo.data

    } catch (error : any) {
        
        return null
    }
}

export const getUserFolder = async (ref : string) => {

    try {
        const folder = await axios.get(`${GET_PATIENTFOLDER_BYREF_URL}${ref}`)

        return folder.data
    } catch (error) {
        return {
            type: 'error', message: error
        }
    }
}

export const getPersonnelFolder = async (ref : string) => {

    try {
        const folder = await axios.get(`${GET_ONE_PERSONNALFOLDER_BYREF_URL}${ref}`)
        

        return folder.data
    } catch (error) {
        return {
            type: 'error', message: error
        }
    }
}
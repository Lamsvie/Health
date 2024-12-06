import axios from "axios"
import { cookies } from "next/headers"


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
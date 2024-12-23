import React from 'react'
import { UpdateUserForm } from '../_components/updateUserform'
import axios from 'axios'
import { getAllUser_URL } from '@/lib/endpoints'

const updateUserpage = async ({params} : {params : Promise<{id: string}>}) => {

    const id = (await params).id

    // Recuperer l'utilisateur
    const response = await axios.get(`${getAllUser_URL}${id}`)

    const user = response.data    

  return (
    <div className='p-2 mt-4'>
        <h1 className='text-xl mb-2'>Mis à jour Information d'utilisateur</h1>
        <div className='bg-white rounded-md shadow-md p-4'>
            <UpdateUserForm  user={user} />
        </div>
    </div>
  )
}

export default updateUserpage
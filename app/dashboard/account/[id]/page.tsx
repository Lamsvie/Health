import React from 'react'
import AccountParams from './_components/accountParams'
import axios from 'axios'
import { getAllUser_URL } from '@/lib/endpoints'

const accountpage = async ( {params} : {params: Promise<{ id: string }>} ) => {

    const id = (await params).id

    // recuperer les info utilisateur à modifier
    const user = await axios.get(`${getAllUser_URL}${id}`)
    console.log(user.data);
    
  return (
    <div className='bg-white p-2 mt-4 rounded-md shadow-lg'> 
        <div className='p-4'>
            <h1 className='text-xl'>Details Compte</h1>
        </div>
        <div className='px-4'>
            <AccountParams user={user.data} />
        </div>
    </div>
  )
}

export default accountpage
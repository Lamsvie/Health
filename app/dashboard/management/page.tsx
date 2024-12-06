import React from 'react'
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import axios from 'axios'
import { getAllUser_URL } from '@/lib/endpoints'
import { UsersRound } from 'lucide-react'


const page = async () => {

    const allUser = await axios.get(getAllUser_URL) 
    
  return (
    <div className='bg-white p-2 mt-4 rounded-md w-full'>
        <h1 className="flex items-center gap-2 w-full"><UsersRound color="green" /> Gestion Compte</h1>
        <DataTable columns={columns} data={allUser.data} />
    </div>
  )
}

export default page
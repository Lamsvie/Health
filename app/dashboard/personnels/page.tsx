import { StethoscopeIcon } from 'lucide-react'
import React from 'react'
import { columns } from './_components/columns'
import axios from 'axios'
import { PERSONNELFOLDER_URL } from '@/lib/endpoints'
import { DataTable } from './_components/data-table'
import { AddPersonnelForm } from './_components/accountComponent'

const medecinList = async () => {

    const personnelfolder = await axios.get(PERSONNELFOLDER_URL)
        
  return (
    <div className='bg-white p-2 mt-4 rounded-md'>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='flex gap-2 text-xl'> <StethoscopeIcon color='#138d75'/> Liste Medecin</h1>
                <p className='text-muted-foreground'>Information sur le personnel des hopitaux</p>
            </div>
            <AddPersonnelForm />
        </div>
        <div>
            <DataTable columns={columns} data={personnelfolder.data.reverse()} />
        </div>

    </div>
  )
}

export default medecinList
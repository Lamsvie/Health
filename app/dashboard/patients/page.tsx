import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import axios from 'axios'
import { PATIENTFOLDER_URL } from '@/lib/endpoints'
import { HeartPulseIcon } from 'lucide-react'
import Addpatientfolder from './_components/addpatientfolder'

const PatientList = async () => {

    const patientfolder = await axios.get(PATIENTFOLDER_URL) 
    
  return (
    <div className='bg-white p-2 mt-4 rounded-md'>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className='flex gap-2 text-xl'> <HeartPulseIcon color='#138d75'/> Liste Patient</h1>
                <p className='text-muted-foreground'>Information à propos des dossiers de patient</p>
            </div>
            <Addpatientfolder />
        </div>
        <div>
            <DataTable columns={columns} data={patientfolder.data} />
        </div>
    </div>
  )
}

export default PatientList
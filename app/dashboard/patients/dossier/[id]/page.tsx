import { GET_CHILDFOLDER_URL, PATIENTFOLDER_URL } from '@/lib/endpoints'
import axios from 'axios'
import React from 'react'
import { DataTable } from '../../_components/data-table'
import { columns } from '../../_components/columns'

const listeDossierEnfant = async ({params} : {params : Promise<{id : string}>}) => {
  const id = (await params).id

  const patientfolder = await axios.get(`${PATIENTFOLDER_URL}${id}`)
  const parentRef = patientfolder.data.reference

  const childFolder = await axios.get(`${GET_CHILDFOLDER_URL}${parentRef}`)

  const Data = [childFolder.data]
  
  return (
    <div className='flex flex-col gap-4 p-2 mt-4 rounded-md'>
      <div className='bg-[#d1f2eb] h-32 rounded-md p-4 flex flex-col justify-center'>
        <h1 className='text-2xl'>Dossiers Enfants</h1>
        <p className='text-muted-foreground'>Liste des dossiers des enfants</p>
      </div>
      <div className='bg-white rounded-md p-2'>
        <DataTable columns={columns} data={Data} />
      </div>
    </div>
    
  )
}

export default listeDossierEnfant
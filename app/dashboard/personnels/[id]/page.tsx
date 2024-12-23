
import React from 'react'
import axios from 'axios'
import { GET_ONE_PERSONNALFOLDER_URL } from '@/lib/endpoints'
import DossierComponent from '../_components/dossierComponent'
import { verifyToken } from '@/lib/verifyToken'

const EdditMedecinPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

    const id = (await params).id

    const getOnePersonnalFolder = await axios.get(`${GET_ONE_PERSONNALFOLDER_URL}/${id}`) 
    
    const getUserInfo = await verifyToken()

  return (
    <div className='mt-4 flex flex-col gap-4'>
      <h1 className='text-xl'>Mis à jour Information du personnel</h1>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <DossierComponent personnalFolder={getOnePersonnalFolder.data} userInfo={getUserInfo} />
      </div>
    </div>
  )
}

export default EdditMedecinPage
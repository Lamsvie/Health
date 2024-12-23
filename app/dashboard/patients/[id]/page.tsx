import React from 'react'
import axios from 'axios'
import { GET_PATIENTFOLDER_URL, getAllUser_URL } from '@/lib/endpoints'
import DossierComponent from '../_components/dossierComponent'
import { verifyToken } from '@/lib/verifyToken'

const PatientFolder = async ({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id

    const getPatientFolder = await axios.get(`${GET_PATIENTFOLDER_URL}${id}`)

    const getusertInfo = await verifyToken()
    
  return (
    <div className='mt-4 flex flex-col gap-4'>
      <h1 className='text-xl'>Mis à jour Information dossier patient</h1>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <DossierComponent userInfo={getusertInfo} personnalFolder={getPatientFolder.data} /> 
      </div>
    </div>
  )
}

export default PatientFolder
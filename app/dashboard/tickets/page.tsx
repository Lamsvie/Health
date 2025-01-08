import React from 'react'
import AddTicket from './_components/addTicket'
import axios from 'axios'
import { GET_PATIENTFOLDER_URL, PATIENTFOLDER_URL } from '@/lib/endpoints'

const ticketPage = async () => {

    const response = await axios.get(PATIENTFOLDER_URL)
    const getAllPatient = response.data

    return (
        <div className='flex flex-col gap-4 p-2 mt-4 rounded-md'>
            <div className='bg-[#d1f2eb] h-32 rounded-md p-4 flex flex-col justify-center'>
                <h1 className='text-2xl'>Dossiers Enfants</h1>
                <p className='text-muted-foreground'>Liste des dossiers des enfants</p>
            </div>

            <div className='bg-white rounded-md p-4 flex flex-col gap-4 shadow-md'>
                <div className='grid grid-cols-4 gap-6 '>
                    <button className='bg-[#a3dde8] h-32 rounded-md flex items-center justify-center'>
                        <h1 className='text-[#2e7a8c] flex flex-col items-center justify-center font-semibold'>
                            <p>10</p>
                            Total Tickets
                        </h1>
                    </button>
                    <button className='bg-[#f5b7b1] h-32 rounded-md flex items-center justify-center'>
                        <h1 className='text-[#e74c3c] flex flex-col items-center justify-center font-semibold'><p>10</p>
                            Tickets en Attente</h1>
                    </button>
                    <button className='bg-[#e8dca2] h-32 rounded-md flex items-center justify-center'>
                        <h1 className='text-[#b39e4e] flex flex-col items-center justify-center font-semibold'><p>10</p>
                            Tickets encours</h1>
                    </button>
                    <button className='bg-[#a8e9d9] h-32 rounded-md flex items-center justify-center'>
                        <h1 className='text-[#54b49e] flex flex-col items-center justify-center font-semibold'><p>10</p>
                            Tickets clotures</h1>
                    </button>
                </div>
                <div>
                    <AddTicket patient={getAllPatient} />
                </div>
            </div>
        </div>
    )
}

export default ticketPage
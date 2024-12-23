import { GET_PATIENTFOLDER_URL, PATIENTFOLDER_URL } from '@/lib/endpoints'
import axios from 'axios'
import { getYear } from 'date-fns'
import { Activity, Droplet, DropletsIcon, FlaskConical, Microscope, MoveUpRightIcon, Newspaper, PersonStandingIcon, Pill, User2Icon } from 'lucide-react'
import React from 'react'
import { DataTable } from './_components/data-tablePrescriptions'
import { columns } from './_components/columnsPresriptions'
import { DataTableTest } from './_components/data-tableTest'
import { columnsTest } from './_components/columnsTest'

const patientDashboadPage = async ({params}: { params: Promise<{id: string}> }) => {

    // recuperer l'id du dossier
    const id = (await params).id
    
    // recuperer le dossier du patient
    const response = await axios.get(`${GET_PATIENTFOLDER_URL}${id}`)

    const patientFolder = response.data
    console.log( patientFolder );

    const patientfolder = await axios.get(PATIENTFOLDER_URL) 

    // calcul age
    const age = getYear(Date()) - getYear(patientFolder.birthday)

    
    

    return (
        <div className='mt-4 flex flex-col gap-4'>
            <div className='bg-white p-4 shadow-md rounded-md'>
                <div className='flex flex-wrap gap-4'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-green-100 rounded-full w-14 h-14 flex items-center justify-center'>
                            <User2Icon color='green' />
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'> {patientFolder.firstName} {patientFolder.lastName} </h1>
                            <span className='text-muted-foreground'>Nom Patient</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-green-100 rounded-full w-14 h-14 flex items-center justify-center'>
                            <PersonStandingIcon color='green' />
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'> {patientFolder.genre} </h1>
                            <span className='text-muted-foreground'>Genre</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-green-100 rounded-full w-14 h-14 flex items-center justify-center'>
                            <MoveUpRightIcon color='green' />
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'> {age} </h1>
                            <span className='text-muted-foreground'>Age</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-green-100 rounded-full w-14 h-14 flex items-center justify-center'>
                            <DropletsIcon color='green' />
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'> {patientFolder.blood} </h1>
                            <span className='text-muted-foreground'>Goupe Sanguin</span>
                        </div>
                    </div>

                </div>
                <div>

                </div>
            </div>

            <div className='grid sm:grid-cols-2 lg:grid-cols-4 sm:flex-nowrap gap-4'>
                <div className='bg-white border rounded-lg p-4 flex flex-col gap-2 items-center justify-center shadow-md'>
                    <div className='h-14 w-14 bg-green-100 flex items-center justify-center rounded-full'>
                        <Pill color='green' />
                    </div>
                    <p className='font-semibold'>Pression Sanguine</p>
                    <span>Dernieres visites</span>
                    <table className='border rounded-lg w-full'>
                        <tbody>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bg-white border rounded-lg p-4 flex flex-col gap-2 items-center justify-center shadow-md'>
                    <div className='h-14 w-14 bg-green-100 flex items-center justify-center rounded-full'>
                        <Droplet color='green' />
                    </div>
                    <p className='font-semibold'>Niveau Sucre</p>
                    <span>Dernieres visites</span>
                    <table className='border rounded-lg w-full'>
                        <tbody>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bg-white border rounded-lg p-4 flex flex-col gap-2 items-center justify-center shadow-md'>
                    <div className='h-14 w-14 bg-green-100 flex items-center justify-center rounded-full'>
                        <Activity color='green' />
                    </div>
                    <p className='font-semibold'>Rythme Cardiaque</p>
                    <span>Dernieres visites</span>
                    <table className='border rounded-lg w-full'>
                        <tbody>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bg-white border rounded-lg p-4 flex flex-col gap-2 items-center justify-center shadow-md'>
                    <div className='h-14 w-14 bg-green-100 flex items-center justify-center rounded-full'>
                        <FlaskConical color='green' />
                    </div>
                    <p className='font-semibold'>Colestrol</p>
                    <span>Dernieres visites</span>
                    <table className='border rounded-lg w-full'>
                        <tbody>
                            <tr className='border-b '>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                            <tr>
                                <td className='ps-4'>24/04/2024</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='grid sm:grid-cols-2 sm:flex-nowrap gap-4'>
                <div className='bg-white border rounded-lg p-4 shadow-md'>
                    <h1 className='text-lg flex text-nowrap items-center gap-2'> <Newspaper className='text-primary' size={24} /> Liste des prescriptions</h1>
                    <DataTable columns={columns} data={patientfolder.data} />
                </div>
                <div className='bg-white border rounded-lg p-4 shadow-md'>
                <h1 className='text-lg flex text-nowrap items-center gap-2'> <Microscope className='text-primary' size={24} /> Liste des Resultats Tests</h1>
                    <DataTableTest columns={columnsTest} data={patientfolder.data} />
                </div>
            </div>

        </div>
    )
}

export default patientDashboadPage
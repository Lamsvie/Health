import { GET_ONEPRESCRIPTION_URL, GET_ORDONNANCE_BYPATIENT_URL, GET_PATIENTFOLDER_URL, GET_REFERENCE_URL, GET_TESTMEDICAL_BYPATIENT_URL, PATIENTFOLDER_URL } from '@/lib/endpoints'
import axios from 'axios'
import { getYear } from 'date-fns'
import { Activity, Brain, Droplet, DropletsIcon, FlaskConical, Microscope, MoveUpRightIcon, Newspaper, OrbitIcon, PersonStandingIcon, Pill, SquarePlus, User2Icon } from 'lucide-react'
import React from 'react'
import { DataTable } from './_components/data-tablePrescriptions'
import { columns } from './_components/columnsPresriptions'
import { DataTableTest } from './_components/data-tableTest'
import { columnsTest } from './_components/columnsTest'
import PrescriptionComponent from './_components/prescription'
import TestResultComponent from './_components/testResult'
import Ordonnance from './_components/ordonnance'
import { DataTableOrd } from './_components/data-tableOrdonnance'
import { columnsOrd } from './_components/columnsOrdonnance'

const patientDashboadPage = async ({params}: { params: Promise<{id: string}> }) => {

    // recuperer l'id du dossier
    const id = (await params).id
    
    // recuperer le dossier du patient
    const response = await axios.get(`${GET_PATIENTFOLDER_URL}${id}`)

    const patientFolder = response.data

    // calcul age
    const age = getYear(Date()) - getYear(patientFolder.birthday)

    // liste de prescription du patient
    const prescription = await axios.get(`${GET_ONEPRESCRIPTION_URL}${patientFolder.reference}`)

    // liste de reference medicale
    const reference = await axios.get(GET_REFERENCE_URL)

    // testmedical du patient
    const testmedical = await axios.get(`${GET_TESTMEDICAL_BYPATIENT_URL}${patientFolder.reference}`) 

    // ordonnance du patient
    const ordonnance = await axios.get(`${GET_ORDONNANCE_BYPATIENT_URL}${patientFolder.reference}`)

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
                    <div className='flex justify-between items-center '>
                        <h1 className='text-lg flex text-nowrap items-center gap-2'> <Newspaper className='text-primary' size={24} /> Liste des prescriptions</h1>
                        <PrescriptionComponent patient_ref={patientFolder.reference} medecin_ref='test' />
                    </div>
                    <DataTable columns={columns} data={prescription.data} />
                </div>
                <div className='bg-white border rounded-lg p-4 shadow-md'>
                    <div className='flex justify-between items-center '>
                        <h1 className='text-lg flex text-nowrap items-center gap-2'> <Microscope className='text-primary' size={24} /> Liste des Resultats Tests</h1>
                        <TestResultComponent reference={reference.data} prescription={prescription.data} patient_ref={patientFolder.reference} medecin_ref='test' />
                    </div>
                    <DataTableTest columns={columnsTest} data={testmedical.data} />
                </div>
            </div>
            <div className='grid sm:grid-cols-3 sm:flex-nowrap gap-4'>
                <div className='bg-white border rounded-lg p-4 shadow-md col-span-2'>
                    <div className='flex justify-between items-center '>
                        <h1 className='text-lg flex text-nowrap items-center gap-2'> <SquarePlus className='text-primary' size={24} /> Liste d'ordonnance</h1>
                        <Ordonnance patient_ref={patientFolder.reference} medecin_ref='test' prescription={prescription.data} />
                    </div>
                    <DataTableOrd columns={columnsOrd} data={ordonnance.data} />
                </div>
                <div className='bg-white border rounded-lg p-4 shadow-md'>
                    <div className='flex justify-between items-center '>
                        <h1 className='text-lg flex text-nowrap items-center gap-2'> <Brain className='text-primary' size={24} /> Conseil Santé</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default patientDashboadPage
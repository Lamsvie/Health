'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import { useReactToPrint } from 'react-to-print'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

const ViewTest = ({ testmedical }: { testmedical: any }) => {

    const printRef = useRef<HTMLDivElement>(null)

    const reactToPrintFn = useReactToPrint({ contentRef: printRef });

    const router = useRouter()

    return (
        <Dialog open={true}>
            <DialogContent className="md:max-w-4xl max-h-[600px] sm:max-h-[800px] overflow-auto p-0">
                <div ref={printRef} className='flex flex-col gap-4 p-8'>
                    <DialogHeader>
                        <div>
                            <h1 className='text-center text-4xl font-semibold text-primary p-4'>Resultat Test</h1>
                        </div>
                        <div className='grid grid-cols-2 gap-20 justify-between'>
                            <div>
                                <h1 className='text-primary font-semibold'>Information Medecin</h1>
                                <p className='border-b border-primary p-2'> {testmedical.medecin_ref.firstName} {testmedical.medecin_ref.lastName} </p>
                                <p className='border-b border-primary p-2'> {testmedical.medecin_ref.email} </p>
                                <p className='border-b border-primary p-2'> {testmedical.medecin_ref.tel} </p>
                            </div>
                            <div>
                                <h1 className='text-primary font-semibold'>Information Patient</h1>
                                <p className='border-b border-primary p-2'> {testmedical.patient_ref.firstName} {testmedical.patient_ref.lastName} </p>
                                <p className='border-b border-primary p-2'> {testmedical.patient_ref.email} </p>
                                <p className='border-b border-primary p-2'> {testmedical.patient_ref.tel} </p>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className='flex flex-col gap-4'>

                        <h1 className='text-white bg-primary text-center p-2'>Test {testmedical.testType}</h1>

                        <div className='flex flex-col gap-4'>
                            <div className='grid grid-cols-5'>
                                <h1 className='col-span-2'> Test </h1>
                                <h1> Resultat </h1>
                                <h1> Range Reference  </h1>
                                <h1> Unite </h1>
                            </div>
                            <div>
                                {
                                    testmedical.value.map((val: any) => (
                                        <div key={val._id} className='grid grid-cols-5'>
                                            <span className='col-span-2'>{val.test}</span>
                                            <span>{val.valeur}</span>
                                            <span>{val.valeurRef}</span>
                                            <span>{val.unite}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='border-2 border-primary min-h-36'>
                                <h1 className='text-center text-white bg-primary' >Observation</h1>
                                <div className='p-1'>
                                    {testmedical.observation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-8'>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" className='w-fit' onClick={() => { router.back() }}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" variant={'destructive'} className='w-fit' onClick={() => { reactToPrintFn() }}>
                        Imprimer
                    </Button>
                </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewTest
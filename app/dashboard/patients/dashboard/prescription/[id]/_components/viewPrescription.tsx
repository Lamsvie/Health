'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const ViewPrescription = ({prescription } : {prescription : any}) => {

    const router = useRouter()  
    
    const printRef = useRef<HTMLDivElement>(null)
    
    const reactToPrintFn = useReactToPrint({ contentRef : printRef })
    
  return (
    <Dialog open={true}>
        <DialogContent className="md:max-w-4xl max-h-[600px] sm:max-h-[700px] overflow-auto p-0">
            <div ref={printRef} className='flex flex-col gap-4 p-8'>
            <DialogHeader>
                <div>
                    <h1 className='text-center text-4xl font-semibold text-primary p-4'>Prescription Patient</h1>
                </div>
                <div className='grid grid-cols-2 gap-20 justify-between'>
                    <div>
                        <h1 className='text-primary font-semibold'>Information Medecin</h1>
                        <p className='border-b border-primary p-2'> {prescription.medecin_ref.firstName} {prescription.medecin_ref.lastName} </p>
                        <p className='border-b border-primary p-2'> {prescription.medecin_ref.email} </p>
                        <p className='border-b border-primary p-2'> {prescription.medecin_ref.tel} </p>
                    </div>
                    <div>
                        <h1 className='text-primary font-semibold'>Information Patient</h1>
                        <p className='border-b border-primary p-2'> {prescription.patient_ref.firstName} {prescription.patient_ref.lastName} </p>
                        <p className='border-b border-primary p-2'> {prescription.patient_ref.email} </p>
                        <p className='border-b border-primary p-2'> {prescription.patient_ref.tel} </p>
                    </div>
                </div>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
                <div className='border-2 border-primary min-h-32'>
                    <h1 className='text-white bg-primary text-center p-1'>Douleur</h1>
                    <div className='p-4 text-muted-foreground'>
                        { prescription.douleur }
                    </div>
                </div>
                <div className='border-2 border-primary min-h-32'>
                    <h1 className='text-white bg-primary text-center p-1'>Diagnostic</h1>
                    <div className='p-4 text-muted-foreground'>
                        { prescription.diagnostic }
                    </div>
                </div>
                <div className='border-2 border-primary min-h-32'>
                    <h1 className='text-white bg-primary text-center p-1'>Conseil</h1>
                    <div className='p-4 text-muted-foreground'>
                        { prescription.conseil }
                    </div>
                </div>
            </div>
            </div>
                

            <div className='p-8'>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" className='w-fit' onClick={() => {router.back()}}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button variant={'destructive'} className='w-fit' onClick={() => { reactToPrintFn() }} >
                        Imprimer
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
        </Dialog>
  )
}

export default ViewPrescription
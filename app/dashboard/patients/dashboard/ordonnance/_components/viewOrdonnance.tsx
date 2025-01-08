'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const ViewOrdonnance = ({ ordonnance }: { ordonnance: any }) => {

    const router = useRouter()

    const printRef = useRef<HTMLDivElement>(null)

    const reactToPrintFn = useReactToPrint({ contentRef: printRef })

    return (
        <Dialog open={true}>
            <DialogContent className="md:max-w-4xl max-h-[600px] sm:max-h-[800px] overflow-auto p-0">
                <div ref={printRef} className='flex flex-col gap-4 p-8'>
                    <DialogHeader>
                        <div>
                            <h1 className='text-center text-4xl font-semibold text-primary p-4'>Ordonnance</h1>
                        </div>
                        <div className='grid grid-cols-2 gap-20 justify-between'>
                            <div>
                                <h1 className='text-primary font-semibold'>Information Medecin</h1>
                                <p className='border-b border-primary p-2'> {ordonnance.medecin_ref.firstName} {ordonnance.medecin_ref.lastName} </p>
                                <p className='border-b border-primary p-2'> {ordonnance.medecin_ref.email} </p>
                                <p className='border-b border-primary p-2'> {ordonnance.medecin_ref.tel} </p>
                            </div>
                            <div>
                                <h1 className='text-primary font-semibold'>Information Patient</h1>
                                <p className='border-b border-primary p-2'> {ordonnance.patient_ref.firstName} {ordonnance.patient_ref.lastName} </p>
                                <p className='border-b border-primary p-2'> {ordonnance.patient_ref.email} </p>
                                <p className='border-b border-primary p-2'> {ordonnance.patient_ref.tel} </p>
                            </div>
                        </div>
                    </DialogHeader>
                    <div>
                        <Label>Medicaments</Label>
                        <div>
                            <Table id='divRef'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead >Nom</TableHead>
                                        <TableHead>Dosage</TableHead>
                                        <TableHead>Frequence</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        ordonnance.medicaments.map((medicament: any, index: number) => (
                                            <TableRow key={index} >
                                                <TableCell> {medicament.nom} </TableCell>
                                                <TableCell> {medicament.dosage} </TableCell>
                                                <TableCell>{medicament.frequence}</TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className='border-2 border-primary min-h-36'>
                        <h1 className='text-center text-white bg-primary' >Instructions</h1>
                        <div className='p-1'>
                            {ordonnance.instructions}
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

export default ViewOrdonnance
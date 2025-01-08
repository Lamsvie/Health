'use client'

import { addOrdonnance } from '@/app/actions/ordonnance'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

const Ordonnance = ({ prescription, patient_ref, medecin_ref }: { prescription: any, patient_ref: string, medecin_ref: string }) => {



    const [state, formAction] = useFormState(addOrdonnance, undefined)

    const data = {
        nom: '',
        dosage: ''
    }
    const [element, setElement] = useState([data])


    const addRow = (e : any) => {
        e.preventDefault()
        setElement([...element, data])
    }

    const deleteRow = (e: any, index: number) => {

        e.preventDefault()
        element.splice(index, 1)
        setElement([...element])
    }

    useEffect(() => {
        if (state?.type === 'success') {
            setOpen(!open)
            toast.success(state.message)
        }

        if (state?.type === 'error') {
            toast.error(state.message)
        }
    }, [state])

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button>
                    <Plus /> Ordonnance
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl max-h-[700px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        Ajout d'ordonnance
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} >
                    <Input name='medecin_ref' defaultValue={medecin_ref} className='sr-only' />
                    <Input name='patient_ref' defaultValue={patient_ref} className='sr-only' />
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Prescription</Label>
                            <Select name='prescription'>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Choisir la prescription" />
                                </SelectTrigger>
                                <SelectContent>

                                    {prescription.map((pres: any) => (
                                        <SelectItem key={pres._id} value={pres.prescription_ref}> {pres.prescription_ref} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Medicaments</Label>
                            <div >
                                <Table id='divRef'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead >Nom</TableHead>
                                            <TableHead>Dosage</TableHead>
                                            <TableHead>Frequence</TableHead>
                                            <TableHead >Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            element.map((el, index) => (
                                                <TableRow key={index}>
                                                    <TableCell> <Input name='nom' /> </TableCell>
                                                    <TableCell> <Input name='dosage' /> </TableCell>
                                                    <TableCell><Input name='frequence' /></TableCell>
                                                    <TableCell className='flex gap-2'>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button variant={'outline'} 
                                                                    onClick={(e) =>{addRow(e)} } className='rounded-full p-2'> <Plus color='green' size={24} /> </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>ajouter</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button variant={'outline'} onClick={(e) => { deleteRow(e,index) }} className='rounded-full p-2'> <Trash2 color='green' size={24} /> </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>supprimer</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div>
                            <Label>Instructions</Label>
                            <Textarea rows={5} name='instructions'></Textarea>
                        </div>
                        <div className='flex gap-2 self-end'>
                            <DialogFooter>
                                <Button type='submit'>Ajout ordonnance</Button>
                            </DialogFooter>
                        </div>
                    </div>
                    
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Ordonnance
'use client'

import { addPrescription } from '@/app/actions/prescription'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

const PrescriptionComponent = ({ patient_ref, medecin_ref }: { patient_ref: string, medecin_ref: string }) => {
    console.log({ medecin_ref });

    const [state, formAction] = useFormState(addPrescription, undefined)

    useEffect(() => {
        if (state?.type === 'success') {

            toast.success(state.message)
        }
        if (state?.type === 'error') {

            toast.error(state.message)
        }
    }, [state])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> <Plus /> Prescription </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Ajout Prescription</DialogTitle>
                </DialogHeader>
                <form action={formAction} className='flex flex-col gap-4'>
                    <Input name='medecin_ref' defaultValue={medecin_ref} className='sr-only' />
                    <Input name='patient_ref' defaultValue={patient_ref} className='sr-only' />
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Douleur</Label>
                            <Input name='douleur' placeholder='Motif de la visite du patient....' />
                        </div>
                        {state?.errors?.douleur && <span> {state.errors.douleur} </span>}
                        <div className='flex flex-col gap-2'>
                            <Label>Diagnostics</Label>
                            <Textarea name='diagnostic' rows={3} placeholder='Remarque....'></Textarea>
                        </div>
                        {state?.errors?.diagnostic && <span> {state.errors.diagnostic} </span>}
                        <div className='flex flex-col gap-2'>
                            <Label>Conseils</Label>
                            <Textarea name='conseil' rows={3} placeholder='Motif de la visite du patient....'></Textarea>
                        </div>
                        {state?.errors?.conseil && <span> {state.errors.conseil} </span>}
                    </div>

                    <div className='flex gap-2 self-end'>
                        <DialogFooter>
                            <Button type='submit'>Ajout Prescription</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default PrescriptionComponent
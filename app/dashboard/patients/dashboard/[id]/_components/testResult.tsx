'use client'

import { addResultTest } from '@/app/actions/testmedical'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

const TestResultComponent = ({reference, prescription, patient_ref, medecin_ref} : {reference : any, prescription : any, patient_ref: string, medecin_ref: string}) => {

    const [state, formAction] = useFormState(addResultTest, undefined)

    const categories = [...new Set(reference.map((item: any) => item.categorie))];

    const [typeTest, setTypeTest] = useState('biochimie')
    
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
                <Button> <Plus /> Resultat Test </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl max-h-[700px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Ajout Resultat Test</DialogTitle>
                </DialogHeader>
                <form action={formAction} className='flex flex-col gap-4'>
                <Input name='medecin_ref' defaultValue={medecin_ref} className='sr-only' />
                <Input name='patient_ref' defaultValue={patient_ref} className='sr-only' />
                    <div className='grid gap-4'>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label>Type de Test</Label>
                                <Select name='typetest' onValueChange={setTypeTest}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder={typeTest} defaultValue={typeTest} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        
                                        { categories.map((cat : any) => (
                                            <SelectItem key={cat} value={cat}> {cat} </SelectItem>
                                        )) }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label>Prescription</Label>
                                <Select name='prescription'>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Choisir la prescription" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        
                                        { prescription.map((pres : any) => (
                                            <SelectItem key={pres._id} value={pres.prescription_ref}> {pres.prescription_ref} </SelectItem>
                                        )) }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        

                        <div className='flex flex-col gap-4'>
                            {   
                                reference.map((ref : any) => (
                                    typeTest === ref.categorie && <div key={ref._id} className='flex gap-4 items-center'>
                                    <Input name='test'  value={ref.test} />
                                    <Input name='valeur' className='border border-primary' />
                                    <Input name='valeur_ref'  value={ref.valeur} />
                                    <Input name='unite'  value={ref.unité} />
                                </div>
                                ))
                            }
                            
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label>Resume d'Observation</Label>
                            <Textarea name='observation' rows={5} placeholder={`Resume d'observation...`}></Textarea>
                        </div>
                    </div>

                    <div className='flex gap-2 self-end'>
                        <DialogFooter>
                            <Button type='submit'>Ajout Resultat</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
    </Dialog>
  )
}

export default TestResultComponent
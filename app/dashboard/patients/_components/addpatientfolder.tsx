'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ComboboxDemo } from './cniCombox'
import { useFormState } from 'react-dom'
import { addPatientFolder } from '@/app/actions/patientfolder'
import { User } from '@/lib/types'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import clsx from 'clsx'

const Addpatientfolder = () => {

    const [state, formAction] = useFormState(addPatientFolder, undefined)

    const [typeDossier, setTypeDossier] = useState('Parent')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [adresse, setAdresse] = useState('')
    const [birthday, setBirthday] = useState('')
    const [genre, setGenre] = useState('')
    const [blood, setBlood] = useState('')
    const [refParent, setRefParent] = useState('')


    useEffect(() => {
        if (state?.type === "success") {

            toast.success(state.message)
        }

        if (state?.type === "error") {

            toast.error(state.message)
        }
    }, [state])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> <Plus /> Ajout Dossier </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Ajout Dossier Patient</DialogTitle>
                </DialogHeader>
                <form action={formAction} className='flex flex-col gap-4'>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-2 gap-8'>
                    <div className='flex flex-col gap-2'>
                            <Label>Prenom</Label>
                            <Input name='lastName' placeholder='prenom' className='w-full' value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                            {state?.errors?.lastName && <span className='text-red-500'> {state.errors.lastName} </span>}
                        </div>
                        <div className="flex gap-6 items-center">
                            <Label htmlFor="typedossier" className="text-nowrap">Type Dossier</Label>
                                <div className="flex gap-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="typedossier"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "5px",
                                                backgroundColor: typeDossier === "Parent" ? "#10b981" : "white",
                                                border: typeDossier === "Parent" ? "2px solid #10b981" : "2px solid #ccc",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            value="Parent"
                                            checked={typeDossier === "Parent"}
                                            onChange={(e) => {setTypeDossier(e.target.value)}}
                                        />
                                        <Label htmlFor="r1">Parent</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <input
                                            type="radio"
                                            name="typedossier"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "5px",
                                                backgroundColor: typeDossier === "Enfant" ? "#10b981" : "white",
                                                border: typeDossier === "Enfant" ? "2px solid #10b981" : "2px solid #ccc",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            value="Enfant"
                                            checked={typeDossier === "Enfant"}
                                            onChange={(e) => {setTypeDossier(e.target.value)}}
                                        />
                                        <Label htmlFor="r2">Enfant</Label>
                                    </div>
                                </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <Label>Nom</Label>
                            <Input name='firstName' placeholder='nom' className='w-full' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                            {state?.errors?.firstName && <span className='text-red-500'> {state.errors.firstName} </span>}
                        </div>
                        {typeDossier === "Parent" && <div className='flex flex-col gap-2'>
                            <Label>Email</Label>
                            <Input name='email' placeholder='Email' className='w-full' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                        </div>}
                        {typeDossier === "Parent" && <div className='flex flex-col gap-2'>
                            <Label>Telephone</Label>
                            <Input name='tel' placeholder='Telephone' className='w-full' value={tel} onChange={(e) => {setTel(e.target.value)}} />
                        </div>}
                        <div className='flex flex-col gap-2 w-full'>
                            <Label>Adresse</Label>
                            <Input name='adresse' placeholder='Adresse' className='w-full' value={adresse} onChange={(e) => {setAdresse(e.target.value)}} />
                            {state?.errors?.adresse && <span className='text-red-500'> {state.errors.adresse} </span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <Label>Genre</Label>
                            <Select name='genre'>
                                <SelectTrigger>
                                    <SelectValue placeholder='genre' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Homme">Homme</SelectItem>
                                    <SelectItem value="Femme">Femme</SelectItem>
                                </SelectContent>
                            </Select>
                            {state?.errors?.genre && <span className='text-red-500'> {state.errors.genre} </span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <Label>Date de naissance</Label>
                            <Input type='date' name='birthday' value={birthday} onChange={(e) => {setBirthday(e.target.value)}}/>
                            {state?.errors?.birthday && <span className='text-red-500'> {state.errors.birthday} </span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <Label>Groupe Sanguin</Label>
                            <Select name='gs'>
                                <SelectTrigger>
                                    <SelectValue placeholder="blood" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                </SelectContent>
                            </Select>
                            {state?.errors?.blood && <span className='text-red-500'> {state.errors.blood} </span>}
                        </div>

                        {typeDossier === "Enfant" && <div className='flex flex-col gap-2 w-full'>
                            <Label>Reference Parent</Label>
                            <Input name='refParent' placeholder='Reference Parent' className='w-full' value={refParent} onChange={(e) => {setRefParent(e.target.value)}} />
                            
                        </div>}
                    </div>

                    <div className='flex gap-2 self-end'>
                        <DialogFooter>
                            <Button type='submit'>Ajout Dossier</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Addpatientfolder
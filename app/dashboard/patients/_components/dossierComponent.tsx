'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { updatePatientFolder } from '@/app/actions/patientfolder'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const DossierComponent = ({ personnalFolder, userInfo } : { personnalFolder : any, userInfo: any }) => {  
    
    const router = useRouter()    
        
    const [state, formAction] = useFormState(updatePatientFolder, undefined)

    const [id, setId] = useState(personnalFolder?._id)
    const [ref, setRef] = useState(personnalFolder?.reference)
    const [firstName, setFirstName] = useState(personnalFolder?.firstName)
    const [lastName, setLaststName] = useState(personnalFolder?.lastName)
    const [email, setEmail] = useState(personnalFolder?.email)
    const [tel, setTel] = useState(personnalFolder?.tel)
    const [birthday, setBirthday] = useState(personnalFolder?.birthday)
    const [adresse, setAdreese] = useState(personnalFolder?.adresse)
    const [genre, setGenre] = useState(personnalFolder?.genre)
    const [blood, setBlood] = useState(personnalFolder?.blood)
    const [refParent, setRefParent] = useState(personnalFolder?.refParent)
    const [typedossier, setTypeDossier] = useState(personnalFolder?.typeDossier)


    useEffect(()=>{
        if (state?.type === 'success') {
            toast.success(state.message)
        }

        if (state?.type === 'error') {
            toast.error(state.message)
        }
    },[state])
    
  return (
    <div>
        <form action={formAction} className='flex flex-col gap-4'>
                <Input name='id' className='sr-only'  value={id} onChange={(e) => {setId(e.target.value)}}/>
                <Input name='ref' className='sr-only'  value={ref} onChange={(e) => {setRef(e.target.value)}}/>
                <Input name='type' className='sr-only'  value={typedossier} onChange={(e) => {setTypeDossier(e.target.value)}}/>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <div className='flex flex-col gap-2'>
                        <Label>Prenom</Label>
                        {userInfo.role === "Patient" ? <Input name='lastName' disabled placeholder='Prenom' value={lastName} onChange={(e) => {setLaststName(e.target.value)}} className='w-full' /> : <Input name='lastName' placeholder='Prenom' value={lastName} onChange={(e) => {setLaststName(e.target.value)}} className='w-full' />}
                        
                        { state?.errors?.lastName && <span className='text-red-500'> { state.errors.lastName } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Nom</Label>
                        {userInfo.role === "Patient" ? <Input name='firstName' disabled placeholder='Nom' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className='w-full' /> : <Input name='firstName' placeholder='Nom' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className='w-full' />}
                        
                        { state?.errors?.firstName && <span className='text-red-500'> { state.errors.firstName } </span> }
                    </div>
                    {typedossier === "Parent" && <div className='flex flex-col gap-2'>
                        <Label>Email</Label>
                        {userInfo.role === "Patient" ? <Input name='email' disabled placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} className='w-full' /> : <Input name='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} className='w-full' /> }
                        
                    </div>}
                    {typedossier === "Parent" && <div className='flex flex-col gap-2'>
                        <Label>Telephone</Label>
                        {userInfo.role === "Patient" ? <Input name='tel' disabled placeholder='Telephone' value={tel} onChange={(e) => {setTel(e.target.value)}} className='w-full' /> : <Input name='tel' placeholder='Telephone' value={tel} onChange={(e) => {setTel(e.target.value)}} className='w-full' />}
                        
                    </div>}
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Reference Parent</Label>
                        <Input name='refParent' placeholder='Reference Parent' value={refParent} onChange={(e) => {setRefParent(e.target.value)}} className='w-full' />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Genre</Label>
                        <Select name='genre' value={genre} onValueChange={(e) => {setGenre(e)}}>
                            <SelectTrigger>
                                <SelectValue placeholder={genre} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Homme">Homme</SelectItem>
                                <SelectItem value="Femme">Femme</SelectItem>
                            </SelectContent>
                        </Select>
                        { state?.errors?.genre && <span className='text-red-500'> { state.errors.genre } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Date de naissance</Label>
                        <Input type='date' name='birthday' value={new Date(birthday).toISOString().split('T')[0]} onChange={(e) => {setBirthday(e.target.value)}} />
                        { state?.errors?.birthday && <span className='text-red-500'> { state.errors.birthday } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Adresse</Label>
                        <Input name='adresse' value={adresse} onChange={(e) => {setAdreese(e.target.value)}} placeholder='Adresse' className='w-full' />
                        { state?.errors?.adresse && <span className='text-red-500'> { state.errors.adresse } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Groupe Sanguin</Label>
                        <Select name='gs' value={blood} onValueChange={(e) => {setBlood(e)}} >
                            <SelectTrigger>
                                <SelectValue placeholder={blood} />
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
                        { state?.errors?.blood && <span className='text-red-500'> { state.errors.blood } </span> }
                    </div>
                    <div className="flex items-center gap-6">
                            <Label htmlFor="role" className="text-nowrap">Type Dossier</Label>
                            <RadioGroup name="typedossier" value={typedossier}>
                                <div className="flex gap-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <RadioGroupItem value="Parent" id="r1" />
                                        <Label htmlFor="r1">Parent</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Enfant" id="r2" />
                                        <Label htmlFor="r2">Enfant</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                    </div>
                </div>
                
                <div className='flex gap-2 self-end'>
                    <Button type='reset' variant={'ghost'} onClick={() => {router.back()}}>Annuler</Button>
                    <Button type='submit'>Modifier Dossier</Button>
                </div>
        </form>
    </div>
  )
}

export default DossierComponent
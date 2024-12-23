'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { updateInfoPersonnel } from '@/app/actions/infopersonnel'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const DossierComponent = ({ personnalFolder, userInfo } : { personnalFolder : any, userInfo : User }) => {  
    
    const router = useRouter()    
        
    const [state, formAction] = useFormState(updateInfoPersonnel, undefined)

    const [id, setId] = useState(personnalFolder?._id)
    const [ref, setRef] = useState(personnalFolder?.ref)
    const [firstName, setFirstName] = useState(personnalFolder?.firstName)
    const [lastName, setLaststName] = useState(personnalFolder?.lastName)
    const [birthday, setBirthday] = useState(personnalFolder?.birthday)
    const [email, setEmail] = useState(personnalFolder?.email)
    const [tel, setTel] = useState(personnalFolder?.tel)
    const [role, setRole] = useState(personnalFolder?.role)
    const [adresse, setAdresse] = useState(personnalFolder?.adresse)
    const [bio, setBio] = useState(personnalFolder?.bio)
    const [genre, setGenre] = useState(personnalFolder?.genre)
    const [qualification, setQualification] = useState(personnalFolder?.qualification)    

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
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Prenom</Label>
                        { userInfo.role != "Admin" ? <Input name='lastName' placeholder='prenom' disabled value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className='w-full' /> : <Input name='lastName' placeholder='prenom' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className='w-full' />}
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Nom</Label>
                        { userInfo.role != "Admin" ? <Input name='firstName' placeholder='nom' disabled value={lastName} onChange={(e) => {setLaststName(e.target.value)}} className='w-full' /> : <Input name='firstName' placeholder='nom' value={lastName} onChange={(e) => {setLaststName(e.target.value)}} className='w-full' />}
                        
                    </div>
                    <div className="grid gap-4">
                        <Label htmlFor="username">Email</Label>
                        { userInfo.role != "Admin" ? <Input type="email" name="email" disabled value={email} onChange={(e) => {setEmail(e.target.value)}} className="col-span-3" /> : <Input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="col-span-3" />}
                        
                    </div>
                    <div className="grid gap-4">
                        <Label htmlFor="username">Numero Tel</Label>
                        { userInfo.role != "Admin" ? <Input name="tel" type="tel" disabled value={tel} onChange={(e) => {setTel(e.target.value)}} className="col-span-3" /> : <Input name="tel" type="tel" value={tel} onChange={(e) => {setTel(e.target.value)}} className="col-span-3" />}
                        { state?.errors?.tel && <span className='text-red-500'> { state.errors.tel } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Genre</Label>
                        <Select name='genre' >
                            <SelectTrigger>
                                <SelectValue placeholder={genre} onChange={(e) => {setGenre(e)}} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Homme">Homme</SelectItem>
                                <SelectItem value="Femme">Femme</SelectItem>
                            </SelectContent>
                        </Select>
                        { state?.errors?.genre && <span className='text-red-500'> { state.errors.genre } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Qualification</Label>
                        <Input name='qualification' value={qualification} onChange={(e) => {setQualification(e.target.value)}} placeholder='qualification' className='w-full' />
                        { state?.errors?.qualification && <span className='text-red-500'> { state.errors.qualification } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Date de naissance</Label>
                        <Input type='date' name='birthday' value={birthday ? new Date(birthday).toISOString().split('T')[0]: ''} onChange={(e) => {setBirthday(e.target.value)}} />
                        { state?.errors?.birthday && <span className='text-red-500'> { state.errors.birthday } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Adresse</Label>
                        <Input name='adresse' value={adresse} onChange={(e) => {setAdresse(e.target.value)}} placeholder='Adresse' className='w-full' />
                        { state?.errors?.adresse && <span className='text-red-500'> { state.errors.adresse } </span> }
                    </div>
                    <div className="flex items-center gap-6">
                            <Label htmlFor="role" className="text-nowrap">Type Dossier</Label>
                            <RadioGroup name="role" value={role} onValueChange={(e) => {setRole(e)}} >
                                <div className="flex gap-2">
                                    <div className="flex flex-row items-center space-x-2">
                                    { userInfo.role != "Admin" ? <RadioGroupItem value="Medecin" id="r1" disabled /> : <RadioGroupItem value="Medecin" id="r1" />}
                                        <Label htmlFor="r1">Medecin</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    { userInfo.role != "Admin" ? <RadioGroupItem value="Caissier" id="r2" disabled /> : <RadioGroupItem value="Caissier" id="r2" />}
                                        <Label htmlFor="r2">Caissier</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                    </div>
                </div>
                <div>
                    <Textarea name='bio' value={bio} onChange={(e) => {setBio(e.target.value)}} rows={8} placeholder="Bibliographie ici" />
                    { state?.errors?.bio && <span className='text-red-500'> { state.errors.bio } </span> }
                </div>
                <div className='flex gap-2 self-end'>
                    <Button type='reset' variant={'ghost'} onClick={() => { router.back() }}>Annuler</Button>
                    <Button type='submit'>Modifier Dossier</Button>
                </div>
        </form>
    </div>
  )
}

export default DossierComponent
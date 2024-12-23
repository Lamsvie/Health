'use client'

import { updateLoginInfo } from '@/app/actions/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

const AccountComponent = ({params} : {params : any}) => {

    const [id, setId] = useState(params?._id)
    const [email, setEmail] = useState(params?.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [state, formAction] = useFormState(updateLoginInfo, undefined)
    

  return (
    <div>
        <form action={formAction} className='flex flex-col gap-4'>
                <Input name='id' className='sr-only'  value={id} onChange={(e) => {setId(e.target.value)}}/>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Prenom</Label>
                        <Input name='email' placeholder='prenom' value={email} className='w-full' onChange={(e) => {setEmail(e.target.value)}} />
                        { state?.errors?.email && <span className='text-red-500'> { state.errors.email } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Mot de passe</Label>
                        <Input type='password' name='password' placeholder='mot de passe' value={password} onChange={(e) => {setPassword(e.target.value)}} className='w-full' />
                        { state?.errors?.password && <span className='text-red-500'> { state.errors.password } </span> }
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Label>Confirmation mot de passe</Label>
                        <Input type='password' name='confirmPassword' placeholder='confirme mot de passe' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} className='w-full' />
                        { state?.errors?.confirm && <span className='text-red-500'> { state.errors.confirm } </span> }
                        { state?.warning && <span className='text-red-500'> { state.warning } </span> }
                    </div>
                    <div className='flex gap-2 self-end'>
                        <Button type='submit'>Modifier Compte</Button>
                    </div>
                </div>   
                
        </form>
    </div>
  )
}

export default AccountComponent
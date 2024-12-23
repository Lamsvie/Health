'use client'

import { updateLoginInfo } from '@/app/actions/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

const AccountParams = ({user} : {user : any}) => {

    const router = useRouter()

    const [state, formAction] = useFormState(updateLoginInfo, undefined)

    const id = user._id
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLaststName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.email)
    const [tel, setTel] = useState(user?.tel)
    const [password, setPassword] = useState(user?.password)
    const [confirm, setConfirm] = useState('')

    useEffect(() => {

        if (state?.type === 'success') {
            toast.success(state.message)
        }

        if (state?.type === 'error') {
            toast.error(state.message)
        }
    }, [state])

  return (
    <div>
        <form action={formAction}>
            <div className='grid grid-cols-2 gap-4 border-b py-10'>
                <Input name='id' value={id} className='sr-only' />
                <div className='flex flex-col gap-2'>
                    <Label>Nom</Label>
                    <Input name='firstName' placeholder='nom' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                    {state?.errors?.firstName && <span className='text-red-500'> {state.errors.firstName} </span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Prenom</Label>
                    <Input name='lastName' placeholder='prenom' value={lastName} onChange={(e) => {setLaststName(e.target.value)}}/>
                    {state?.errors?.lastName && <span className='text-red-500'> {state.errors.lastName} </span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Email</Label>
                    <Input name='email' placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    {state?.errors?.email && <span className='text-red-500'> {state.errors.email} </span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label>Telephone</Label>
                    <Input name='tel' placeholder='telephone' value={tel} onChange={(e) => {setTel(e.target.value)}} />
                    {state?.errors?.tel && <span className='text-red-500'> {state.errors.tel} </span>}
                </div>
            </div>

            <div className='py-10 flex flex-col gap-4'>
                <div>
                    <h1 className='font-semibold'>Mot de passe</h1>
                    <p className='text-muted-foreground'>Modifier votre mot de passe</p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Mot de passe</Label>
                        <Input type='password' name='password' placeholder='Mot de passe' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        {state?.errors?.password && <span className='text-red-500'> {state.errors.password} </span>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Confirmation</Label>
                        <Input type='password' name='confirm' placeholder='Mot de passe' value={confirm} onChange={(e) => {setConfirm(e.target.value)}} />
                        {state?.warning && <span className='text-red-500'> {state.warning} </span>}
                    </div>
                </div>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button type='submit' variant={'ghost'} onClick={() => { router.back() }}>Annuler</Button>
                <Button type='submit'>Modifier Compte</Button>
            </div>
            
        </form>
    </div>
  )
}

export default AccountParams
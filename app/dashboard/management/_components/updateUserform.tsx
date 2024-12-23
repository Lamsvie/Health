'use client'

import { signup, updateLoginInfoByAdmin } from "@/app/actions/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

export function UpdateUserForm({ user } : {user: any}) {

    const router = useRouter()
    console.log(user);
    

    const [state, formAction] = useFormState(updateLoginInfoByAdmin, undefined)

    const [id, setId] = useState(user?._id)
    const [ref, setRef] = useState(user?.ref)
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.email)
    const [tel, setTel] = useState(user?.tel)
    const [role, setRole] = useState(user?.role)

    useEffect(()=> {

      if (state?.type === 'success') {
        toast.success(state.message)
        redirect('/dashboard/management')
      }

      if (state?.type === 'error') {
        toast.error(state.message)
      }

    }, [state])

  return (
    <div>
        <form action={formAction}>
            <Input name="id" value={id} onChange={(e) => {setId(e.target.value)}} className="sr-only" />
            <Input name="ref" value={ref} onChange={(e) => {setRef(e.target.value)}} className="sr-only" />
            <Input name="role" value={role} onChange={(e) => {setRole(e.target.value)}} className="sr-only" />
            <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-4">
                <Label htmlFor="name">
                Nom
                </Label>
                <Input value={firstName} onChange={(e) => {setFirstName(e.target.value)}}
                name="firstName"
                className="col-span-3"
                />
                { state?.errors?.firstName && <span className="text-red-500">{ state.errors.firstName }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Prenom
                </Label>
                <Input value={lastName} onChange={(e) => {setLastName(e.target.value)}}
                name="lastName"
                className="col-span-3"
                />
                { state?.errors?.lastName && <span className="text-red-500">{ state.errors.lastName }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Numero Tel
                </Label>
                <Input value={tel} onChange={(e) => {setTel(e.target.value)}}
                name="tel"
                type="tel"
                className="col-span-3"
                />
                { state?.errors?.tel && <span className="text-red-500">{ state.errors.tel }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Email
                </Label>
                <Input value={email} onChange={(e) => {setEmail(e.target.value)}}
                type="email"
                name="email"
                className="col-span-3"
                />
                { state?.errors?.email && <span className="text-red-500">{ state.errors.email }</span> }
            </div>
            {/* <div className="flex items-center gap-6">
                <Label htmlFor="role" className="text-nowrap">Role utilisateur</Label>
                <RadioGroup name="role" value={role} onValueChange={(e) => {setRole(e)}}>
                    <div className="flex gap-2">
                        <div className="flex flex-row items-center space-x-2">
                            <RadioGroupItem value="Admin" id="r1" />
                            <Label htmlFor="r1">Admin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Superviseur" id="r2" />
                            <Label htmlFor="r2">Superviseur</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Medecin" id="r2" />
                            <Label htmlFor="r2">Medecin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Caissier" id="r2" />
                            <Label htmlFor="r2">Caissier</Label>
                        </div>
                    </div>
                </RadioGroup>
            </div> */}
            
            </div>
            <div className="flex gap-4 justify-end">
                <Button type="reset" variant={"ghost"} onClick={() => { router.back() }} >Annuler</Button>
                <Button type="submit">Modifier</Button>
            </div>
        </form>
    </div>
  )
}

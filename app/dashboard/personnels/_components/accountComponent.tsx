'use client'

import { addInfoPersonnel } from "@/app/actions/infopersonnel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

export function AddPersonnelForm() {

    const [state, formAction] = useFormState(addInfoPersonnel, undefined)

    useEffect(()=> {

      if (state?.type === 'success') {
        toast.success(state.message)
        redirect('/dashboard/personnels/')
      }

      if (state?.type === 'error') {
        toast.error(state.message)
      }

    }, [state])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> <Plus/> Ajout Personnel </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Ajout dossier Personnel</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
            <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid gap-4">
                <Label htmlFor="name">
                Nom
                </Label>
                <Input
                name="firstName"
                className="col-span-3"
                />
                { state?.errors?.firstName && <span className="text-red-500">{ state.errors.firstName }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Prenom
                </Label>
                <Input
                name="lastName"
                className="col-span-3"
                />
                { state?.errors?.lastName && <span className="text-red-500">{ state.errors.lastName }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Email
                </Label>
                <Input
                type="email"
                name="email"
                className="col-span-3"
                />
                { state?.errors?.email && <span className="text-red-500">{ state.errors.email }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Numero Tel
                </Label>
                <Input
                name="tel"
                type="tel"
                className="col-span-3"
                />
                { state?.errors?.tel && <span className="text-red-500">{ state.errors.tel }</span> }
            </div>
            <div className="grid gap-4">
                <Label htmlFor="username">
                Date Naissance
                </Label>
                <Input
                name="birthday"
                type="date"
                className="col-span-3"
                />
                { state?.errors?.birthday && <span className="text-red-500">{ state.errors.birthday }</span> }
            </div>
            <div className="flex items-center gap-6">
                <Label htmlFor="role" className="text-nowrap">Role utilisateur</Label>
                <RadioGroup name="role" defaultValue="Medecin">
                    <div className="flex gap-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Medecin" id="r2" />
                            <Label htmlFor="r2">Medecin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Caissier" id="r3" />
                            <Label htmlFor="r3">Caissier</Label>
                        </div>
                    </div>
                </RadioGroup>
            </div>
            
            </div>
            <DialogFooter>
                <Button type="submit">Ajouter</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

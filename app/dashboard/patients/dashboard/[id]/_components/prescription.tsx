import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import React from 'react'

const PrescriptionComponent = () => {
  return (
    <Dialog>
            <DialogTrigger asChild>
                <Button> <Plus /> Prescription </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Ajout Prescription</DialogTitle>
                </DialogHeader>
                <form action='' className='flex flex-col gap-4'>
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Douleur</Label>
                            
                            <Textarea rows={3} placeholder='Motif de la visite du patient....'></Textarea>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Diagnostics</Label>
                            <Textarea rows={3} placeholder='Remarque....'></Textarea>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Conseils</Label>
                            <Textarea rows={3} placeholder='Motif de la visite du patient....'></Textarea>
                        </div>
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
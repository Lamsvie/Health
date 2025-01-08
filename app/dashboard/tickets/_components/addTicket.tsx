'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@radix-ui/react-label'
import clsx from 'clsx'
import { Check, ChevronsUpDown, Plus, PlusIcon, Trash2 } from 'lucide-react'
import React, { useState } from 'react'



const AddTicket = ({patient} : {patient : any}) => {
    const frameworks = []

    for (let i = 0; i < patient.length ; i++) {
    frameworks.push({value: patient[i].reference, label: patient[i].reference})
    }
    
    
    const [open, setOpen] = useState(false)
    const [patient_ref, setPatient_ref] = useState("")

    const [element, setElement] = useState([{ name: '', price: 0, qty: 0, total: 0 }]);
    const  [couttotal, setCouttotal] = useState(0)
    
    

    const handleInputChange = (index: number, field: string, value: any) => {
        const newElements = [...element];
        
        if (field === 'name') {
            newElements[index].name = value;
        }

        if (field === 'price') {
            newElements[index].price = value;
        }

        if (field === 'qty') {
            newElements[index].qty = value;
        }

        if (field === 'price' || field === 'qty') {
            newElements[index].total = newElements[index].price * newElements[index].qty;
        }

        setElement(newElements);
        
        for (let i = 0; i < element.length; i++) {
            setCouttotal(element.reduce((acc, item) => acc + item.total, 0))
        }
        
        
    };

    const addRow = (e: any) => {
        e.preventDefault()
        setElement([...element, { name: '', price: 0, qty: 0, total: 0 }])
    }

    const deleteRow = (e: any, index: number) => {

        e.preventDefault()
        element.splice(index, 1)
        setElement([...element])
    }

    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
    const date = new Date()
    const jour = date.getDate()
    const day = days[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><PlusIcon /> Tickets </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl max-h-[600px] sm:max-h-[800px] overflow-auto p-0">
                <div className='flex flex-col gap-4 p-8'>
                    <DialogHeader>
                        <DialogTitle>Ajout de ticket</DialogTitle>
                    </DialogHeader>
                    <form action="">
                        <div className='flex justify-between border-b py-8'>
                            <div>
                                <Label>Status Ticket</Label>
                                <Select name='statut'>
                                    <SelectTrigger className="w-[130px] text-muted-foreground">
                                        <SelectValue placeholder="ouvert" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ouvert">Ouvert</SelectItem>
                                        <SelectItem value="fermé">Fermé</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <div className='text-right'>
                                <p>Date</p>
                                <span className='text-muted-foreground'> {day}, {jour} {month}, {year} </span>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 border-b py-8'>
                            <div className='flex flex-col'>
                                <Label>Patient</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="justify-between"
                                            name='patient_Ref'
                                        >
                                            {patient_ref
                                                ? frameworks.find((framework) => framework.value === patient_ref)?.label
                                                : "Selectionnez Patient_Reference..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Search framework..." />
                                            <CommandList>
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                    {frameworks.map((framework) => (
                                                        <CommandItem
                                                            key={framework.value}
                                                            value={framework.value}
                                                            onSelect={(currentValue) => {
                                                                setPatient_ref(currentValue === patient_ref ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={clsx(
                                                                    "mr-2 h-4 w-4",
                                                                    patient_ref === framework.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {framework.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Label>Type Ticket</Label>
                                <Select name='type'>
                                    <SelectTrigger className="text-muted-foreground">
                                        <SelectValue placeholder="Urgence" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="consultation">Consultation</SelectItem>
                                        <SelectItem value="urgence">Urgence</SelectItem>
                                        <SelectItem value="preventtive">Preventtive</SelectItem>
                                        <SelectItem value="administrative">Administrative</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='py-8'>
                            <Label>Details Tickets</Label>
                            <div className='border rounded-md'>
                                <Table id='divRef'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom</TableHead>
                                            <TableHead>Prix unitaire</TableHead>
                                            <TableHead>Quantité</TableHead>
                                            <TableHead>Prix Total</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            element.map((el: any, index: number) => (
                                                <TableRow key={index} >
                                                    <TableCell className='p-4'> <Input name='nom' placeholder='nom produit' value={el.name}
                                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)} /> </TableCell>
                                                    <TableCell className='p-4 prix'> <Input name='prix' type='number' placeholder='prix unitaire' value={el.price}
                                                        onChange={(e) => handleInputChange(index, 'price', parseFloat(e.target.value))} /> </TableCell>
                                                    <TableCell className='p-4'><Input name='qty' type='number' placeholder='quantité' value={el.qty}
                                                        onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))} /></TableCell>
                                                    <TableCell className='p-4'><span> { (el.price && el.qty) ? el.total : 0} </span> </TableCell>
                                                    <TableCell className='flex gap-2 p-4'>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button variant={'outline'}
                                                                        onClick={(e) => { addRow(e) }} className='rounded-full p-2'> <Plus color='green' size={24} /> </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>ajouter</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button variant={'outline'} onClick={(e) => { deleteRow(e, index) }} className='rounded-full p-2'> <Trash2 color='green' size={24} /> </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>supprimer</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className='bg-[#d1f2eb] h-32 rounded-md p-4 flex flex-col gap-2 justify-center items-end'>
                            <h1>Cout total : <span className='ps-8'> { couttotal } </span></h1>
                        </div>
                        <div className='py-8'>
                            <DialogFooter>
                                <Button type="submit">Confirm</Button>
                            </DialogFooter>
                        </div>
                    </form>
                </div>


            </DialogContent>
        </Dialog>

    )
}

export default AddTicket
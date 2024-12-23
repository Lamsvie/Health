import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import React from 'react'

const TestResultComponent = () => {
  return (
    <Dialog>
            <DialogTrigger asChild>
                <Button> <Plus /> Resultat Test </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Ajout Resultat Test</DialogTitle>
                </DialogHeader>
                <form action='' className='flex flex-col gap-4'>
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Type de Test</Label>
                            <Select>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue defaultValue={"Test sanguins"} placeholder="Test sanguins" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Laboratoire</SelectLabel>
                                        <SelectItem value="est">Test sanguins</SelectItem>
                                        <SelectItem value="est">Test Urinaire</SelectItem>
                                        <SelectItem value="est">Test Fecaux</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Imagerie</SelectLabel>
                                        <SelectItem value="est">Radiographie (ex. : thorax, os, dents).</SelectItem>
                                        <SelectItem value="est">Échographie (abdominale, pelvienne, cardiaque)</SelectItem>
                                        <SelectItem value="est">Scanner (TDM - tomodensitométrie)</SelectItem>
                                        <SelectItem value="est">IRM (imagerie par résonance magnétique)</SelectItem>
                                        <SelectItem value="est">Mammographie (dépistage du cancer du sein)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Fonctionnel</SelectLabel>
                                        <SelectItem value="est">Électrocardiogramme (ECG)</SelectItem>
                                        <SelectItem value="est">Épreuve d’effort</SelectItem>
                                        <SelectItem value="est">Spirométrie</SelectItem>
                                        <SelectItem value="est">EEG (électroencéphalogramme)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Microbiologie</SelectLabel>
                                        <SelectItem value="est">Tests PCR (ex. : dépistage COVID-19, VIH, hépatite B/C)</SelectItem>
                                        <SelectItem value="est">Sérologie (VIH, hépatite, rubéole, syphilis)</SelectItem>
                                        <SelectItem value="est">Culture bactérienne ou fongique</SelectItem>
                                        <SelectItem value="est">Tests allergologiques (IgE, prick test)</SelectItem>
                                        <SelectItem value="est">Tests de dépistage bactérien (ex. : streptocoque, tuberculose)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Génétique</SelectLabel>
                                        <SelectItem value="est">Analyse ADN (recherche de mutations génétiques)</SelectItem>
                                        <SelectItem value="est">Tests de dépistage prénatal non invasif (trisomie 21)</SelectItem>
                                        <SelectItem value="est">Tests de prédisposition (BRCA pour le cancer du sein)</SelectItem>
                                        <SelectItem value="est">Caryotype (anomalies chromosomiques)</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Spécifique</SelectLabel>
                                        <SelectItem value="est">Test de grossesse (HCG)</SelectItem>
                                        <SelectItem value="est">Hémoglobine glyquée (HbA1c pour le suivi du diabète)</SelectItem>
                                        <SelectItem value="est">Tests de coagulation (INR, temps de prothrombine)</SelectItem>
                                        <SelectItem value="est">Tests d’intolérance alimentaire (gluten, lactose)</SelectItem>
                                        <SelectItem value="est">Test de dépistage des drogues</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Rapide</SelectLabel>
                                        <SelectItem value="est">Test antigénique COVID-19</SelectItem>
                                        <SelectItem value="est">Test rapide VIH</SelectItem>
                                        <SelectItem value="est">Glucomètre (glycémie capillaire)</SelectItem>
                                        <SelectItem value="est">Moniteur de pression artérielle</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Resume d'Observation</Label>
                            <Textarea rows={5} placeholder={`Resume d'observation...`}></Textarea>
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
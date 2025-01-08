'use server'

import { CREATE_ORDONNANCE_URL } from "@/lib/endpoints"
import axios from "axios"

// ajout aordonnance
export const addOrdonnance = async (state: any, formdata : FormData) => {
    try {
        
        const medecin_ref = formdata.get('medecin_ref')
        const patient_ref = formdata.get('patient_ref')
        const prescription_ref = formdata.get('prescription')
        const instructions = formdata.get('instructions')
        const nom = formdata.getAll('nom')
        const dosage = formdata.getAll('dosage')
        const frequence = formdata.getAll('frequence')
        const medicaments = []

        for (let i = 0; i < nom.length; i++) {
            medicaments[i] = {
                nom: nom[i],
                dosage: dosage[i],
                frequence: frequence[i]
            }
        }

        const response = await axios.post(CREATE_ORDONNANCE_URL,{
            medecin_ref, patient_ref, prescription_ref, medicaments, instructions
        })

        return {
            type: 'success', message: response.data.message
        }
        
        
    } catch (error:any) {
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }
}
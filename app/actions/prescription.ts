import { CREATE_PRESCRIPTION_URL } from "@/lib/endpoints"
import axios from "axios"
import { z } from "zod"

const prescriptionSchema = z.object({
    medecin_ref: z.string({message: "Veuillez saisir une reference"}),
    patient_ref: z.string({message: "Veuillez saisir une reference"}),
    douleur: z.string({message: "Veuillez saisir une reference"}),
    diagnostic: z.string({message: "Veuillez saisir une reference"}),
    conseil: z.string({message: "Veuillez saisir une reference"})
})

// add d'une prescription
export const addPrescription = async (state : any, formdata : FormData) => {

    try {        

        const formField = prescriptionSchema.safeParse({
            medecin_ref: formdata.get('medecin_ref'),
            patient_ref: formdata.get('patient_ref'),
            douleur: formdata.get('douleur'),
            diagnostic: formdata.get('diagnostic'),
            conseil: formdata.get('conseil')
        })

        if (!formField.success) {
            
            return { errors : formField.error.flatten().fieldErrors }
        }

        const { medecin_ref, patient_ref, douleur, diagnostic, conseil } = formField.data
    
        const response =  await axios.post(CREATE_PRESCRIPTION_URL, {
            medecin_ref, patient_ref, douleur, diagnostic, conseil
        })

        return {
            type: 'success', message: response.data.message
        }
        
    } catch (error : any) {                
        
        return {
            type: 'error', message: error.response?.data.message
        }
    }
}

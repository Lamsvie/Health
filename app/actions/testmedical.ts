'use server'

import { CREATE_TESTMEDICAL_URL } from "@/lib/endpoints"
import axios from "axios"

// ajout de resultat de test
export const addResultTest = async (state: any, formdata: FormData) => {

    try {
        
        const medecin_ref = formdata.get('medecin_ref')
        const patient_ref = formdata.get('patient_ref')
        const testType = formdata.get('typetest')
        const prescription_ref = formdata.get('prescription')
        const observation = formdata.get('observation')
        const test = formdata.getAll('test') 
        const valeur = formdata.getAll('valeur') 
        const valeurRef = formdata.getAll('valeur_ref')
        const unite = formdata.getAll('unite')         

        const value = []

        for (let i = 0; i < test.length; i++) {
            value[i] = {
                test: test[i],
                valeur: valeur[i],
                valeurRef: valeurRef[i],
                unite: unite[i]
            }
        }

        const addResultTest = await axios.post(CREATE_TESTMEDICAL_URL,{
            testType, prescription_ref, medecin_ref, patient_ref, value, observation
        })

        return {
            type: 'success', message: addResultTest.data.message
        }
        
    } catch (error : any) {
        console.log(error);
        
        return {
            type: 'error', message: error.response?.data.message
        }
    }
}
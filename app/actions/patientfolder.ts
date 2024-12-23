'use server'

import { CREATE_PATIENTFOLDER_URL, getAllUser_URL, SIGNUP_URL, UPDATE_PATIENTFOLDER_URL, UPDATEUserByRef_URL } from "@/lib/endpoints";
import { generateReference } from "@/lib/generateRef";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod"

const PatientFolderSchema = z.object({
    firstName: z.string({invalid_type_error:"Veuillez saisir le nom", }),
    lastName: z.string({invalid_type_error:"Veuillez saisir le prenom"}),
    email: z.string({invalid_type_error:"Veuillez saisir l'email"}),
    tel: z.string({invalid_type_error:"Veuillez saisir le numero de telephone"}),
    birthday: z.string({invalid_type_error: 'Veuillez saisir la date de naissance'}),
    adresse: z.string({invalid_type_error:"Veuillez saisir une chaine"}),
    blood: z.string({invalid_type_error:"Veuillez saisir le groupe sanguin"}),
    genre: z.string({invalid_type_error:"Veuillez saisir le genre"}),
    typeDossier: z.string({invalid_type_error:"Veuillez saisir type dossier"}),
})

const PatientEnfantFolderSchema = z.object({
    firstName: z.string({message:"Veuillez saisir le nom", }),
    lastName: z.string({message:"Veuillez saisir le prenom"}),
    birthday: z.string({message: 'Veuillez saisir la date de naissance'}),
    adresse: z.string({message:"Veuillez saisir une chaine"}),
    blood: z.string({message:"Veuillez saisir le groupe sanguin"}),
    genre: z.string({message:"Veuillez saisir le genre"}),
    typeDossier: z.string({message:"Veuillez saisir type dossier"}),
    refParent: z.string({message:"Veuillez saisir type dossier"})
})

// Ajout dossier patient
export const addPatientFolder = async (state: any, formdata: FormData) => {
    console.log(formdata.get('typedossier'));
    

    try {

        if (formdata.get('typedossier') === "Parent") {

            const formField = PatientFolderSchema.safeParse({
                firstName: formdata.get('firstName'),
                lastName: formdata.get('lastName'),
                email: formdata.get('email'),
                tel: formdata.get('tel'),
                birthday: formdata.get('birthday'),
                adresse: formdata.get('adresse'),
                blood: formdata.get('gs'),
                genre: formdata.get('genre'),
                typeDossier: formdata.get('typedossier'),
            })
            console.log('here');
            

            if (!formField.success) {
                return {
                    errors: formField.error.flatten().fieldErrors
                }
            }

            const { firstName, lastName, email, tel, birthday, adresse, blood, genre, typeDossier} = formField.data

            const ref = generateReference('PAT', birthday)

            const password = process.env.DEFAULT_PASSWORD

            //  CREER UN COMPTE DE CONNEXION
            const createuser = await axios.post(SIGNUP_URL,{ 
                firstName, lastName, tel, email, password , ref
            })

                // creation du dossier patient
            const createpatientfolder = await axios.post(CREATE_PATIENTFOLDER_URL, {
                ref, firstName, lastName, email, tel, birthday, adresse, blood, genre, typeDossier
            })

            revalidatePath('/dashboard/patients')
            return {
                type: 'success', message: [createuser.data.message, createpatientfolder.data.message]
            }

        }else{
            const formField = PatientEnfantFolderSchema.safeParse({
                firstName: formdata.get('firstName'),
                lastName: formdata.get('lastName'),
                birthday: formdata.get('birthday'),
                adresse: formdata.get('adresse'),
                blood: formdata.get('gs'),
                genre: formdata.get('genre'),
                typeDossier: formdata.get('typedossier'),
                refParent: formdata.get('refParent')
            })
            
            console.log('here2');
            
            if (!formField.success) {
                return {
                    errors: formField.error.flatten().fieldErrors
                }
            }
        
            const { firstName, lastName, birthday, adresse, blood, genre, typeDossier, refParent } = formField.data

            const ref = generateReference('PAT', birthday)

            // creation du dossier patient
            const createpatientfolder = await axios.post(CREATE_PATIENTFOLDER_URL, {
                ref, firstName, lastName, birthday, adresse, blood, genre, typeDossier, refParent
            })

            revalidatePath('/dashboard/patients')
            return {
                type: 'success', message: createpatientfolder.data.message
            }
        }
        
        
    } catch (error: any) {
        console.log({error});
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }
    
}

// update patient dossier
export const updatePatientFolder = async (state: any, formdata: FormData) => {    

    try {

        const id = formdata.get('id')
        const type = formdata.get('type')  
        const ref =formdata.get('ref')              
    
        if (type === 'Parent') {

            const formField = PatientFolderSchema.safeParse({
                firstName: formdata.get('firstName'),
                lastName: formdata.get('lastName'),
                email: formdata.get('email'),
                tel: formdata.get('tel'),
                birthday: formdata.get('birthday'),
                adresse: formdata.get('adresse'),
                blood: formdata.get('gs'),
                genre: formdata.get('genre'),
                typeDossier: formdata.get('typedossier'),
            })

            if (!formField.success) {            
                return {
                    errors: formField.error.flatten().fieldErrors
                }
            }
                    
            const { firstName, lastName, birthday, adresse, blood, genre, tel, email, typeDossier } = formField.data
            
            // si type dossier 'Parent' modifier les infos du patient & synchroniser avec la table User
            
            const updatepatientfolder = await axios.put(`${UPDATE_PATIENTFOLDER_URL}/${id}`, {
                firstName, lastName, birthday, adresse, blood, genre, tel, email, typeDossier
            })

            const updateUser = await axios.put(`${UPDATEUserByRef_URL}${ref}`,{
                firstName, lastName, email, tel
            })

            revalidatePath(`/dashboard/patients/${id}`)
            return {
                type: 'success', message: [updatepatientfolder.data.message, updateUser.data.message]
            }

        }else{

            const formField = PatientEnfantFolderSchema.safeParse({
                firstName: formdata.get('firstName'),
                lastName: formdata.get('lastName'),
                birthday: formdata.get('birthday'),
                adresse: formdata.get('adresse'),
                blood: formdata.get('gs'),
                genre: formdata.get('genre'),
                typeDossier: formdata.get('typedossier'),
                refParent: formdata.get('refParent'),
            })

            if (!formField.success) {            
                return {
                    errors: formField.error.flatten().fieldErrors
                }
            }            
                    
            const { firstName, lastName, birthday, adresse, blood, genre, typeDossier, refParent } = formField.data
            
            const updatepatientfolder = await axios.put(`${UPDATE_PATIENTFOLDER_URL}/${id}`, {
                firstName, lastName, birthday, adresse, genre, blood, typeDossier, refParent
            })
    
            revalidatePath(`/dashboard/patients/${id}`)
            return {
                
                type: 'success', message: updatepatientfolder.data.message
            }
        }
        
    } catch (error: any) {        
                
        return {
            type: 'error', message: error?.response?.data.message
        }
    }
    
}
'use server'

import { CREATE_PERSONNALFOLDER_URL, SIGNUP_URL, UPDATE_PERSONNALFOLDER_URL, UPDATEUserByRef_URL } from "@/lib/endpoints";
import { generateReference } from "@/lib/generateRef";
import axios from "axios";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { z } from "zod"

const infopersonnelSchema = z.object({
    firstName: z.string({message:"Veuillez saisir le nom"}),
    lastName: z.string({message: "Veuillez saisr le prenom"}),
    email: z.string({message: "Veuillez saisr l'adresse mail"}),
    tel: z.string({message: "Veuillez saisr le numero de telephone"}),
    birthday: z.string({message: "Veuillez selectionner la date de naissance!"}),
    role: z.string({message: "Veuillez selectionner le role du personnel"}),
})


const updateInfopersonnelSchema = z.object({
    firstName: z.string({message:"Veuillez saisir le nom"}),
    lastName: z.string({message: "Veuillez saisr le prenom"}),
    email: z.string({message: "Veuillez saisr l'adresse mail"}),
    tel: z.string({message: "Veuillez saisr le numero de telephone"}),
    birthday: z.string({message: "Veuillez selectionner la date de naissance!"}),
    role: z.string({message: "Veuillez selectionner le role du personnel"}),
    adresse: z.string({message: "Veuillez saisr une chaine!"}),
    qualification: z.string({message: "Veuillez saisr une chaine!"}),
    genre: z.string({message: "Veuillez saisr une chaine!"}),
    bio: z.string({message: "Veuillez saisr une chaine!"}),
})

export const addInfoPersonnel = async (state: any, formdata: FormData) => {

    
    try {

        const formField = infopersonnelSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
            email: formdata.get('email'),
            tel: formdata.get('tel'),
            birthday: formdata.get('birthday'),
            role: formdata.get('role')
        })

        if (!formField.success) {
            
            return {
                errors: formField.error.flatten().fieldErrors
            }
        }

        const { firstName, lastName, email, tel, birthday, role } = formField.data


        //  generer la reference
        const ref= generateReference('PERS', birthday)

        const password = process.env.DEFAULT_PASSWORD

        // creer un compte de connexion
        const createuser = await axios.post(SIGNUP_URL,{ 
            firstName, lastName, ref, tel, email, password, role 
        })

        // creer le dossier du personnel
        const createPersonnalFolder = await axios.post(CREATE_PERSONNALFOLDER_URL,{
            firstName, lastName, ref, tel, email, birthday, role 
        })

        return {
            type: 'success', message: [ createuser.data.message, createPersonnalFolder.data.message ]
        }
        
        
    } catch (error: any) {        
        
        return {
            type: 'error', message: error.response.data.message
        }
    }
}

export const updateInfoPersonnel = async (state: any, formdata: FormData) => {

    try {
        
        const id = formdata.get('id') 
        const ref = formdata.get('ref')                
    
        const formField = updateInfopersonnelSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
            email: formdata.get('email'),
            tel: formdata.get('tel'),
            role: formdata.get('role'),
            birthday: formdata.get('birthday'),
            adresse: formdata.get('adresse'),
            qualification: formdata.get('qualification'),
            genre: formdata.get('genre'),
            bio: formdata.get('bio'),
        })

        if (!formField.success) {
            
            return { errors: formField.error.flatten().fieldErrors } 
        }

        const { firstName, lastName, email, tel, role,  birthday, adresse, qualification, genre, bio } = formField.data

        const updateInfo = await axios.put(`${UPDATE_PERSONNALFOLDER_URL}/${id}`,{
            firstName, lastName, email, tel, role, birthday, adresse, genre, qualification, bio
        })

        // synchroniser les info de connexion dans la table User
        const updateUser = await axios.put(`${UPDATEUserByRef_URL}${ref}`,{
            firstName, lastName, email, tel, role
        })

        revalidatePath(`/dashboard/personnels/${id}`)
        
        return {
            type: 'success', message: [updateInfo.data.message, updateUser.data.message]
        }

    } catch (error: any) {
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }

}
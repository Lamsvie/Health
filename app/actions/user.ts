'use server'

import { SIGNUP_URL } from "@/lib/endpoints";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
    firstName: z.string({message: "Veuillez saisir le prenom"}),
    lastName: z.string({message: "Veuillez saisir le nom"}),
    cni: z.string({message: "Veuillez saisir le cni"}),
    tel: z.string({message: "Veuillez saisir un numero"}).max(9, {message: "Veuillez saisir un numero correct!"}),
    email: z.string({message: "Veuillez saisir l'adresse mail"}).email({message: "Veuillez saisir une adresse correct!"}),
    password: z.string({message: "Veuillez saisir le mot de passe"}).min(4, {message: "Longueur min de mot de passe 4"}),
    role: z.string()
})

// function de connexion
export const login = async (state: any, formdata: FormData) => {

    try {
        
        const formfields = formSchema.safeParse({
            email: formdata.get("email"),
            password: formdata.get("password")
        })

        if (!formfields.success) {
            
            return {
                errors: formfields.error.flatten().fieldErrors
            }
        }        

        const { email, password } = formfields.data

        const res = await axios.post( "http://localhost:8000/api/health/user/login", {
            email, password
        })

        if (res.data.token) {

            const token = res.data.token

            cookies().set('token', token, {

                httpOnly: true,
                maxAge: 60 * 60 * 24,
                path: '/',
                secure: process.env.NODE_ENV === 'production'

            })

        }

        


    } catch (error: any) {
        return {
            type: 'error', message: error?.response?.data?.message
        }
    }

    redirect('/dashboard')
}

// function d'inscription
export const signup = async (state: any, formdata: FormData) => {

    try {
        
        const formfield = formSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
            cni: formdata.get('cni'),
            tel: formdata.get('tel'),
            email: formdata.get('email'),
            password: formdata.get('password'),
            role: formdata.get('role')
        })
        
    
        if (!formfield.success) {
            
            return {
                errors: formfield.error.flatten().fieldErrors
            }
        }
        
        const { firstName, lastName, cni, tel, email, password, role } = formfield.data

        const createuser = await axios.post(SIGNUP_URL,{ 
            firstName, lastName, cni, tel, email, password, role 
        })
        
        revalidatePath('/dashboard/management')

        return {
            type: 'success', message: createuser.data.message
        }

    } catch (error : any) {
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }


}

// function deconnexion
export const logout = async (state: any, formdata: FormData) => {

    // Supprimer le token de l'utilisateur

    try {
        
        cookies().delete('token')

    } catch (error) {
        
        return { type: 'error', message: error }
    }

    redirect('/auth/login')
}
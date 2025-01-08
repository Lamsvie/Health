'use server'

import { getAllUser_URL, SIGNUP_URL, UPDATE_PATIENTFOLDERBYREF_URL, UPDATE_PERSONNALFOLDERBYREF_URL } from "@/lib/endpoints";
import { generateReference } from "@/lib/generateRef";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
    firstName: z.string({message: "Veuillez saisir le prenom"}),
    lastName: z.string({message: "Veuillez saisir le nom"}),
    tel: z.string({message: "Veuillez saisir un numero"}).max(9, {message: "Veuillez saisir un numero correct!"}),
    email: z.string({message: "Veuillez saisir l'adresse mail"}).email({message: "Veuillez saisir une adresse correct!"}),
    password: z.string({message: "Veuillez saisir le mot de passe"}).min(4, {message: "Longueur min de mot de passe 4"}),
    role: z.string()
})

const loginFormSchema = z.object({
    email: z.string({message: "Veuillez saisir l'adresse mail"}).email({message: "Veuillez saisir une adresse correct!"}),
    password: z.string({message: "Veuillez saisir le mot de passe"}).min(4, {message: "Longueur min de mot de passe 4"}),
})

const updateLoginSchema = z.object({
    firstName: z.string({message: "Veuillez saisir le prenom"}),
    lastName: z.string({message: "Veuillez saisir le nom"}),
    tel: z.string({message: "Veuillez saisir un numero"}).max(9, {message: "Veuillez saisir un numero correct!"}),
    email: z.string({message: "Veuillez saisir l'adresse mail"}).email({message: "Veuillez saisir une adresse correct!"}),
    password: z.string({message: "Veuillez saisir le mot de passe"}),
    confirm: z.string({message: "Veuillez saisir le mot de passe"}),
})

const updateLoginByAdminSchema = z.object({
    firstName: z.string({message: "Veuillez saisir le prenom"}),
    lastName: z.string({message: "Veuillez saisir le nom"}),
    tel: z.string({message: "Veuillez saisir un numero"}).max(9, {message: "Veuillez saisir un numero correct!"}),
    email: z.string({message: "Veuillez saisir l'adresse mail"}).email({message: "Veuillez saisir une adresse correct!"}),
})

// function de connexion
export const login = async (state: any, formdata: FormData) => {

    try {
        
        const formfields = loginFormSchema.safeParse({
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

    //redirect('/dashboard')
}

// function d'inscription
export const signup = async (state: any, formdata: FormData) => {

    try {
        
        const formfield = formSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
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
        
        const { firstName, lastName, tel, email, password, role } = formfield.data

        // creer la ref en se basant sur la date du jour pour l'Admin et Sup
        const date = new Date().toISOString()        

        const ref = generateReference('ADM', date)

        // creer un compte de connexion
        const createuser = await axios.post(SIGNUP_URL,{ 
            firstName, lastName, ref, tel, email, password, role 
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

// update info login par utilisateur dans son profile
export const updateLoginInfo = async (state: any, formdata: FormData) => {

    try {
        
        const id = formdata.get('id')

        const formField = updateLoginSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
            tel: formdata.get('tel'),
            email: formdata.get('email'),
            password: formdata.get('password'),
            confirm: formdata.get('confirm')
        })

        if (!formField.success) {
            
            return {
                errors: formField.error.flatten().fieldErrors
            }
        }

        const { firstName, lastName, email, tel, password, confirm } = formField.data

        if (formField.data.password !== formField.data.confirm) {
            
            return {
                warning: "Veuillez confirmer le mot de passe!"
            }
        }

        const updateUser = await axios.put(`${getAllUser_URL}${id}`,{
            firstName, lastName, email, tel, password, confirm
        })        

        if (password) {
            redirect('/auth/login')
        }

        revalidatePath(`/dashoard/account/${id}`)

        return {
            type: 'success', message: updateUser.data.message
        }
        

    } catch (error: any) {        
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }
}

// update info login par utilisateur par l'admin & synchroniser avec le dossier correspondant
export const updateLoginInfoByAdmin = async (state: any, formdata: FormData) => {

    try {
        
        const id = formdata.get('id')
        const ref = formdata.get('ref')
        const role = formdata.get('role')
        console.log(id, ref, role)
        

        const formField = updateLoginByAdminSchema.safeParse({
            firstName: formdata.get('firstName'),
            lastName: formdata.get('lastName'),
            tel: formdata.get('tel'),
            email: formdata.get('email'),
        })

        if (!formField.success) {
            
            return {
                errors: formField.error.flatten().fieldErrors
            }
        }

        const { firstName, lastName, email, tel } = formField.data

        if (role === "Admin") {
            const updateUser = await axios.put(`${getAllUser_URL}${id}`,{
                firstName, lastName, email, tel
            })  

            revalidatePath(`/dashoard/management/${id}`)

            return {
                type: 'success', message: updateUser.data.message
            }
        }else if (role === "Patient") {
            const updateUser = await axios.put(`${getAllUser_URL}${id}`,{
                firstName, lastName, email, tel
            })  

            const userPateintFolder = await axios.put(`${UPDATE_PATIENTFOLDERBYREF_URL}/${ref}`,{
                firstName, lastName, email, tel
            })

            revalidatePath(`/dashoard/management/${id}`)

            return {
                type: 'success', message: [updateUser.data.message, userPateintFolder.data.message]
            }
        }

        const updateUser = await axios.put(`${getAllUser_URL}${id}`,{
            firstName, lastName, email, tel
        })  

        const userPersonnelFolder = await axios.put(`${UPDATE_PERSONNALFOLDERBYREF_URL}/${ref}`,{
            firstName, lastName, email, tel
        })

        revalidatePath(`/dashoard/management/${id}`)

        return {
            type: 'success', message: [updateUser.data.message, userPersonnelFolder.data.message]
        }

    } catch (error: any) {        
        console.log(error);
        
        return {
            type: 'error', message: error?.response?.data.message
        }
    }
}
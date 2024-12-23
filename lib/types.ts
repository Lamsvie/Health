
export type User = {
    _id: string
    firstName: String,
    lastName: String,
    ref: string,
    email: string,
    password: string,
    tel: number
    role: string
}

export type PatientFolder = {
    _id: string,
    reference: string,
    firstName: string,
    lastName: string,
    email: string,
    tel: string,
    birthday: Date,
    adresse: string,
    blood: string,
    bloodPressure: number,
    heartRate: number,
    sugarlevel: number,
    genre: string,
    typeDossier: string,
    refParent: String
}

export type MedecinFolder = {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    tel: string,
    birthday: Date,
    adresse: string,
    qualification: string,
    genre: string,
    bio: string,
    ref: String,
    role: string
}
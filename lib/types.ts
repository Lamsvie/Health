
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

export type Prescription = {
    _id: string
    prescription_ref: string,
    medecin_ref: string,
    patient_ref: string,
    douleur: string,
    diagnostic: string,
    conseil: string,
    createdAt: Date
}

export type TestMedecial = {
    _id: string,
    test_ref: string,
    patient_ref: String,
    medecin_ref: String,
    prescription_ref: String,
    testType: String,
    value: Array<JSON>,
    observation: string
}

export type Ordonnance = {
    _id: string,
    ordonnance_Ref: string,
    patient_ref: String,
    medecin_ref: String,
    prescription_ref: String,
    medicaments: Array<JSON>,
    instructions: string
}

export type Reference = {
    _id: string,
    categorie: string,
    valeur: string,
    unité: string
}
import React from 'react'
import ViewPrescription from './_components/viewPrescription'
import axios from 'axios'
import { GET_ONEPRESCRIPTION_BYID_URL } from '@/lib/endpoints'

const prescriptionPage = async ({params} : { params: Promise<{id : string}> }) => {
  const id = (await params).id

  const response = await axios.get(`${GET_ONEPRESCRIPTION_BYID_URL}${id}`)

  const onePrescription = response.data

  return (
    <div> 
      <ViewPrescription prescription={onePrescription[0]} />
    </div>
  )
}

export default prescriptionPage
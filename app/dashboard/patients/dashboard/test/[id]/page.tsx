import { GET_TESTMEDICAL_BYID_URL, GET_TESTMEDICAL_BYPATIENT_URL } from '@/lib/endpoints'
import axios from 'axios'
import React from 'react'
import ViewTest from './_components/viewTest'

const testPage = async ({params} : { params: Promise<{id : string}> }) => {

    const id = (await params).id

    const response = await axios.get(`${GET_TESTMEDICAL_BYID_URL}${id}`)

    const testMedical = response.data

  return (
    <div>
        <ViewTest testmedical={testMedical[0]} />
    </div>
  )
}

export default testPage
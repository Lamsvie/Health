import React from 'react'
import ViewOrdonnance from '../_components/viewOrdonnance'
import axios from 'axios'
import { GET_ORDONNANCE_BYID_URL } from '@/lib/endpoints'

const ordonnancePage = async ({params} : { params: Promise<{id : string}>}) => {

    const id = (await params).id

    const ordonnance = await axios.get(`${GET_ORDONNANCE_BYID_URL}${id}`)

    console.log(ordonnance.data);
    

  return (
    <div>
        <ViewOrdonnance ordonnance={ordonnance.data}  />
    </div>
  )
}

export default ordonnancePage
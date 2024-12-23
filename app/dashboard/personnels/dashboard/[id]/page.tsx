import React from 'react'

const personnalDashboardpage = async ({params} : { params: Promise<{ id: string }> }) => {

    const id = (await params).id
  return (
    <div>personnalDashboardpage</div>
  )
}

export default personnalDashboardpage
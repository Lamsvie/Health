import { LoginForm } from '@/components/login-form'
import { verifyToken } from '@/lib/verifyToken'
import { redirect } from 'next/navigation'
import React from 'react'

const loginPage = async () => {

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}

export default loginPage
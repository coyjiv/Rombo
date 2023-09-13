
import { Inter } from 'next/font/google'
import { AuthCheck } from '@/components/AuthCheck'
import { SignInButton, SignOutButton } from '@/components/buttons'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const session = useSession()
  console.log(session)
  return (
    <AuthCheck>
      <div className='p-4'>
        <h1 className='text-3xl font-medium'>Dashboard</h1>
        <div className='mt-10'><SignOutButton/></div>
        <SignInButton/>
      </div>
    </AuthCheck>
  )
}

export default Home; 
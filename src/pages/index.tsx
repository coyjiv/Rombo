
import { Inter } from 'next/font/google'
import { AuthCheck } from '@/components/AuthCheck'
import { SignInButton, SignOutButton } from '@/components/buttons'
import { useSession } from 'next-auth/react'
import Dashboard from '@/components/views/Dashboard';

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const session = useSession()
  console.log(session)
  return (
    <AuthCheck>
      <Dashboard/>
      {/* <div className='p-4 gradient-after-reg h-screen'>
        <h1 className='text-3xl font-medium'>Dashboard</h1>
        <div className='mt-10'><SignOutButton/></div>
        <SignInButton/>
      </div> */}
    </AuthCheck>
  )
}

export default Home; 
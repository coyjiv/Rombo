import { SignInButton, SignOutButton } from '@/components/buttons';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {useRouter} from 'next/router';
type Props = {}

const LoginPage = (props: Props) => {
  const session = useSession()
  const router = useRouter()
  console.log(session);
  useEffect(()=>{
    if(session.status === 'authenticated') {
      router.push('/')
    }
  },[router, session.status])
  return (
    <div>
      <SignInButton/>
      {/* <SignOutButton/> */}
    </div>
  )
}

export default LoginPage
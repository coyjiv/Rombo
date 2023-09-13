'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const SignInButton = () => {
    const {data: session, status} = useSession();

    const renderExpression = status === 'loading' ? 
                            'Loading...' :
                            status === 'authenticated' ?
                            <Link className="flex gap-3 bg-red-300 w-fit px-2 py-3 rounded-lg" href={'/profile'}>
                            <Image className="rounded-lg" src={session?.user?.image!} alt={session?.user?.name!} width={32} height={32} />
                            {session?.user?.name!}
                            </Link>
                            :
                            <button onClick={()=>signIn()}>Sign In</button>
    return renderExpression;
}

export const SignOutButton = () => {
    return (
        <button onClick={()=>signOut()}>Sign Out</button>
    )
}
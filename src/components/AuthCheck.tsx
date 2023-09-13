'use client';

import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthCheck = ({ children }:{children: ReactNode}) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log(session, status);

    useEffect(()=>{
        if(status === 'unauthenticated' && router.pathname !== '/login') {
            router.replace('/login');
        }
    }, [status, router])

    if (status === 'loading') {
        return <p>Loading...</p>;
    } else {
        return <>{children}</>;
    }

};
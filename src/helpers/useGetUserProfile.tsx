import { fetchCurrentProfile } from "@/app/actions/user";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { IUser } from "@/mongo/models/User"
import { UserProfile } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

export const useGetUserProfile = () => {
    const profile = useAppSelector(state => state.user.profile)
    const dispatch = useAppDispatch()

    useEffect(()=>{

        dispatch(fetchCurrentProfile())
    }, [dispatch])

    return profile
}
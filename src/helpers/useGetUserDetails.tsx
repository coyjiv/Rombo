import { fetchCurrentUser } from "@/app/actions/user";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { useEffect } from "react"

export const useGetUserDetails = () => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchCurrentUser())
    }, [dispatch])

    return user
}
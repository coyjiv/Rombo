import { ChatBubbleOvalLeftEllipsisIcon, MusicalNoteIcon, UserGroupIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const useDashboardTabs = () => {
    const router = useRouter()

    const allTabs = useMemo(()=>[
        { name: 'My Profile', href: '/profile', icon: UserIcon, current: router.pathname.includes('/profile')},
        { name: 'People', href: '/people', icon: UserGroupIcon, current: router.pathname.includes('/people')},
        { name: 'Friends', href: '/friends', icon: UsersIcon, current: router.pathname.includes('/friends')},
        { name: 'Chats', href: '/chats', icon: ChatBubbleOvalLeftEllipsisIcon, current: router.pathname.includes('/chats')},
        { name: 'Music', href: '/music', icon: MusicalNoteIcon, current: router.pathname.includes('/music')},
      ], [router.pathname])

    return allTabs
}
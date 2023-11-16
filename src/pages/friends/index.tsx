import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { PagesContainer } from "@/components/layout/containers";
import { BackArrow } from "@/components/buttons";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";

const Friends = () => {
  const { data } = useSession();
  const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl: '/img/avatar.webp',
      href: '#',
      lastSeen: null,
    },
  ]
  
  return (
    <PagesContainer>
      <div className="p-4">
        <BackArrow />
      </div>
      <div className="mx-4 mt-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Friends</h1>
      <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li key={person.email} className="relative flex justify-between gap-x-6 py-5 ">
          <div className="flex min-w-0 gap-x-4">
            <Image width={80} height={80} className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="avatar" />
            <div className="min-w-0 flex-auto ">
              <p className="text-sm font-semibold leading-6 text-white">
                <a href={person.href}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-white">
                <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-white">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-white">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
    </div>
    </PagesContainer>
  );
};

export default Friends;

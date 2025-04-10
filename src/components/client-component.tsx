'use client'

import React from 'react'

import { store, useAppDispatch, useAppSelector } from '@/app/store/store';
import { useEffect } from "react";
import { fetchUser, listUsers } from "@/app/store/features/userSlice";
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
  
    useEffect(() => {
      dispatch(fetchUser())
    }, [])

    useEffect(() => {
      if (pathname.includes('dashboard')) {
        if (user) {
          switch (user.role) {
            case 'student':
              router.push('/students/dashboard');
              break;
            case 'tutor':
              router.push('/tutors/dashboard');
              break;
            case 'parent':
              router.push('/parents/dashboard');
              break;
            case 'admin':
              dispatch(listUsers())
              router.push('/admins/dashboard');
              break;
            case 'guest':
              router.push('/');
              break;
            default:
              break;
          }
        }
      }
    }, [user])
  return null
}

export default ClientComponent
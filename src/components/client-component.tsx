'use client'

import React from 'react'

import { store, useAppDispatch } from '@/app/store/store';
import { useEffect } from "react";
import { fetchUser } from "@/app/store/features/userSlice";

function ClientComponent() {
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchUser())
    }, [])
  return null
}

export default ClientComponent
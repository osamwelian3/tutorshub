import { LucideProps } from "lucide-react"
import React from "react"

export interface SideBarData {
    user?: User
    teams?: Team[]
    navMain?: NavMain[]
    projects?: Project[]
  }
  
  export interface User {
    name?: string
    email?: string
    avatar?: string
  }
  
  export interface Team {
    name?: string
    logo?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    plan?: string
  }
  
  export interface NavMain {
    title?: string
    url?: string
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    isActive?: boolean
    items?: Item[]
  }
  
  export interface Item {
    title?: string
    url?: string
  }
  
  export interface Project {
    name?: string
    url?: string
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  }
  
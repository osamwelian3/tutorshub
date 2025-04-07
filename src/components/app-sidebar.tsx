"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useAppSelector } from "@/app/store/store"
import { SideBarData } from "./interface"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(state => state.user.user)
  const router = useRouter()

  useEffect(() => {
    // setTimeout(() => {
    //   if (!user) {
    //     router.push('/login')
    //   }
    // }, 5000);
  }, [user])
  // This is sample data.
  const data = {
    user: {
      name: user ? user.first_name+" "+user.last_name : "",
      email: user ? user.email : "",
      avatar: user?.avator ? user.avator : '',
    },
    teams: [
      {
        name: "TutorsHub Enterprise",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "TutorsHub Startup",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "TutorsHub Free",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton 
              tooltip={'true'} 
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                {/* {item.icon && <item.icon />} */}
                <Avatar>
                  <AvatarFallback>TH</AvatarFallback>
                </Avatar>
                <Link href="/" className="flex items-center gap-2" prefetch={true}>
                  {/* <MountainIcon className="h-6 w-6" /> */}
                  <span className="text-lg font-semibold">Tutors<b>Hub</b></span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton 
              tooltip={'true'} 
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                {/* {item.icon && <item.icon />} */}
                <Avatar>
                  <AvatarImage width={20} height={20} src={user?.avator ? user.avator : ''} alt="@shadcn" />
                  <AvatarFallback>{user?.first_name.charAt(0).toUpperCase() || 'TH'}</AvatarFallback>
                </Avatar>
                <Link href="#" className="flex items-center m-0 p-0">
                  <p className="p-3"><b>{user?.first_name+' '+user?.last_name}</b></p>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

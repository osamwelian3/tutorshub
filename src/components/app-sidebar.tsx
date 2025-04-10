"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Currency,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Ticket,
  TrendingUpIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
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
import { capitalize } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"

// This is sample data.
const data1 = {
  user: {},
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

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data?: typeof data1
}

export function AppSidebar({ data = data1, ...props }: AppSidebarProps) {
  const user = useAppSelector(state => state.user.user)
  const router = useRouter()

  data.user = {
    name: user ? user.first_name + " " + user.last_name : "",
    email: user ? user.email : "",
    avatar: user?.avator ? user.avator : '',
  }

  useEffect(() => {

  }, [user])

  if (!user) {
    return (
      <Skeleton />
    )
  }

  if (user.role === 'student') {
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
                  <Image src={'/mytusyen.png'} width={100} height={80} alt="logo" />
                  <span className="text-lg font-semibold"> Student</span>
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
                  <p className="p-3"><b>{user?.first_name + ' ' + user?.last_name}</b></p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavProjects title="Main Menu" projects={[{ name: 'Overview', url: '/students/dashboard', icon: LayoutDashboard }]} />
          <NavMain title={`${capitalize(user ? user.role : '')} Menu`} items={[
            {
              title: "My Courses",
              url: '#',
              icon: BookOpen,
              isActive: false,
              items: [
                {
                  title: "Biology",
                  url: "#"
                },
                {
                  title: "Python Programming",
                  url: "#"
                }
              ]
            },
            {
              title: "My Grades",
              url: '#',
              icon: TrendingUpIcon,
              isActive: false,
              items: [
                {
                  title: "Grades",
                  url: "/students/dashboard/grades"
                },
              ]
            }
          ]} />
          {/* <NavProjects title='Projects' projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user as { name: string, email: string, avatar: string }} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }

  if (user.role === 'admin') {
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
                <Link href="/admins/dashboard" className="flex items-center gap-2" prefetch={true}>
                  {/* <MountainIcon className="h-6 w-6" /> */}
                  <Image src={'/mytusyen.png'} width={100} height={80} alt="logo" />
                  <span className="text-lg font-semibold"> Admin</span>
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
                  <p className="p-3"><b>{user?.first_name + ' ' + user?.last_name}</b></p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavProjects title="Main Menu" projects={[{ name: 'Overview', url: '#', icon: LayoutDashboard }]} />
          <NavMain title={`${capitalize(user ? user.role : '')} Menu`} items={[
            {
              title: "Subscriptions",
              url: '#',
              icon: DollarSign,
              isActive: false,
              items: [
                {
                  title: "Active",
                  url: "#"
                },
                {
                  title: "Pending",
                  url: "#"
                }
              ]
            },
            {
              title: "Support Tickets",
              url: '#',
              icon: Ticket,
              isActive: false,
              items: [
                {
                  title: "Open",
                  url: '#'
                },
                {
                  title: "Closed",
                  url: '#'
                },
              ]
            },
          ]} />
          {/* <NavProjects title='Projects' projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user as { name: string, email: string, avatar: string }} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
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
                <p className="p-3"><b>{user?.first_name + ' ' + user?.last_name}</b></p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects title="Main Menu" projects={[{ name: 'Overview', url: '#', icon: LayoutDashboard }]} />
        <NavMain title={`${capitalize(user ? user.role : '')} Menu`} items={data.navMain} />
        {/* <NavProjects title='Projects' projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user as { name: string, email: string, avatar: string }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

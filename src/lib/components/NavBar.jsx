/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CowzfwdSDEY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavMenu } from "./NavMenu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { NavMenuMobile } from "./NavMenuMobile"
import { useAppDispatch, useAppSelector } from "@/app/store/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LayoutDashboard, LogOut, Sparkles } from "lucide-react"
import { logout } from "@/app/store/features/userSlice"
import Image from "next/image"

export default function NavBar() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 sticky top-0 z-[9999]">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        {/* <MountainIcon className="h-6 w-6" /> */}
        {/* <h1 className="text-lg font-semibold">Tutors<b>Hub</b></h1> */}
        <Image src={'/tutorshub.jpeg'} width={100} height={40} />
      </Link>
      <div className="hidden lg:flex gap-4">
        <NavMenu />
      </div>
      {user ? 
      <span className=" hidden md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user ? user.avator : ''} alt="@shadcn" />
              <AvatarFallback>{user ? user.first_name.charAt(0).toUpperCase() : 'TH'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avator} alt={user.last_name} />
                  <AvatarFallback className="rounded-lg">{user ? user.first_name.charAt(0).toUpperCase() : 'TH'}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.last_name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard'} prefetch={true}>
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={''} onClick={() => dispatch(logout())} >
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </span>
      : <Link href={'/login'} prefetch={false}>
          <Button className="hidden md:flex gap-4">Log In</Button>
        </Link>}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="justify-between">
          <div className="grid w-[200px] p-4">
            <div className="my-5">
              <Link href="#" className="flex items-center gap-2" prefetch={false}>
                {/* <MountainIcon className="h-6 w-6" /> */}
                <span className="text-lg font-semibold">Tutors<b>Hub</b></span>
              </Link>
              <Link href="#" className="flex items-center">
                <Avatar>
                  <AvatarImage src={user ? user.avator : ''} alt="@shadcn" />
                  <AvatarFallback>{user ? user.first_name.charAt(0).toUpperCase() : 'TH'}</AvatarFallback>
                </Avatar>
                <p className="p-3"><em>{user ? user.first_name+' '+user.last_name : 'Guest'}</em></p>
              </Link>
            </div>
            <NavMenuMobile />
          </div>
          <div className="grid w-[200px] p-4 bottom-0">
            {user ? null : <Link href="/login" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              <Button className="flex md:hidden gap-4">Log In</Button>
            </Link>}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

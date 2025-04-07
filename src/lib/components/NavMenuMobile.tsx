"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tutors",
    href: "/docs/primitives/alert-dialog",
    description:
      "Find a tutor of your preference and start your learning journey today.",
  },
  {
    title: "Subjects",
    href: "/docs/primitives/hover-card",
    description:
      "Choose from a wide range of subjects.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Monitor the learners progress with our realtime evaluation tools. You are able to see the student grades",
  },
  {
    title: "Learning Materials",
    href: "/docs/primitives/scroll-area",
    description: "Gain access to all our learning materials for your learning needs",
  },
  {
    title: "Payment",
    href: "/docs/primitives/tabs",
    description:
      "Our payment plans are flexible to meet the needs of every learner, parent or guardian",
  },
  {
    title: "FAQ",
    href: "/docs/primitives/tooltip",
    description:
      "A quick read through our Frequently Asked Questions will get you on your way with most challenges.",
  },
]

export function NavMenuMobile() {
  return (
    <div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ScrollArea className="h-100">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="h-full w-full relative">
                            <Image src={'/10161832.jpg'} fill alt="e-learning" className="h-6 w-6" />
                        </div>
                        <div className="mb-2 mt-4 text-lg font-medium">
                          TutorsHub
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          The best personal tution in Malaysia.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Efficient and quality E-Learning with ease of use.
                  </ListItem>
                  <ListItem href="/docs/installation" title="What we Offer">
                    We have a wide range of tutioning services for various levels...
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="New User Guide">
                    Let us take you through the steps to get started on TutorsHub and earn your first badge.
                  </ListItem>
                </ul>

              </ScrollArea>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ScrollArea className="h-100 w-50">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </ScrollArea>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Join our Tutoring team
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-4 text-sm leading-snug text-muted-foreground w-40">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

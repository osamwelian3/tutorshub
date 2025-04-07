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

export function NavMenu() {
  return (
    <NavigationMenu className="z-[9999]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-[9999]">
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
                      TutorsHub Home
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      The best personal tution in Malaysia.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Courses">
                Take a look at our wide range of interesting courses.
              </ListItem>
              <ListItem href="/docs/installation" title="Tutor Login">
                Join our team of tutors and start earning today.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Student Login">
                Join our team of students and start learning today.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Testimonials">
                Hear from our students and tutors about their experience with us.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] z-[9999]">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Join our Tutoring team
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

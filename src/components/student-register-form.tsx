'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AlertCircle, AlertCircleIcon, Calendar1Icon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import Link from "next/link"
import libphonenumber from "google-libphonenumber";
import { User } from "../../database/interface"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
 
const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middle_name: z.union([z.string().min(2), z.string().length(0)])
    .optional()
    .transform(e => e === "" ? undefined : e),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phone_number: z
    .string()
    .nonempty({ message: "Mobile number is required" })
    .refine(
      (number) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid mobile number" }
    ),
  home_address: z.string().min(2, {
    message: "Home address must be at least 2 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  avator: z
    .instanceof(globalThis.FileList, { message: 'Upload image' })
    .refine(
      (file) =>{
        // console.log("file: ", file)
        return [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file[0].type)},
      { message: "Invalid image file type" }
    )
    .refine((file) => file[0].size <= fileSizeLimit, {
      message: "File size should not exceed 5MB",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirm_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"], // path of error
});

export function StudentRegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [submiting, setSubmitting] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      home_address: "",
      dob: undefined,
      avator: undefined,
      password: "",
      confirm_password: ""
    },
  })

  const fileRef = form.register('avator');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const data = {...values, avator: undefined, role: 'student'}
    delete data.avator
    // console.log(data)
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(async (userRes) => {
      console.log('response: ', userRes)
      if (userRes.error) {
        toast(userRes.error, {
          icon: <AlertCircleIcon />,
          style: {color: 'red'}
        })
      } else if (userRes.success) {
        toast("Registration successfull. A moment while we set your profile picture.")
        const formdata = new FormData();
        formdata.append("file", values.avator[0], 'user_'+userRes.user.id+values.avator[0].name.substring(values.avator[0].name.lastIndexOf('.')));
        await fetch(`/api/uploads?id=${userRes.user.id}`, {
          method: 'POST',
          body: formdata
        }).then((res) => res.json())
        .then(async (res) => {
          if (res.success) {
            await fetch(`/api/users/${userRes.user.id}`, {
              method: 'POST',
              body: JSON.stringify({
                avator: res.url
              })
            }).then((res) => {
              toast('Account created successfully. Login to continue.', {
                style: {color: 'green'},
                duration: 3000
              })
              router.push('/login');
            }).catch((err) => {
              toast('Account created successfully, we were unable to update the profile picture. You can try setting it again in the profile settings. Login to continue.', {
                style: {color: 'greenyellow'},
                duration: 3000
              })
              router.push('/login');
            })
          }
        })
        .catch(() => {

        })
      }
    }).catch((err) => {
      console.log('err: ', err)
    })
    setSubmitting(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6 mb-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-muted-foreground text-balance">
                    Register for a Tutors<b>Hub</b> account
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your first name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your middle name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your last name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="me@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number +60...." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="home_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Home Address" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your home address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const currentDate = new Date() // new Date(currentDate.setFullYear(currentDate.getFullYear()-3)) 
                              return date > currentDate || date < new Date("1900-01-01")
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      </FormControl>
                      <FormDescription>
                        This is your date of birth.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="avator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Photo</FormLabel>
                      <FormControl>
                        <Input placeholder="Pick a profile picture" type="file" {...fileRef} />
                      </FormControl>
                      <FormDescription>
                        This will be used as your profile picture.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} type="password" />
                      </FormControl>
                      <FormDescription>
                        This is a unique password used to login to your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm Password" {...field} type="password" />
                      </FormControl>
                      <FormDescription>
                        Repeat your password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <Button type="submit" className="w-full mb-6">Create Account</Button> */}
              { submiting ? <Button disabled type="submit" className="w-full mb-6">Please Wait...</Button> : <Button type="submit" className="w-full mb-6">Create Account</Button> }
              <div className="grid gap-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Register with Apple</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Register with Google</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Register with Meta</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block p-2">
            <Image
              src="/Wavy_Edu-06_Single-07.jpg"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-stretch dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

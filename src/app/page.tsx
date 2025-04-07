'use client'

import Image from "next/image";
import NavBar from "@/lib/components/NavBar"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Footer7 } from "@/lib/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";

import data from '@/app/data.json'
import { Gallery } from "@/components/gallery";

export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <HeroSection />
      {/* <hr/> */}
      {/* <Counters /> */}
      <div className="mx-5 md:mx-20 my-5">
        {
          data.map((datum, i) => (
            <span key={i}>
              <h5 className="mt-1 block text-lg leading-tight font-medium text-black p-2 text-[25px] md:text-[35px]">{datum.label}</h5>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {
                  datum.options.map((poster, idx) => (
                    <div key={idx} className="aspect-9/16 w-40 md:w-50 my-3 p-0" style={{color: 'grey'}}>
                      <Card className="p-2 bg-grey">
                        <CardContent className="p-0 m-0">
                          <div className="w-full relative p-0 m-0">
                            <Checkbox className="absolute top-2 right-2 z-1" />
                            <AspectRatio ratio={9 / 14}>
                              <Image src={`/posters/poster${(i+1)+idx}.jpeg`} fill alt="Image" className="rounded-md object-stretch" />
                            </AspectRatio>
                            <div className="w-full grid justify-center text-center mt-0">
                              <CardTitle>{poster.name}</CardTitle>
                              <CardDescription>{poster.caption}</CardDescription>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                }
              </div>
            </span>
          ))
        }
      </div>
      {/* <!-- Elfsight Form Builder | Fill Form --> */}
      {/* <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div className="elfsight-app-0202d674-bbae-4185-8a1d-7aba5bc45bf6" data-elfsight-app-lazy></div> */}
      {/* <hr /> */}
      {/* <WhyChooseUs /> */}
      {/* <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div className="elfsight-app-a381468d-9678-4590-ad07-eba76431abd5" data-elfsight-app-lazy></div> */}
      <Gallery />
      <MusicClasses />
      <br/>
      <SportsClasses />
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div className="elfsight-app-5a25855f-ae83-401e-a452-3de472c596bd" data-elfsight-app-lazy></div>
      {/* <StepsGuide /> */}
      <Footer7 />
    </div>
  );
}

const SportsClasses = () => {
  return (
    <div className="mx-5 md:mx-20 my-5">
      <h2 className="mt-1 block text-lg leading-tight font-medium text-black p-2 text-[35px] text-center">Sports Package</h2>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap:4 md:gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <p className="text-center text-black text-[25px] md:text-[35px]">{`Unleash your potential and elevate your game --whether you're training online or in person, our expert coaches are here to help you master your sport, build confidence, and achieve greatness, one session at a time`}</p>
          <Button className="right-1/2 left-1/2 my-5">Find a Coach</Button>
        </div>
        <div className="w-full md:w-1/2 aspect-9/9 relative">
          <Image src={'/sports.jpg'} fill alt="Image" className="" />
        </div>
      </div>
    </div>
  )
}

const MusicClasses = () => {
  return (
    <div className="mx-5 md:mx-20 mb-10">
      <h2 className="mt-1 block text-lg leading-tight font-medium text-black p-2 text-[35px] text-center">We Offer Music Classes</h2>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 md:gap-8">
        <div className="w-full md:w-1/2 aspect-9/9 relative">
          <Image src={'/music.jpg'} fill alt="Image" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <p className="text-center text-black text-[25px] md:text-[30px]">{'Unlock your inner musician and let your creativity shine. Join our music classes today with the freedom to learn online or in person from passionate, experienced tutors who make every lesson inspiring and fun. '}</p>
          <Button className="right-1/2 left-1/2 my-5">Get started now</Button>
        </div>
      </div>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className="gap-4 my-0 lg:my-5 items-center justify-around text-center lg:text-justify flex flex-col lg:flex-row flex-col-reverse">
      {/**grid grid-cols-1 lg:grid-cols-2 */}
      <div className="p-5 lg:px-20 lg:p-40 lg:w-1/2 grid">
        <h2 className="mt-1 block text-lg leading-tight font-medium text-black p-2 text-[35px]">Find the Perfect Tutor for Personalized Learning!</h2>
        <p className="p-2 text-[18px]">Expert tutors available 24/7 to help you succeed. Get 1-on-1 lessons tailored to your needs. We are a leading service provider in tutoring services. Our mission is to make sure the learner gets high-quality education that will make them relevant in a fast moving job market.</p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center md:justify-around">
          <div className="flex w-70 max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Find a tutor" />
            <Button type="submit">Find a tutor</Button>
          </div>
          <Link href={'#'} >
            <Button title="Sign Up">Get Started</Button>
          </Link>
        </div>
      </div>
      <div className="m-5 lg:m-0 justify-center relative lg:w-1/2 h-full grid" style={{zIndex: -90}}>
        <Image src={'/10161832.jpg'} width={500} height={500} alt="e-learning" />
      </div>
    </div>
  )
}

const Counters = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mx-5 lg:mx-20 my-2">
      <div className="lg:col-start-2 lg:col-span-2">
        <Card className="">
          <CardHeader className="relative">
            <CardDescription>Tutors</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              1,250
            </CardTitle>
            <div className="absolute right-4 top-0">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <Progress value={12.5} className="w-full" />
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="">
          <CardHeader className="relative">
            <CardDescription>Subjects</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              179
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <Progress value={90} className="w-full" />
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="">
          <CardHeader className="relative">
            <CardDescription>Succesful Classes</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              5,966
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <Progress value={97} className="w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const WhyChooseUs = () => {
  return (
    <div className="my-5 mx-5 lg:mx-20">
      <h3 className="text-center text-black text-lg text-[35px] my-4">Why Choose TutorsHub</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <AspectRatio ratio={9 / 9}>
                  <Image src="/3394893.jpg" fill alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="w-full grid justify-center text-center mt-3">
                <CardTitle>Qualified Tutors</CardTitle>
                <CardDescription>Our tutors go through a rigorous vetting process and we select the best qualified tutors to handle learners in a professional way.</CardDescription>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <AspectRatio ratio={9 / 9}>
                  <Image src="/11079951.jpg" fill alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="w-full grid justify-center text-center mt-3">
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>Learn at your own pace, anytime, anywhere.</CardDescription>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <AspectRatio ratio={9 / 9}>
                  <Image src="/4136942.jpg" fill alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="w-full grid justify-center text-center mt-3">
                <CardTitle>Affordable Pricing</CardTitle>
                <CardDescription>We offer high-quality tutoring at prices that fit your budget..</CardDescription>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <AspectRatio ratio={9 / 9}>
                  <Image src="/10314649.jpg" fill alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="w-full grid justify-center text-center mt-3">
                <CardTitle>1-on-1 Online Lessons</CardTitle>
                <CardDescription>Personalized sessions to fit your learning style.</CardDescription>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <AspectRatio ratio={9 / 9}>
                  <Image src="/6485985.jpg" fill alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="w-full grid justify-center text-center mt-3">
                <CardTitle>Safe & Secure</CardTitle>
                <CardDescription>Verified tutors and a secure learning environment.</CardDescription>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

const StepsGuide = () => {
  return (
    <div className="my-10 mx-5 lg:mx-20">
      <h3 className="text-center text-black text-lg text-[35px] my-4">Get Started in Three Steps</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="grid items-center">
          <AspectRatio ratio={9 / 9}>
            <Image src="/4905879.jpg" fill alt="Image" className="rounded-md object-cover" />
          </AspectRatio>
          <div className="mt-3 text-center w-full">
            <h4 className="text-black text-[18px]">Browse expert tutors based on subject, price, and reviews.</h4>
          </div>
        </div>
        <div className="grid items-center">
          <AspectRatio ratio={9 / 9}>
            <Image src="/3886130.jpg" fill alt="Image" className="rounded-md object-cover" />
          </AspectRatio>
          <div className="mt-3 text-center w-full">
            <h4 className="text-black text-[18px]">Schedule a session at a time that works for you.</h4>
          </div>
        </div>
        <div className="grid items-center">
          <AspectRatio ratio={9 / 9}>
            <Image src="/6951808.jpg" fill alt="Image" className="rounded-md object-cover" />
          </AspectRatio>
          <div className="mt-3 text-center w-full">
            <h4 className="text-black text-[18px]">Join the lesson, ask questions, and improve your skills.</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

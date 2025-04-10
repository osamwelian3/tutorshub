import { FacebookIcon, Instagram, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const sections = [
  {
    title: "Address",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
      { name: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "About us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}
const Footer7 = ({
  logo = {
    url: "/",
    src: "/mytusyen.png",
    alt: "logo",
    title: "Tutorshub",
  },
}: Footer7Props) => {
  return (
    <section className="pt-25 flex justify-center items-center">
      <div className="container">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              {/* Logo */}
              {/* <script src="https://static.elfsight.com/platform/platform.js" async></script>
              <div className="elfsight-app-330acc7c-4fe9-4489-b1fa-04b53cc1d4fa relative" data-elfsight-app-lazy></div> */}
              <script src="https://static.elfsight.com/platform/platform.js" async></script>
              <div className="elfsight-app-bd69742e-dc10-4fca-9c72-75c8c949869f" data-elfsight-app-lazy></div>
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    width={100}
                    height={80}
                  />
                </Link>
                {/* <h2 className="text-xl font-semibold">{logo.title}</h2> */}
              </div>
              <p className="text-sm text-muted-foreground">
                Find the Perfect Tutor for Personalized Learning!
              </p>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="https://www.instagram.com/mohdfaiq16?igsh=b3ExNmdwcm5zOGZx" target='_blank'>
                    <InstagramIcon className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://www.facebook.com/share/1BNjXK5cz7/" target="_blank">
                    <FacebookIcon className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <TwitterIcon className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <LinkedinIcon className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  {section.title === 'Address' ? 
                  <div>
                    <p>You can reach us at: </p>
                    <p>316, Main Avenue</p>
                    <p>CA, My City</p>
                    <p>Zip: 40400</p>
                    <br/>
                    <p>Email: <a href="mailto:admin@tutorshub.com">admin@tutorshub.com</a></p>
                    <p>Phone: <a href="tel:+60162400714">+60162400714</a></p>
                  </div> :
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>© 2024 Shadcnblocks.com. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer7 };

import Logo from "@/assets/Logo";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router";
import { ThemeToggle } from "../ThemeToggle";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact-us", label: "Contact" },
  { href: "/faq", label: "Faq" },
];

export default function Navbar() {
  const { data } = useGetMeQuery(undefined);

  const role = data?.data?.role || data?.data?.userId?.role;
  const email = data?.data?.email ?? data?.data?.userId?.email;
  const normalizeRole = role?.toLowerCase();

  const isLoggedIn = Boolean(email);
  const dashboardRoutes: Record<string, string> = {
    admin: "/admin/dashboard",
    driver: "/driver/dashboard",
    rider: "/rider/dashboard",
  };
  const dashboardPath = dashboardRoutes[normalizeRole ?? ""] || "/register";

  return (
    <header className="bg-sidebar shadow-sm sticky top-0 z-20 px-4 md:px-6">
      <div className=" max-w-7xl mx-auto flex h-20 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="text-background origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="text-background origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="text-background origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="#" className="text-primary">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link to={link.href} className="py-1.5">
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button asChild size="sm" className="text-sm">
                  <Link to={dashboardPath}>Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" className="text-sm">
                  <Link to="/login">Sign in</Link>
                </Button>

                <Button asChild size="sm" className="text-sm">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

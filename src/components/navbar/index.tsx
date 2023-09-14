"use client";
import React from "react";
import ColorModeSwitchButton from "./ColorModeSwitchButton";
import UserDropdown from "../UserDropdown";
import {
  Link,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  cn,
} from "@nextui-org/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "../icons";

const Index = () => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navbarItems = [
    {
      href: "/test",
      displayName: "cvml",
    },
    {
      href: "/testeee",
      displayName: "asdasd",
    },
    {
      href: "/testaaa",
      displayName: "peiuawe",
    },
  ];
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <>
      <Navbar shouldHideOnScroll className="justify-end">
        <NavbarContent className="sm:flex gap-4 cursor-pointer ml-[-200px]">
          <NavbarMenuToggle className="sm:hidden" />
          <NavbarBrand>
            <NavbarItem onClick={() => router.push("/")}>Home</NavbarItem>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 mr-10">
          {navbarItems.map((item, index) => {
            return (
              <NavbarItem
                className="cursor-pointer "
                key={index}
                isActive={pathname === item.href}
                onClick={() => router.push(item.href)}
              >
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href ? "text-red-200" : "text-white"
                  }`}
                >
                  {item.displayName}
                </Link>
              </NavbarItem>
            );
          })}
          <NavbarItem>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex">
                      <div className="flex">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-400/50 to-zinc-400 p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="flex justify-center">
                                <Icons.google className="h-6 w-6" />
                              </div>
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight ">
                                Beautifully designed
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </div>
                      <div className="flex flex-col bg-zinc-900">
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, etc
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </NavbarItem>
        </NavbarContent>

        <NavbarItem className="ml-10">
          {status === "authenticated" ? (
            <UserDropdown />
          ) : (
            <Button as={Link} variant="faded" href="/login">
              Login
            </Button>
          )}
        </NavbarItem>

        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>

        <NavbarMenu>
          {navbarItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link className={cn("text-white")} href={item.href}>
                {item.displayName}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:opacity-50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
  );
});
ListItem.displayName = "ListItem";

export default Index;

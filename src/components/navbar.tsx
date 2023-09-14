"use client";
import React from "react";
import ColorModeSwitchButton from "./ColorModeSwitchButton";
import UserDropdown from "./UserDropdown";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  cn,
} from "@nextui-org/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Icons } from "./icons/index";
import { link as linkStyles } from "@nextui-org/theme";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import NextLink from "next/link";
import clsx from "clsx";

import {
  TwitterIcon,
  GithubIcon,
  InstaIcon,
  HeartFilledIcon,
  SearchIcon
} from "@/components/icons/icons";
import { Logo } from "@/components/icons/icons";
import { useSession } from "next-auth/react";

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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:opacity-80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-400 ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Navbar = () => {
  const { status } = useSession();
  const navItems = [
    {
      label: "History",
      href: "/",
    },
    // {
    //   label: "Join Meet",
    //   href: "/",
    // },
  ];

  const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Enter meet link..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

  return (
    <NextUINavbar maxWidth="xl" shouldHideOnScroll isBordered className="mb-2">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">APP NAME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-normal"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="data-[active=true]:text-primary data-[active=true]:font-normal">
                <HeartFilledIcon className="text-danger mr-1" />
                Sponsor
              </NavigationMenuTrigger>
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
                          <div className="mb-2 mt-4 text-lg font-bold">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight ">
                            Innovating learning
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </div>
                  <div className="flex flex-col bg-zinc-900 w-80">
                    <ListItem href="/" title="Premium">
                      Access to many features
                    </ListItem>
                    <ListItem href="/" title="Gold">
                      Complete acess
                    </ListItem>
                    <ListItem href="/" title="diamond">
                      Ultra special WOW!
                    </ListItem>
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavbarItem className="hidden sm:flex gap-2 ">
          <Link isExternal href={""} aria-label="Twitter">
            <TwitterIcon className="text-default-500 hover:text-blue-400" />
          </Link>
          <Link isExternal href={""} aria-label="Discord">
            <InstaIcon className="text-default-500 hover:text-pink-400" />
          </Link>
          <ColorModeSwitchButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link>{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      <NavbarItem className="ml-10">
        {status === "authenticated" ? (
          <UserDropdown />
        ) : (
          <Button as={Link} variant="faded" href="/login">
            Login
          </Button>
        )}
      </NavbarItem>
    </NextUINavbar>
  );
};

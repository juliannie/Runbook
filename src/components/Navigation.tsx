"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme/theme-mode-toggle";
import { UserMenu } from "./UserMenu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import RunbookLogo from "../../public/Runbook.png";
import Image from "next/image";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="flex items-center container mx-auto px-4 pt-4 justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src={RunbookLogo}
            alt="Futuristic notebook"
            width={60}
            height={60}
            className="sm:w-20 sm:h-20"
            priority
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} min-h-[44px]`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/todo" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} min-h-[44px]`}
                >
                  My Todos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/tasks" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} min-h-[44px]`}
                >
                  My Tasks
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-2">
        <ModeToggle />
        <UserMenu />
      </div>
    </nav>
  );
}

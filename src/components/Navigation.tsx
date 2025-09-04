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

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className="flex items-center container mx-auto px-4 pt-4 justify-between">
      <div className="flex items-center space-x-3">
        <Link href={"/"} aria-label="Runbook Home">
          {/* Theme-aware text logo:
             - Light: bg-slate-900 / text-white
             - Dark:  bg-white / text-slate-900
          */}
          <span
            className="
              inline-flex h-10 w-10 items-center justify-center rounded-xl
              bg-slate-900 text-white
              dark:bg-white dark:text-slate-900
              font-bold text-lg select-none
              ring-1 ring-transparent hover:ring-slate-300 dark:hover:ring-slate-600
              transition-colors duration-200
            "
          >
            RB
          </span>
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

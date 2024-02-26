"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme/theme-mode-toggle";
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
    <nav className="flex items-center container pt-4 justify-between">
      <div className="flex">
        <Link href={"/"}>
          <Image
            src={RunbookLogo}
            alt="Futuristic notebook"
            width={80}
            height={80}
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                ></NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/todo" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Todos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/tasks" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Tasks
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <ModeToggle />
    </nav>
  );
}

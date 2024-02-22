"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="container pb-8 pt-4 text-2xl w-11/12">
      <ul className="flex justify-between gap-12">
        <li>
          <Link
            className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground ${
              path === "/" ? "" : "opacity-100"
            }`}
            href={"/"}
          >
            Runbook
          </Link>
        </li>
        <div className="flex gap-5">
          <li>
            <Link
              className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground ${
                path === "/todo" ? "" : "opacity-60"
              }`}
              href={"/todo"}
            >
              ToDo
            </Link>
          </li>
          <li>
            <Link
              className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground ${
                path === "/tasks" ? "" : "opacity-60"
              }`}
              href={"/tasks"}
            >
              Tasks
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

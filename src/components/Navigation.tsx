import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="pb-8 text-2xl w-11/12">
      <ul className="flex justify-between gap-12">
        <li>
          <Link href={"/"}>Runbook</Link>
        </li>
        <div className="flex gap-5">
          <li>
            <Link href={"/todo"}>ToDo</Link>
          </li>
          <li>
            <Link href={"/tasks"}>Tasks</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

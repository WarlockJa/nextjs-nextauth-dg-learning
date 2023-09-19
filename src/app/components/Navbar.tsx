import Link from "next/link";
// import NavbarSignOutButton from "./NavbarSignOutButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="bg-blue-800 p-4">
      <ul className="flex justify-evenly text-2xl font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        {session?.user ? (
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
            {/* <NavbarSignOutButton /> */}
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
        )}
        <li>
          <Link href="/server">Server</Link>
        </li>
        <li>
          <Link href="/client">Client</Link>
        </li>
        <li>
          <Link href="/extra">Extra</Link>
        </li>
      </ul>
    </nav>
  );
}

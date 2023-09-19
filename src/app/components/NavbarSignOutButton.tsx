"use client";
import { signOut } from "next-auth/react";

export default function NavbarSignOutButton() {
  return (
    // we can specify route to redirect on signOut
    // <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    // default callbackUrl is the current url
    <button onClick={() => signOut()}>Sign Out</button>
  );
}

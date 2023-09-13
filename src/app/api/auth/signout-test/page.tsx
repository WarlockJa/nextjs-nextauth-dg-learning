"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignoutPage() {
  return (
    <div>
      <h1 className="text-5xl" onClick={() => signOut()}>
        Bye!
      </h1>
    </div>
  );
}

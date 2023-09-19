"use client";
// NOTE you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import UserCard from "../components/UserCard";
import Link from "next/link";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // https://next-auth.js.org/getting-started/client
  // session is null if no auth data found
  if (session === null)
    return (
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl">Not Authenticated</h1>
        <p>Client Page</p>
        <Link
          className="text-3xl"
          href={"/api/auth/signin?callbackUrl=/client"}
        >
          Sign In
        </Link>
      </div>
    );

  // loading. auth data session is undefined during loading
  if (session === undefined) return <h1 className="text-3xl">Loading...</h1>;

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session.user} pagetype={"Client"} />
    </section>
  );
}

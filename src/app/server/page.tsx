import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ServerPage() {
  const session = await getServerSession(options);

  if (!session)
    return (
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl">Not Authenticated</h1>
        <p>Server Page</p>
        <Link
          className="text-3xl"
          href={"/api/auth/signin?callbackUrl=/server"}
        >
          Sign In
        </Link>
      </div>
    );

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Server"} />
    </section>
  );
}

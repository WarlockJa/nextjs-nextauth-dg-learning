// "use client";

import { User } from "next-auth";
// import { useSession } from "next-auth/react";
import Image from "next/image";

export default function NavbarUserButton({ user }: { user: User | undefined }) {
  //   const { data: session } = useSession({
  //     required: false,
  //   });

  // https://next-auth.js.org/getting-started/client
  // session is null if no auth data found
  //   if (session === null)
  // return (
  //   <div>
  //     <p className="opacity-50">No User</p>
  //   </div>
  // );

  // loading. auth data session is undefined during loading
  //   if (session === undefined) return <h1 className="text-3xl">Loading...</h1>;

  //   const userData = session.user;

  if (!user)
    return (
      <div>
        <p className="opacity-50">No User</p>
      </div>
    );

  // TODO add source of OAuth
  return (
    <div className="flex gap-2">
      {user.image ? (
        <Image src={user.image} width={30} height={15} alt="user avatar" />
      ) : null}
      <p>{user.name}</p>
    </div>
  );
}

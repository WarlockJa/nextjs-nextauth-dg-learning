import { User } from "next-auth";
import Image from "next/image";

type Props = {
  user: User;
  pagetype: string;
};

export default function UserCard({ user, pagetype }: Props) {
  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  const emailDisplay = user?.email ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      {user?.email}
    </div>
  ) : null;

  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      src={user?.image}
      width={200}
      height={200}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  const userRole = user?.role?.length ? (
    <div className="flex justify-center gap-2">
      <h2 className="text-2xl">Your roles are: [</h2>
      {user.role.map((role) => (
        <p key={role} className="text-2xl">
          {role}
        </p>
      ))}
      <h2 className="text-2xl">]</h2>
    </div>
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      {emailDisplay}
      {userImage}
      {userRole}
      <p className="text-2xl text-center">{pagetype} Page!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}

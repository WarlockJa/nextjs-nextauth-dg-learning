import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  // hashed password for the seeded user
  const password = await hash("test", 12);
  // using upsert so user is only created if does not exist
  const user = await prisma.credentialsUser.upsert({
    where: { email: "test@test.com" },
    // no update action necessary
    update: {},
    // creating user if does not exist
    create: {
      email: "test@test.com",
      name: "Test User",
      password,
      roles: ["admin"],
    },
  });
  console.log({ user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

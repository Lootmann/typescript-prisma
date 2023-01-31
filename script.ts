import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = (msg: string) => {
  console.log(`\n>>> ${msg}`);
};

const createUser = async () => {
  title("createUser");
  const user = await prisma.user.create({ data: { name: "Alice" } });
  console.log(user);
};

async function readMany() {
  title("readMany");
  const users = await prisma.user.findMany();
  console.log(users);
}

const createUserWithPost = async () => {
  title("createUserWithPost");
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      posts: {
        create: { title: "Hello World" },
      },
    },
  });
  console.log(user);
};

const readUsersWithPosts = async () => {
  title("readUsersWithPosts");
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(usersWithPosts, { depth: null });
};

async function main() {
  await createUser();
  await readMany();
  await createUserWithPost();
  await readUsersWithPosts();
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

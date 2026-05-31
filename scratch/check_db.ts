import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Checking database...");
  try {
    const admins = await prisma.admin.findMany();
    console.log("Admins count:", admins.length);
    admins.forEach((admin) => {
      console.log(`- ID: ${admin.id}, Email: ${admin.email}, Name: ${admin.name}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

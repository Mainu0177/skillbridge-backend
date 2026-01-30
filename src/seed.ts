
import { Role, UserStatus } from "../generated/prisma/enums";
import { prisma } from "../src/lib/prisma";



async function main() {
    const adminEmail = "admin@skillbridge.com";

    const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                name: "Admin",
                email: adminEmail,
                role: Role.ADMIN,
                status: UserStatus.ACTIVE,
            }
        });
        console.log("Admin user seeded")
    } else {
        console.log("Admin already exists!")
    }

    const categories = [
    "Mathematics",
    "English",
    "Programming",
    "Physics",
    "Chemistry",
    "Biology",
    ];

    for (const name of categories) {
        await prisma.category.upsert({
        where: { name },
        update: {},
            create: {
                id: crypto.randomUUID(),
                name,
            },
        });
    }
    console.log("Categories seeded");
}

main().catch((err:any) => {
        console.error("Seed failed", err);
    process.exit(1);
}).finally(async () => {
        await prisma.$disconnect();
});

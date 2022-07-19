const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.user
    .delete({ where: { email: "example@example.com" } })
    .catch(() => {});
  await prisma.competition
    .delete({ where: { slug: "test-competition" } })
    .catch(() => {});
  await prisma.competitionOrganizer.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "example@example.com",
      firstName: "John",
      lastName: "Doe",
      password: {
        create: {
          hash: "$2a$10$SZqrcvtT.OxdCyT9q5fWgufZ4k46y5Blucimdhcjsv7l.5M2OeaGG",
        },
      },
    },
  });

  const competition = await prisma.competition.create({
    data: {
      slug: "test-competition",
      title: "Test Competition",
      description: "This is a test competition",
      acceptedPosterType: "IMAGE_AR",
      submissionPrivacy: "PUBLIC",
      viewingPrivacy: "PUBLIC",
      teamSubmission: "ENABLED",
      submissionPolicy: "NONE",
      votingPrivacy: "PUBLIC",
      maxTeamSize: 3,
      submissionStart: new Date("2022-07-18T00:00:00.000Z"),
      submissionEnd: new Date("2022-08-18T00:00:00.000Z"),
      votingStart: new Date("2022-08-18T00:00:00.000Z"),
      votingEnd: new Date("2022-08-25T00:00:00.000Z"),
      rankAnnouncementDate: new Date("2022-08-25T00:00:00.000Z"),
    },
  });

  const organizers = await prisma.competitionOrganizer.create({
    data: {
      competitionId: competition.id,
      organizerId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

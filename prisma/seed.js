const {
  randEmail,
  randFullName,
  randUuid,
  randNumber,
} = require("@ngneat/falso");
const { PrismaClient } = require("@prisma/client");
const {
  createUser,
  createTeam,
  createTeamMember,
} = require("@prisma/client/sql");

const prisma = new PrismaClient();

const engTeamId = randUuid();
const designTeamId = randUuid();
const dataTeamId = randUuid();
const execTeamId = randUuid();
const rdTeamId = randUuid();

const generateUsers = (n) => {
  const users = [];
  for (let i = 0; i < n; i++) {
    users.push({
      id: randUuid(),
      email: randEmail(),
      name: randFullName(),
    });
  }
  return users;
};

const generateMembersFromUsersAndTeams = (users, teams) => {
  const members = [];
  users.forEach((user) => {
    const team = teams[randNumber({ min: 0, max: teams.length - 1 })];
    members.push({
      id: randUuid(),
      userId: user.id,
      teamId: team.id,
      role: team.department === "Management" ? "EM" : "SENIOR_ENGINEER",
    });
  });
  return members;
};

const generateExecTeams = () => {
  return [
    {
      id: randUuid(),
      name: "Finance",
      department: "Management",
      parentId: execTeamId,
    },
    {
      id: randUuid(),
      name: "Legal",
      department: "Management",
      parentId: execTeamId,
    },
    {
      id: randUuid(),
      name: "HR",
      department: "Management",
      parentId: execTeamId,
    },
  ];
};

const generateEngineeringTeams = () => {
  return [
    {
      id: randUuid(),
      name: "Frontend",
      department: "Technology",
      parentId: engTeamId,
    },
    {
      id: randUuid(),
      name: "Backend",
      department: "Technology",
      parentId: engTeamId,
    },
    {
      id: randUuid(),
      name: "DevOps",
      department: "Technology",
      parentId: engTeamId,
    },
  ];
};

const generateDesignTeams = () => {
  return [
    {
      id: randUuid(),
      name: "UI",
      department: "Technology",
      parentId: designTeamId,
    },
    {
      id: randUuid(),
      name: "UX",
      department: "Technology",
      parentId: designTeamId,
    },
  ];
};

const generateRDTeams = () => {
  return [
    {
      id: engTeamId,
      name: "Engineering",
      department: "Technology",
      parentId: rdTeamId,
    },
    {
      id: designTeamId,
      name: "Design",
      department: "Technology",
      parentId: rdTeamId,
    },
    {
      id: randUuid(),
      name: "Product",
      department: "Technology",
      parentId: rdTeamId,
    },
  ];
};

const generateFirstLevelTeams = () => {
  return [
    {
      id: execTeamId,
      name: "Executive",
      department: "Management",
      parentId: null,
    },
    {
      id: rdTeamId,
      name: "Research & Development",
      department: "Technology",
      parentId: null,
    },
    {
      id: dataTeamId,
      name: "Data",
      department: "Technology",
      parentId: null,
    },
  ];
};

const generateSecondLevelTeams = () => {
  return [...generateExecTeams(), ...generateRDTeams()];
};

const generateThirdLevelTeams = () => {
  return [...generateEngineeringTeams(), ...generateDesignTeams()];
};

async function main() {
  const firstLevelTeams = generateFirstLevelTeams();
  const secondLevelTeams = generateSecondLevelTeams();
  const thirdLevelTeams = generateThirdLevelTeams();

  await Promise.all(
    firstLevelTeams.map((team) =>
      prisma.$queryRawTyped(
        createTeam(team.id, team.name, team.department, team.parentId || "")
      )
    )
  );

  await Promise.all(
    secondLevelTeams.map((team) =>
      prisma.$queryRawTyped(
        createTeam(team.id, team.name, team.department, team.parentId)
      )
    )
  );

  await Promise.all(
    thirdLevelTeams.map((team) =>
      prisma.$queryRawTyped(
        createTeam(team.id, team.name, team.department, team.parentId)
      )
    )
  );

  const users = generateUsers(50);

  await Promise.all(
    users.map((user) =>
      prisma.$queryRawTyped(createUser(user.id, user.email, user.name))
    )
  );

  const members = generateMembersFromUsersAndTeams(users, [
    ...firstLevelTeams,
    ...secondLevelTeams,
    ...thirdLevelTeams,
  ]);

  await Promise.all(
    members.map((member) =>
      prisma.$queryRawTyped(
        createTeamMember(member.id, member.userId, member.teamId, member.role)
      )
    )
  );
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

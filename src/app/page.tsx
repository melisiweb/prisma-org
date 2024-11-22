import { TeamHierarchy } from "@/components";
import prisma from "@/db";
import { buildTeamHierarchy } from "@/utils";
import { getTeams } from "@prisma/client/sql";

export default async function Home() {
  const teams = await prisma.$queryRawTyped(getTeams());
  const hierarchyTeams = buildTeamHierarchy(teams);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 sm:px-6 lg:px-8">
        <TeamHierarchy teams={hierarchyTeams} />
      </div>
    </div>
  );
}

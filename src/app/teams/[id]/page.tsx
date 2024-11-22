import {
  TeamMemberRoleForm,
  TeamMemberStatusForm,
  TeamParentForm,
} from "@/components";
import prisma from "@/db";
import { TeamMemberFromQuery } from "@/types/teams";
import { mapTeamMembers } from "@/utils";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { getTeam } from "@prisma/client/sql";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const teams = await prisma.$queryRawTyped(getTeam(id));
  const currentTeam = teams.find((team) => team.level === 0);

  if (!currentTeam) {
    return <div>Team not found</div>;
  }

  const parentTeam = teams.find((team) => team.id === currentTeam.parent_id);
  const path = (
    <div>
      {teams.map((team, index) => (
        <span key={team.id}>
          {index > 0 && " > "}
          <Link href={`/teams/${team.id}`} className="text-blue-500">
            {team.name}
          </Link>
        </span>
      ))}
    </div>
  );
  const members = mapTeamMembers(
    currentTeam.members as unknown as TeamMemberFromQuery[]
  );

  return (
    <div className="min-h-screen px-8 bg-gray-50">
      <div className="pt-6 text-gray-500">{path}</div>
      <h1 className="pb-6 text-2xl font-semibold">Team {currentTeam.name}</h1>

      {currentTeam.description && (
        <div className="py-6">
          <p>{currentTeam.description}</p>
        </div>
      )}

      <div className="py-6">
        <h2 className="font-semibold">Members</h2>
        <ul>
          {members &&
            members.map((member) => (
              <li key={member.id} className="flex max-w-2xl mt-4">
                <div className="flex flex-col gap-1">
                  <div>{member.name}</div>
                  <div className="flex items-center gap-2">
                    <TeamMemberRoleForm
                      defaultValue={member.role}
                      memberId={member.id}
                    />
                    <TeamMemberStatusForm
                      isActive={member.active}
                      memberId={member.id}
                    />
                    {member.active ? (
                      <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="py-6">
        <h2 className="font-semibold mb-4">Change parent team</h2>
        <TeamParentForm
          teamId={currentTeam.id || ""}
          defaultValue={parentTeam?.id || ""}
        />
      </div>
    </div>
  );
};

export default Page;

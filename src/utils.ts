import { getTeams, createTeamMember } from "@prisma/client/sql";
import { Team, TeamMember, TeamMemberFromQuery } from "./types/teams";
import { TeamMemberRole } from "@prisma/client";

export const buildTeamHierarchy = (teams: getTeams.Result[]): Team[] => {
  function buildChildren(
    parentId: string | null = null,
    parentPath: string[] = []
  ): Team[] {
    return teams
      .filter((team) => team.parent_id === parentId)
      .map((team) => {
        const currentPath = [...parentPath, team.name];
        const members = team.members as unknown as TeamMemberFromQuery[];

        return {
          ...team,
          path: currentPath,
          members: members?.length ? mapTeamMembers(members) : [],
          childTeams: buildChildren(team.id, currentPath),
        };
      });
  }

  return buildChildren(null, []);
};

export const mapTeamMembers = (
  members: TeamMemberFromQuery[]
): TeamMember[] => {
  return members.map((member) => ({
    id: member.id,
    name: member.user.name,
    role: member.role,
    active: member.active,
  }));
};

export const rolesList: TeamMemberRole[] = [
  "DESIGNER",
  "EM",
  "JUNIOR_ENGINEER",
  "SENIOR_ENGINEER",
  "STAFF_ENGINEER",
  "PRINCIPLE_ENGINEER",
];

export const mapRoleToLabel = (role: TeamMemberRole): string => {
  switch (role) {
    case "DESIGNER":
      return "Designer";
    case "EM":
      return "Engineering Manager";
    case "JUNIOR_ENGINEER":
      return "Junior Engineer";
    case "SENIOR_ENGINEER":
      return "Senior Engineer";
    case "STAFF_ENGINEER":
      return "Staff Engineer";
    case "PRINCIPLE_ENGINEER":
      return "Principle Engineer";
    default:
      return "";
  }
};

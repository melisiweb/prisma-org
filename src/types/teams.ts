import { TeamMemberRole } from "@prisma/client";

export type MemberRole = "ADMIN" | "MEMBER" | "LEADER";

export interface TeamMemberFromQuery {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: TeamMemberRole;
  active: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: TeamMemberRole;
  active: boolean;
}

export interface Team {
  id: string;
  name: string;
  department: string;
  members: TeamMember[];
  path: string[];
  childTeams: Team[];
}

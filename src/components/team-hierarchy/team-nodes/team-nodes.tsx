import { Team } from "@/types/teams";
import { TeamNode } from "../team-node/team-node";

export const TeamNodes = ({
  teams,
  level,
  expandedTeams,
  toggleTeam,
}: {
  teams: Team[];
  level: number;
  expandedTeams: Set<string>;
  toggleTeam: (teamId: string) => void;
}) => {
  return (
    <div
      className="flex flex-col gap-2"
      style={{ marginLeft: `${16 * level}px` }}
    >
      {teams.map((team) => {
        const hasChildren = team.childTeams.length > 0;
        const isExpanded = expandedTeams.has(team.id);

        return (
          <div key={team.id} className="relative mt-2">
            <TeamNode
              team={team}
              showButton={hasChildren}
              isExpanded={isExpanded}
              toggleTeam={toggleTeam}
            />
            {hasChildren && isExpanded && (
              <TeamNodes
                teams={team.childTeams}
                level={level + 1}
                expandedTeams={expandedTeams}
                toggleTeam={toggleTeam}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

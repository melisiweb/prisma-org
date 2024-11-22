import { Team } from "@/types/teams";
import { mapRoleToLabel } from "@/utils";
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

export const TeamNode = ({
  team,
  showButton,
  isExpanded,
  toggleTeam,
}: {
  team: Team;
  isExpanded: boolean;
  showButton: boolean;
  toggleTeam: (id: string) => void;
}) => {
  return (
    <div
      key={team.id}
      className="relative mt-2 p-4 ring-1 ring-blue-100 shadow-md rounded-md"
    >
      {team.path && (
        <div className="text-xs text-gray-500 uppercase mb-1">
          {team.path.join(" | ")}
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleTeam(team.id)}
          className={`w-6 h-6 flex items-center justify-center ${
            showButton ? "hover:bg-gray-100 rounded" : "invisible"
          }`}
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>
        <h3>
          <Link
            href={`/teams/${team.id}`}
            className="text-blue-500 underline underline-offset-2"
          >
            {team.name}
          </Link>
        </h3>
        <div className="text-sm text-gray-500">
          ({team.members.length}) Members
        </div>
      </div>
      <div className="ml-10">
        {Boolean(team.members.length) &&
          team.members.map((member) => (
            <div key={member.id} className="flex items-center gap-2">
              <div>{member.name}</div>
              <div className="text-sm text-gray-500 flex gap-2">
                {mapRoleToLabel(member.role)}
                <div>
                  {member.active ? (
                    <CheckBadgeIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

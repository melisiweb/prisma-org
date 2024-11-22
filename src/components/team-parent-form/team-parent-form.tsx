"use client";

import { getTeams } from "@prisma/client/sql";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const TeamParentForm = ({
  teamId,
  defaultValue,
}: {
  teamId: string;
  defaultValue: string;
}) => {
  const [selectedTeam, setSelectedTeam] = useState(defaultValue);
  const { data: teams, isFetching } = useQuery({
    queryKey: ["getTeams"],
    queryFn: async () => {
      const response = await axios<getTeams.Result[]>("/api/teams");

      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (parentId: string) => {
      await axios.put(`/api/teams/${teamId}/parent`, { parentId });
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!teams) {
    return null;
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(ev) => {
        ev.preventDefault();
        mutate(selectedTeam);
      }}
    >
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="bg-white px-2 py-1 ring-1 ring-blue-100 border-r-8 border-transparent"
      >
        <option value="">No parent</option>
        {teams.map((team) => (
          <option
            key={team.id}
            value={team.id || ""}
            disabled={team.id === teamId}
          >
            {team.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200 rounded-md py-1 px-2 text-sm disabled:opacity-50"
        disabled={selectedTeam === defaultValue}
      >
        Save
      </button>
    </form>
  );
};

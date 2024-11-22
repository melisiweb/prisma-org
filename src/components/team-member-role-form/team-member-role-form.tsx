"use client";

import { mapRoleToLabel, rolesList } from "@/utils";
import { TeamMemberRole } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const TeamMemberRoleForm = ({
  memberId,
  defaultValue,
}: {
  memberId: string;
  defaultValue: TeamMemberRole;
}) => {
  const [selectedRole, setSelectedRole] =
    useState<TeamMemberRole>(defaultValue);

  const { mutate } = useMutation({
    mutationFn: (role: string) => {
      return axios.put(`/api/members/${memberId}/role`, { role });
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  return (
    <form
      className="flex gap-2"
      onSubmit={(ev) => {
        ev.preventDefault();
        mutate(selectedRole);
      }}
    >
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as TeamMemberRole)}
        className="bg-white text-xs px-2 py-1 ring-1 ring-blue-100 border-r-8 border-transparent"
      >
        {rolesList.map((role) => (
          <option key={role} value={role} disabled={role === defaultValue}>
            {mapRoleToLabel(role)}
          </option>
        ))}
      </select>
      <button
        disabled={selectedRole === defaultValue}
        type="submit"
        className="bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200 rounded-md py-1 px-2 text-sm disabled:opacity-50"
      >
        Save
      </button>
    </form>
  );
};

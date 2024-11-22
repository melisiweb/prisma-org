"use client";

import React, { useState } from "react";
import { Team } from "@/types/teams";
import { TeamNodes } from "./team-nodes/team-nodes";

export const TeamHierarchy = ({ teams }: { teams: Team[] }) => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set([]));

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Team Structure</h1>
      <div className="flex gap-6">
        <TeamNodes
          teams={teams}
          level={0}
          expandedTeams={expandedTeams}
          toggleTeam={toggleTeam}
        />
      </div>
    </div>
  );
};

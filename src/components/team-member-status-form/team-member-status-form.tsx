"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const TeamMemberStatusForm = ({
  memberId,
  isActive,
}: {
  memberId: string;
  isActive: boolean;
}) => {
  const { mutate } = useMutation({
    mutationFn: (isActive: boolean) => {
      return axios.put(`/api/members/${memberId}/status`, {
        isActive,
      });
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
        mutate(!isActive);
      }}
    >
      <button
        type="submit"
        className="bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200 rounded-md py-1 px-2 text-sm"
      >
        Toggle status
      </button>
    </form>
  );
};

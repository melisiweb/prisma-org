import prisma from "@/db";
import { updateTeamMemberStatus } from "@prisma/client/sql";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await request.json();
  const id = (await params).id;
  const { isActive } = res;

  const response = await prisma.$queryRawTyped(
    updateTeamMemberStatus(id, isActive)
  );

  return Response.json(response);
}

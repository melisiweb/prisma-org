import prisma from "@/db";
import { updateTeamMemberRole } from "@prisma/client/sql";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await request.json();
  const id = (await params).id;
  const { role } = res;

  const response = await prisma.$queryRawTyped(updateTeamMemberRole(id, role));

  return Response.json(response);
}

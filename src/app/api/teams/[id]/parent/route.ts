import prisma from "@/db";
import { updateTeamParentId } from "@prisma/client/sql";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await request.json();
  const id = (await params).id;
  const { parentId } = res;

  const response = await prisma.$queryRawTyped(
    updateTeamParentId(id, parentId || null)
  );

  return Response.json(response);
}

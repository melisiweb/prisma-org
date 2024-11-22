import prisma from "@/db";
import { getTeams } from "@prisma/client/sql";

export async function GET() {
  const res = await prisma.$queryRawTyped(getTeams());

  return Response.json(res);
}

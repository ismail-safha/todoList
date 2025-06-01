import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/tasks
// Fetch all tasks from the database, ordered by newest first
export async function GET() {
  const task = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(task);
}

// POST /api/tasks
// Add a new task to the database
export async function POST(req: NextRequest) {
  const body = await req.json();
  const task = await prisma.task.create({
    data: {
      title: body.title,
    },
  });
  return NextResponse.json(task);
}

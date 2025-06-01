import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

// Type definition for route parameters
type Params = {
  params: {
    id: string;
  };
};

// DELETE /api/tasks/[id]
// Deletes a task based on the given ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = await prisma.task.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(todo);
}

// PATCH /api/tasks/[id]
// Updates the 'done' status of a task
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { done } = await req.json(); // Get updated value

  const todo = await prisma.task.update({
    where: { id: Number(params.id) },
    data: { done }, // use the provided value
  });

  return NextResponse.json(todo);
}

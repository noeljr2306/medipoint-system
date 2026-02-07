import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Define the interface for the Route Context
interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext, // Explicitly type the context
) {
  try {
    // ✅ In Next.js 15, we must await the params object itself
    const { id } = await context.params;

    const body = await request.json();
    const { status } = body;

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedAppointment = await db.appointment.update({
      // Ensure id is a number if your DB schema uses Int
      where: { id: Number(id) },
      data: { status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ appointment: updatedAppointment });
  } catch (error) {
    console.error("Appointment update error:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 },
    );
  }
}

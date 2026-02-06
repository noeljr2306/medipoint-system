import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      appointmentType,
      department,
      doctor,
      preferredDate,
      preferredTime,
      reasonForVisit,
      videoPlatform,
    } = body;

    const appointment = await db.appointment.create({
      data: {
        userId: parseInt(session.user.id),
        fullName,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        appointmentType,
        department,
        doctor,
        preferredDate,
        preferredTime,
        reasonForVisit,
        videoPlatform,
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { role: true },
    });

    let appointments;

    if (user?.role === "admin") {
      // Admin can see all appointments
      appointments = await db.appointment.findMany({
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Patients can only see their own appointments
      appointments = await db.appointment.findMany({
        where: { userId: parseInt(session.user.id) },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
}

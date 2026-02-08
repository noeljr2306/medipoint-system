import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

export const dynamic = "force-dynamic";

const userSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { users: [], message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password } = userSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role: "patient",
      },
    });

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      { user: safeUser, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 400 });
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 },
    );
  }
}

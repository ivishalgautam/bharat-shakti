import { endpoints } from "@/utils/endpoints";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BHARAT_SHAKTI_API_URL;

// This route acts as a middleware between you and your backend server
export async function POST(request) {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("role");
    cookieStore.delete("next-auth.session-token");
    cookieStore.delete("next-auth.csrf-token");
    cookieStore.delete("next-auth.callback-url");
    signOut();
    return NextResponse.json({ message: "Logged out." }, { status: 200 });
  } catch (err) {
    console.log("Error logging out in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

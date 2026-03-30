import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || "Giriş Başarısız" },
        { status: response.status },
      );
    }

    const res = NextResponse.json({
      success: true,
      expiration: data?.expiration,
    });

    res.cookies.set("token", data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Giriş sırasında bir hata oluştu" },
      { status: 500 },
    );
  }
}

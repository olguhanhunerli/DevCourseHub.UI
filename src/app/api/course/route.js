import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const url = `${API_URL}/api/Course${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Kurslar alınamadı" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Yetkisiz işlem" }, { status: 401 });
    }
    const body = await request.json();

    const response = await fetch(`${API_URL}/api/Course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Kurs oluşturulamadı" },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

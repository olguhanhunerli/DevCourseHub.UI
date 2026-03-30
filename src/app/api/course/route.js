import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.toString();
    const url = `${API_URL}/api/Course?${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Kurslar Alınamadı" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Yetkisiz işlem" }, { status: 401 });
    }
    const response = await fetch(`${API_URL}/api/course/${id}/publish`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Kurs yayınlanamadı" },
        { status: response.status },
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Yetkisiz işlem" }, { status: 401 });
    }
    const { id } = await params;
    const response = await fetch(`${API_URL}/api/course/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "Kurs silinemedi" },
        { status: response.status },
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

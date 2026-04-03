import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Yetkisiz işlem" }, { status: 401 });
    }
    var body = await request.json();
    const response = await fetch(`${API_URL}/course/my/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    toast.error(error.message || "Ders oluşturulurken bir hata oluştu");
    return NextResponse.json(
      { message: "Ders oluşturulurken bir hata oluştu" },
      { status: 500 },
    );
  }
}

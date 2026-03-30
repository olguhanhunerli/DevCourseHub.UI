export async function apiFetch(path, options = {}) {
  const isInternal = path.startsWith("/api/");
  const url = isInternal ? path : `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Bir hata oluştu");
  }

  return data;
}

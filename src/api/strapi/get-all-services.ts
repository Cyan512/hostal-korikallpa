import environment from '@/src/environment';

export async function getAllServices<T>(locale: string): Promise<T> {
  const res = await fetch(
    `${environment.strapi.apiEndpoint}/api/services?populate=*&locale=${locale}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}

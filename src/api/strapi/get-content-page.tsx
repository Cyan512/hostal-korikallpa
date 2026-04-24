import environment from '@/src/environment';
import { StrapiResponse } from '@/src/types/strapi.entity';

export async function getContentPage<T>(
  endpoint: string,
  locale: string
): Promise<StrapiResponse<T>> {
  const res = await fetch(
    `${environment.strapi.apiEndpoint}/api/${endpoint}?populate=*&locale=${locale}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}

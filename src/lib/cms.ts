import "server-only";

type StrapiId = number;

interface StrapiResponse<T> {
  data: T[];
  meta?: unknown;
}

interface StrapiMediaFormat {
  url: string;
  width?: number;
  height?: number;
}

interface StrapiImage {
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
}

export interface BlogIndexItem {
  title: string;
  slug: string;
  displayDate: string | null;
  featuredImage?: { data?: { attributes: StrapiImage } | null };
  primaryCategory?: {
    data?: { attributes: { name: string; slug: string } } | null;
  };
}

export interface BlogDetail extends BlogIndexItem {
  subtitle?: string | null;
  body?: unknown;
  notice?: unknown;
  noIndex?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  authors?: {
    data: { attributes: { name: string; slug: string } }[];
  };
  secondaryCategories?: {
    data: { attributes: { name: string; slug: string } }[];
  };
  references?: {
    data: { attributes: { title: string; url?: string | null } }[];
  };
  relatedArticles?: Array<{
    data?: {
      attributes: {
        title: string;
        slug: string;
        subtitle?: string;
        featuredImage?: any;
      };
    };
    title?: string;
    slug?: string;
    subtitle?: string;
    featuredImage?: any;
  }>;
  relatedByArticles?: Array<{
    data?: {
      attributes: {
        title: string;
        slug: string;
        subtitle?: string;
        featuredImage?: any;
      };
    };
    title?: string;
    slug?: string;
    subtitle?: string;
    featuredImage?: any;
  }>;
  external_html?: string | null;
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "https://cms.viome.com";

async function cmsFetch<T>(pathname: string): Promise<T> {
  const url = `${CMS_URL}${pathname}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getBlogsForIndex(
  page: number = 1,
  pageSize: number = 100,
  categorySlug?: string
) {
  let query = `/api/blogs?sort=displayDate:desc&fields=title,slug,displayDate,subtitle&populate[0]=featuredImage&populate[1]=primaryCategory&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  if (categorySlug) {
    query += `&filters[primaryCategory][slug][$eq]=${encodeURIComponent(categorySlug)}`;
  }

  const json = await cmsFetch<StrapiResponse<BlogIndexItem>>(query);
  return {
    data: json.data,
    meta: json.meta,
  };
}

export async function getCategories() {
  const query =
    "/api/categories?sort=name:asc&fields=name,slug&pagination[pageSize]=100";
  const json =
    await cmsFetch<StrapiResponse<{ name: string; slug: string }>>(query);
  return json.data;
}

export async function getBlogBySlug(slug: string) {
  const params = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    `populate[featuredImage]=true`,
    `populate[authors]=true`,
    `populate[primaryCategory]=true`,
    `populate[secondaryCategories]=true`,
    `populate[references]=true`,
    `populate[relatedArticles][populate][featuredImage]=true`,
    `populate[relatedByArticles][populate][featuredImage]=true`,
    `populate[body][on][content.rich-text][populate]=true`,
    `populate[body][on][content.image][populate][media]=true`,
    `populate[body][on][content.video][populate]=true`,
  ].join("&");

  const query = `/api/blogs?${params}`;
  const json = await cmsFetch<StrapiResponse<BlogDetail>>(query);
  return json.data[0];
}

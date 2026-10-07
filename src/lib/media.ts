export function getMediaUrl(url: string): string {
    return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

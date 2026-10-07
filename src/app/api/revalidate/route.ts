import { getAllGuideIds } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { after, NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.headers.get("x-revalidate-secret") !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // regenerate every page on the site
    revalidatePath("/", "layout");

    // after responding to Strapi, visit every page so they regenerate now
    after(async () => {
        const base = process.env.SITE_URL;
        const ids = await getAllGuideIds();
        const paths = ["/", ...ids.map((id) => `/guide/${id}`)];

        for (const path of paths) {
            await fetch(`${base}${path}`).catch(() => {});
        }
    });

    return NextResponse.json({ revalidated: true });
}

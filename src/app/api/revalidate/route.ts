import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.headers.get("x-revalidate-secret") !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // regenerate every page on the site
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true });
}

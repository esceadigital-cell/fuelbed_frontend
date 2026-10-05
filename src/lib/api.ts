import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

/*------------- GET ALL FIREPLACE MODELS WITH EVERYTHING NESTED ------------------*/

const modelsPopulate = {
    fueltype: { populate: "*" },
    versions: {
        populate: {
            fuelbeds: {
                populate: {
                    fuelbed: { populate: "*" },
                    guide: {
                        populate: {
                            logs: { populate: "*" },
                        },
                    },
                },
            },
        },
    },
};

export async function getModels() {
    const query = qs.stringify({ populate: modelsPopulate }, { encodeValuesOnly: true });

    const res = await fetch(`${STRAPI_URL}/api/fireplace-models?${query}`, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
    });

    if (!res.ok) {
        const body = await res.text();
        console.error("Strapi error:", res.status, body);
        throw new Error(`Failed to fetch models: ${res.status}`);
    }

    return res.json();
}

/* -------------------- GET ALL FUEL TYPES -------------------- */

export async function getFuelTypes() {
    const res = await fetch(`${STRAPI_URL}/api/fueltypes`, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
    });

    if (!res.ok) {
        const body = await res.text();
        console.error("Strapi error:", res.status, body);
        throw new Error(`Failed to fetch fueltypes: ${res.status}`);
    }

    return res.json();
}

/* ----------------- GET SPECIFIC PAGE BASED ON SLUG ---------------- */

export async function getPageBySlug(slug: string) {
    if (!slug) {
        throw new Error("getPageBySlug called without a slug");
    }

    const query = qs.stringify(
        { filters: { slug: { $eq: slug } }, populate: "*" },
        { encodeValuesOnly: true },
    );

    const res = await fetch(`${STRAPI_URL}/api/pages?${query}`, {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_KEY}` },
    });

    if (!res.ok) throw new Error("Failed to fetch page");

    const json = await res.json();
    return json.data[0] ?? null; // null if no match found
}

/* GET SPECIFIC GUIDE BASED ON ID */

export async function getGuideById(id: string) {
    if (!id) {
        throw new Error("getGuideById called without an id");
    }

    const query = qs.stringify(
        {
            filters: { documentId: { $eq: id } },
            populate: {
                logs: { populate: "*" },
                end_of_installation_checklist: { populate: { checkpoints: { populate: "*" } } },
            },
        },
        { encodeValuesOnly: true },
    );

    const res = await fetch(`${STRAPI_URL}/api/guides?${query}`, {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_KEY}` },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch guide`);
    }

    return res.json();
}

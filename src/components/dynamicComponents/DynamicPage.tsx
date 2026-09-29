import { getPageBySlug } from "@/lib/api";
import DynamicComponent from "./DynamicComponent";

interface DynamicPageProps {
    slug: string;
}

export default async function DynamicPage(props: DynamicPageProps) {
    const page = await getPageBySlug(props.slug);

    if (!page) return <h1>Error page</h1>;

    const pageBlocks = page.blocks;

    console.log(page);

    return (
        <>
            {pageBlocks && pageBlocks.length > 0 ? (
                pageBlocks.map((block: any) => (
                    <DynamicComponent
                        key={block.id}
                        componentName={block.__component}
                        props={block}
                    />
                ))
            ) : (
                <h1>Error page</h1>
            )}
        </>
    );
}

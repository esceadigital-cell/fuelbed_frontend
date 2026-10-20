import { getPageBySlug } from "@/lib/api";
import DynamicComponent from "./DynamicComponent";
import { notFound } from "next/navigation";
import Header from "../mainComponents/header/Header";
import HeaderWrapperSSR from "../mainComponents/header/headerWrapperSSR/HeaderWrapperSSR";

interface DynamicPageProps {
    slug: string;
}

export default async function DynamicPage(props: DynamicPageProps) {
    const page = await getPageBySlug(props.slug);

    if (!page) notFound();

    const pageBlocks = page.blocks;

    console.log(page);

    return (
        <>
            <HeaderWrapperSSR hasGetAppBtn />
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

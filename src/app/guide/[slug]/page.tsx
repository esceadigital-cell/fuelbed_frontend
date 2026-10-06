import { DynamicPageProps } from "@/types/types";
//import styles from "./guidePage.module.scss";
import { getAllGuideIds, getGuideById } from "@/lib/api";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import Guide from "@/components/mainComponents/guide/Guide";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const ids = await getAllGuideIds();
    return ids.map((id) => ({ slug: id }));
}

export default async function GuidePage(props: DynamicPageProps) {
    const { slug } = await props.params;

    const guideId = slug;

    const guideRes = await getGuideById(guideId);

    const guide = guideRes.data[0];

    if (!guide) notFound();

    //console.log(guide);

    return (
        <BlockWrapper>
            <ContentWrapper>
                <Guide guide={guide} />
            </ContentWrapper>
        </BlockWrapper>
    );
}

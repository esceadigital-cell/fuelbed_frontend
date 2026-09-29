import { DynamicPageProps } from "@/types/types";
import styles from "./guidePage.module.scss";
import { getGuideById } from "@/lib/api";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import Guide from "@/components/mainComponents/guide/Guide";

interface GuidePageProps extends DynamicPageProps {
    searchParams: Promise<{ modelTitle?: string; versionTitle?: string }>;
}

export default async function GuidePage(props: GuidePageProps) {
    const { slug } = await props.params;
    const { modelTitle, versionTitle } = await props.searchParams;

    const guideId = slug;

    const guideRes = await getGuideById(guideId);

    const guide = guideRes.data[0];

    if (!guide) return <h1>Error page</h1>;

    console.log(guide);

    return (
        <BlockWrapper>
            <ContentWrapper>
                <Guide guide={guide} modelTitle={modelTitle} versionTitle={versionTitle} />
            </ContentWrapper>
        </BlockWrapper>
    );
}

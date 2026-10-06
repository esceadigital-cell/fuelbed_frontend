import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import styles from "./guidePage.module.scss";

import Link from "next/link";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";

export default function GuideNotFound() {
    return (
        <BlockWrapper>
            <ContentWrapper>
                <section className={styles.notFoundWrapper}>
                    <h1>Guide not found</h1>
                    <p>This guide doesn't exist or has been removed.</p>
                    <Link className={styles.errorPageBtn} href="/">
                        Back to all models
                    </Link>
                </section>
            </ContentWrapper>
        </BlockWrapper>
    );
}

import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import Link from "next/link";
import styles from "./page.module.scss";

export default function NotFound() {
    return (
        <BlockWrapper>
            <ContentWrapper>
                <section className={styles.notFoundWrapper}>
                    <h1>Page not found</h1>
                    <p>This page doesn't exist or has been removed.</p>
                    <Link className={styles.errorPageBtn} href="/">
                        Back to front page
                    </Link>
                </section>
            </ContentWrapper>
        </BlockWrapper>
    );
}

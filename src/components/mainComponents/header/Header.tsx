"use client";

import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import styles from "./Header.module.scss";
import Link from "next/link";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";

export default function Header() {
    return (
        <BlockWrapper>
            <ContentWrapper>
                <header className={styles.header}>
                    <Link href={"/"}>
                        <IconComponent
                            src="/icons/escea_logo_orange.svg"
                            alt="Escea"
                            width={60}
                            height={25}
                            unoptimized
                        />
                    </Link>
                </header>
            </ContentWrapper>
        </BlockWrapper>
    );
}

"use client";

import { useSearchParams } from "next/navigation";
import styles from "./GuideTitles.module.scss";

export default function GuideTitles() {
    const searchParams = useSearchParams();
    const modelTitle = searchParams.get("modelTitle");
    const versionTitle = searchParams.get("versionTitle");
    const fuelbed = searchParams.get("fuelbed");

    return (
        <div>
            {modelTitle && (
                <p className={styles.modelHeading}>
                    MODEL: <span className={styles.modelTitle}>{modelTitle}</span>
                </p>
            )}
            {versionTitle && (
                <p className={styles.versionHeading}>
                    VERSION: <span className={styles.versionTitle}>{versionTitle}</span>
                </p>
            )}
            {fuelbed && (
                <p className={styles.fuelbedHeading}>
                    FUELBED: <span className={styles.fuelbedTitle}>{fuelbed}</span>
                </p>
            )}
        </div>
    );
}

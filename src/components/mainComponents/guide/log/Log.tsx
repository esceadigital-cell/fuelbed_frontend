"use client";

import { log } from "@/types/types";
import styles from "./Log.module.scss";
import { useEffect, useState } from "react";
import MediaBox from "./mediaBox/MediaBox";

interface LogProps {
    log: log;
    logIndex: number;
}

export default function Log(props: LogProps) {
    const [currentStep, setCurrentStep] = useState<"rotation" | "overview" | "closeup" | "">("");

    useEffect(() => {
        setCurrentStep(
            props.log.rotating3d?.length > 0
                ? "rotation"
                : props.log.overviewPlacement?.length > 0
                  ? "overview"
                  : props.log.closeupPlacement?.length > 0
                    ? "closeup"
                    : "",
        );
    }, [props.log]);

    const currentMedia =
        currentStep === "rotation"
            ? props.log.rotating3d
            : currentStep === "overview"
              ? props.log.overviewPlacement
              : currentStep === "closeup"
                ? props.log.closeupPlacement
                : null;

    const hasRotationMedia = props.log.rotating3d && props.log.rotating3d.length > 0;
    const hasOverviewMedia = props.log.overviewPlacement && props.log.overviewPlacement.length > 0;
    const hasCloseupMedia = props.log.closeupPlacement && props.log.closeupPlacement.length > 0;

    const stepCount = Number(hasRotationMedia) + Number(hasOverviewMedia) + Number(hasCloseupMedia);

    return (
        <div className={styles.wrapper}>
            <div className={styles.allMediaWrapper}>
                <div className={styles.mediaWrapper}>
                    {currentStep && currentMedia && <MediaBox media={currentMedia} />}
                </div>

                <div className={styles.stepBtns}>
                    {props.log.rotating3d && props.log.rotating3d.length > 0 && (
                        <button
                            className={`${currentStep === "rotation" ? styles.active : undefined}`}
                            onClick={() => setCurrentStep("rotation")}
                        >
                            ROTATION
                        </button>
                    )}
                    {props.log.overviewPlacement && props.log.overviewPlacement.length > 0 && (
                        <button
                            className={`${currentStep === "overview" ? styles.active : undefined} ${styles.middleBtn}`}
                            onClick={() => setCurrentStep("overview")}
                        >
                            OVERVIEW
                        </button>
                    )}
                    {props.log.closeupPlacement && props.log.closeupPlacement.length > 0 && (
                        <button
                            className={`${currentStep === "closeup" ? styles.active : undefined}`}
                            onClick={() => setCurrentStep("closeup")}
                        >
                            CLOSEUP
                        </button>
                    )}
                </div>

                {/* INDICATOR LINES AND DOTS */}
                {stepCount > 1 && (
                    <div className={styles.lineIndicatorWrapper}>
                        {hasRotationMedia && (
                            <div
                                className={`${styles.dot} ${currentStep === "rotation" ? styles.activeDot : ""}`}
                                onClick={() => setCurrentStep("rotation")}
                            ></div>
                        )}

                        {hasOverviewMedia && (
                            <>
                                <div
                                    className={`${styles.dot} ${currentStep === "overview" ? styles.activeDot : ""}`}
                                    onClick={() => setCurrentStep("overview")}
                                ></div>
                            </>
                        )}

                        {hasCloseupMedia && (
                            <>
                                <div
                                    className={`${styles.dot} ${currentStep === "closeup" ? styles.activeDot : ""}`}
                                    onClick={() => setCurrentStep("closeup")}
                                ></div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {props.log.logText && (
                <div className={styles.logTextWrapper}>
                    <p className={styles.logNumber}>LOG {props.logIndex + 1}</p>
                    <p>{props.log.logText}</p>
                </div>
            )}
        </div>
    );
}

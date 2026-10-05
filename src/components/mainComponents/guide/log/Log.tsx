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
            props.log.rotating3d
                ? "rotation"
                : props.log.overviewPlacement
                  ? "overview"
                  : props.log.closeupPlacement
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
            </div>

            {props.log.logText && (
                <div className={styles.logTextWrapper}>
                    <p className={styles.logNumber}>LOG {props.logIndex + 1}:</p>
                    <p>{props.log.logText}</p>
                </div>
            )}
        </div>
    );
}

"use client";

import { guide } from "@/types/types";
import styles from "./Guide.module.scss";
import React, { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import Log from "./log/Log";
import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import VideoComponent from "@/components/nestedComponents/videoComponent/VideoComponent";
import {
    downloadGuideForOffline,
    removeGuideDownload,
    isGuideDownloaded,
} from "@/lib/offlineGuide";
import Checklist from "../checklist/Checklist";
import GuideTitles from "./guideTitles/GuideTitles";

interface GuideProps {
    guide: guide;
    //modelTitle?: string;
    //versionTitle?: string;
    //fuelbed?: string;
}

export default function Guide(props: GuideProps) {
    const logs = props.guide.logs;

    const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);
    const [guideTextIsShown, setGuideTextIsShown] = useState<boolean>(true);
    const [isInfoPopupVirgin, setIsInfoPopupVirgin] = useState<boolean>(true);
    const [burgerMenuIsShown, setBurgerMenuIsShown] = useState<boolean>(false);
    const [logPreviewIndex, setLogPreviewIndex] = useState<number | null>(null);
    const [downloadPopupIsOpen, setDownloadPopupIsOpen] = useState<boolean>(false);
    const [checklistIsShown, setChecklistIsShown] = useState<boolean>(false);

    //new sw
    const [isDownloaded, setIsDownloaded] = useState(false);

    useEffect(() => {
        isGuideDownloaded(props.guide.documentId).then(setIsDownloaded);
    }, [props.guide.documentId]);

    async function handleDownload() {
        const params = new URLSearchParams(window.location.search);

        try {
            await downloadGuideForOffline(
                props.guide,
                params.get("modelTitle") ?? "",
                params.get("versionTitle") ?? "",
                params.get("fuelbed") ?? "",
            );
            setIsDownloaded(true);
        } catch (err) {
            console.error("Download failed:", err);
            alert("The download failed. Please check your connection and try again.");
        }
    }

    async function handleRemoveDownload() {
        await removeGuideDownload(props.guide.documentId);
        setIsDownloaded(false);
    }
    //new sw end

    const currentLog = logs[currentLogIndex];

    function goToPrevious() {
        setCurrentLogIndex((prev) => Math.max(prev - 1, 0));
    }

    function goToNext() {
        setCurrentLogIndex((prev) => Math.min(prev + 1, logs.length - 1));
    }

    function closeInfoPopup() {
        setGuideTextIsShown(false);
    }

    function handleGuideTextTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
        // ignore transitions bubbling up from children, and other properties
        if (e.target !== e.currentTarget || e.propertyName !== "clip-path") return;

        if (!guideTextIsShown && isInfoPopupVirgin) {
            setIsInfoPopupVirgin(false);
        }
    }

    function toggleInfoPopup(e: React.MouseEvent) {
        e.stopPropagation();
        if (guideTextIsShown) {
            closeInfoPopup();
        } else {
            setGuideTextIsShown(true);
        }
    }

    const HOLD_DELAY = 300; // ms before a press counts as a hold
    const MOVE_TOLERANCE = 10; // px of movement allowed before the hold activates

    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const didHold = useRef<boolean>(false);
    const pressStart = useRef<{ x: number; y: number } | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [previewOffsetY, setPreviewOffsetY] = useState(0);

    useLayoutEffect(() => {
        if (logPreviewIndex === null || !previewRef.current) {
            setPreviewOffsetY(0);
            return;
        }

        const rect = previewRef.current.getBoundingClientRect();
        const margin = 16; // breathing room from the screen edge

        let offset = 0;
        if (rect.top < margin) {
            offset = margin - rect.top;
        } else if (rect.bottom > window.innerHeight - margin) {
            offset = window.innerHeight - margin - rect.bottom;
        }

        setPreviewOffsetY(offset);
    }, [logPreviewIndex]);

    function clearHoldTimer() {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    }

    function startPreview(e: React.PointerEvent<HTMLButtonElement>, i: number) {
        didHold.current = false;
        pressStart.current = { x: e.clientX, y: e.clientY };

        // keep getting pointer events on this button even after the finger moves off it
        e.currentTarget.setPointerCapture(e.pointerId);

        clearHoldTimer();
        holdTimer.current = setTimeout(() => {
            didHold.current = true;
            setLogPreviewIndex(i);
        }, HOLD_DELAY);
    }

    function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
        // before the hold activates: moving means the user wants to scroll, so cancel
        if (!holdTimer.current || !pressStart.current) return;

        const dx = e.clientX - pressStart.current.x;
        const dy = e.clientY - pressStart.current.y;
        if (Math.hypot(dx, dy) > MOVE_TOLERANCE) {
            clearHoldTimer();
        }
    }

    function endPreview() {
        clearHoldTimer();
        pressStart.current = null;
        setLogPreviewIndex(null);
    }

    function handleLogBtnClick(i: number) {
        // released after a hold → it was a preview, not a jump
        if (didHold.current) {
            didHold.current = false;
            return;
        }
        setBurgerMenuIsShown(false);
        setCurrentLogIndex(i);
    }

    // while a preview is showing, block scrolling so the finger can move freely
    useEffect(() => {
        if (logPreviewIndex === null) return;

        const preventScroll = (e: TouchEvent) => e.preventDefault();
        document.addEventListener("touchmove", preventScroll, { passive: false });

        return () => document.removeEventListener("touchmove", preventScroll);
    }, [logPreviewIndex]);

    // clean up the timer if the component unmounts mid-hold
    useEffect(() => clearHoldTimer, []);

    return (
        <section className={styles.wrapper}>
            <div className={styles.guideHeader}>
                {props.guide.guideText && props.guide.guideText.length > 0 && (
                    <div className={styles.guideInfoTextWrapper}>
                        <div className={styles.infoIconWrapper} onClick={toggleInfoPopup}>
                            <div className={styles.bgColor}>
                                <IconComponent
                                    src="/icons/info_circle_dark.png"
                                    width={30}
                                    height={30}
                                    alt="Info regarding this guide"
                                    unoptimized
                                />
                            </div>

                            {guideTextIsShown && (
                                <div
                                    className={`${styles.bgLayer}`}
                                    onClick={toggleInfoPopup}
                                ></div>
                            )}
                            <div
                                className={`${styles.guideText} ${guideTextIsShown ? styles.isShown : undefined} ${isInfoPopupVirgin ? styles.isVirgin : undefined}`}
                                onClick={(e) => e.stopPropagation()}
                                onTransitionEnd={handleGuideTextTransitionEnd}
                            >
                                <Suspense fallback={null}>
                                    <GuideTitles />
                                </Suspense>
                                <p>{props.guide.guideText}</p>
                                <button onClick={closeInfoPopup}>OK</button>
                            </div>
                        </div>

                        {/* DOWNLOAD BUTTON */}
                        <div className={styles.downloadWrapper}>
                            <div
                                className={`${styles.bgColor} ${downloadPopupIsOpen ? styles.increseZIndex : undefined}`}
                            >
                                <button
                                    className={styles.downloadIcon}
                                    onClick={() => setDownloadPopupIsOpen((prev) => !prev)}
                                >
                                    {isDownloaded ? (
                                        <IconComponent
                                            src="/icons/download_done.png"
                                            width={30}
                                            height={30}
                                            alt="Undownload guide"
                                            unoptimized
                                        />
                                    ) : (
                                        <IconComponent
                                            src="/icons/download.png"
                                            width={30}
                                            height={30}
                                            alt="Download guide"
                                            unoptimized
                                        />
                                    )}
                                </button>
                            </div>
                            {downloadPopupIsOpen && (
                                <div
                                    className={styles.bgLayerDownloadPopup}
                                    onClick={() => setDownloadPopupIsOpen(false)}
                                ></div>
                            )}

                            <div
                                className={`${styles.downloadPopup} ${downloadPopupIsOpen ? styles.isOpen : undefined}`}
                            >
                                <p>
                                    {isDownloaded
                                        ? "This guide is downloaded"
                                        : "Download this guide for offline use"}
                                </p>
                                {isDownloaded ? (
                                    <div className={styles.downloadBtnsContainer}>
                                        <button
                                            className={styles.downloadBtn}
                                            onClick={() => setDownloadPopupIsOpen(false)}
                                        >
                                            OK
                                        </button>
                                        <button
                                            className={styles.downloadBtn}
                                            onClick={() => {
                                                handleRemoveDownload();
                                                setDownloadPopupIsOpen(false);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className={styles.downloadBtn}
                                        onClick={async () => {
                                            await handleDownload();
                                            //setDownloadPopupIsOpen(false);
                                            setTimeout(() => {
                                                setDownloadPopupIsOpen(false);
                                            }, 1200);
                                        }}
                                    >
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* LOG COUNT */}
                <h1 className={styles.logCount}>
                    Log <span className={styles.currentLogCount}>{currentLogIndex + 1}</span> /{" "}
                    {logs.length}
                </h1>

                {/* BURGER MENU */}
                {/* ICON */}
                <button
                    className={styles.burgerIconWrapper}
                    onClick={() => setBurgerMenuIsShown(true)}
                >
                    <IconComponent
                        src="/icons/burger_menu.png"
                        width={35}
                        height={35}
                        alt="Open burger menu"
                        unoptimized
                    />
                </button>

                {/* MENU */}
                <div
                    className={`${styles.burgerMenu} ${burgerMenuIsShown ? styles.isOpen : undefined}`}
                >
                    <div className={styles.stickyContent}>
                        <button
                            className={styles.closeIconBtn}
                            onClick={() => setBurgerMenuIsShown(false)}
                        >
                            <IconComponent
                                src="/icons/close.png"
                                width={100}
                                height={100}
                                alt="Close burger menu"
                                unoptimized
                            />
                        </button>
                        <h2 className={styles.burgerMenuHeading}>Jump to specific log</h2>
                        <ul className={styles.menuInstructions}>
                            <li>Hold down a button to preview the log</li>
                            <li>Tap a button to go to the log</li>
                        </ul>
                    </div>

                    <div className={styles.logBtnsWrapper}>
                        {props.guide.logs.map((log, i) => (
                            <button
                                key={log.id}
                                className={styles.logBtn}
                                onClick={() => handleLogBtnClick(i)}
                                onPointerDown={(e) => startPreview(e, i)}
                                onPointerMove={handlePointerMove}
                                onPointerUp={endPreview}
                                onPointerCancel={endPreview}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                LOG {i + 1}
                                {/* LOG PREVIEW POPUP */}
                                {logPreviewIndex === i && log.rotating3d[0] && (
                                    <div
                                        className={styles.previewWrapper}
                                        ref={previewRef}
                                        style={
                                            {
                                                "--offset-y": `${previewOffsetY}px`,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <VideoComponent video={log.rotating3d[0]} noControls />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BURGER MENU BACKGROUND LAYER */}
                {burgerMenuIsShown && (
                    <div
                        className={styles.burgerMenuBgLayer}
                        onClick={() => setBurgerMenuIsShown(false)}
                    ></div>
                )}
            </div>

            <div className={styles.logsNavBar}>
                <button
                    className={styles.changeLogBtn}
                    onClick={goToPrevious}
                    disabled={currentLogIndex === 0}
                >
                    PREVIOUS LOG
                </button>
                <button
                    className={`${styles.changeLogBtn} ${styles.nextLogBtn}`}
                    onClick={goToNext}
                    disabled={currentLogIndex === logs.length - 1}
                >
                    NEXT LOG
                </button>
                {currentLogIndex === logs.length - 1 &&
                    props.guide.end_of_installation_checklist && (
                        <button
                            className={styles.checklistBtn}
                            onClick={() => setChecklistIsShown(true)}
                        >
                            ✓ CHECKLIST
                        </button>
                    )}
            </div>

            {/* SPECIFIC LOG */}
            <div className={styles.logZIndex}>
                <Log log={currentLog} logIndex={currentLogIndex} />
            </div>

            {/* CHECKLIST */}
            {checklistIsShown && props.guide.end_of_installation_checklist?.checkpoints && (
                <div className={styles.checklistWrapper}>
                    <Checklist
                        checklist={props.guide.end_of_installation_checklist.checkpoints}
                        closeChecklist={() => setChecklistIsShown(false)}
                    />
                </div>
            )}
        </section>
    );
}

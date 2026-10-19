"use client";

import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import styles from "./Header.module.scss";
import Link from "next/link";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import { useState } from "react";

interface HeaderProps {
    hasGetAppBtn?: boolean;
}

export default function Header(props: HeaderProps) {
    const [popupIsShown, setPopupIsShown] = useState<boolean>(false);

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

                    {props.hasGetAppBtn && (
                        <>
                            <div className={styles.appBtnWrapper}>
                                <button
                                    className={styles.appBtn}
                                    onClick={() => setPopupIsShown((prev) => !prev)}
                                >
                                    <span
                                        className={`${styles.btnText} ${popupIsShown ? styles.faded : undefined}`}
                                    >
                                        GET AS APP
                                    </span>
                                    <span className={styles.iconWrapper}>
                                        <div className={styles.bgColor}>
                                            <IconComponent
                                                src="/icons/info_circle_dark.png"
                                                alt="How to get as mobile app"
                                                width={35}
                                                height={35}
                                                unoptimized
                                            />
                                        </div>
                                    </span>
                                </button>

                                {/* POPUP */}
                                <div
                                    className={`${styles.popup} ${popupIsShown ? styles.isShown : undefined}`}
                                >
                                    <h4>HOW TO GET AS APP</h4>
                                    <ol>
                                        <li>
                                            While on this page, click the{" "}
                                            <span
                                                className={`${styles.greyBg} ${styles.shareIconWrapper}`}
                                            >
                                                <IconComponent
                                                    src="/icons/share_dark.png"
                                                    alt="share-icon"
                                                    width={25}
                                                    height={25}
                                                    unoptimized
                                                />
                                            </span>{" "}
                                            icon in your browser
                                        </li>
                                        <li>
                                            Click{" "}
                                            <span className={styles.greyBg}>
                                                Add to Home Screen
                                            </span>
                                        </li>
                                        <li>
                                            Confirm by clicking{" "}
                                            <span className={styles.greyBg}>Add</span>
                                        </li>
                                        <li>Find the app on your phone's home screen</li>
                                    </ol>
                                    <div>
                                        <p className={`${styles.infoText}`}>
                                            Already downloaded guides will have to be downloaded
                                            again when using the app
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {popupIsShown && (
                                <div
                                    className={styles.bgLayer}
                                    onClick={() => setPopupIsShown(false)}
                                ></div>
                            )}
                        </>
                    )}
                </header>
            </ContentWrapper>
        </BlockWrapper>
    );
}

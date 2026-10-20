"use client";

import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import styles from "./Header.module.scss";
import Link from "next/link";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import { useState } from "react";
import { ContactDetails } from "@/types/types";

interface HeaderProps {
    hasGetAppBtn?: boolean;
    contactDetails?: ContactDetails;
}

export default function Header(props: HeaderProps) {
    const [popupIsShown, setPopupIsShown] = useState<boolean>(false);
    const [contactPopupIsShown, setContactPopupIsShown] = useState<boolean>(false);

    return (
        <BlockWrapper>
            <ContentWrapper>
                <header className={styles.header}>
                    {/* CONTACT */}
                    {props.contactDetails &&
                        (props.contactDetails.phoneNumber || props.contactDetails.email) && (
                            <>
                                <div
                                    className={`${styles.contactDetailsWrapper} ${contactPopupIsShown ? styles.highZIndex : undefined}`}
                                >
                                    <button
                                        className={styles.contactIconWrapper}
                                        onClick={() => setContactPopupIsShown((prev) => !prev)}
                                    >
                                        <IconComponent
                                            src="/icons/contact_support.png"
                                            alt="contact support"
                                            width={25}
                                            height={25}
                                            unoptimized
                                        />
                                    </button>

                                    {/* CONTACT POPUP */}
                                    <div
                                        className={`${styles.contactPopup} ${contactPopupIsShown ? styles.isShown : undefined}`}
                                    >
                                        <h3>Technical Support</h3>
                                        {props.contactDetails.phoneNumber && (
                                            <div className={styles.contactDetailWrapper}>
                                                <h4>Phone:</h4>
                                                <a
                                                    href={`tel:${props.contactDetails.phoneNumber.replace(/[^\d+]/g, "")}`}
                                                >
                                                    {props.contactDetails.phoneNumber}
                                                </a>
                                            </div>
                                        )}
                                        {props.contactDetails.email && (
                                            <div className={styles.contactDetailWrapper}>
                                                <h4>E-mail:</h4>
                                                <a href={`mailto:${props.contactDetails.email}`}>
                                                    {props.contactDetails.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* BG LAYER */}
                                {contactPopupIsShown && (
                                    <div
                                        className={styles.bgLayer}
                                        onClick={() => setContactPopupIsShown(false)}
                                    ></div>
                                )}
                            </>
                        )}

                    {/* LOGO */}
                    <Link href={"/"} className={styles.logoLink}>
                        <IconComponent
                            src="/icons/escea_logo_orange.svg"
                            alt="Escea"
                            width={108}
                            height={20}
                            unoptimized
                        />
                    </Link>

                    {/* GET AS APP GUIDE */}
                    {props.hasGetAppBtn && (
                        <>
                            <div
                                className={`${styles.appBtnWrapper} ${contactPopupIsShown ? styles.lowZIndex : undefined}`}
                            >
                                <button
                                    className={styles.appBtn}
                                    onClick={() => setPopupIsShown((prev) => !prev)}
                                >
                                    <span
                                        className={`${styles.btnText} ${popupIsShown ? styles.faded : undefined}`}
                                    >
                                        GET APP
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

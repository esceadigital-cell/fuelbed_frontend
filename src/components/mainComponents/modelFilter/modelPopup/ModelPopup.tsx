import { model, version } from "@/types/types";
import styles from "./ModelPopup.module.scss";
import { useState } from "react";
import Link from "next/link";
import ImageComponent from "@/components/nestedComponents/imageComponent/ImageComponent";
import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";

interface ModelPopupProps {
    model: model;
    closePopup: () => void;
}

export default function ModelPopup(props: ModelPopupProps) {
    const model = props.model;
    console.log(model);

    const [selectedVersion, setSelectedVersion] = useState<version>(props.model.versions[0]);

    function handleVersionChange(title: string) {
        const newVersion = model.versions.find((version) => {
            return version.title === title;
        });
        if (newVersion) setSelectedVersion(newVersion);
    }

    return (
        <div className={styles.bgLayer} onClick={props.closePopup}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                {/* CLOSE BUTTON */}
                <div className={styles.closeBtn} onClick={props.closePopup}>
                    <IconComponent
                        src="/icons/close_dark.png"
                        alt="Close model popup"
                        width={35}
                        height={35}
                        unoptimized
                    />
                </div>

                <div className={styles.scrollContent}>
                    {/* MODEL HEADING */}
                    <div className={styles.headingAnCloseBtn}>
                        <h3 className={styles.heading}>{model.title}</h3>
                    </div>

                    {/* VERSIONS */}
                    {!model.versions?.length && <h4>No versions of this model added yet</h4>}

                    {model.versions && model.versions.length > 1 && (
                        <div className={styles.versionWrapper}>
                            <h4>Version</h4>

                            {/* SELECT */}
                            <select
                                className={styles.versionSelect}
                                value={selectedVersion.title ?? ""}
                                onChange={(e) => {
                                    handleVersionChange(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    Select version
                                </option>
                                {props.model.versions.map((version) => (
                                    <option key={version.id} value={version.title}>
                                        {version.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* FUEL BEDS */}
                    {selectedVersion &&
                        (selectedVersion.fuelbeds?.length ? (
                            <div className={styles.fuelbedsSection}>
                                <h4>Fuelbeds</h4>

                                <div className={styles.fuelbedsWrapper}>
                                    {selectedVersion.fuelbeds.map((fuelbed) =>
                                        fuelbed.guide ? (
                                            <Link
                                                key={fuelbed.id}
                                                href={{
                                                    pathname: `/guide/${fuelbed.guide.documentId}`,
                                                    query: {
                                                        modelTitle: model.title,
                                                        ...(model.versions.length > 1 && {
                                                            versionTitle: selectedVersion.title,
                                                        }),
                                                        fuelbed: fuelbed.fuelbed?.title ?? "",
                                                    },
                                                }}
                                                className={styles.fuelbedLink}
                                            >
                                                <div className={styles.fuelbedBtn}>
                                                    <h4 className={styles.fuelbedHeading}>
                                                        {fuelbed.fuelbed?.title}
                                                    </h4>
                                                    {fuelbed.fuelbed?.image && (
                                                        <div className={styles.imgWrapper}>
                                                            <ImageComponent
                                                                image={fuelbed.fuelbed.image}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={styles.seeGuideBtn}>
                                                        SEE GUIDE
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div
                                                key={fuelbed.id}
                                                className={styles.noGuideAddedBox}
                                            >
                                                <h4>{fuelbed.fuelbed?.title}</h4>
                                                <p>No guide added for this fuelbed yet</p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ) : (
                            <h4>No fuelbeds added to this version yet</h4>
                        ))}
                </div>
            </div>
        </div>
    );
}

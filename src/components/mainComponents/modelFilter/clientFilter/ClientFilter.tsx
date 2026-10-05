"use client";

import { fuelType, model } from "@/types/types";
import styles from "./ClientFilter.module.scss";
import { useEffect, useState } from "react";
import ModelPopup from "../modelPopup/ModelPopup";
import Link from "next/link";
import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import { DownloadedGuide, getDownloadedGuides } from "@/lib/offlineGuide";

interface ClientFilterProps {
    models: model[];
    fuelTypes: fuelType[];
}

export default function ClientFilter(props: ClientFilterProps) {
    const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
    const [modelSearch, setModelSearch] = useState<string>("");
    //const [filteredModels, setFilteredModels] = useState<model[]>(props.models);
    const [selectedModel, setSelectedModel] = useState<model | null>(null);
    const [downloadedGuides, setDownloadedGuides] = useState<DownloadedGuide[]>([]);
    const [downloadedGuidesAreShown, setDownloadedGuidesAreShown] = useState<boolean>(false);

    useEffect(() => {
        getDownloadedGuides().then(setDownloadedGuides);
    }, []);

    const filteredModels = props.models.filter((model) => {
        const matchesSearch = model.title.toLowerCase().includes(modelSearch.toLowerCase());
        const matchesFuelType =
            selectedFuelType === null || model.fueltype?.title === selectedFuelType;
        return matchesSearch && matchesFuelType;
    });

    function clickFuelTypeBtn(type: string) {
        if (selectedFuelType === type) {
            setSelectedFuelType(null);
        } else {
            setSelectedFuelType(type);
        }
    }

    function closeModelPopup() {
        setSelectedModel(null);
    }

    return (
        <section className={styles.wrapper}>
            {/* SEARCH */}
            <div>
                <input
                    className={styles.searchInput}
                    type="search"
                    placeholder="search model"
                    value={modelSearch}
                    onChange={(e) => {
                        setModelSearch(e.target.value);
                    }}
                />
            </div>

            {/* DOWNLOADED GUIDES */}
            {downloadedGuides.length > 0 && (
                <div className={styles.downloadedGuidesWrapper}>
                    <div
                        className={styles.downloadedGuidesDropDownTopBar}
                        onClick={() => setDownloadedGuidesAreShown((prev) => !prev)}
                    >
                        <h2 className={styles.downloadedGuidesHeading}>Downloaded guides</h2>
                        <div
                            className={`${styles.arrowIconWrapper} ${downloadedGuidesAreShown ? styles.isOpen : undefined}`}
                        >
                            <IconComponent
                                src="/icons/arrow_drop_down.png"
                                alt="See downloaded guides"
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                    {downloadedGuidesAreShown && (
                        <ul className={styles.downloadedGuidesList}>
                            {downloadedGuides.map((g) => (
                                <li key={g.id}>
                                    <Link
                                        href={{
                                            pathname: `/guide/${g.id}`,
                                            query: {
                                                modelTitle: g.modelTitle,
                                                versionTitle: g.versionTitle,
                                                fuelbed: g.fuelbedTitle,
                                            },
                                        }}
                                    >
                                        {g.modelTitle} - {g.versionTitle} - {g.fuelbedTitle}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* FUEL TYPES FILTER BUTTONS */}
            {props.fuelTypes && props.fuelTypes.length > 0 && (
                <div className={styles.fuelTypeFilterButtonsWrapper}>
                    <h2 className={styles.fueltypeFilterHeading}>Filter models by fuel type</h2>
                    <div className={styles.fuelTypeBtns}>
                        {props.fuelTypes.map((type: fuelType) => (
                            <button
                                key={type.id}
                                className={`${styles.fuelTypeBtn} ${selectedFuelType === type.title ? styles.selectedType : undefined}`}
                                onClick={() => clickFuelTypeBtn(type.title)}
                            >
                                {type.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ALL MODELS */}
            {filteredModels && filteredModels.length > 0 && (
                <div className={styles.modelsContainer}>
                    <h2>Choose model</h2>

                    {/* MODEL BUTTONS */}
                    <div className={styles.modelBtnsContainer}>
                        {filteredModels.map((model: model) => (
                            <div key={model.id}>
                                <button
                                    className={styles.modelBtn}
                                    onClick={() => setSelectedModel(model)}
                                >
                                    {model.title}
                                </button>

                                {/* MODEL POPUP */}
                                {selectedModel && selectedModel === model && (
                                    <ModelPopup
                                        model={selectedModel}
                                        closePopup={closeModelPopup}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

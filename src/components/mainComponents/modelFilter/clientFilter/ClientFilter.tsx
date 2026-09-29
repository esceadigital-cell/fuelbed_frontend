"use client";

import { fuelType, model } from "@/types/types";
import styles from "./ClientFilter.module.scss";
import { useState } from "react";
import ModelPopup from "../modelPopup/ModelPopup";

interface ClientFilterProps {
    models: model[];
    fuelTypes: fuelType[];
}

export default function ClientFilter(props: ClientFilterProps) {
    const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
    const [modelSearch, setModelSearch] = useState<string>("");
    //const [filteredModels, setFilteredModels] = useState<model[]>(props.models);
    const [selectedModel, setSelectedModel] = useState<model | null>(null);

    const filteredModels = props.models.filter((model) => {
        const matchesSearch = model.title.toLowerCase().includes(modelSearch.toLowerCase());
        const matchesFuelType =
            selectedFuelType === null || model.fueltype.title === selectedFuelType;
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

            {/* FUEL TYPES FILTER BUTTONS */}
            {props.fuelTypes && props.fuelTypes.length > 0 && (
                <div className={styles.fuelTypeFilterButtonsWrapper}>
                    <h2>Fuel Types:</h2>
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
                    <h2>CHOOSE THE FIREPLACE MODEL</h2>

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

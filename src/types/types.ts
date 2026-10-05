export interface fuelType {
    id: number;
    title: string;
}

export interface mediaType {
    id: number;
    alternativeText?: string;
    mime: string;
    url: string;
    height?: number;
    width?: number;
}

export interface log {
    id: number;
    logText?: string;
    closeupPlacement: mediaType[];
    overviewPlacement: mediaType[];
    rotating3d: mediaType[];
}

export interface guide {
    //id: number;
    documentId: string;
    guideText?: string;
    title: string;
    logs: log[];
    end_of_installation_checklist: {
        checkpoints: checkpoint[];
    };
}

export interface checkpoint {
    checkpoint: string;
    id: number;
}

export interface fuelbed {
    fuelbed: {
        id: number;
        title: string;
        image: mediaType;
    };
    id: number;
    guide: guide;
}

export interface version {
    title: string;
    id: number;
    fuelbeds: fuelbed[];
}

export interface model {
    fueltype: fuelType;
    id: number;
    title: string;
    versions: version[];
}

export interface buttonType {
    text: string;
    url: string;
    openInNewTab: boolean;
}

export interface DynamicPageProps {
    params: Promise<{ slug: string }>;
}

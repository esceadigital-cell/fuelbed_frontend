import { mediaType } from "@/types/types";
import styles from "./ImageComponent.module.scss";
import Image from "next/image";
import { getMediaUrl } from "@/lib/media";

interface ImageComponentProps {
    image: mediaType;
}

export default function ImageComponent(props: ImageComponentProps) {
    return (
        <div className={styles.wrapper}>
            <Image
                src={getMediaUrl(props.image.url)}
                width={props.image.width}
                height={props.image.height}
                alt={props.image.alternativeText ?? ""}
                className={styles.img}
                unoptimized
            />
        </div>
    );
}

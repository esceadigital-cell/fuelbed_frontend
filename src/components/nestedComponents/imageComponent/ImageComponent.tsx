import { mediaType } from "@/types/types";
import styles from "./ImageComponent.module.scss";
import Image from "next/image";

interface ImageComponentProps {
    image: mediaType;
}

export default function ImageComponent(props: ImageComponentProps) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

    return (
        <div className={styles.wrapper}>
            <Image
                src={`${STRAPI_URL}${props.image.url}`}
                width={props.image.width}
                height={props.image.height}
                alt={props.image.alternativeText ?? ""}
                className={styles.img}
            />
        </div>
    );
}

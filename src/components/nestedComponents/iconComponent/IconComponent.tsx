import Image from "next/image";
import styles from "./IconComponent.module.scss";

interface IconComponentProps {
    src: string;
    width: number;
    height: number;
    alt: string;
}

export default function IconComponent(props: IconComponentProps) {
    return (
        <Image
            className={styles.icon}
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.alt ?? ""}
        />
    );
}

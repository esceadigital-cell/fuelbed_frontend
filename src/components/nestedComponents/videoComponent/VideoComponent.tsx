import { mediaType } from "@/types/types";
import styles from "./VideoComponent.module.scss";
import { getMediaUrl } from "@/lib/media";

interface VideoComponentProps {
    video: mediaType;
    noControls?: boolean;
}

export default function VideoComponent(props: VideoComponentProps) {
    //const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

    return (
        <div className={styles.wrapper}>
            <video
                className={styles.video}
                controls={!props.noControls}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={getMediaUrl(props.video.url)} type={props.video.mime} />
            </video>
        </div>
    );
}

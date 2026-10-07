import { mediaType } from "@/types/types";
import styles from "./MediaBox.module.scss";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "@/components/nestedComponents/imageComponent/ImageComponent";
import VideoComponent from "@/components/nestedComponents/videoComponent/VideoComponent";
import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";

interface MediaBoxProps {
    media: mediaType[];
}

export default function MediaBox(props: MediaBoxProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
        trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    }, [props.media]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        function handleScroll() {
            if (!track) return;
            const index = Math.round(track.scrollLeft / track.clientWidth);
            setCurrentIndex(index);
        }

        track.addEventListener("scroll", handleScroll);
        return () => track.removeEventListener("scroll", handleScroll);
    }, []);

    // Slide track height adjustment to current slide
    useEffect(() => {
        const track = trackRef.current;
        const slide = track?.children[currentIndex] as HTMLElement | undefined;
        if (!track || !slide) return;

        function updateHeight() {
            if (track && slide) track.style.height = `${slide.offsetHeight}px`;
        }

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(slide);

        return () => observer.disconnect();
    }, [currentIndex, props.media]);

    function goToSlide(index: number) {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.children[index] as HTMLElement;
        slide?.scrollIntoView({ behavior: "smooth", inline: "start" });
        setCurrentIndex(index);
    }

    function goToPrevious() {
        goToSlide(Math.max(currentIndex - 1, 0));
    }

    function goToNext() {
        goToSlide(Math.min(currentIndex + 1, props.media.length - 1));
    }

    return (
        <div className={styles.container}>
            {props.media.length > 1 && (
                <div className={styles.mediaPagination}>
                    {props.media.map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.dot} ${currentIndex === i ? styles.activeDot : undefined}`}
                        ></div>
                    ))}
                </div>
            )}
            <div className={styles.wrapper} ref={trackRef}>
                {props.media.map((media) => (
                    <div key={media.id} className={styles.mediaItem}>
                        {media.mime.includes("image") ? (
                            <ImageComponent image={media} />
                        ) : media.mime.includes("video") ? (
                            <VideoComponent video={media} />
                        ) : null}
                    </div>
                ))}
            </div>

            {props.media.length > 1 && (
                <div className={styles.navButtons}>
                    <button
                        className={`${styles.navBtn} ${styles.prev}`}
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                    >
                        <div className={styles.btnBgColor}>
                            <IconComponent
                                src="/icons/arrow_circle_right_orange.png"
                                alt="Previous"
                                width={30}
                                height={30}
                                unoptimized
                            />
                        </div>
                    </button>
                    <button
                        className={`${styles.navBtn} ${styles.next}`}
                        onClick={goToNext}
                        disabled={currentIndex === props.media.length - 1}
                    >
                        <div className={styles.btnBgColor}>
                            <IconComponent
                                src="/icons/arrow_circle_right_orange.png"
                                alt="Next"
                                width={30}
                                height={30}
                                unoptimized
                            />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}

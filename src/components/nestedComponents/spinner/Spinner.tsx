import styles from "./Spinner.module.scss";

interface SpinnerProps {
    isGrey?: boolean;
}

export default function Spinner(props: SpinnerProps) {
    return (
        <div className={styles.wrapper}>
            <div
                className={`${styles.spinner} ${props.isGrey ? styles.isGrey : undefined}`}
                role="status"
                aria-label="Loading"
            ></div>
        </div>
    );
}

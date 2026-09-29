import styles from "./ContentWrapper.module.scss";

interface contentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper(props: contentWrapperProps) {
  return <div className={styles.wrapper}>{props.children}</div>;
}

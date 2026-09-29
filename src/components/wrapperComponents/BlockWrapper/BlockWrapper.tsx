import styles from "./BlockWrapper.module.scss";

interface blockWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export default function BlockWrapper(props: blockWrapperProps) {
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: props.backgroundColor ?? undefined,
      }}
    >
      {props.children}
    </div>
  );
}

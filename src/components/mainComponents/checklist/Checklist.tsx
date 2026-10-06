import { checkpoint } from "@/types/types";
import styles from "./Checklist.module.scss";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import Link from "next/link";

interface ChecklistProps {
    checklist: checkpoint[];
    closeChecklist: () => void;
}

export default function Checklist(props: ChecklistProps) {
    return (
        <BlockWrapper>
            <ContentWrapper>
                <section className={styles.wrapper}>
                    <button className={styles.backBtn} onClick={() => props.closeChecklist()}>
                        Back to guide
                    </button>
                    <div className={styles.list}>
                        <h2>Installation checklist</h2>
                        {props.checklist && props.checklist.length > 0 && (
                            <ul>
                                {props.checklist.map((checkpoint: checkpoint) => (
                                    <li key={checkpoint.id}>
                                        <button
                                            type="button"
                                            className={styles.checkpoint}
                                            onClick={(e) =>
                                                e.currentTarget.classList.toggle(styles.checked)
                                            }
                                        >
                                            <span className={styles.tickBox}>
                                                <div className={styles.tickDot}></div>
                                            </span>
                                            <span>{checkpoint.checkpoint}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link href={"/"} className={styles.doneBtn}>
                        Done
                    </Link>
                </section>
            </ContentWrapper>
        </BlockWrapper>
    );
}

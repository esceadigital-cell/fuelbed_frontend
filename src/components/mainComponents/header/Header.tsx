import IconComponent from "@/components/nestedComponents/iconComponent/IconComponent";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href={"/"}>
                <IconComponent
                    src="/icons/escea_logo_orange.svg"
                    alt="Escea"
                    width={60}
                    height={25}
                />
            </Link>
        </header>
    );
}

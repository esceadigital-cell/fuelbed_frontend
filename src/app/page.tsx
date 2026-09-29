import DynamicPage from "@/components/dynamicComponents/DynamicPage";
import styles from "./page.module.scss";

export default async function Home() {
    return <DynamicPage slug={"/"} />;
}

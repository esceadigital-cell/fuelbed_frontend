import { getContactDetails } from "@/lib/api";
import Header from "../Header";

interface HeaderWrapperSSRProps {
    hasGetAppBtn?: boolean;
}

export default async function HeaderWrapperSSR(props: HeaderWrapperSSRProps) {
    const contactDetails = await getContactDetails();

    console.log(contactDetails);

    return <Header hasGetAppBtn={props.hasGetAppBtn} contactDetails={contactDetails} />;
}

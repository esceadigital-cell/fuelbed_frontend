import { getFuelTypes, getModels } from "@/lib/api";
//import styles from "./ModelFilter.module.scss";
import BlockWrapper from "@/components/wrapperComponents/BlockWrapper/BlockWrapper";
import ContentWrapper from "@/components/wrapperComponents/ContentWrapper/ContentWrapper";
import ClientFilter from "./clientFilter/ClientFilter";

export default async function ModelFilter() {
    const modelsRes = await getModels();
    const models = modelsRes.data;
    console.log("MODELS:", models);

    const fuelTypesRes = await getFuelTypes();
    const fuelTypes = fuelTypesRes.data;

    return (
        <BlockWrapper>
            <ContentWrapper>
                <ClientFilter models={models} fuelTypes={fuelTypes} />
            </ContentWrapper>
        </BlockWrapper>
    );
}

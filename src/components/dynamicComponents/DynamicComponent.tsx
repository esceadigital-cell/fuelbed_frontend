import ModelFilter from "../mainComponents/modelFilter/ModelFilter";

interface dynamicComponentProps {
    componentName: string;
    props: any;
}

export default function DynamicComponent(props: dynamicComponentProps) {
    switch (props.componentName) {
        case "main-components.model-filter":
            return <ModelFilter />;
        default:
            return null;
    }
}

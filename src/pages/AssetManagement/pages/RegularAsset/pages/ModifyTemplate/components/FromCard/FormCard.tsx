import { ReactNode } from "react";
import {
  Card,
  FormTitle,
} from "@pages/AssetManagement/pages/RegularAsset/pages/ModifyTemplate/components/FromCard/FormCard.styles.ts";

export interface FormCardProps {
  children: ReactNode;
  title: string;
}

function FormCard({ children, title }: FormCardProps) {
  return (
    <Card>
      <FormTitle>{title}</FormTitle>

      {children}
    </Card>
  );
}

export default FormCard;

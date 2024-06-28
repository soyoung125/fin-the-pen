import {
  CardBody,
  CardContainer,
  CardHeader,
} from "@pages/AssetManagement/components/ScheduleStatusCard/components/StatusCard/StatusCard.styles.ts";

interface StatusStackProps {
  title: string;
  content: string;
}

function StatusCard({ title, content }: StatusStackProps) {
  return (
    <CardContainer>
      <CardHeader>{title}</CardHeader>
      <CardBody>{content}</CardBody>
    </CardContainer>
  );
}

export default StatusCard;

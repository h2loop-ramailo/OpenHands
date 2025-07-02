import { useParams } from "react-router";
import SingleTemplatePage from "#/components/features/template/[id]/single-template-page";

export default function TemplatePage() {
  const params = useParams();
  return <SingleTemplatePage params={params} />;
}

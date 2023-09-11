import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { TurnsForm } from "../components/TurnsForm";

export const NewTurnPage = ({ title }) => {
  useDocumentTitle(title);
  return (
    <div>
      <TurnsForm />
    </div>
  );
};

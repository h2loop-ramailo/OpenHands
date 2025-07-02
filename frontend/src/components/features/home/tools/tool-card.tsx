import styles from "./ToolCard.module.css";
import { useNavigate } from "react-router";

type ToolCardProps = {
  title: string;
  image: string;
  description: string;
};

export function ToolCard({ title, image, description }: ToolCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate("/templates/1");
      }}
    >
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

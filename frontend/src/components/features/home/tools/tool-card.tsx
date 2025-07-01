import styles from "./ToolCard.module.css";

type ToolCardProps = {
  title: string;
  image: string;
  description: string;
};

export function ToolCard({ title, image, description }: ToolCardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

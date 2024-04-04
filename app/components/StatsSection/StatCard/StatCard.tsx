import styles from './StatCard.module.css';

const StatCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default StatCard
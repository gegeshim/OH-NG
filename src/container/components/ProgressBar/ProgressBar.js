import styles from '../ProgressBar/ProgressBar.module.css';
export default function ProgressBar({ current, total }) {
  const dealt = Math.floor((current / total) * 100);
  const currentStyles = {
    width: `${dealt}%`,
  };

  return (
    <div className={styles.progressBar}>
      <div className={styles.current} style={currentStyles}></div>
    </div>
  );
}

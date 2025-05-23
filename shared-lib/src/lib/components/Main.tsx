import styles from './Main.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <div id="main-header">
        <h1>Main Content title</h1>
      </div>
      <div id="main-content">
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

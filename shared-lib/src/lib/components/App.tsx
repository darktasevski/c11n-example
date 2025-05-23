import Main from './Main';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Toolbar />
        <Main />
      </div>
    </div>
  );
}

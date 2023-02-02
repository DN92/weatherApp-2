import styles from './myWeather.module.css';

function Layout({ children }: ReactChildren): React.ReactElement {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default Layout;

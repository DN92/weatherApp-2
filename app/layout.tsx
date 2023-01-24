// Layouts must accept a children prop.
// This will be populated with nested layouts or pages
import '../CSS/index.css';
import styles from './rootLayout.module.css';

export default function RootLayout({ children }: { children: React.ReactElement; }): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <div className={styles.app_wrapper}>
          {children}
        </div>
      </body>
    </html>
  );
}

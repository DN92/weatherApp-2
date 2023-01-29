// Layouts must accept a children prop.
// This will be populated with nested layouts or pages
import '../CSS/index.css';
import { Roboto } from '@next/font/google';
import styles from './rootLayout.module.css';

// font

const roboto = Roboto({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Sans Sarif'],
  variable: '--roboto',
  subsets: ['latin'],

});

export default function RootLayout({ children }: { children: React.ReactElement; }): React.ReactElement {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <div className={`${styles.app_wrapper}`}>
          {children}
        </div>
      </body>
    </html>
  );
}

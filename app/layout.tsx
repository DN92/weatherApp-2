// Layouts must accept a children prop.
// This will be populated with nested layouts or pages
import '../CSS/index.css';
import { Roboto } from '@next/font/google';
import styles from './rootLayout.module.css';
import LayoutBackground from './(components)/LayoutBackgroud';

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
  const now = Date.now();

  return (
    <html lang="en" className={roboto.className}>
      <body>
        {/* no elements above */}
        <div className={`${styles.app_wrapper}`}>
          <div className={`${styles.component_wrapper} `}>
            <LayoutBackground>
              {children}
            </LayoutBackground>
          </div>
          <div className={`${styles.sun_circle_outer} yellow_opa375 footer`}>
            <div className={`${styles.sun_circle_inner} sun_in_blue_sky background_image_cover`} />
          </div>
        </div>
        {/* no elements below */}
      </body>
    </html>
  );
}

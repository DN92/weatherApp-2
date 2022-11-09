// Layouts must accept a children prop.
// This will be populated with nested layouts or pages

import RootStyleRegistry from "./emotion";

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  );
}

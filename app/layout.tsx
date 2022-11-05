// Layouts must accept a children prop.
// This will be populated with nested layouts or pages

import AppLayout from "./AppLayout";

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>
         {children}
        </AppLayout>
      </body>
    </html>
  );
}

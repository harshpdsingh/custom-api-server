export const metadata = {
  title: 'My API App',
  description: 'A custom API server with Next.js and MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

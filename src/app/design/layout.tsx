export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-h-fit w-full">{children}</div>;
}

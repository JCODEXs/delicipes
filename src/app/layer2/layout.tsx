export default function RootLayout({
  children,
  other,
}: {
  children: React.ReactNode;
  other: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full">Second layout</div>
      {children}
      {other}
    </div>
  );
}

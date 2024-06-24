export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className=" grid h-screen grid-rows-[auto,1fr]">
      {" "}
      <main className="overflow-y-scroll">{children}</main>
      {modal} <div id="modal-root"></div>
    </div>
  );
}

function Layout({ children }: ReactChildren): React.ReactElement {
  return (
    <main
      className="paper-wrapper"
    >
      {children}
    </main>
  );
}

export default Layout;

const Layout = ({children}: children) => {

  const paperWrapperStyles: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
  }

  return (
    <main className="paper-wrapper"
      style={paperWrapperStyles}
    >
      {children}
    </main>
  )
}

export default Layout

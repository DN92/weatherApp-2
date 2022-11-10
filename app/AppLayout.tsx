import './(CSS)/index.css'

export default function AppLayout({children}: children) {
  return (
    <div className="app-wrapper">
      {children}
    </div>
  )
}

import '../CSS/index.css';

export default function AppLayout({ children }: ReactChildren) {
  return (
    <div className="app-wrapper">
      {children}
    </div>
  );
}

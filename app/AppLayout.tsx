'use client';

// This is a Client Component
function getBackgroundImage(): string {
  const source = '/images/background-1.avif'
  return `url(${source})`
}

const inlineCss: React.CSSProperties = {
  position: 'static',
  height: '100vh',
  backgroundImage: getBackgroundImage(),
  backgroundSize: 'cover'
}

const AppLayout = ({ children }: children) => {
  return (
    <div
    style={inlineCss}
    >
      {children}
    </div>
  );
}

export default AppLayout

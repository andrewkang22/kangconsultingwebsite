import Button from '@/components/custom/button';

export default function Custom404() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
      <h1 style={{ fontSize: '6rem', margin: 0, color: '#334155' }}>404</h1>
      <h2 style={{ color: '#64748b', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#475569', marginBottom: '2rem' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Button href={'/'}>Go Home</Button>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/products" style={{ 
        color: '#518581',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        Go back to products
      </Link>
    </div>
  );
}

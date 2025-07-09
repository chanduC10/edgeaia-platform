import dynamic from 'next/dynamic';

const MonitorClient = dynamic(() => import('./MonitorClient'), { ssr: false });

// This is needed for Vercel export builds
export async function generateStaticParams() {
  return [{ id: '1' }]; // You can later dynamically fetch all project IDs
}

export default function MonitorPage() {
  return <MonitorClient />;
}

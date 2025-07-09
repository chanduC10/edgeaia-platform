import dynamic from 'next/dynamic';

// Dynamically load the client component
const TrainClient = dynamic(() => import('./TrainClient'), { ssr: false });

export async function generateStaticParams() {
  return [{ id: '1' }]; // Add other IDs if needed
}

export default function TrainPage() {
  return <TrainClient />;
}

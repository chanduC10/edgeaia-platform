import TrainClient from './TrainClient';

export async function generateStaticParams() {
  return [{ id: '1' }]; // Add other IDs if dynamic
}

export default function TrainPage() {
  return <TrainClient />;
}

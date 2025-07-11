// frontend/app/projects/[id]/deploy/page.tsx
import DeployPage from './DeployClient';

export async function generateStaticParams() {
  return [{ id: '1' }]; // Replace with real project IDs if available
}

export default function Page() {
  return <DeployPage />;
}
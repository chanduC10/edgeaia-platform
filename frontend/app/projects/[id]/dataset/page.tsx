// app/projects/[id]/dataset/page.tsx
import DatasetClient from './DatasetClient';

export async function generateStaticParams() {
  return [{ id: '1' }]; // You can fetch actual project IDs here
}

export default function DatasetPage() {
  return <DatasetClient />;
}

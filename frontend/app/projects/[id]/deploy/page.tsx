// frontend/app/projects/[id]/deploy/page.tsx
"use client";

import DeployClient from './DeployClient';

export async function generateStaticParams() {
  return [{ id: '1' }]; // You can later replace this with real project IDs
}

export default function DeployPage() {
  return <DeployClient />;
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: Token missing');
      setLoading(false);
      return;
    }

    fetch('https://edgeaia-backend.onrender.com/api/projects', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized or fetch error');
        const data = await res.json();
        setProjects(data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch projects');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">🔄 Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">❌ {error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Your Projects</h1>
        <p className="text-slate-400">All the AI projects you've created</p>

        {projects.length === 0 ? (
          <div className="text-center mt-10 text-slate-500">
            <p>No projects found.</p>
            <Button onClick={() => router.push('/projects/new')} className="mt-4">
              + New Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="glass-effect border-slate-700/50 hover:border-blue-500/50 cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}/dataset`)}
              >
                <CardHeader>
                  <CardTitle className="text-white">{project.name}</CardTitle>
                  <CardDescription className="text-slate-400 capitalize">
                    {project.type} • {new Date(project.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="text-white">
                    Open <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
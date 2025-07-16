'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Eye,
  Layers,
  Search,
  FileText,
  Users,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';

interface ProjectType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  examples: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
}

const projectTypes: ProjectType[] = [
  {
    id: 'detection',
    name: 'Detection',
    description: 'Detect and locate objects in images',
    icon: Eye,
    examples: ['Defect detection', 'Safety equipment', 'Vehicle detection'],
    difficulty: 'Medium',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  },
  {
    id: 'classification',
    name: 'Classification',
    description: 'Categorize images into different classes',
    icon: Layers,
    examples: ['Product sorting', 'Quality grading', 'Medical diagnosis'],
    difficulty: 'Easy',
    color: 'bg-green-500/20 text-green-400 border-green-500/20',
  },
  {
    id: 'inspection',
    name: 'Inspection',
    description: 'Automated visual quality inspection',
    icon: Search,
    examples: ['PCB inspection', 'Textile defects', 'Surface scratches'],
    difficulty: 'Hard',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
  },
  {
    id: 'ocr',
    name: 'OCR',
    description: 'Extract text from images',
    icon: FileText,
    examples: ['Document processing', 'License plates', 'Serial numbers'],
    difficulty: 'Medium',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  },
  {
    id: 'reid',
    name: 'Re-ID',
    description: 'Re-identify objects across multiple views',
    icon: Users,
    examples: ['Person tracking', 'Vehicle re-identification', 'Asset tracking'],
    difficulty: 'Hard',
    color: 'bg-red-500/20 text-red-400 border-red-500/20',
  },
];

export default function NewProject() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [step, setStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleNext = async () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2 && projectName.trim()) {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(
          'https://edgeaia-backend.onrender.com/api/projects',
          {
            name: projectName,
            type: selectedType,
            status: 'training', // default status
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectId = response.data.id;
        router.push(`/projects/${projectId}/dataset`);
      } catch (error: any) {
        console.error('❌ Error creating project:', error);
        setErrorMessage('Failed to create project. Please try again.');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Create New Project</h1>
          <p className="text-slate-400">Set up a new Edge AI project for training and deployment</p>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'bg-blue-600/20 border-blue-500' : 'border-slate-600'
              }`}>
                {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Select Type</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-500' : 'bg-slate-600'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'bg-blue-600/20 border-blue-500' : 'border-slate-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Project Details</span>
            </div>
          </div>
        </div>

        {/* Step 1: Choose Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Choose Project Type</h2>
              <p className="text-slate-400">Select the type of AI model you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`glass-effect border-slate-700/50 cursor-pointer transition-all hover:border-slate-600/50 ${
                    selectedType === type.id ? 'ring-2 ring-blue-500 border-blue-500/50' : ''
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mx-auto mb-3`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-white">{type.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                disabled={!selectedType}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Project Details</h2>
              <p className="text-slate-400">Give your project a name and configure settings</p>
            </div>

            <Card className="glass-effect border-slate-700/50 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Project Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Set up your {projectTypes.find(t => t.id === selectedType)?.name.toLowerCase()} project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-slate-300">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Tyre Detection"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectImages" className="text-slate-300">Upload Images</Label>
                  <Input
                    id="projectImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="bg-slate-800/50 border-slate-600 text-white"
                  />
                  {selectedFiles && (
                    <p className="text-xs text-slate-400">{selectedFiles.length} file(s) selected</p>
                  )}
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!projectName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Create Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

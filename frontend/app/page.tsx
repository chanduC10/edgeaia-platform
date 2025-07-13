'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = isLoginMode
      ? 'https://edgeaia-backend.onrender.com/auth/login'
      : 'https://edgeaia-backend.onrender.com/auth/signup';

    try {
      const response = await axios.post(url, {
        username: credentials.username,
        password: credentials.password,
      });

      if (isLoginMode) {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          router.push('/dashboard');
        } else {
          setMessage('Login failed: Invalid token.');
        }
      } else {
        setMessage('Signup successful! You can now log in.');
        setIsLoginMode(true); // switch to login after signup
      }
    } catch (err: any) {
      console.error(`${isLoginMode ? 'Login' : 'Signup'} error:`, err.response?.data);
      setMessage(err.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/20">
              <Brain className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Edgeble AI</h1>
            <p className="text-slate-400 mt-2">Edge AI Orchestration Platform</p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="glass-effect border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              {isLoginMode ? 'Login to your account' : 'Signup to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${isLoginMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                disabled={loading}
              >
                {loading ? (isLoginMode ? 'Signing in...' : 'Signing up...') : (isLoginMode ? 'Login' : 'Signup')}
              </Button>

              {/* Show messages */}
              {message && (
                <p className="text-center text-sm mt-2 text-red-400">{message}</p>
              )}
            </form>

            {/* Toggle */}
            <div className="text-center mt-4 text-sm text-slate-400">
              {isLoginMode ? (
                <>
                  Don’t have an account?{' '}
                  <button type="button" className="text-green-400 underline" onClick={() => setIsLoginMode(false)}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" className="text-blue-400 underline" onClick={() => setIsLoginMode(true)}>
                    Log in
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

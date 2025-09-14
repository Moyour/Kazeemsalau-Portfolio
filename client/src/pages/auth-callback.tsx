import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      setLocation('/login?error=' + error);
      return;
    }

    if (token) {
      // Store the token and redirect to admin
      localStorage.setItem('authToken', token);
      
      // Verify the token by calling the /auth/me endpoint
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          // Successfully authenticated, redirect to admin
          setLocation('/admin');
        } else {
          // Invalid token, redirect to login
          setLocation('/login?error=invalid_token');
        }
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        setLocation('/login?error=verification_failed');
      });
    } else {
      // No token, redirect to login
      setLocation('/login?error=no_token');
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 flex items-center justify-center">
      <div className="text-center">
        <div className="text-white text-xl mb-4">Completing authentication...</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
}

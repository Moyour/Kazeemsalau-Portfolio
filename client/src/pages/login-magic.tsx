import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginMagic() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        setLink(data.link || null);
        setSent(true);
      }
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to send link');
      }
    } catch (_e) {
      setError('Failed to send link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Admin Magic Link</CardTitle>
            <p className="text-white/80">Enter your email to receive a sign-in link</p>
          </CardHeader>
          <CardContent>
            {sent ? (
              <Alert className="bg-green-500/20 border-green-500/30">
                <AlertDescription className="text-green-200">
                  {link ? (
                    <div className="text-center">
                      <p className="mb-3">Sign-in link generated successfully!</p>
                      <a 
                        href={link} 
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                      >
                        Open Admin Panel
                      </a>
                    </div>
                  ) : (
                    'If email is configured, a link has been sent. Otherwise, check the server logs for the link.'
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="bg-red-500/20 border-red-500/30">
                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60" placeholder="you@example.com" required />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                  {loading ? 'Sending...' : 'Send magic link'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



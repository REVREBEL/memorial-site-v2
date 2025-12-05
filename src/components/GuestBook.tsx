import { useState, useEffect } from 'react';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { baseUrl } from '../lib/base-url';

// API response format (snake_case from database)
interface GuestBookEntryAPI {
  id: string;
  name: string;
  location: string | null;
  relationship: string;
  first_met: string | null;
  message: string;
  email: string;
  created_at: string;
}

// Internal format (for display)
interface GuestBookEntry {
  id: string;
  name: string;
  location: string;
  relationship: string;
  firstMet: string | null;
  message: string;
  createdAt: string;
}

const RELATIONSHIPS = [
  'Family',
  'Friend',
  'Relative',
  'Business Partner',
  'Church Friend',
  'Co-Worker',
  'Never Met Directly',
];

export function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [relationship, setRelationship] = useState('');
  const [firstMet, setFirstMet] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  // Convert API response to internal format
  const convertEntry = (apiEntry: GuestBookEntryAPI): GuestBookEntry => ({
    id: apiEntry.id,
    name: apiEntry.name,
    location: apiEntry.location || '',
    relationship: apiEntry.relationship,
    firstMet: apiEntry.first_met,
    message: apiEntry.message,
    createdAt: apiEntry.created_at,
  });

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/guestbook`);
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json() as GuestBookEntryAPI[];
      setEntries(Array.isArray(data) ? data.map(convertEntry) : []);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError('Failed to load guest book entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !location.trim() || !relationship || !message.trim() || !email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim(),
          relationship,
          first_met: firstMet.trim() || null,
          message: message.trim(),
          email: email.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Failed to submit entry');
      }

      const newEntry = await response.json() as GuestBookEntryAPI;
      
      // Add new entry to the top of the list
      setEntries([convertEntry(newEntry), ...entries]);

      // Reset form
      setName('');
      setLocation('');
      setRelationship('');
      setFirstMet('');
      setMessage('');
      setEmail('');
      
      // Scroll to top to show success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting entry:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Recently';
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        fontFamily: 'var(--body-font)',
        color: 'var(--foreground)',
        backgroundColor: 'var(--background)'
      }}>
        Loading guest book...
      </div>
    );
  }

  return (
    <DevLinkProvider>
      <div style={{ position: 'relative', backgroundColor: 'var(--background)' }}>
        {/* Hero Section */}
        <div style={{ 
          padding: '4rem 2rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--heading-font)',
            fontSize: 'clamp(2.5rem, 5vw + 1rem, 7rem)',
            textAlign: 'center',
            color: 'var(--foreground)',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            become part<br />of her tribute
          </h1>
          <p style={{ 
            fontFamily: 'var(--body-font)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            textAlign: 'center',
            color: 'var(--foreground)',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            For those who wish to honor her memory, signing her guestbook is a meaningful way to contribute. You can share a heartfelt message, recount a cherished memory, or simply acknowledge your visit. Each entry enriches her legacy, weaving together the stories and sentiments of all who knew her.
          </p>
        </div>

        {/* Form Section - 2 columns: .5fr text, 1fr form */}
        <div style={{ 
          padding: '3rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '0.5fr 1fr',
            gridTemplateRows: '1fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left: Text (.5fr) */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ 
                fontFamily: 'var(--heading-font)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: 'var(--foreground)',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Sign the<br />GuestBook
              </h2>
              <p style={{ 
                fontFamily: 'var(--body-font)',
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: 'var(--foreground)',
                lineHeight: '1.6'
              }}>
                Share a message, memory, or simply let us know you visited. Every note adds to her story.
              </p>
            </div>

            {/* Right: Form (1fr) */}
            <div style={{ 
              maxWidth: '800px',
              minWidth: '320px',
              width: '100%',
              justifySelf: 'center'
            }}>
              <form onSubmit={handleSubmit} style={{ 
                backgroundColor: 'var(--card)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)'
              }}>
                {error && (
                  <div style={{
                    backgroundColor: 'var(--destructive)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    marginBottom: '1.5rem'
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                      placeholder="San Francisco, CA"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Select value={relationship} onValueChange={setRelationship} required>
                    <SelectTrigger id="relationship">
                      <SelectValue placeholder="How did you know her?" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELATIONSHIPS.map((rel) => (
                        <SelectItem key={rel} value={rel}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <Label htmlFor="firstMet">
                    Where did you first meet? <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>(optional)</span>
                  </Label>
                  <Input
                    id="firstMet"
                    value={firstMet}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstMet(e.target.value)}
                    placeholder="College, work event, mutual friend..."
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, memories, or well wishes..."
                    rows={4}
                    required
                    style={{ resize: 'none' }}
                  />
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                    {message.length} characters
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    Your email won't be displayed publicly
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Guest Book'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Guestbook Count and Entries */}
        <div style={{ 
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontFamily: 'var(--heading-font)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--foreground)',
            marginBottom: '2rem'
          }}>
            {entries.length}
          </p>
          
          {/* Guestbook Cards Grid - Responsive */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {entries.map((entry) => (
              <div 
                key={entry.id}
                style={{
                  backgroundColor: 'var(--card)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--body-font)'
                }}>
                  Added on: {formatDate(entry.createdAt)}
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--heading-font)',
                  fontSize: '1.5rem',
                  color: 'var(--foreground)',
                  marginBottom: '0.5rem'
                }}>
                  {entry.name}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--muted-foreground)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontFamily: 'var(--body-font)'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {entry.location}
                </p>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  fontFamily: 'var(--body-font)'
                }}>
                  {entry.relationship}
                </p>
                {entry.firstMet && (
                  <p style={{ 
                    fontSize: '0.85rem',
                    color: 'var(--muted-foreground)',
                    marginBottom: '0.75rem',
                    fontStyle: 'italic',
                    fontFamily: 'var(--body-font)'
                  }}>
                    First met: {entry.firstMet}
                  </p>
                )}
                <p style={{ 
                  fontSize: '0.95rem',
                  color: 'var(--foreground)',
                  lineHeight: '1.6',
                  fontFamily: 'var(--body-font)'
                }}>
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DevLinkProvider>
  );
}

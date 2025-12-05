import React, { useState, useEffect } from 'react';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { GuestbookMainHeading } from '../site-components/GuestbookMainHeading';
import { GuestbookCount } from '../site-components/GuestbookCount';
import { GuestbookCard } from '../site-components/GuestbookCard';
import { NameFormField } from '../site-components/NameFormField';
import { LocationFormField } from '../site-components/LocationFormField';
import { FirstMetFormField } from '../site-components/FirstMetFormField';
import { RelationshipFormField } from '../site-components/RelationshipFormField';
import { MessageFormField } from '../site-components/MessageFormField';
import { EmailFormField } from '../site-components/EmailFormField';
import { ButtonFilled } from '../site-components/ButtonFilled';
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

const CARD_COLORS = [
  'Warm Sandston',
  'Slate Navy',
  'Slate Blue',
  'Ocean Teal',
  'Rustwood Red',
  'Rose Clay',
] as const;

export function GuestBookWrapper() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      
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
      if (isNaN(date.getTime())) return 'Recently';
      
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return 'Recently';
    }
  };

  if (isLoading) {
    return (
      <DevLinkProvider>
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          fontFamily: 'var(--body-font)',
          color: 'var(--foreground)',
          backgroundColor: 'var(--background)'
        }}>
          Loading guest book...
        </div>
      </DevLinkProvider>
    );
  }

  return (
    <DevLinkProvider>
      <div style={{ position: 'relative', backgroundColor: 'var(--background)' }}>
        {/* Webflow Main Heading Component */}
        <GuestbookMainHeading />

        {/* Form Section - Custom form using Webflow field components */}
        <div style={{ 
          padding: '3rem 2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Success Message */}
          {success && (
            <div style={{
              padding: '1rem',
              marginBottom: '2rem',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontFamily: 'var(--body-font)'
            }}>
              Thank you for signing the guest book! Your entry has been added.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '1rem',
              marginBottom: '2rem',
              backgroundColor: 'var(--destructive)',
              color: 'white',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontFamily: 'var(--body-font)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name Field */}
            <NameFormField
              fullNameFormFieldId="name"
              fullNameFormInputRuntimeProps={{
                value: name,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
                required: true,
                name: 'name'
              }}
            />

            {/* Location Field */}
            <LocationFormField
              locationFormFieldId="location"
              locationFormInputRuntimeProps={{
                value: location,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value),
                required: true,
                name: 'location'
              }}
            />

            {/* First Met Field */}
            <FirstMetFormField
              firstMetFormFieldId="firstMet"
              firstMetFormInputRuntimeProps={{
                value: firstMet,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstMet(e.target.value),
                name: 'firstMet'
              }}
            />

            {/* Relationship Field */}
            <RelationshipFormField
              relationshipFieldFormFieldId="relationship"
              relationshipFieldInputFieldRuntimeProps={{
                value: relationship,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setRelationship(e.target.value),
                required: true,
                name: 'relationship'
              }}
              relationshipFieldInputFieldSlot={
                <>
                  <option value="" disabled>How did you know her?</option>
                  {RELATIONSHIPS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </>
              }
            />

            {/* Message Field */}
            <MessageFormField
              messageFormFieldId="message"
              messageInputFieldRuntimeProps={{
                value: message,
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value),
                required: true,
                name: 'message',
                rows: 4
              }}
              messageCharactersVisibility={true}
              messageCharactersSlot={
                <span>{message.length} characters</span>
              }
            />

            {/* Email Field */}
            <EmailFormField
              emailFormFieldId="email"
              emailFormInputRuntimeProps={{
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
                type: 'email',
                required: true,
                name: 'email'
              }}
            />

            {/* Submit Button */}
            <div style={{ marginTop: '1rem' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--button-font)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all 0.2s',
                  width: '100%'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Sign Guest Book'}
              </button>
            </div>
          </form>
        </div>

        {/* Guestbook Count */}
        <div style={{ 
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <GuestbookCount
            guestbookCountText={entries.length.toString()}
            description="Family, friends, and loved ones have signed the guestbook."
          />
        </div>

        {/* Guestbook Cards Grid */}
        <div style={{
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {entries.map((entry, index) => {
              const colorVariant = CARD_COLORS[index % CARD_COLORS.length];
              
              return (
                <GuestbookCard
                  key={entry.id}
                  mainComponentColorVariant={colorVariant}
                  guestbookDateDateLabel="Added on:"
                  guestbookDateGuestbookDate={formatDate(entry.createdAt)}
                  nameFullName={entry.name}
                  locationVisibility={!!entry.location}
                  locationLocationText={entry.location}
                  tag1Visibility={!!entry.relationship}
                  tag1Text={entry.relationship}
                  tag2Visibility={!!entry.firstMet}
                  tag2Text={entry.firstMet ? `First met: ${entry.firstMet}` : ''}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DevLinkProvider>
  );
}

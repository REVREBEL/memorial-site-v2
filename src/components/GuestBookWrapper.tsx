import React, { useState, useEffect } from 'react';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { GuestbookComponentSlots } from '../site-components/GuestbookComponentSlots';
import { GuestbookMainHeading } from '../site-components/GuestbookMainHeading';
import { GuestbookNamesHeading } from '../site-components/GuestbookNamesHeading';
import { GuestbookSubHeading } from '../site-components/GuestbookSubHeading';
import { GuestbookCount } from '../site-components/GuestbookCount';
import { GuestbookCard } from '../site-components/GuestbookCard';
import { GuestbookForm } from '../site-components/GuestbookForm';
import { FilterTagsSlots } from '../site-components/FilterTagsSlots';
import { FilterPreviousNextSlots } from '../site-components/FilterPreviousNextSlots';
import { GuestbookFilterTag } from '../site-components/GuestbookFilterTag';
import { ButtonNextPrevious } from '../site-components/ButtonNextPrevious';
import { baseUrl } from '../lib/base-url';

// API response format (snake_case from database)
interface GuestBookEntryAPI {
  id: string;
  name: string;
  location: string | null;
  relationship: string | null;
  first_met: string | null;
  message: string | null;
  email: string | null;
  created_at: string;
}

// Local format (camelCase for UI)
interface GuestBookEntry {
  id: string;
  name: string;
  location: string | null;
  relationship: string | null;
  firstMet: string | null;
  message: string | null;
  email: string | null;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

export function GuestBookWrapper() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    relationship: '',
    firstMet: '',
    message: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch entries
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/guestbook`);
      if (!response.ok) throw new Error('Failed to fetch guestbook entries');
      const data: GuestBookEntryAPI[] = await response.json();
      
      // Convert snake_case to camelCase
      const camelCaseData = data.map((entry) => ({
        id: entry.id,
        name: entry.name,
        location: entry.location,
        relationship: entry.relationship,
        firstMet: entry.first_met,
        message: entry.message,
        email: entry.email,
        createdAt: entry.created_at,
      }));
      
      setEntries(camelCaseData);
      setFilteredEntries(camelCaseData);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(`${baseUrl}/api/guestbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location || null,
          relationship: formData.relationship || null,
          first_met: formData.firstMet || null,
          message: formData.message || null,
          email: formData.email || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit entry');
      }

      // Reset form and show success
      setFormData({
        name: '',
        location: '',
        relationship: '',
        firstMet: '',
        message: '',
        email: '',
      });
      setSubmitSuccess(true);
      
      // Refresh entries
      await fetchEntries();
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting entry:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter by relationship tag
  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    
    if (!tag) {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter((entry) => entry.relationship === tag));
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEntries = filteredEntries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get unique relationships for filter tags
  const uniqueRelationships = Array.from(
    new Set(entries.map((entry) => entry.relationship).filter(Boolean))
  ) as string[];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <DevLinkProvider>
      <GuestbookComponentSlots
        guestbookMainHeadingSlot={
          <GuestbookMainHeading
            headline="Guestbook"
            subHeadlineDescriptionText="Share your memories and messages with us"
          />
        }
        guestbookFormSlot={
          <GuestbookForm
            fullNameFormFieldLabel="Full Name *"
            fullNameFormFieldId="guestbook-name"
            fullNameFormIconVisibility={formData.name ? 'visible' : 'hidden'}
            
            locationFieldFormFieldLabel="Location"
            locationFieldFormFieldId="guestbook-location"
            locationFieldFormIconVisibility={formData.location ? 'visible' : 'hidden'}
            locationFieldFormInputRuntimeProps={{
              value: formData.location,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, location: e.target.value });
              },
            }}
            
            firstMetFieldFormFieldLabel="How We First Met"
            firstMetFieldFormFieldId="guestbook-first-met"
            firstMetFieldFormIconVisibility={formData.firstMet ? 'visible' : 'hidden'}
            firstMetFieldFormInputRuntimeProps={{
              value: formData.firstMet,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, firstMet: e.target.value });
              },
            }}
            
            relationshipFieldFormFieldLabel="Relationship"
            relationshipFieldFormId="guestbook-relationship"
            relationshipFieldPlaceholderText="Select your relationship"
            relationshipFieldInputFieldRuntimeProps={{
              value: formData.relationship,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormData({ ...formData, relationship: e.target.value });
              },
            }}
            
            messageFieldFormFieldLabel="Your Message"
            messageFieldFormFieldId="guestbook-message"
            messageFieldInputFieldId="guestbook-message-input"
            messageFieldCharacterLabel={`${formData.message.length} / 500 characters`}
            messageFieldInputFieldRuntimeProps={{
              value: formData.message,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const text = e.target.value.slice(0, 500);
                setFormData({ ...formData, message: text });
              },
              maxLength: 500,
            }}
            
            emailFieldFormFieldLabel="Email Address"
            emailFieldFormFieldId="guestbook-email"
            emailFieldBottomDisclaimerLabel="We'll never share your email with anyone else."
            emailFieldFormIconVisibility={formData.email ? 'visible' : 'hidden'}
            emailFieldFormInputRuntimeProps={{
              value: formData.email,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, email: e.target.value });
              },
              type: 'email',
            }}
            
            buttonLabelText={submitting ? "Submitting..." : "Submit"}
            buttonLoadingMessage="Submitting..."
            buttonRuntimeProps={{
              disabled: submitting,
            }}
            
            userMessagesSuccessMessageText={submitSuccess ? "Thank you for signing our guestbook!" : ""}
            userMessagesErrorMessageText={submitError || ""}
            
            formComponentRuntimeProps={{
              onSubmit: handleSubmit,
            }}
          />
        }
        guestbookSubHeadingSlot={
          <GuestbookSubHeading
            headline="Messages from Our Loved Ones"
            subHeadlineText={`See what ${entries.length} ${entries.length === 1 ? 'person has' : 'people have'} shared`}
          />
        }
        guestbookNamesHeadingSlot={
          <GuestbookNamesHeading namesHeadlineText="Recent Entries" />
        }
        guestbookCountSlot={
          <GuestbookCount
            guestbookCountText={`${filteredEntries.length} ${filteredEntries.length === 1 ? 'Entry' : 'Entries'}`}
          />
        }
        filterTagsSlot={
          <FilterTagsSlots
            filterTagSlot={
              <>
                <GuestbookFilterTag
                  tagText="All"
                  tagRuntimeProps={{
                    onClick: () => handleTagFilter(null),
                    style: {
                      opacity: selectedTag === null ? 1 : 0.6,
                      cursor: 'pointer',
                    },
                  }}
                />
                {uniqueRelationships.map((relationship) => (
                  <GuestbookFilterTag
                    key={relationship}
                    tagText={relationship}
                    tagRuntimeProps={{
                      onClick: () => handleTagFilter(relationship),
                      style: {
                        opacity: selectedTag === relationship ? 1 : 0.6,
                        cursor: 'pointer',
                      },
                    }}
                  />
                ))}
              </>
            }
          />
        }
        guestbookCardSlot={
          loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
          ) : currentEntries.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>No entries yet. Be the first to sign our guestbook!</div>
          ) : (
            <>
              {currentEntries.map((entry) => (
                <GuestbookCard
                  key={entry.id}
                  nameFullName={entry.name}
                  locationLocationText={entry.location || 'Location not provided'}
                  locationVisibility={entry.location ? 'visible' : 'hidden'}
                  howWeMetHowWeMetText={entry.firstMet || 'Not specified'}
                  howWeMetVisibility={entry.firstMet ? 'visible' : 'hidden'}
                  messageMessageText={entry.message || 'No message provided'}
                  messageVisibility={entry.message ? 'visible' : 'hidden'}
                  tag1Text={entry.relationship || ''}
                  tag1Visibility={entry.relationship ? 'visible' : 'hidden'}
                  guestbookDateDateLabel="Signed on"
                  guestbookDateGuestbookDate={formatDate(entry.createdAt)}
                  viewMessageButtonButtonText="View Full Message"
                  cardDetailsButtonButtonText="Close"
                  messageHeadingText="Message"
                  howWeMetHeadingText="How We Met"
                  messageMessageHeading="Their Message"
                />
              ))}
            </>
          )
        }
        filterPreviousNextSlot={
          totalPages > 1 ? (
            <FilterPreviousNextSlots
              previousButtonSlot={
                <ButtonNextPrevious
                  buttonText="Previous"
                  buttonRuntimeProps={{
                    onClick: goToPreviousPage,
                    disabled: currentPage === 1,
                    style: {
                      opacity: currentPage === 1 ? 0.5 : 1,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    },
                  }}
                />
              }
              nextButtonSlot={
                <ButtonNextPrevious
                  buttonText="Next"
                  buttonRuntimeProps={{
                    onClick: goToNextPage,
                    disabled: currentPage === totalPages,
                    style: {
                      opacity: currentPage === totalPages ? 0.5 : 1,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    },
                  }}
                />
              }
              currentPageText={`Page ${currentPage} of ${totalPages}`}
            />
          ) : null
        }
      />
    </DevLinkProvider>
  );
}

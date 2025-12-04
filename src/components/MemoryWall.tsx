import React, { useEffect, useState, useRef } from 'react';
import { baseUrl } from '../lib/base-url';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { MemoryWallHeading } from '../site-components/MemoryWallHeading';
import { MemoryCard1X1 } from '../site-components/MemoryCard1X1';
import { MemoryForm } from './MemoryForm';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface Memory {
  id: string;
  headline: string;
  memory: string;
  name: string;
  email?: string | null;
  mediaKey?: string | null;
  mediaType?: string | null;
  tags?: string[];
  createdAt: string;
  memoryDate?: string | null;
  location?: string | null;
  likes: number;
}

const LAYOUT_PATTERNS = [
  { variant: '1x1', color: 'Primary' },
  { variant: '2x3', color: 'Secondary' },
  { variant: '1x1', color: 'Tertiary' },
  { variant: '3x2', color: 'Primary' },
  { variant: '1x1', color: 'Secondary Accet' },
  { variant: '2x3', color: 'Tertiary Accent' },
  { variant: '1x1', color: 'Primary' },
  { variant: '3x2', color: 'Secondary' },
] as const;

export function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMemories();
  }, []);

  useEffect(() => {
    if (gridRef.current && memories.length > 0) {
      const cards = gridRef.current.querySelectorAll('.component-color-variant');
      
      cards.forEach((card) => {
        const clickHandler = () => {
          const bottomContent = card.querySelector('.memory-wall_botom-content.is-primary') as HTMLElement;
          const colorCard = card.querySelector('.color-card-2') as HTMLElement;
          
          if (bottomContent) {
            const isFlipped = bottomContent.style.opacity === '1';
            
            if (isFlipped) {
              bottomContent.style.opacity = '0';
              if (colorCard) colorCard.style.opacity = '1';
            } else {
              bottomContent.style.opacity = '1';
              if (colorCard) colorCard.style.opacity = '0';
            }
          }
        };
        
        card.removeEventListener('click', clickHandler as any);
        card.addEventListener('click', clickHandler);
      });
    }
  }, [memories]);

  const fetchMemories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/memories`);
      if (response.ok) {
        const data: Memory[] = await response.json();
        setMemories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching memories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMemoryAdded = () => {
    setIsDialogOpen(false);
    fetchMemories();
  };

  const allTags = Array.from(
    new Set(
      memories.flatMap(m => m.tags || [])
    )
  ).slice(0, 6);

  const filteredMemories = activeTag
    ? memories.filter(m => m.tags?.includes(activeTag))
    : memories;

  const getMediaUrl = (memory: Memory) => {
    if (!memory.mediaKey) return undefined;
    return `${baseUrl}/api/media/${memory.mediaKey}`;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return '';
    }
  };

  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return '1 day ago';
      if (diffInDays < 30) return `${diffInDays} days ago`;
      if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
      }
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } catch {
      return '';
    }
  };

  const getLayoutPattern = (index: number) => {
    return LAYOUT_PATTERNS[index % LAYOUT_PATTERNS.length];
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        fontFamily: 'var(--body-font)',
        color: 'var(--foreground)',
        backgroundColor: 'var(--background)'
      }}>
        Loading memories...
      </div>
    );
  }

  return (
    <DevLinkProvider>
      <div style={{ 
        backgroundColor: 'var(--background)',
        padding: '3rem 1rem',
        minHeight: '50vh'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto'
        }}>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div style={{ cursor: 'pointer' }}>
                <MemoryWallHeading
                  title="Share Your Memories"
                  buttonFilledButtonText="Add Memory"
                  buttonFilledVariant="Primary"
                  tag1Text={allTags[0] || 'All'}
                  tag1Variant={!activeTag || activeTag === allTags[0] ? 'Primary' : 'Primary Outline'}
                  tag1Visibility={undefined}
                  tag2Text={allTags[1] || 'Family'}
                  tag2Variant={activeTag === allTags[1] ? 'Primary' : 'Primary Outline'}
                  tag2Visibility={allTags[1] ? undefined : { hidden: true }}
                  tag3Text={allTags[2]}
                  tag3Variant={activeTag === allTags[2] ? 'Primary' : 'Primary Outline'}
                  tag3Visibility={allTags[2] ? undefined : { hidden: true }}
                  tag5Text={allTags[3]}
                  tag5Variant={activeTag === allTags[3] ? 'Primary' : 'Primary Outline'}
                  tag5Visibility={allTags[3] ? undefined : { hidden: true }}
                  tag6Text={allTags[4]}
                  tag6Variant={activeTag === allTags[4] ? 'Primary' : 'Primary Outline'}
                  tag6Visibility={allTags[4] ? undefined : { hidden: true }}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <MemoryForm onSuccess={handleMemoryAdded} />
            </DialogContent>
          </Dialog>

          <div 
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, 375px)',
              gridAutoRows: '375px',
              gap: '1.5rem',
              marginTop: '3rem',
              justifyContent: 'center'
            }}
          >
            {filteredMemories.map((memory, index) => {
              const mediaUrl = getMediaUrl(memory);
              const pattern = getLayoutPattern(index);
              
              let gridColumn = 'span 1';
              let gridRow = 'span 1';
              
              if (pattern.variant === '3x2') {
                gridColumn = 'span 2';
                gridRow = 'span 1';
              } else if (pattern.variant === '2x3') {
                gridColumn = 'span 1';
                gridRow = 'span 2';
              }
              
              return (
                <div
                  key={memory.id}
                  style={{
                    gridColumn,
                    gridRow,
                  }}
                >
                  <MemoryCard1X1
                    componentSizeVariantCardSizeVariant={pattern.variant as any}
                    optionsCardColorVariant={pattern.color as any}
                    imageImage={mediaUrl && memory.mediaType === 'photo' ? mediaUrl : undefined}
                    imageAltText={memory.headline}
                    imageVisibility={!!(mediaUrl && memory.mediaType === 'photo')}
                    metaMemoryData={formatDate(memory.memoryDate)}
                    previewMemoryHeadline={memory.headline}
                    previewMemoryHeadlineTag="h3"
                    metaPostedByName={`Shared by: ${memory.name}`}
                    detailMemoryDetail={memory.memory}
                    detailLikeIconVisibility={undefined}
                    detailLocationText={memory.location || 'Location not specified'}
                    metaTimeIndicator={getTimeAgo(memory.createdAt)}
                    cardVisability={true}
                  />
                </div>
              );
            })}
          </div>

          {filteredMemories.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              fontFamily: 'var(--body-font)',
              fontSize: '1.25rem',
              color: 'var(--muted-foreground)'
            }}>
              <p>
                {activeTag ? `No memories found with tag "${activeTag}"` : 'No memories yet. Be the first to share!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DevLinkProvider>
  );
}

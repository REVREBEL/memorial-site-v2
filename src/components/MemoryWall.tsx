import React, { useEffect, useState, useCallback } from 'react';
import { baseUrl } from '../lib/base-url';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { MemoryWallHeading } from '../site-components/MemoryWallHeading';
import { MemoryCard1X1 } from '../site-components/MemoryCard1X1';
import { MemoryFormWrapper } from './MemoryFormWrapper';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';

// Database response format (snake_case)
interface MemoryAPI {
  id: string;
  headline: string;
  memory: string;
  name: string;
  email?: string | null;
  media_key?: string | null;
  media_type?: string | null;
  tags?: string[];
  created_at: string;
  memory_date?: string | null;
  location?: string | null;
}

// Internal format (camelCase)
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
  const [activeTag, setActiveTag] = useState<string>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, []);

  // Convert API response to internal format
  const convertMemory = (apiMemory: MemoryAPI): Memory => ({
    id: apiMemory.id,
    headline: apiMemory.headline,
    memory: apiMemory.memory,
    name: apiMemory.name,
    email: apiMemory.email,
    mediaKey: apiMemory.media_key,
    mediaType: apiMemory.media_type,
    tags: apiMemory.tags || [],
    createdAt: apiMemory.created_at,
    memoryDate: apiMemory.memory_date,
    location: apiMemory.location,
    likes: 0, // TODO: Fetch likes from likes table
  });

  const fetchMemories = async () => {
    try {
      console.log('🔄 [MemoryWall] Fetching memories from:', `${baseUrl}/api/memory_journal`);
      const response = await fetch(`${baseUrl}/api/memory_journal`);
      
      if (!response.ok) {
        console.error('❌ [MemoryWall] Failed to fetch:', response.status, response.statusText);
        throw new Error(`Failed to fetch memories: ${response.statusText}`);
      }
      
      const data = await response.json() as MemoryAPI[];
      console.log('✅ [MemoryWall] Fetched memories:', data.length, 'items');
      
      const converted = Array.isArray(data) ? data.map(convertMemory) : [];
      setMemories(converted);
    } catch (err) {
      console.error('❌ [MemoryWall] Error fetching memories:', err);
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMemoryAdded = () => {
    console.log('✅ [MemoryWall] Memory added, refreshing list');
    setIsDialogOpen(false);
    fetchMemories();
  };

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottomContent = target.querySelector('.memory-wall_botom-content.is-primary') as HTMLElement;
    const colorCard = target.querySelector('.color-card-2') as HTMLElement;
    
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
  }, []);

  // Get unique tags from all memories
  const allTags = Array.from(
    new Set(
      memories.flatMap(m => m.tags || [])
    )
  ).sort();

  // Filter memories based on active tag
  const filteredMemories = activeTag === 'All'
    ? memories
    : memories.filter(m => m.tags?.includes(activeTag));

  const getMediaUrl = (memory: Memory) => {
    if (!memory.mediaKey) {
      return undefined;
    }
    return `${baseUrl}/api/media/${memory.mediaKey}`;
  };

  // Format date as "Month Year" for the top date component
  const formatMonthYear = (dateString?: string | null) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return '';
    }
  };

  // Format relative time for the bottom indicator
  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';
      
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
      return 'Recently';
    }
  };

  const getLayoutPattern = (index: number) => {
    return LAYOUT_PATTERNS[index % LAYOUT_PATTERNS.length];
  };

  // Handle tag clicks
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTag(tag);
  };

  // Handle add memory button click
  const handleAddMemoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
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
          {/* Memory Wall Heading - Custom implementation */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 
              style={{ 
                fontFamily: 'var(--heading-font)',
                fontSize: '2.5rem',
                marginBottom: '2rem',
                color: 'var(--foreground)'
              }}
            >
              Share Your Memories
            </h2>
            
            {/* Filter Tags */}
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={(e) => handleTagClick(e, 'All')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  border: activeTag === 'All' ? 'none' : '2px solid var(--primary)',
                  backgroundColor: activeTag === 'All' ? 'var(--primary)' : 'transparent',
                  color: activeTag === 'All' ? 'var(--primary-foreground)' : 'var(--primary)',
                  fontFamily: 'var(--button-font)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                All
              </button>
              {allTags.slice(0, 5).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => handleTagClick(e, tag)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '1.5rem',
                    border: activeTag === tag ? 'none' : '2px solid var(--primary)',
                    backgroundColor: activeTag === tag ? 'var(--primary)' : 'transparent',
                    color: activeTag === tag ? 'var(--primary-foreground)' : 'var(--primary)',
                    fontFamily: 'var(--button-font)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Add Memory Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  onClick={handleAddMemoryClick}
                  style={{
                    fontFamily: 'var(--button-font)',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)'
                  }}
                >
                  Add Memory
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <MemoryFormWrapper onSuccess={handleMemoryAdded} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Memory Cards Grid */}
          <div 
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
              const hasImage = !!(mediaUrl && memory.mediaType === 'photo');
              
              let gridColumn = 'span 1';
              let gridRow = 'span 1';
              
              if (pattern.variant === '3x2') {
                gridColumn = 'span 2';
                gridRow = 'span 1';
              } else if (pattern.variant === '2x3') {
                gridColumn = 'span 1';
                gridRow = 'span 2';
              }
              
              const monthYear = formatMonthYear(memory.memoryDate);
              const timeAgo = getTimeAgo(memory.createdAt);
              
              console.log(`📇 [MemoryWall] Card ${index}:`, {
                id: memory.id,
                headline: memory.headline,
                hasImage,
                mediaUrl,
                imageVisibilityProp: hasImage // FIXED: was !hasImage
              });
              
              return (
                <div
                  key={memory.id}
                  onClick={handleCardClick}
                  style={{
                    gridColumn,
                    gridRow,
                    cursor: 'pointer'
                  }}
                >
                  <MemoryCard1X1
                    componentSizeVariantCardSizeVariant={pattern.variant as any}
                    optionsCardColorVariant={pattern.color as any}
                    imageImage={mediaUrl}
                    imageAltText={memory.headline}
                    imageVisibility={hasImage} // FIXED: was !hasImage
                    metaMemoryDate={monthYear || undefined}
                    previewMemoryHeadline={memory.headline}
                    previewMemoryHeadlineTag="h3"
                    metaPostedByName={`Posted by ${memory.name}`}
                    detailMemoryDetail={memory.memory}
                    detailLikeIconVisibility={true}
                    detailLocationText={memory.location || undefined}
                    metaTimeIndicator={timeAgo}
                  />
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredMemories.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              fontFamily: 'var(--body-font)',
              fontSize: '1.25rem',
              color: 'var(--muted-foreground)'
            }}>
              <p>
                {activeTag !== 'All' ? `No memories found with tag "${activeTag}"` : 'No memories yet. Be the first to share!'}
              </p>
              {memories.length === 0 && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="mt-4">
                      Add First Memory
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <MemoryFormWrapper onSuccess={handleMemoryAdded} />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
          
          {/* Debug Info */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: 'rgba(0,0,0,0.05)',
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          }}>
            <strong>Debug Info:</strong>
            <br />Total Memories: {memories.length}
            <br />Filtered Memories: {filteredMemories.length}
            <br />Active Tag: {activeTag}
            <br />All Tags: {allTags.join(', ') || 'none'}
            <br />
            <br />
            <strong>Recent Memories with Media:</strong>
            {memories.slice(0, 3).map((m, i) => {
              const url = getMediaUrl(m);
              const hasImg = !!(url && m.mediaType === 'photo');
              return (
                <div key={i} style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                  {i + 1}. {m.headline} - Media: {m.mediaKey ? `✅ ${m.mediaKey}` : '❌ None'}
                  <br />
                  &nbsp;&nbsp;&nbsp;Image URL: {url || '❌ No URL'}
                  <br />
                  &nbsp;&nbsp;&nbsp;Has Image: {hasImg ? '✅ YES' : '❌ NO'}
                  <br />
                  &nbsp;&nbsp;&nbsp;imageVisibility prop: {hasImg ? 'TRUE (should show image)' : 'FALSE (should hide image)'}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DevLinkProvider>
  );
}

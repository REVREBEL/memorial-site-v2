import { useState, useEffect } from 'react';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { MemoryJournalCardSlots } from '../site-components/MemoryJournalCardSlots';
import { MemoryCard } from '../site-components/MemoryCard';
import { MemoryJournalFilterTagsSlots } from '../site-components/MemoryJournalFilterTagsSlots';
import { MemoryJournalFilterTags } from '../site-components/MemoryJournalFilterTags';
import { Button as WebflowButton } from '../site-components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MemoryForm } from './MemoryForm';
import { Heart } from 'lucide-react';
import { baseUrl } from '../lib/base-url';

interface Memory {
  id: string;
  headline: string;
  name: string;
  email: string;
  photo?: string;
  video?: string;
  memory: string;
  memoryDate?: string;
  memoryLocation?: string;
  tags: string[];
  likes: number;
  createdAt: string;
}

export function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [likedMemories, setLikedMemories] = useState<Set<string>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from all memories
  const allTags = Array.from(new Set(memories.flatMap(m => m.tags))).sort();

  // Color variants to cycle through for cards without images
  const colorVariants: Array<"Warm Sandston" | "Rustwood Red" | "Rose Clay" | "Tertiary" | "Ocean Teal"> = [
    "Warm Sandston",
    "Rustwood Red",
    "Rose Clay",
    "Ocean Teal",
    "Tertiary"
  ];

  // Card size pattern: regular, regular, wide, regular, regular, tall, regular, wide, regular, regular, tall
  const sizePattern: Array<"1x1" | "2x3" | "3x2"> = [
    "1x1", // card 1
    "1x1", // card 2
    "3x2", // card 3 - wide
    "1x1", // card 4
    "1x1", // card 5
    "2x3", // card 6 - tall
    "1x1", // card 7
    "3x2", // card 8 - wide
    "1x1", // card 9
    "1x1", // card 10
    "2x3", // card 11 - tall
  ];

  useEffect(() => {
    fetchMemories();
    // Load liked memories from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('likedMemories');
      if (stored) {
        try {
          setLikedMemories(new Set(JSON.parse(stored)));
        } catch (e) {
          console.error('Failed to parse liked memories:', e);
        }
      }
    }
  }, []);

  const fetchMemories = async () => {
    console.log('🔄 [MemoryWall] Fetching memories...');
    setFetchError('');
    try {
      const response = await fetch(`${baseUrl}/api/memory_journal`);
      console.log('📡 [MemoryWall] Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null) as { error?: string; details?: string } | null;
        throw new Error(errorData?.details || errorData?.error || `Failed to fetch memories: ${response.status}`);
      }
      
      const data = await response.json() as Memory[];
      console.log('📦 [MemoryWall] Raw data received:', data.length, 'items');
      
      // Map backend fields to frontend fields
      const formattedData = data.map((item: any) => {
        const photoUrl = item.mediaType === 'photo' && item.mediaKey ? `${baseUrl}/api/media/${item.mediaKey}` : undefined;
        const videoUrl = item.mediaType === 'video' && item.mediaKey ? `${baseUrl}/api/media/${item.mediaKey}` : undefined;
        
        return {
          id: item.id,
          headline: item.headline,
          name: item.name,
          email: item.email,
          photo: photoUrl,
          video: videoUrl,
          memory: item.memory,
          memoryDate: item.memoryDate,
          memoryLocation: item.location,
          tags: item.tags,
          likes: item.likes,
          createdAt: item.createdAt,
        };
      });
      
      console.log('✅ [MemoryWall] Formatted memories:', formattedData.length, 'items');
      setMemories(Array.isArray(formattedData) ? formattedData : []);
    } catch (error) {
      console.error('❌ [MemoryWall] Failed to fetch memories:', error);
      setFetchError(error instanceof Error ? error.message : 'Failed to load memories');
    }
  };

  const handleLike = async (memoryId: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/memory_journal/${memoryId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like memory');
      }

      const updatedMemory = await response.json() as Memory;
      
      setMemories(prev =>
        prev.map(m => m.id === memoryId ? { ...m, likes: updatedMemory.likes } : m)
      );

      setLikedMemories(prev => {
        const newLiked = new Set(prev);
        newLiked.add(memoryId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('likedMemories', JSON.stringify(Array.from(newLiked)));
        }
        return newLiked;
      });

      if (selectedMemory?.id === memoryId) {
        setSelectedMemory({ ...selectedMemory, likes: updatedMemory.likes });
      }
    } catch (error) {
      console.error('Failed to like memory:', error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    console.log('📤 [MemoryWall] Submitting new memory...');
    
    try {
      const response = await fetch(`${baseUrl}/api/memory_journal`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorData: { error?: string; details?: string } | null = null;
        
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Server error (${response.status}): ${responseText.substring(0, 200)}`);
        }
        
        const errorMessage = errorData?.details || errorData?.error || `Failed to submit memory (${response.status})`;
        throw new Error(errorMessage);
      }

      console.log('✅ [MemoryWall] Memory submitted successfully');
      await fetchMemories();
      setShowAddForm(false);
    } catch (error) {
      console.error('❌ [MemoryWall] Failed to submit memory:', error);
      throw error;
    }
  };

  const filteredMemories = selectedTag
    ? memories.filter(m => m.tags.includes(selectedTag))
    : memories;

  // Format date for display
  const formatMemoryDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Calculate time ago for display
  const getTimeAgo = (dateStr: string) => {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Create memory card component
  const createMemoryCard = (memory: Memory, index: number) => {
    const hasImage = !!memory.photo;
    const colorVariant = colorVariants[index % colorVariants.length];
    const sizeVariant = sizePattern[index % sizePattern.length];
    
    return (
      <MemoryCard
        key={memory.id}
        componentComponentSizeVariant={sizeVariant}
        componentComponentColorVariant={colorVariant}
        topCardMemoryHeadlineText={memory.headline}
        topCardMemoryHeadlineTag="h3"
        backgroundImageMemoryCardVisibility={hasImage}
        backgroundImageMemoryCardImage={memory.photo || ''}
        backgroundImageMemoryCardImageAltText2={memory.headline}
        memoryDateTopCardMemoryDateMmmmYyyy={formatMemoryDate(memory.memoryDate)}
        sharedBySharedByText={`Shared by: ${memory.name}`}
        metaLcoationLocationText={memory.memoryLocation || ''}
        metaLcoationMetaLocationIconVisibility={!!memory.memoryLocation}
        memoryDateTopCardMetaCountTimeText={getTimeAgo(memory.createdAt)}
        readMoreButtonReadMoreButtonSlot={
          <button
            onClick={() => setSelectedMemory(memory)}
            className="text-sm text-primary hover:underline cursor-pointer"
          >
            Read More
          </button>
        }
        memoryDateBottomCardMemoryDateSlot={
          <span>{formatMemoryDate(memory.memoryDate)}</span>
        }
        memoryDetailMemoryDetailParagraph={memory.memory}
        likeIconLikeIconRuntimeProps={{
          onClick: (e: any) => {
            e.stopPropagation();
            handleLike(memory.id);
          },
        }}
      />
    );
  };

  return (
    <DevLinkProvider>
      <div>
        {/* Error Message */}
        {fetchError && (
          <div className="max-w-2xl mx-auto my-8 p-4 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-sm text-destructive">{fetchError}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMemories}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Memory Wall using Webflow layout component */}
        <MemoryJournalCardSlots
          memoryJournalMemoryJournalMainHeadlineText="Memory Wall"
          memoryJournalMainHeadlineTag="h1"
          memoryJournalMainParagraph="We invite you to share your treasured memories. In celebration of Patricia Lanning's life, we warmly invite all who knew her to share their most treasured and lasting memories."
          memoryJournalSubHeadlineText="Share your cherished memories, photos, and stories"
          memoryJournalSubHeadlineTag="h3"
          formButtonButtonSlot={
            <WebflowButton
              variant="Ocean Teal"
              buttonButtonText="Add Your Memory"
              buttonButtonRuntimeProps={{
                onClick: () => setShowAddForm(true),
              }}
            />
          }
          fIlterSlotsFIlterSlot={
            <MemoryJournalFilterTagsSlots
              allPostsFIlterTagAllPostsFIlterTagSlot={
                <MemoryJournalFilterTags
                  filterVariant={selectedTag === null ? 'All' : 'All'}
                  tagTagText="All Posts"
                  tagTagRuntimeProps={{
                    onClick: () => setSelectedTag(null),
                  }}
                />
              }
              newestFIlterTagNewestFilterTagSlot={
                <MemoryJournalFilterTags
                  filterVariant="Newest"
                  tagTagText="Newest"
                  tagTagRuntimeProps={{
                    onClick: () => setSelectedTag(null),
                  }}
                />
              }
              userFilterTagsUserFilterTagsSlot={
                <div className="flex flex-wrap gap-3">
                  {allTags.slice(0, 5).map((tag, index) => (
                    <MemoryJournalFilterTags
                      key={tag}
                      filterVariant={
                        selectedTag === tag 
                          ? 'Clear' 
                          : (`User Tag ${index + 1}` as any)
                      }
                      tagTagText={tag}
                      tagTagRuntimeProps={{
                        onClick: () => setSelectedTag(selectedTag === tag ? null : tag),
                      }}
                    />
                  ))}
                </div>
              }
            />
          }
          // Card slots - each positioned in the masonry layout
          card1CardSlot={filteredMemories[0] ? createMemoryCard(filteredMemories[0], 0) : null}
          card1CardVisibility={!!filteredMemories[0]}
          card2CardSlot={filteredMemories[1] ? createMemoryCard(filteredMemories[1], 1) : null}
          card2CardVisibility={!!filteredMemories[1]}
          card3WIdeCardSlot={filteredMemories[2] ? createMemoryCard(filteredMemories[2], 2) : null}
          card3WIdeCardSlotVisibility={!!filteredMemories[2]}
          card4CardSlot={filteredMemories[3] ? createMemoryCard(filteredMemories[3], 3) : null}
          card4CardVisibility={!!filteredMemories[3]}
          card5CardSlot={filteredMemories[4] ? createMemoryCard(filteredMemories[4], 4) : null}
          card5CardVisibility={!!filteredMemories[4]}
          card6TallCardTallSlot={filteredMemories[5] ? createMemoryCard(filteredMemories[5], 5) : null}
          card6TallCardTallVisibility={!!filteredMemories[5]}
          card7CardSlot={filteredMemories[6] ? createMemoryCard(filteredMemories[6], 6) : null}
          card7CardVisibility={!!filteredMemories[6]}
          card8WIdeCardWIdeSlot={filteredMemories[7] ? createMemoryCard(filteredMemories[7], 7) : null}
          card8WIdeCardWIdeVisibility={!!filteredMemories[7]}
          card9CardSlot={filteredMemories[8] ? createMemoryCard(filteredMemories[8], 8) : null}
          card9CardVisibility={!!filteredMemories[8]}
          card10CardSlot={filteredMemories[9] ? createMemoryCard(filteredMemories[9], 9) : null}
          card10CardVisibility={!!filteredMemories[9]}
          card11TallCardTallSlot={filteredMemories[10] ? createMemoryCard(filteredMemories[10], 10) : null}
          card11TallCardTallVisibility={!!filteredMemories[10]}
        />

        {filteredMemories.length === 0 && !fetchError && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {selectedTag
                ? `No memories found with tag "${selectedTag}"`
                : 'No memories yet. Be the first to share!'}
            </p>
          </div>
        )}

        {/* Memory Detail Dialog - Custom Component */}
        <Dialog open={!!selectedMemory} onOpenChange={(open) => !open && setSelectedMemory(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedMemory && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading mb-2">
                    {selectedMemory.headline}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">by {selectedMemory.name}</p>
                </DialogHeader>

                <div className="space-y-4">
                  {selectedMemory.photo && (
                    <img
                      src={selectedMemory.photo}
                      alt={selectedMemory.headline}
                      className="w-full rounded-lg"
                    />
                  )}
                  {selectedMemory.video && (
                    <video
                      src={selectedMemory.video}
                      controls
                      className="w-full rounded-lg"
                    />
                  )}

                  {(selectedMemory.memoryDate || selectedMemory.memoryLocation) && (
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {selectedMemory.memoryDate && (
                        <div>📅 {formatMemoryDate(selectedMemory.memoryDate)}</div>
                      )}
                      {selectedMemory.memoryLocation && (
                        <div>📍 {selectedMemory.memoryLocation}</div>
                      )}
                    </div>
                  )}

                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{selectedMemory.memory}</p>
                  </div>

                  {selectedMemory.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedMemory.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={() => handleLike(selectedMemory.id)}
                      disabled={likedMemories.has(selectedMemory.id)}
                      className="gap-2"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedMemories.has(selectedMemory.id)
                            ? 'fill-red-500 text-red-500'
                            : ''
                        }`}
                      />
                      {selectedMemory.likes} {selectedMemory.likes === 1 ? 'Like' : 'Likes'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Memory Dialog - Custom Component */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent 
            className="wide-dialog w-[95vw] max-w-[1400px]"
            style={{ width: '95vw', maxWidth: '1400px' }}
          >
            <DialogHeader className="pb-4">
              <DialogTitle className="text-3xl font-heading mb-2">Share Your Memory</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Fill out the form below to share your cherished memory with everyone
              </p>
            </DialogHeader>
            <MemoryForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </DevLinkProvider>
  );
}

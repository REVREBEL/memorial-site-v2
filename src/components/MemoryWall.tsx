import { useState, useEffect } from 'react';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { MemoryJournalHeading } from '../site-components/MemoryJournalHeading';
import { MemoryJournalFilterTags } from '../site-components/MemoryJournalFilterTags';
import { MemoryJournalCardSlots } from '../site-components/MemoryJournalCardSlots';
import { MemoryCard } from '../site-components/MemoryCard';
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

  return (
    <DevLinkProvider>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Webflow component */}
          <MemoryJournalHeading
            memoryJournalMemoryJournalHeadingText="Memory Wall"
            memoryJournalMemoryWallHeadlineTag="h1"
            memoryJournalMemoryJournalSubHeadlineText="Share your cherished memories, photos, and stories"
            buttonFilledButtonFIlledSlot={
              <WebflowButton
                variant="Ocean Teal"
                buttonButtonText="Add Your Memory"
                buttonButtonRuntimeProps={{
                  onClick: () => setShowAddForm(true),
                }}
              />
            }
            filterTagsFilterTagsSlot={
              <div className="flex flex-wrap gap-3 justify-center">
                {/* All filter */}
                <MemoryJournalFilterTags
                  filterVariant={selectedTag === null ? 'Clear' : 'All'}
                  tagTagText="All Posts"
                  tagTagRuntimeProps={{
                    onClick: () => setSelectedTag(null),
                  }}
                />
                
                {/* Newest filter */}
                <MemoryJournalFilterTags
                  filterVariant="Newest"
                  tagTagText="Newest"
                  tagTagRuntimeProps={{
                    onClick: () => setSelectedTag(null),
                  }}
                />
                
                {/* User generated tags */}
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
                      onClick: () => setSelectedTag(tag),
                    }}
                  />
                ))}
              </div>
            }
          />

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

          {/* Memory Grid with Webflow component */}
          <div className="mt-12">
            <MemoryJournalCardSlots
              memoryJournalCardSlosMemoryJournalCardSlot={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      componentComponentSizeVariant="1x1"
                      componentComponentColorVariant="Primary"
                      topCardMemoryHeadlineText={memory.headline}
                      topCardMemoryHeadlineTag="h3"
                      backgroundImageMemoryCardImage={memory.photo || ''}
                      backgroundImageMemoryCardImageAltText2={memory.headline}
                      backgroundImageMemoryCardVisibility={!!memory.photo}
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
                  ))}
                </div>
              }
            />
          </div>

          {filteredMemories.length === 0 && !fetchError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {selectedTag
                  ? `No memories found with tag "${selectedTag}"`
                  : 'No memories yet. Be the first to share!'}
              </p>
            </div>
          )}

          {/* Memory Detail Dialog */}
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

          {/* Add Memory Dialog */}
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
      </div>
    </DevLinkProvider>
  );
}

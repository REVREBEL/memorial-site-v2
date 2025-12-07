import { useState, useEffect } from 'react';
import { MemoryCard } from './MemoryCard';
import { MemoryDetailDialog } from './MemoryDetailDialog';
import { MemoryForm } from './MemoryForm';
import { baseUrl } from '../lib/base-url';

interface Memory {
  id: number;
  name: string;
  email?: string;
  headline: string;
  memory: string;
  memory_date?: string;
  location?: string;
  tags?: string;
  media_key?: string;
  media_type?: string;
  created_at: string;
}

export function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/memory_journal`);
      if (!response.ok) throw new Error('Failed to load memories');
      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error('Error loading memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMemorySubmit = () => {
    setShowForm(false);
    loadMemories();
  };

  const filteredMemories = activeFilter
    ? memories.filter(m => m.tags?.split(',').map(t => t.trim()).includes(activeFilter))
    : memories;

  // Get unique tags from all memories
  const allTags = Array.from(
    new Set(
      memories
        .filter(m => m.tags)
        .flatMap(m => m.tags!.split(',').map(t => t.trim()))
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Loading memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Memory Wall</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Share your favorite memories and stories
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
          >
            Add Your Memory
          </button>
        </div>

        {/* Filter Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Memory Grid */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {activeFilter ? `No memories with tag "${activeFilter}"` : 'No memories yet. Be the first to share!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                onClick={() => setSelectedMemory(memory)}
                className="cursor-pointer"
              >
                <MemoryCard
                  headline={memory.headline}
                  memory={memory.memory}
                  name={memory.name}
                  memoryDate={memory.memory_date}
                  location={memory.location}
                  tags={memory.tags}
                  mediaKey={memory.media_key}
                  mediaType={memory.media_type}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Memory Detail Dialog */}
      {selectedMemory && (
        <MemoryDetailDialog
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}

      {/* Memory Form Dialog */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Share a Memory</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <MemoryForm onSuccess={handleMemorySubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

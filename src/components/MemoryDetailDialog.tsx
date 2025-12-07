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

interface Props {
  memory: Memory;
  onClose: () => void;
}

export function MemoryDetailDialog({ memory, onClose }: Props) {
  const mediaUrl = memory.media_key ? `${baseUrl}/api/media/${memory.media_key}` : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Media */}
          {mediaUrl && (
            <div className="mb-6">
              {memory.media_type?.startsWith('image/') ? (
                <img
                  src={mediaUrl}
                  alt={memory.headline}
                  className="w-full h-auto rounded-lg"
                />
              ) : memory.media_type?.startsWith('video/') ? (
                <video
                  src={mediaUrl}
                  controls
                  className="w-full h-auto rounded-lg"
                />
              ) : null}
            </div>
          )}

          {/* Headline */}
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {memory.headline}
          </h2>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div>
              <span className="font-semibold">By:</span> {memory.name}
            </div>
            {memory.memory_date && (
              <div>
                <span className="font-semibold">Date:</span> {new Date(memory.memory_date).toLocaleDateString()}
              </div>
            )}
            {memory.location && (
              <div>
                <span className="font-semibold">Location:</span> {memory.location}
              </div>
            )}
          </div>

          {/* Memory Text */}
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-foreground whitespace-pre-wrap">{memory.memory}</p>
          </div>

          {/* Tags */}
          {memory.tags && (
            <div className="flex flex-wrap gap-2">
              {memory.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

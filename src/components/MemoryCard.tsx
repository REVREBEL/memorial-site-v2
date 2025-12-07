import { baseUrl } from '../lib/base-url';

interface Props {
  headline: string;
  memory: string;
  name: string;
  memoryDate?: string;
  location?: string;
  tags?: string;
  mediaKey?: string;
  mediaType?: string;
}

export function MemoryCard({
  headline,
  memory,
  name,
  memoryDate,
  location,
  tags,
  mediaKey,
  mediaType,
}: Props) {
  const mediaUrl = mediaKey ? `${baseUrl}/api/media/${mediaKey}` : null;
  const truncatedMemory = memory.length > 150 ? memory.substring(0, 150) + '...' : memory;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Media */}
      {mediaUrl && (
        <div className="w-full aspect-video bg-muted">
          {mediaType?.startsWith('image/') ? (
            <img
              src={mediaUrl}
              alt={headline}
              className="w-full h-full object-cover"
            />
          ) : mediaType?.startsWith('video/') ? (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
          ) : null}
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2">
          {headline}
        </h3>

        <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
          {truncatedMemory}
        </p>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">By:</span> {name}
          </div>

          {memoryDate && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Date:</span>{' '}
              {new Date(memoryDate).toLocaleDateString()}
            </div>
          )}

          {location && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Location:</span> {location}
            </div>
          )}

          {tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
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

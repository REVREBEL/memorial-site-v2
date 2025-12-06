import { MemoryCard } from '../site-components/MemoryCard';
import { format, formatDistanceToNow } from 'date-fns';

interface MemoryCardWebflowProps {
  id: string;
  headline: string;
  name: string;
  photo?: string;
  video?: string;
  memory: string;
  memoryDate?: string;
  memoryLocation?: string;
  tags: string[];
  likes: number;
  createdAt: string;
  onClick?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
  sizeVariant?: '1x1' | '2x3' | '3x2';
  colorVariant?: 'Primary' | 'Secondary' | 'Secondary Accet' | 'Tertiary' | 'Tertiary Accent';
}

export function MemoryCardWebflow({
  id,
  headline,
  name,
  photo,
  video,
  memory,
  memoryDate,
  memoryLocation,
  tags,
  likes,
  createdAt,
  onClick,
  onLike,
  isLiked = false,
  sizeVariant = '1x1',
  colorVariant = 'Primary',
}: MemoryCardWebflowProps) {
  // Format the memory date for display
  const formattedMemoryDate = memoryDate 
    ? (() => {
        try {
          return format(new Date(memoryDate), 'MMMM yyyy');
        } catch {
          return memoryDate;
        }
      })()
    : undefined;

  // Format "X time ago" text
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch {
      return '';
    }
  })();

  // Determine if we have media
  const hasMedia = Boolean(photo || video);

  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <MemoryCard
        // Component settings
        componentComponentId={id}
        componentComponentSizeVariant={sizeVariant}
        componentComponentColorVariant={colorVariant}
        
        // Top Card - Headline
        topCardMemoryHeadlineTag="h3"
        topCardMemoryHeadlineText={headline}
        
        // Background Image
        backgroundImageMemoryCardVisibility={hasMedia ? 'visible' : 'hidden'}
        backgroundImageMemoryCardImage={
          photo ? {
            src: photo,
            alt: headline,
            loading: 'lazy' as const,
          } : undefined
        }
        backgroundImageMemoryCardImageAltText2={headline}
        
        // Memory Date (Top Card - displayed as MMMM YYYY)
        memoryDateTopCardMemoryDateMmmmYyyy={formattedMemoryDate}
        
        // Shared By
        sharedBySharedByText={`Shared by: ${name}`}
        
        // Location
        metaLcoationMetaLocationIconVisibility={memoryLocation ? 'visible' : 'hidden'}
        metaLcoationLocationText={memoryLocation}
        
        // Read More Button
        readMoreButtonReadMoreButtonText="Read More"
        
        // Bottom Card - Memory Date
        memoryDateBottomCardMemoryDateSlot={
          formattedMemoryDate ? (
            <div className="text-sm text-muted-foreground">
              {formattedMemoryDate}
            </div>
          ) : undefined
        }
        
        // Bottom Card - Memory Detail (full text)
        memoryDetailMemoryDetailParagraph={memory}
        
        // Like Icon
        likeIconLikeIconVisibility="visible"
        likeIconLikeIconRuntimeProps={
          onLike ? {
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
              onLike();
            },
            style: {
              cursor: 'pointer',
              color: isLiked ? '#ef4444' : undefined,
              fill: isLiked ? '#ef4444' : undefined,
            },
          } : undefined
        }
        
        // Time ago text
        memoryDateTopCardMetaCountTimeText={timeAgo}
      />
    </div>
  );
}

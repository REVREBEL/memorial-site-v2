# Memory Wall Redesign with Webflow Components

## Overview
The Memory Wall has been completely rebuilt using your Webflow design components for a consistent, branded experience.

## Components Used

### 1. **Memory Wall Heading**
- Displays the section title "Memory Wall"
- Includes "Add Your Memory" button with Primary variant
- Shows up to 4 tag filters (tag1, tag2, tag3, tag6) for filtering memories
- Tags toggle between Primary (active) and Primary Outline (inactive) variants

### 2. **Memory Card 1x1**
- Used for displaying individual memories
- Supports three size variants:
  - **1x1**: 375px × 375px (single cell)
  - **2x3**: 750px × 375px (spans 2 columns)
  - **3x2**: 375px × 750px (spans 3 columns)
- Five color variants cycle through when no photo is uploaded:
  - Primary
  - Secondary
  - Secondary Accent
  - Tertiary
  - Tertiary Accent
- When a photo is uploaded, it displays as the card background

### 3. **Button Filled**
- Used in the Memory Wall Heading
- Primary variant for consistency

### 4. **Tag**
- Used for tag filters in the header
- Supports Primary and Primary Outline variants

## Responsive Grid Layout

The memory wall uses a responsive CSS Grid:

- **Mobile** (default): 1 column
- **Tablet** (sm: 640px+): 2 columns  
- **Desktop** (lg: 1024px+): 3 columns
- **Large Desktop** (xl: 1280px+): 4 columns

Each grid cell is 375px tall, matching your card specifications.

## Card Layout Pattern

Cards follow a repeating pattern for visual variety:
1. 1x1 card (single cell)
2. 1x1 card (single cell)
3. 2x3 card (spans 2 columns, 3 rows)
4. 1x1 card (single cell)
5. 3x2 card (spans 3 columns, 2 rows)
6. 1x1 card (single cell)
7. 1x1 card (single cell)
*Pattern repeats...*

## Features

### Photo Upload
- When users upload a photo, it displays as the card background
- Images are properly sized and cropped using `object-fit: cover`
- Photos are stored in Cloudflare R2 and served via the media API

### Color Variants
- When no photo is uploaded, cards cycle through the 5 color variants
- Creates a vibrant, varied wall of memories
- Matches your brand color palette

### Tag Filtering
- Up to 4 unique tags are displayed as filter buttons
- Click a tag to filter memories by that tag
- Active tag is highlighted in Primary color
- Inactive tags shown in Primary Outline

### Memory Details
- Click any card to open a detailed view in a dialog
- Shows full memory text, photo/video, location, date, tags
- Scrollable for longer content

### Add Memory Form
- Opens in a large dialog (max 1400px wide)
- Uses existing MemoryForm component
- Includes all fields: headline, name, email, date, location, tags, media

## CSS Enhancements

Added specific overrides to ensure cards display correctly:

```css
/* Force memory cards to fill their grid area */
[class*="MemoryCard"] {
  width: 100% !important;
  height: 100% !important;
}

/* Override any hardcoded widths on memory card images */
[class*="MemoryCard"] img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}
```

## Technical Implementation

### File Changes
1. **src/components/MemoryWall.tsx** - Rebuilt with Webflow components
2. **src/styles/global.css** - Added memory card sizing overrides

### Data Flow
1. Memories are fetched from `/api/memories`
2. Photos are served from `/api/media/[key]`
3. Form submissions POST to `/api/memories`
4. Real-time updates when new memories are added

### DevLink Integration
- Component is wrapped in `DevLinkProvider`
- Imports from `src/site-components/`
- Uses typed props from Webflow component definitions

## Testing Checklist

- [ ] Cards display in correct grid layout at all screen sizes
- [ ] Photos upload and display correctly
- [ ] Color variants cycle properly for cards without photos
- [ ] Tag filters work to show/hide relevant memories
- [ ] "Add Memory" button opens form dialog
- [ ] Form submission adds new memory to wall
- [ ] Card click opens detail dialog
- [ ] All text uses correct brand fonts
- [ ] Responsive behavior works on mobile, tablet, desktop

## Future Enhancements

Potential improvements:
- Add infinite scroll or pagination for large memory sets
- Implement tag click filtering on cards
- Add animations for card hover states
- Support video thumbnails in cards
- Add sorting options (newest, oldest, most liked)

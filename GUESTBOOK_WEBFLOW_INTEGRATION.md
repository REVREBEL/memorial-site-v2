# Guestbook Webflow Component Integration

## Overview
The guestbook page now uses your Webflow-designed components for a cohesive look and feel across the entire site.

## Components Used

### Main Components
- **GuestbookMainHeading**: The header/hero section for the guestbook page
- **GuestbookCount**: Displays the total number of guest book entries
- **GuestbookCard**: Individual guest book entry cards with color variants

### Form Field Components
- **NameFormField**: Name input field
- **LocationFormField**: Location input field
- **FirstMetFormField**: "When did you first meet?" input field
- **RelationshipFormField**: Dropdown selector for relationship type
- **MessageFormField**: Textarea for the guest's message
- **EmailFormField**: Email input field

## Features

### Visual Design
- All components styled via your Webflow design system
- Rotating card colors (6 variants): Warm Sandston, Slate Navy, Slate Blue, Ocean Teal, Rustwood Red, Rose Clay
- Responsive grid layout for entry cards
- Consistent typography and spacing

### Functionality
- Real-time character count for message field
- Form validation (required fields, email format)
- Success/error message display
- Loading state while fetching entries
- Automatic addition of new entries to the top of the list
- Date formatting (Month YYYY format)

### Database Integration
- Fetches entries from the D1 database
- Posts new entries via API
- Handles optional fields (first_met)
- Type-safe TypeScript interfaces

## File Structure

```
src/
├── components/
│   └── GuestBookWrapper.tsx          # Main integration component
├── pages/
│   └── guestbook.astro               # Guestbook page
├── site-components/                  # Auto-generated Webflow components
│   ├── GuestbookMainHeading.jsx
│   ├── GuestbookCount.jsx
│   ├── GuestbookCard.jsx
│   ├── NameFormField.jsx
│   ├── LocationFormField.jsx
│   ├── FirstMetFormField.jsx
│   ├── RelationshipFormField.jsx
│   ├── MessageFormField.jsx
│   └── EmailFormField.jsx
└── pages/api/
    └── guestbook/
        └── index.ts                  # API endpoint for guest book entries
```

## Maintenance

### Adding New Relationship Types
Edit the `RELATIONSHIPS` array in `GuestBookWrapper.tsx`:

```typescript
const RELATIONSHIPS = [
  'Family',
  'Friend',
  'Relative',
  'Business Partner',
  'Church Friend',
  'Co-Worker',
  'Never Met Directly',
];
```

### Changing Card Colors
The color rotation is defined in the `CARD_COLORS` array. These must match the color variants available in your Webflow GuestbookCard component.

### Updating Form Fields
If you add or modify fields in Webflow, make sure to:
1. Re-export the components using Webflow CLI
2. Update the TypeScript interfaces in `GuestBookWrapper.tsx`
3. Update the database schema if needed
4. Update the API endpoint validation

## Cleanup Script

A new npm script has been added to clean up temporary files when the dev environment runs out of space:

```bash
npm run cleanup
```

This will remove:
- /tmp/* files
- /var/tmp/* files  
- npm cache
- local cache files
- lost+found files
- dist build folder

## Next Steps

The guestbook is now fully integrated with your Webflow design system. If you want to customize the layout or add more features, edit the `GuestBookWrapper.tsx` file while keeping the Webflow component prop structures intact.

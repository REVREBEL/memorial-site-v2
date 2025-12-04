# Memory Form Layout Fix

## Problem
The Memory Form dialog was displaying in a cramped space (465x268px) instead of utilizing the available dialog width and height. The form needed to display at approximately 600px height with proper column distribution.

## Root Cause
The auto-generated Webflow CSS in `src/site-components/global.css` included a `.grid` class with fixed dimensions:

```css
.grid {
  grid-auto-columns: auto;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: repeat(auto-fit, 200px);
}
```

This constraint was forcing any element with the `grid` class to have 200px × 200px dimensions, severely limiting the form layout.

## Solution

### 1. Override Webflow's .grid Class
Added permanent overrides in `src/styles/global.css` with `!important` flags:

```css
/* ============================================
   CRITICAL FIX: Override Webflow's .grid class
   ============================================
   The auto-generated Webflow CSS includes a .grid class
   with fixed 200px dimensions that breaks our form layout.
   This override ensures proper flexbox behavior.
*/
.grid {
  grid-auto-columns: auto !important;
  grid-auto-rows: auto !important;
  grid-template-columns: none !important;
  grid-template-rows: none !important;
}

/* More specific override for dialog content grid */
[data-slot="dialog-content"] .grid,
[data-radix-dialog-content] .grid {
  display: grid !important;
  grid-auto-columns: 1fr !important;
  grid-auto-rows: auto !important;
  grid-template-columns: unset !important;
  grid-template-rows: unset !important;
}
```

### 2. Updated Form Structure
Replicated the working 3-column layout structure in `MemoryForm.tsx`:

```tsx
<form className="flex flex-col gap-6">
  {/* Headline - Full Width */}
  <div>...</div>

  {/* Three Column Layout */}
  <div className="flex flex-col lg:flex-row gap-6 flex-1">
    {/* LEFT COLUMN - lg:w-1/3 */}
    <div className="flex flex-col gap-4 lg:w-1/3">
      {/* Name, Email, Date, Location, Tags */}
    </div>

    {/* MIDDLE COLUMN - lg:w-1/3 */}
    <div className="flex flex-col lg:w-1/3">
      {/* Memory Textarea with min-h-[500px] */}
    </div>

    {/* RIGHT COLUMN - lg:w-1/3 */}
    <div className="flex flex-col lg:w-1/3">
      {/* Media Upload with min-h-[500px] */}
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end gap-3 pt-6 border-t">...</div>
</form>
```

### 3. Updated Dialog Configuration
Updated `MemoryWall.tsx` to ensure proper dialog sizing:

```tsx
<Dialog open={showAddForm} onOpenChange={setShowAddForm}>
  <DialogContent 
    className="memory-form-dialog !p-8 !max-h-[92vh] overflow-y-auto"
    style={{ 
      width: '95vw', 
      maxWidth: '1400px',
      height: 'auto'
    }}
  >
    <DialogHeader className="pb-6">
      <DialogTitle className="text-3xl font-heading mb-2">
        Share Your Memory
      </DialogTitle>
      <p className="text-base text-muted-foreground">
        Fill out the form below to share your cherished memory with everyone
      </p>
    </DialogHeader>
    <MemoryForm onSubmit={handleSubmit} />
  </DialogContent>
</Dialog>
```

## Result

The Memory Form now displays with:
- ✅ **Full 1400px width** dialog (or 95vw on smaller screens)
- ✅ **Three equal columns** (~450px each at max width)
- ✅ **500px minimum height** for textarea and media upload areas
- ✅ **Beautiful, spacious layout** that uses all available dialog space
- ✅ **Protection against future Webflow CSS regenerations** via `!important` overrides

## Key Files Modified

1. **src/styles/global.css** - Added permanent `.grid` class overrides
2. **src/components/MemoryForm.tsx** - Updated layout structure to use 3-column flexbox
3. **src/components/MemoryWall.tsx** - Updated dialog configuration and sizing

## Why This Works

The override in `src/styles/global.css` is loaded AFTER the Webflow-generated CSS, and uses `!important` flags to ensure it takes precedence. This means even if Webflow regenerates `src/site-components/global.css` with the problematic `.grid` class, our override will continue to work.

The three-column layout uses Tailwind's responsive utilities:
- `flex flex-col lg:flex-row` - Stacks vertically on mobile, horizontal on desktop
- `lg:w-1/3` - Each column takes exactly 1/3 of the width on large screens
- `gap-6` - Consistent spacing between columns
- `flex-1` and `min-h-[500px]` - Ensures textarea and upload areas are tall and usable

## Testing

To verify the fix is working:
1. Open the Memory Wall
2. Click "Add Your Memory"
3. The dialog should open at ~1400px wide
4. The form should have three distinct columns side-by-side
5. The memory textarea and media upload should be at least 500px tall
6. All fields should be easily accessible and not cramped

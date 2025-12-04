import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Upload, X, Loader2, Image as ImageIcon, Video, AlertCircle, CheckCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface MemoryFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export function MemoryForm({ onSubmit }: MemoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mediaPreview, setMediaPreview] = useState<{ url: string; type: 'photo' | 'video' } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📁 [MemoryForm] File selected:', file.name, file.type, `${(file.size / 1024 / 1024).toFixed(2)}MB`);

    setError('');
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      setError('Please upload an image or video file');
      return;
    }

    try {
      if (isImage) {
        setIsCompressing(true);
        console.log('🗜️ [MemoryForm] Starting image compression...');
        
        // Compress image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
        };

        const compressedBlob = await imageCompression(file, options);
        console.log('✅ [MemoryForm] Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('✅ [MemoryForm] Compressed size:', (compressedBlob.size / 1024 / 1024).toFixed(2), 'MB');

        // Create a proper File object from the compressed blob
        const compressedFile = new File([compressedBlob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        
        console.log('📦 [MemoryForm] Compressed file created:', {
          name: compressedFile.name,
          type: compressedFile.type,
          size: `${(compressedFile.size / 1024).toFixed(2)}KB`,
          instanceof: compressedFile instanceof File,
          instanceof_Blob: compressedFile instanceof Blob
        });

        // Store the processed file
        setProcessedFile(compressedFile);

        // Create preview
        const previewUrl = URL.createObjectURL(compressedFile);
        setMediaPreview({ url: previewUrl, type: 'photo' });
        
        setIsCompressing(false);
        setSuccessMessage('Image compressed and ready to upload!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else if (isVideo) {
        // Check video size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          setError('Video file must be less than 50MB');
          return;
        }

        console.log('📦 [MemoryForm] Video file ready:', {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
        });

        // Store the video file
        setProcessedFile(file);

        const previewUrl = URL.createObjectURL(file);
        setMediaPreview({ url: previewUrl, type: 'video' });
        setSuccessMessage('Video ready to upload!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('❌ [MemoryForm] Error processing media:', err);
      setError(`Failed to process media file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsCompressing(false);
    }
  };

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview.url);
    }
    setMediaPreview(null);
    setProcessedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('🚀 [MemoryForm] ========== FORM SUBMIT STARTED ==========');
    
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      console.log('📋 [MemoryForm] FormData created from form element, keys:', Array.from(formData.keys()));
      
      // If we have a processed file, add it to FormData (or replace existing)
      if (processedFile) {
        // Remove any existing file entry
        if (formData.has('file')) {
          formData.delete('file');
        }
        
        // Add our processed file
        formData.append('file', processedFile, processedFile.name);
        
        console.log('📎 [MemoryForm] Added processed file to FormData:', {
          name: processedFile.name,
          type: processedFile.type,
          size: `${(processedFile.size / 1024).toFixed(2)}KB`,
          instanceof_File: processedFile instanceof File,
          instanceof_Blob: processedFile instanceof Blob
        });
      } else {
        console.log('📎 [MemoryForm] No processed file to add');
      }
      
      // Log all form values after adding file
      console.log('📋 [MemoryForm] Final FormData contents (', Array.from(formData.keys()).length, 'entries):');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  - ${key}: [File] ${value.name} (${(value.size / 1024).toFixed(2)}KB, ${value.type})`);
        } else {
          console.log(`  - ${key}: ${value}`);
        }
      }

      // Validate required fields
      const headline = formData.get('headline') as string;
      const name = formData.get('name') as string;
      const memory = formData.get('memory') as string;

      console.log('✅ [MemoryForm] Required fields check:', {
        headline: headline ? `"${headline}"` : 'MISSING',
        name: name ? `"${name}"` : 'MISSING',
        memory: memory ? `"${memory.substring(0, 30)}..."` : 'MISSING'
      });

      if (!headline?.trim()) {
        throw new Error('Headline is required');
      }
      if (!name?.trim()) {
        throw new Error('Name is required');
      }
      if (!memory?.trim()) {
        throw new Error('Memory is required');
      }

      // Process tags (convert comma-separated to array)
      const tagsInput = formData.get('tags') as string;
      const tagsArray = tagsInput
        ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];
      
      formData.delete('tags');
      formData.append('tags', JSON.stringify(tagsArray));
      
      console.log('🏷️ [MemoryForm] Tags processed:', tagsArray);

      const fileInForm = formData.get('file') as File | null;
      console.log('📎 [MemoryForm] File in final FormData:', fileInForm ? `${fileInForm.name} (${fileInForm.size} bytes, ${fileInForm.type})` : 'NO FILE');

      console.log('📤 [MemoryForm] Calling onSubmit...');
      await onSubmit(formData);

      console.log('✅ [MemoryForm] onSubmit completed successfully!');
      
      // Reset form on success
      setSuccessMessage('✅ Memory shared successfully!');
      formElement.reset();
      removeMedia();
      
      // Keep success message visible for 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('❌ [MemoryForm] Submit error:', err);
      console.error('❌ [MemoryForm] Error type:', err?.constructor?.name);
      console.error('❌ [MemoryForm] Error message:', err instanceof Error ? err.message : String(err));
      console.error('❌ [MemoryForm] Error stack:', err instanceof Error ? err.stack : 'no stack');
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit memory';
      setError(`Failed to submit: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 [MemoryForm] ========== FORM SUBMIT ENDED ==========');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-base text-green-800 dark:text-green-200 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-base text-destructive font-medium">{error}</p>
            <p className="text-sm text-destructive/80 mt-1">
              Please check the console (F12) for more details and try again.
            </p>
          </div>
        </div>
      )}

      {/* Headline - Full Width */}
      <div>
        <Label htmlFor="headline" className="text-lg font-semibold">
          Headline <span className="text-destructive">*</span>
        </Label>
        <Input
          id="headline"
          name="headline"
          placeholder="Give your memory a title..."
          required
          className="mt-2 h-12 text-base"
        />
      </div>

      {/* Three Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 lg:w-1/3">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-base font-semibold">
              Your Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="mt-2 h-11"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base font-semibold">
              Email <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="mt-2 h-11"
            />
          </div>

          {/* When (Date) */}
          <div>
            <Label htmlFor="memory_date" className="text-base font-semibold">
              When <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Input
              id="memory_date"
              name="memory_date"
              placeholder="Summer 2020, Dec 25th..."
              className="mt-2 h-11"
            />
          </div>

          {/* Where (Location) */}
          <div>
            <Label htmlFor="location" className="text-base font-semibold">
              Where <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Location"
              className="mt-2 h-11"
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-base font-semibold">
              Tags <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="family, vacation..."
              className="mt-2 h-11"
            />
            <p className="text-sm text-muted-foreground mt-1.5">
              Comma-separated
            </p>
          </div>
        </div>

        {/* MIDDLE COLUMN - Memory Text */}
        <div className="flex flex-col lg:w-1/3">
          <Label htmlFor="memory" className="text-lg font-semibold mb-2">
            Your Memory <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="memory"
            name="memory"
            placeholder="Share your memory in detail... Tell us about this special moment, what made it memorable, how it made you feel..."
            required
            className="resize-none flex-1 min-h-[500px] text-base leading-relaxed"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Share as much detail as you'd like
          </p>
        </div>

        {/* RIGHT COLUMN - Media Upload */}
        <div className="flex flex-col lg:w-1/3">
          <Label className="text-lg font-semibold mb-2">
            Photo or Video <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          
          {!mediaPreview ? (
            <div className="flex-1 min-h-[500px]">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
                disabled={isCompressing}
              />
              <Label
                htmlFor="media-upload"
                className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                  isCompressing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCompressing ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                    <div className="text-center">
                      <span className="text-lg font-medium text-foreground block">Compressing image...</span>
                      <span className="text-sm text-muted-foreground mt-1">This will only take a moment</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-6">
                    <Upload className="w-16 h-16 text-muted-foreground" />
                    <div className="text-center">
                      <span className="text-lg font-medium text-foreground block mb-2">
                        Click to upload
                      </span>
                      <span className="text-base text-muted-foreground block mb-3">
                        Photo or Video
                      </span>
                      <span className="text-sm text-muted-foreground block">
                        Images auto-compressed • Max 50MB for videos
                      </span>
                    </div>
                  </div>
                )}
              </Label>
            </div>
          ) : (
            <div className="flex-1 min-h-[500px] relative">
              {mediaPreview.type === 'photo' ? (
                <div className="relative h-full rounded-lg overflow-hidden border-2 border-primary">
                  <img
                    src={mediaPreview.url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-background/95 px-4 py-2 rounded-md flex items-center gap-2 shadow-lg">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <span className="text-base font-medium">Photo ready</span>
                  </div>
                </div>
              ) : (
                <div className="relative h-full rounded-lg overflow-hidden border-2 border-primary">
                  <video
                    src={mediaPreview.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                  <div className="absolute top-4 left-4 bg-background/95 px-4 py-2 rounded-md flex items-center gap-2 shadow-lg">
                    <Video className="w-5 h-5 text-primary" />
                    <span className="text-base font-medium">Video ready</span>
                  </div>
                </div>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 shadow-lg h-10 w-10"
                onClick={removeMedia}
              >
                <X className="w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Click the X to remove and upload a different file
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          type="submit"
          disabled={isSubmitting || isCompressing}
          size="lg"
          className="min-w-[240px] h-14 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Share Memory'
          )}
        </Button>
      </div>
    </form>
  );
}

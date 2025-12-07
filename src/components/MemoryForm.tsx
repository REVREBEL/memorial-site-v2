import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { baseUrl } from '../lib/base-url';

interface Props {
  onSuccess: () => void;
}

export function MemoryForm({ onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headline: '',
    memory: '',
    memory_date: '',
    location: '',
    tags: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const submitData = new FormData();
      
      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });

      // Handle file upload
      if (file) {
        let fileToUpload = file;
        
        // Compress images larger than 1MB
        if (file.type.startsWith('image/') && file.size > 1024 * 1024) {
          console.log('Compressing image...');
          fileToUpload = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });
        }

        // Validate file size (5MB for images, 20MB for videos)
        const maxSize = file.type.startsWith('video/') ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
        if (fileToUpload.size > maxSize) {
          throw new Error(`File too large. Max size: ${maxSize / (1024 * 1024)}MB`);
        }

        submitData.append('file', fileToUpload);
      }

      const response = await fetch(`${baseUrl}/api/memory_journal`, {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit memory');
      }

      onSuccess();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit memory');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
        setError('Please select an image or video file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="headline" className="block text-sm font-medium mb-2">
          Headline <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="headline"
          required
          value={formData.headline}
          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="A short title for your memory"
        />
      </div>

      <div>
        <label htmlFor="memory" className="block text-sm font-medium mb-2">
          Your Memory <span className="text-destructive">*</span>
        </label>
        <textarea
          id="memory"
          required
          rows={6}
          value={formData.memory}
          onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Share your memory..."
        />
      </div>

      <div>
        <label htmlFor="memory_date" className="block text-sm font-medium mb-2">
          Memory Date (optional)
        </label>
        <input
          type="date"
          id="memory_date"
          value={formData.memory_date}
          onChange={(e) => setFormData({ ...formData, memory_date: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-2">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Where did this happen?"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags (optional)
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="family, friends, travel (comma-separated)"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-2">
          Photo or Video (optional)
        </label>
        <input
          type="file"
          id="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:opacity-90"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Max 5MB for images, 20MB for videos
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
      >
        {submitting ? 'Submitting...' : 'Share Memory'}
      </button>
    </form>
  );
}

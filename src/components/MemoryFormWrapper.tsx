import React from 'react';
import { baseUrl } from '../lib/base-url';
import { MemoryForm } from './MemoryForm';

interface MemoryFormWrapperProps {
  onSuccess: () => void;
}

interface ErrorResponse {
  error?: string;
}

interface SuccessResponse {
  id: string;
  [key: string]: unknown;
}

export function MemoryFormWrapper({ onSuccess }: MemoryFormWrapperProps) {
  const handleSubmit = async (formData: FormData) => {
    console.log('🚀 [MemoryFormWrapper] Submitting to API...');
    
    const response = await fetch(`${baseUrl}/api/memory_journal`, {
      method: 'POST',
      body: formData,
    });

    console.log('📡 [MemoryFormWrapper] Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' })) as ErrorResponse;
      console.error('❌ [MemoryFormWrapper] API error:', errorData);
      throw new Error(errorData.error || `Server returned ${response.status}`);
    }

    const data = await response.json() as SuccessResponse;
    console.log('✅ [MemoryFormWrapper] Success! Memory created:', data.id);
    
    onSuccess();
  };

  return <MemoryForm onSubmit={handleSubmit} />;
}

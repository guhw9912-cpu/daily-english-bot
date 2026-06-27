'use client';

import { useEffect, useState } from 'react';
import type { Sentence } from '@/types';

export function useTodaySentences() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sentences/today')
      .then((r) => r.json())
      .then((data) => setSentences(data))
      .finally(() => setLoading(false));
  }, []);

  return { sentences, loading };
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HireMeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/#contact');
  }, [router]);
  return null;
}

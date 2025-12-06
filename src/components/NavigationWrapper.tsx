import { Navigation } from '../site-components/Navigation';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { baseUrl } from '../lib/base-url';

export function NavigationWrapper() {
  return (
    <DevLinkProvider>
      <Navigation
        homeLink={{ href: `${baseUrl}/` }}
        memoriesLink={{ href: `${baseUrl}/` }}
        guestbookLink={{ href: `${baseUrl}/guestbook` }}
        timelineLink={{ href: `https://patricia-lanning.webflow.io/timeline` }}
        recipesLink={{ href: `https://patricia-lanning.webflow.io/recipes` }}
      />
    </DevLinkProvider>
  );
}

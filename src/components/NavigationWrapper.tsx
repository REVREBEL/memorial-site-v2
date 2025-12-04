import { Navigation } from '../site-components/Navigation';
import { DevLinkProvider } from '../site-components/DevLinkProvider';
import { baseUrl } from '../lib/base-url';

export function NavigationWrapper() {
  return (
    <DevLinkProvider>
      <Navigation 
        homeLink={{ href: 'https://patricia-lanning.webflow.io/' }}
        memoriesLink={{ href: 'https://patricia-lanning.webflow.io/memory-journal' }}
        memoriesText="Share a Memory"
        guestbookLink={{ href: 'https://patricia-lanning.webflow.io/memory-journal/guestbook' }}
        timelineLink={{ href: 'https://patricia-lanning.webflow.io/timeline' }}
        timelineText="Timeline"
        recipesLink={{ href: 'https://patricia-lanning.webflow.io/recipes' }}
        recipesText="Recipes"
      />
    </DevLinkProvider>
  );
}

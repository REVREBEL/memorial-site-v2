import { Navigation } from '../site-components/Navigation';
import { DevLinkProvider } from '../site-components/DevLinkProvider';

export function NavigationWrapper() {
  return (
    <DevLinkProvider>
      <Navigation />
    </DevLinkProvider>
  );
}

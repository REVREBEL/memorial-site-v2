import { Footer } from '../site-components/Footer';
import { DevLinkProvider } from '../site-components/DevLinkProvider';

export function FooterWrapper() {
  return (
    <DevLinkProvider>
      <Footer />
    </DevLinkProvider>
  );
}

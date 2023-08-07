// GoogleAnalyticsAdapter.ts
const GA_ID = 'G-D0KRPKD8HS';

type EventProps = {
  action: string;
  category: string;
  label: string;
  value: string;
  nonInteraction?: boolean;
};

class AnalyticsAdapter {
  static pageview(path: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', `${GA_ID}`, {
        page_path: path,
      });
    }
  }

  static event({ action, category, label, value, nonInteraction = false }: EventProps): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
        non_interaction: nonInteraction,
      });
    }
  }
}

export default AnalyticsAdapter;

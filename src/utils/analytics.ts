interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;
  private gtag: any = null;

  init(measurementId?: string) {
    if (!measurementId || this.isInitialized) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    this.gtag = function() {
      window.dataLayer.push(arguments);
    };
    this.gtag('js', new Date());
    this.gtag('config', measurementId);

    this.isInitialized = true;
  }

  track({
    event,
    category,
    action,
    label,
    value,
    metadata
  }: AnalyticsEvent) {
    if (!this.isInitialized) {
      console.log('Analytics Event:', { event, category, action, label, value, metadata });
      return;
    }

    this.gtag('event', event, {
      event_category: category,
      event_label: label,
      value: value,
      ...metadata
    });
  }

  trackPageView(path: string) {
    if (!this.isInitialized) {
      console.log('Page View:', path);
      return;
    }

    this.gtag('event', 'page_view', {
      page_path: path
    });
  }

  trackPurchase(transactionData: {
    transactionId: string;
    value: number;
    currency: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      quantity: number;
      price: number;
    }>;
  }) {
    if (!this.isInitialized) {
      console.log('Purchase Event:', transactionData);
      return;
    }

    this.gtag('event', 'purchase', {
      transaction_id: transactionData.transactionId,
      value: transactionData.value,
      currency: transactionData.currency,
      items: transactionData.items
    });
  }

  trackError(error: Error, fatal: boolean = false) {
    this.track({
      event: 'exception',
      category: 'Error',
      action: fatal ? 'Fatal Error' : 'Error',
      label: error.message,
      metadata: {
        description: error.stack,
        fatal: fatal
      }
    });
  }
}

export const analytics = new Analytics();

declare global {
  interface Window {
    dataLayer: any[];
  }
}
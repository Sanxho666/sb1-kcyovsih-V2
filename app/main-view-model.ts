import { Observable } from '@nativescript/core';
import { WebView } from '@nativescript/core';

export class HelloWorldModel extends Observable {
  private _url: string = '';
  private _webViewUrl: string = '';
  private _webView: WebView;

  constructor() {
    super();
    this._url = 'https://www.google.com';
    this._webViewUrl = this._url;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    if (this._url !== value) {
      this._url = value;
      this.notifyPropertyChange('url', value);
    }
  }

  get webViewUrl(): string {
    return this._webViewUrl;
  }

  set webViewUrl(value: string) {
    if (this._webViewUrl !== value) {
      this._webViewUrl = value;
      this.notifyPropertyChange('webViewUrl', value);
    }
  }

  onNavigate() {
    // Add https if no protocol specified
    if (!this._url.startsWith('http://') && !this._url.startsWith('https://')) {
      this._url = 'https://' + this._url;
    }
    this.webViewUrl = this._url;
  }

  onWebViewLoaded(args) {
    this._webView = args.object;
    // Set desktop user agent
    this._webView.android.getSettings().setUserAgentString(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    // Enable JavaScript
    this._webView.android.getSettings().setJavaScriptEnabled(true);
    // Enable DOM storage
    this._webView.android.getSettings().setDomStorageEnabled(true);
  }
}
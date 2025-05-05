import { render } from 'preact'
import App from './app.tsx'
import "./tailwind.css";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('SW registration failed:', err);
      });
    });
  }  

render(<App />, document.getElementById('app')!)

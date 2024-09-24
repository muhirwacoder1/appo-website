import { useEffect } from 'react';
import { initDB } from '../lib/db.js';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
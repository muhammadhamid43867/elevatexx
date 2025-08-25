import React from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Resources from './components/pages/Resources';
import Footer from './components/home/Footer';
import CustomCursor from './components/ui/CustomCursor';
import CircularProgress from './components/ui/CircularProgress';
import { CursorProvider } from './hooks/useCursor';

function App() {
  useEffect(() => {
    (function(d, t) {
      const v = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0] as Element | null;
      v.onload = function() {
        // @ts-ignore
        const w: any = window;
        if (w.voiceflow) {
          w.voiceflow.chat.load({
            verify: { projectID: '686424b5153d32000ca2a63b' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: 'https://runtime-api.voiceflow.com'
            }
          });
        }
      };
      v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
      v.type = 'text/javascript';
      if (s && s.parentNode) {
        s.parentNode.insertBefore(v, s);
      }
    })(document, 'script');
  }, []);
  return (
    <CursorProvider>
      <CustomCursor />
      <CircularProgress />
      <main className="bg-black min-h-screen custom-cursor">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
        <Footer />
      </main>
    </CursorProvider>
  );
}

export default App;
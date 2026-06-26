import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const basename = import.meta.env.BASE_URL || '/'
import ScrollToTop from './components/ScrollToTop';

import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Publications from '@/pages/Publications';
import Gallery from '@/pages/Gallery';
import Software from '@/pages/Software';
import Services from '@/pages/Services';
import Training from '@/pages/Training';
import Blog from '@/pages/Blog';
import Payment from '@/pages/Payment';
import Contact from '@/pages/Contact';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/software" element={<Software />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<Training />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
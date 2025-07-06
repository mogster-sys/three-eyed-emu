# Three Eyed Emu Mobile Applications - Website Structure

## Project Overview
A modern minimalist landing page with vintage aesthetic for Three Eyed Emu Mobile Applications, featuring app showcase, payment integration, and professional security features.

## Tech Stack
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Payments**: Stripe
- **Hosting**: Hostinger
- **Animation**: Framer Motion

## Project Structure
```
three-eyed-emu/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   └── webhook/route.ts
│   │   └── contact/route.ts
│   └── (routes)/
│       ├── apps/[id]/page.tsx
│       └── privacy/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AppGrid.tsx
│   ├── AppCard.tsx
│   ├── AppModal.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   └── types.ts
├── public/
│   ├── logo.svg
│   └── apps/
└── styles/
    └── globals.css
```

## Database Schema (Supabase)

```sql
-- Apps table
CREATE TABLE apps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  thumbnail_url TEXT,
  screenshots JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  app_store_links JSONB DEFAULT '{}',
  price DECIMAL(10,2),
  featured BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Future: User authentication
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Future: Purchases
CREATE TABLE purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  app_id UUID REFERENCES apps(id),
  stripe_payment_id VARCHAR(255),
  amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Core Components

### 1. Layout (app/layout.tsx)
```tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Three Eyed Emu - Mobile Applications | Perth, Australia',
  description: 'Innovative mobile applications since 1973. Perth-based app development studio.',
  keywords: 'mobile apps, app development, Perth, Australia, iOS, Android',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-beige-50 text-navy-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### 2. Homepage (app/page.tsx)
```tsx
import Hero from '@/components/Hero'
import AppGrid from '@/components/AppGrid'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AppGrid />
      <ContactForm />
    </>
  )
}
```

### 3. Hero Component (components/Hero.tsx)
```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige-50 to-beige-100 py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <Image 
              src="/logo.svg" 
              alt="Three Eyed Emu" 
              width={200} 
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-navy-900 mb-4">
            THREE EYED EMU
          </h1>
          <p className="text-2xl text-navy-700 mb-2">
            MOBILE APPLICATIONS
          </p>
          <p className="text-lg text-navy-600 italic">
            Perth, Australia • EST 1973
          </p>
          <div className="mt-8">
            <p className="text-xl text-navy-700 max-w-2xl mx-auto">
              Crafting innovative mobile experiences with a unique perspective.
              Where tradition meets cutting-edge technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

### 4. App Grid (components/AppGrid.tsx)
```tsx
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AppCard from './AppCard'
import AppModal from './AppModal'
import { App } from '@/lib/types'

export default function AppGrid() {
  const [apps, setApps] = useState<App[]>([])
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('display_order', { ascending: true })
      .limit(20)

    if (!error && data) {
      setApps(data)
    }
    setLoading(false)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy-900 text-center mb-12">
          Our Applications
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-beige-100 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map((app) => (
              <AppCard 
                key={app.id} 
                app={app} 
                onClick={() => setSelectedApp(app)}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedApp && (
        <AppModal 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)}
        />
      )}
    </section>
  )
}
```

### 5. App Modal (components/AppModal.tsx)
```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Download } from 'lucide-react'
import { App } from '@/lib/types'

interface AppModalProps {
  app: App
  onClose: () => void
}

export default function AppModal({ app, onClose }: AppModalProps) {
  const handlePurchase = async () => {
    // Future: Implement Stripe checkout
    // For now, redirect to app store
    const storeLink = app.app_store_links?.primary
    if (storeLink) {
      window.open(storeLink, '_blank')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-navy-900">{app.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Screenshots */}
            <div className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {app.screenshots?.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${app.name} screenshot ${index + 1}`}
                    className="h-96 rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">About this app</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{app.description}</p>
            </div>

            {/* Features */}
            {app.features && app.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Links */}
            <div className="bg-beige-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Download</h3>
              <div className="flex flex-wrap gap-4">
                {app.app_store_links?.apple && (
                  <a
                    href={app.app_store_links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    App Store
                  </a>
                )}
                {app.app_store_links?.google && (
                  <a
                    href={app.app_store_links.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Google Play
                  </a>
                )}
                {app.app_store_links?.other && Object.entries(app.app_store_links.other).map(([name, url]) => (
                  <a
                    key={name}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    {name}
                  </a>
                ))}
              </div>
              {app.price && app.price > 0 && (
                <div className="mt-4">
                  <p className="text-2xl font-bold text-navy-900">
                    ${app.price.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
```

### 6. Contact Form (components/ContactForm.tsx)
```tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-beige-100">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-12">
            Get In Touch
          </h2>

          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
              Thank you for your message. We'll be in touch soon!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-navy-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy-900 text-white py-4 rounded-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
```

### 7. API Routes

#### Contact API (app/api/contact/route.ts)
```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    const supabase = createClient()
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, company, message }])

    if (error) throw error

    // Optional: Send email notification using your preferred service
    // await sendNotificationEmail({ name, email, company, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
```

#### Stripe Checkout (app/api/stripe/checkout/route.ts)
```typescript
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  try {
    const { appId, appName, price } = await request.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: appName,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      metadata: {
        appId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
```

### 8. Tailwind Configuration (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#F5F2E8',
          100: '#E8E2D5',
          200: '#D4C9B0',
        },
        navy: {
          600: '#2C3E50',
          700: '#243342',
          800: '#1A252F',
          900: '#0F1922',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 9. Global Styles (styles/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply tracking-tight;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-beige-50;
}

::-webkit-scrollbar-thumb {
  @apply bg-navy-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-navy-700;
}
```

### 10. Security Headers (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-supabase-url.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig
```

## Deployment Instructions (Hostinger)

1. **Build the project:**
```bash
npm run build
```

2. **Set up Node.js on Hostinger:**
   - Access your Hostinger control panel
   - Enable Node.js application
   - Set Node version to 18.x or higher

3. **Configure environment:**
   - Upload your project files
   - Set environment variables in Hostinger panel
   - Configure SSL certificate

4. **Database setup:**
   - Create Supabase project
   - Run database migrations
   - Set connection string in environment

5. **Stripe configuration:**
   - Add webhook endpoint in Stripe dashboard
   - Configure webhook secret

## Future Enhancements

### Authentication Module
```typescript
// lib/auth.ts
import { createClient } from '@/lib/supabase'

export async function signUp(email: string, password: string) {
  const supabase = createClient()
  return supabase.auth.signUp({ email, password })
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  const supabase = createClient()
  return supabase.auth.signOut()
}
```

### In-App Purchase Flow
```typescript
// components/PurchaseButton.tsx
'use client'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PurchaseButton({ app }: { app: App }) {
  const handlePurchase = async () => {
    const stripe = await stripePromise
    
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appId: app.id,
        appName: app.name,
        price: app.price
      })
    })
    
    const { sessionId } = await response.json()
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <button
      onClick={handlePurchase}
      className="bg-navy-900 text-white px-6 py-3 rounded-lg hover:bg-navy-800 transition-colors"
    >
      Purchase for ${app.price}
    </button>
  )
}
```

## Additional Features

### 1. SEO Optimization
- Add sitemap.xml generation
- Implement structured data
- Add meta tags for social sharing

### 2. Performance
- Implement image optimization
- Add lazy loading for app cards
- Enable ISR (Incremental Static Regeneration)

### 3. Analytics
- Add Google Analytics
- Implement conversion tracking
- Monitor app store click-through rates

### 4. Admin Panel
- Create protected admin routes
- Add app management interface
- Implement content moderation

This structure provides a solid foundation for your Three Eyed Emu Mobile Applications website with room for future expansion and all requested features. 
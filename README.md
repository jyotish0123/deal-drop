# DealDrop - Smart Product Price Tracker


Track product prices across e-commerce sites and get alerts on price drops. Built with Next.js, Firecrawl, and Supabase.

## 🎯 Features

- 🔍 **Track Any Product** - Works with Amazon, Zara, Walmart, and more
- 📊 **Price History Charts** - Interactive graphs showing price trends over time
- 🔐 **Google Authentication** - Secure sign-in with Google OAuth
- 🔄 **Automated Daily Checks** - Scheduled cron jobs check prices automatically
- 📧 **Email Alerts** - Get notified when prices drop via Resend

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **Firecrawl** - Web data extraction API
  - Handles JavaScript rendering
  - Rotating proxies & anti-bot bypass
  - Structured data extraction with AI
  - Works across different e-commerce sites
- **Supabase** - Backend platform
  - PostgreSQL Database
  - Google Authentication
  - Row Level Security (RLS)
  - pg_cron for scheduled jobs
- **Resend** - Transactional emails
- **shadcn/ui** - UI component library
- **Recharts** - Interactive charts
- **Tailwind CSS** - Styling



## 🔍 How It Works

### User Flow

1. **User adds product** - Paste any e-commerce URL on the homepage
2. **Firecrawl scrapes** - Instantly extracts product name, price, currency, and image
3. **Data stored** - Product saved to Supabase with Row Level Security
4. **View tracking** - See current price and interactive price history chart

### Automated Price Checking

1. **Supabase pg_cron** - Runs daily at 9 AM UTC
2. **Triggers API endpoint** - Makes secure POST request to `/api/cron/check-prices`
3. **Firecrawl scrapes all products** - Updates prices for all tracked products
4. **Updates database** - Saves new prices and adds to history if changed
5. **Sends email alerts** - Notifies users via Resend when prices drop

### Why Firecrawl?

Firecrawl solves the hard problems of web scraping:

- ✅ **JavaScript Rendering** - Handles dynamic content loaded via JS
- ✅ **Anti-bot Bypass** - Built-in mechanisms to avoid detection
- ✅ **Rotating Proxies** - Prevents IP blocking
- ✅ **AI-Powered Extraction** - Uses prompts to extract structured data
- ✅ **Multi-site Support** - Same code works across different e-commerce platforms
- ✅ **Fast & Reliable** - Built for production use

No need to maintain brittle, site-specific scrapers!

## 📁 Project Structure

```
dealdrop/
├── app/
│   ├── page.js                         # Landing page with product input
│   ├── actions.js                      # Server actions for DB operations
│   ├── auth/
│   │   └── callback/
│   │       └── route.js                # OAuth callback handler
│   └── api/
│       └── cron/
│           └── check-prices/
│               └── route.js            # Cron endpoint for price checks
├── components/
│   ├── ui/                             # shadcn/ui components
│   ├── AddProductForm.js               # Product URL input with auth modal
│   ├── ProductCard.js                  # Product display with chart toggle
│   ├── PriceChart.js                   # Recharts price history
│   └── AuthModal.js                    # Google sign-in modal
├── lib/
│   ├── firecrawl.js                    # Firecrawl API integration
│   ├── email.js                        # Resend email templates
│   └── utils.js                        # Utility functions
├── utils/
│   └── supabase/
│       ├── client.js                   # Browser Supabase client
│       ├── server.js                   # Server Supabase client
│       └── middleware.js               # Session refresh middleware
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql              # Database tables & RLS
│       └── 002_setup_cron.sql          # Cron job setup
├── proxy.ts                            # Next.js 15 proxy (replaces middleware)
└── .env.local                          # Environment variables
```



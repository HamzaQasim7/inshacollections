# MALA E-Commerce - Premium Pakistani Fashion

A modern, conversion-optimized e-commerce website for MALA - a premium Pakistani women's clothing brand with 30 years of heritage.

## 🚀 Features

### Pages
- **Homepage** - Hero section, trust badges, curated collections, new arrivals, testimonials
- **Collections** - Filterable product listing with price, fabric, size, and color filters
- **Product Detail** - Image gallery, variant selection, reviews, related products
- **Shopping Cart** - Quantity management, promo codes, order summary
- **Checkout** - Multi-step checkout with COD support
- **About** - Brand story, values, milestones, team
- **Contact** - Contact form, store info, map
- **Wishlist** - Save favorite products

### E-Commerce Features
- 🛒 Full shopping cart functionality with persistent state
- 💚 Wishlist with localStorage persistence
- 🎯 Product filtering and sorting
- 💳 Multiple payment methods (COD primary)
- 🚚 Multiple shipping options
- 📱 Fully responsive (mobile-first)
- 🔍 Search functionality
- ⭐ Product reviews and ratings

### Pakistan-Specific
- 💵 Cash on Delivery (COD) as primary payment
- 📱 WhatsApp integration
- 🏙️ Pakistan cities/provinces dropdowns
- 💰 PKR currency formatting
- 📦 Local courier integration ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **UI Components**: Custom components inspired by shadcn/ui

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── collections/       # Collection pages
│   ├── products/          # Product detail pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout flow
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── wishlist/         # Wishlist page
├── components/
│   ├── ui/               # Base UI components
│   ├── layout/           # Header, Footer, CartDrawer
│   ├── home/             # Homepage sections
│   ├── product/          # Product components
│   └── checkout/         # Checkout components
├── context/              # React Context providers
├── lib/                  # Utilities and data
├── types/                # TypeScript definitions
└── hooks/                # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
# Database (for future Prisma integration)
DATABASE_URL="postgresql://..."

# Analytics (optional)
NEXT_PUBLIC_GA_ID=""
```

## 🎨 Design System

### Colors
- **Primary**: Green (#4ADE80) - Actions, CTAs
- **Background**: Dark Green (#0F1F0F)
- **Card**: Secondary Green (#1A2F1A)
- **Text**: White (#FFFFFF)
- **Muted**: Gray tones

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Buttons (primary, secondary, outline, ghost)
- Inputs with validation
- Badges (new, sale, trending)
- Cards with hover effects
- Rating stars
- Quantity selectors
- Checkboxes and radio buttons
- Sliders for price range

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Considerations

- Form validation with proper sanitization
- CSRF protection ready
- Environment variables for secrets
- No sensitive data in localStorage

## 🚧 Future Enhancements

- [ ] Database integration (Prisma + PostgreSQL)
- [ ] User authentication (NextAuth.js)
- [ ] Payment gateway integration (JazzCash, EasyPaisa)
- [ ] Order tracking system
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] SMS notifications via Twilio
- [ ] Multi-language support (Urdu)

## 📄 License

Private - MALA Fashion © 2024

## 🤝 Support

For support, contact:
- Email: support@mala.pk
- WhatsApp: +92 300 123 4567
- Phone: +92 91 123 4567

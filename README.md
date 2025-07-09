# Mini-Commerce

A modern, fully-featured e-commerce application built with Next.js 14, React Query, Zustand, and Tailwind CSS. This prototype demonstrates a complete shopping experience with product catalog, cart management, and checkout flow.

## 🚀 Live Demo

[Visit Mini-Commerce](https://mini-commerce-theta-hazel.vercel.app/)

## 📋 Project Overview

Mini-Commerce is a client-side e-commerce prototype that provides a seamless shopping experience. Users can browse products, manage their cart, and complete a mock checkout process. All application state persists across page reloads using localStorage.

### Key Features

- **Product Catalog**: Browse 8+ dummy products with detailed information
- **Product Details**: Individual product pages with full specifications
- **Shopping Cart**: Add/remove items, update quantities, view totals
- **Checkout Flow**: Complete order process with form validation
- **Order Confirmation**: Success page with order tracking information
- **Responsive Design**: Mobile-first approach with modern UI
- **State Persistence**: Cart and product data survive page reloads
- **Error Handling**: Graceful fallbacks for network and data errors

## 🎨 Design Approach

### Layout & Responsiveness
- **Mobile-First Design**: Optimized for mobile devices, scaling up to desktop
- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Container Strategy**: Consistent max-width containers with responsive padding
- **Breakpoint Strategy**: sm (640px), md (768px), lg (1024px), xl (1280px)

### Color Scheme & Typography
- **Primary Colors**: Blue gradient (blue-600 to purple-600)
- **Neutral Palette**: Gray scale from 50 to 900 for text and backgrounds
- **Accent Colors**: Green for success states, red for errors/warnings
- **Typography**: Inter font family for clean, modern readability
- **Visual Hierarchy**: Clear heading sizes and spacing for content structure

### User Experience
- **Consistent Navigation**: Fixed header with cart indicator
- **Visual Feedback**: Loading states, success confirmations, error messages
- **Accessibility**: Semantic HTML, keyboard navigation, screen reader support
- **Performance**: Optimized images, efficient re-renders, code splitting

## 🛠 Tools & Techniques

### Core Technologies
- **Next.js 14**: App Router for modern React development
- **TypeScript**: Strict mode for type safety and better developer experience
- **React Query**: Data fetching, caching, and synchronization
- **Zustand**: Lightweight state management with persistence middleware
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Development Tools
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting (configured via ESLint)
- **Jest**: Unit testing framework with jsdom environment
- **Testing Library**: Component testing utilities

### Architectural Patterns
- **Component Composition**: Reusable UI components with clear interfaces
- **Custom Hooks**: Abstracted business logic and API interactions
- **Provider Pattern**: React Query client and global providers
- **Store Pattern**: Zustand for cart state with local storage persistence

## 🔍 SEO Strategy

### Meta Tags & Open Graph
- **Dynamic Metadata**: Page-specific titles and descriptions
- **Open Graph Tags**: Rich social media previews
- **Twitter Cards**: Optimized Twitter sharing
- **Canonical URLs**: Proper URL canonicalization

### Structured Data
- **JSON-LD Schema**: Product and website structured data
- **Product Schema**: Rich snippets for product pages
- **Organization Schema**: Business information markup
- **Search Action**: Site search functionality markup

### Performance Optimizations
- **Next.js Image**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Build-time rendering where possible
- **Font Optimization**: Google Fonts with display swap

### Technical SEO
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Alt Text**: Descriptive image alternatives
- **Meta Descriptions**: Unique, compelling page descriptions
- **Robots Meta**: Appropriate indexing directives

## ⚠️ Error Handling Technique

### Client-Side Error Boundaries
- **React Query**: Built-in error states for API failures
- **Loading States**: Skeleton loaders and spinners during data fetching
- **Fallback UI**: Meaningful error messages with recovery options
- **Retry Logic**: Automatic retry for transient failures

### Data Validation
- **TypeScript**: Compile-time type checking
- **Runtime Validation**: Input validation and sanitization
- **State Validation**: Zustand store state integrity checks
- **LocalStorage**: Graceful handling of storage failures

### User Experience
- **Error Messages**: Clear, actionable error descriptions
- **Graceful Degradation**: Core functionality available even with errors
- **Loading States**: Progress indicators during async operations
- **404 Handling**: Custom not-found pages with navigation options

### Development & Debugging
- **Console Logging**: Strategic error logging for debugging
- **Error Boundaries**: React error boundaries for component failures
- **Development Warnings**: Helpful warnings in development mode
- **Production Safety**: Error suppression in production builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mini-commerce.git
cd mini-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run test suite

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Testing

The project includes unit tests for core utilities and components. Tests are written using Jest and React Testing Library.

```bash
npm test
```


Built with ❤️ using Next.js and modern web technologies.

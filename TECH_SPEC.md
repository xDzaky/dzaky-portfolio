# Technical Specification Document
## Dzaky Portfolio Website

**Version**: 0.1.0  
**Last Updated**: December 3, 2025  
**Author**: Achmad Dzaki Habibullah Al Azhar  
**Status**: Production

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [Component Library](#component-library)
7. [Data Management](#data-management)
8. [API Documentation](#api-documentation)
9. [Performance Optimization](#performance-optimization)
10. [SEO & Metadata](#seo--metadata)
11. [Deployment & DevOps](#deployment--devops)
12. [Security Considerations](#security-considerations)
13. [Browser Compatibility](#browser-compatibility)
14. [Future Enhancements](#future-enhancements)

---

## 1. Executive Summary

### 1.1 Project Overview
Personal portfolio website showcasing professional work, skills, education, and achievements of Achmad Dzaki Habibullah Al Azhar, a Full Stack Web Developer from Probolinggo, East Java, Indonesia.

### 1.2 Primary Objectives
- Showcase professional portfolio with interactive 3D/WebGL galleries
- Provide comprehensive information about skills, education, and certifications
- Enable professional contact and networking opportunities
- Demonstrate technical proficiency and modern web development practices
- Optimize for performance (Core Web Vitals compliance)
- Ensure mobile-first responsive design

### 1.3 Target Audience
- Potential clients and recruiters
- Collaborators and fellow developers
- Educational institutions
- Freelance project inquiries

### 1.4 Key Metrics
- **Target Performance**: Lighthouse score >90
- **LCP (Largest Contentful Paint)**: <2.5s
- **CLS (Cumulative Layout Shift)**: <0.1
- **INP (Interaction to Next Paint)**: <200ms
- **Mobile-first**: 100% responsive across all devices

---

## 2. System Architecture

### 2.1 Architecture Pattern
**Pattern**: JAMstack (JavaScript, APIs, Markup)  
**Rendering Strategy**: Hybrid (SSG + SSR + CSR)

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          React 19 + Next.js 15 App Router           │  │
│  │                                                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │   SSG    │  │   SSR    │  │  Client Side     │  │  │
│  │  │  Pages   │  │  Dynamic │  │  Interactions    │  │  │
│  │  │          │  │  Routes  │  │  (WebGL, Motion) │  │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Static CDN  │  │  API Routes  │  │  Edge Functions │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Resend     │  │  Cloudinary  │  │     Vercel      │  │
│  │   (Email)    │  │   (Images)   │  │   Analytics     │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Rendering Strategies

#### Static Site Generation (SSG)
- **Pages**: Home, About, Education, Skills, Certificates
- **Benefits**: Fastest performance, best SEO, CDN cacheable
- **Build Time**: Generated during `npm run build`

#### Server-Side Rendering (SSR)
- **Pages**: Project detail pages (`/projects/[slug]`)
- **Benefits**: Dynamic content, up-to-date data
- **Fallback**: ISR (Incremental Static Regeneration) ready

#### Client-Side Rendering (CSR)
- **Components**: CircularGallery (WebGL), Animations, Interactive forms
- **Benefits**: Rich interactivity, 3D graphics
- **Strategy**: Lazy loading with `next/dynamic`

---

## 3. Technology Stack

### 3.1 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.4 | React framework with App Router |
| **React** | 19.1.0 | UI library with latest features |
| **TypeScript** | 5.x | Type-safe development |
| **Node.js** | 20+ | Runtime environment |

### 3.2 Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | Pre-built accessible components |
| **Radix UI** | Latest | Headless UI primitives |
| **Framer Motion** | 12.23.24 | Animation library |
| **class-variance-authority** | 0.7.1 | Component variants |
| **clsx / tailwind-merge** | Latest | Conditional class merging |

### 3.3 3D Graphics & WebGL

| Technology | Version | Purpose |
|------------|---------|---------|
| **OGL** | 1.0.11 | Lightweight WebGL library |
| **Three.js** | 0.180.0 | 3D graphics library |
| **@react-three/fiber** | 9.4.0 | React renderer for Three.js |
| **@react-three/drei** | 10.7.6 | Three.js helpers |
| **@react-three/rapier** | 2.1.0 | Physics engine |

### 3.4 Content Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **next-mdx-remote** | 5.0.0 | MDX content processing |
| **gray-matter** | 4.0.3 | Frontmatter parsing |
| **reading-time** | 1.5.0 | Reading time estimation |

### 3.5 Form Handling & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **react-hook-form** | 7.63.0 | Form state management |
| **Zod** | 4.1.11 | Schema validation |

### 3.6 External Services

| Service | Purpose |
|---------|---------|
| **Resend** | Transactional email delivery |
| **Cloudinary** | Image hosting & optimization |
| **Vercel Analytics** | Performance monitoring |
| **Vercel** | Hosting & deployment |

### 3.7 Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 3.x | Code linting |
| **Turbopack** | Built-in | Fast bundler (Next.js 15) |
| **PostCSS** | 4.x | CSS processing |

---

## 4. Project Structure

### 4.1 Directory Architecture

```
dzaky-portfolio/
├── content/                          # Content data (JSON/MDX)
│   ├── data/
│   │   ├── achievements.json         # Achievement items
│   │   ├── certificates.json         # Certificate data
│   │   ├── education.json            # Education history
│   │   ├── profile.json              # Personal profile
│   │   ├── skills.json               # Skills inventory
│   │   └── socials.json              # Social media links
│   └── projects/                     # MDX project case studies
│       ├── kaskelas.mdx
│       ├── linktree-dzaky.mdx
│       ├── responsive-menu-landing.mdx
│       └── sistem-manajemen-inventaris-barang.mdx
│
├── public/                           # Static assets
│   ├── assets/
│   │   └── lanyard/                  # Lanyard assets
│   ├── images/
│   │   ├── achievements/             # Achievement images
│   │   ├── certificates/             # Certificate previews
│   │   ├── profile/                  # Profile photos
│   │   └── projects/                 # Project screenshots
│   ├── tools/                        # Tech stack logos
│   └── resume.pdf                    # Downloadable CV
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── about/page.tsx            # About page
│   │   ├── api/
│   │   │   └── contact/route.ts      # Contact form API
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog index
│   │   │   └── [slug]/page.tsx       # Blog post detail
│   │   ├── certificates/page.tsx     # Certificates page
│   │   ├── contact/page.tsx          # Contact form page
│   │   ├── education/page.tsx        # Education page
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects index
│   │   │   └── [slug]/page.tsx       # Project detail
│   │   ├── resume/page.tsx           # Resume page
│   │   ├── skills/page.tsx           # Skills page
│   │   ├── error.tsx                 # Error boundary
│   │   ├── globals.css               # Global styles
│   │   ├── head.tsx                  # Head metadata
│   │   ├── layout.tsx                # Root layout
│   │   ├── not-found.tsx             # 404 page
│   │   ├── opengraph-image.tsx       # OG image generator
│   │   ├── page.tsx                  # Homepage
│   │   ├── robots.ts                 # Robots.txt generator
│   │   └── sitemap.ts                # Sitemap generator
│   │
│   ├── components/                   # React components
│   │   ├── education-section.tsx     # Education wrapper
│   │   ├── scroll-velocity.tsx       # Scroll animation
│   │   ├── theme-provider.tsx        # Theme context
│   │   ├── layout/
│   │   │   ├── back-to-top-button.tsx
│   │   │   ├── page-transition.tsx
│   │   │   ├── site-footer.tsx
│   │   │   └── site-header.tsx
│   │   ├── sections/
│   │   │   ├── achievements-gallery.tsx
│   │   │   ├── certificates-grid.tsx
│   │   │   ├── certificates-preview.tsx
│   │   │   ├── CircularGallery.tsx   # WebGL gallery
│   │   │   ├── contact-form.tsx
│   │   │   ├── education-vertical-timeline.tsx
│   │   │   ├── Glowing-Effect.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── projects-grid.tsx
│   │   │   ├── projects-preview.tsx
│   │   │   ├── ScrollVelocity.tsx
│   │   │   ├── skills-grid.tsx
│   │   │   ├── skills-preview.tsx
│   │   │   └── TiltedCard.tsx
│   │   ├── shared/
│   │   │   ├── container.tsx
│   │   │   ├── project-card.tsx
│   │   │   ├── prose.tsx
│   │   │   ├── protected-image.tsx   # Image protection
│   │   │   ├── reveal-section.tsx
│   │   │   ├── section-heading.tsx
│   │   │   ├── site-name.tsx
│   │   │   └── social-links.tsx
│   │   ├── skills/
│   │   │   ├── segmented-meter.tsx   # Skill level meter
│   │   │   └── skill-badge.tsx
│   │   └── ui/                       # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── glowing-effect.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── lanyard.tsx
│   │       ├── mode-toggle.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── shiny-text.tsx
│   │       ├── textarea.tsx
│   │       └── animations/
│   │
│   ├── config/
│   │   ├── navigation.ts             # Navigation structure
│   │   └── site.ts                   # Site metadata
│   │
│   ├── data/
│   │   ├── blog.ts                   # Blog utilities
│   │   └── testimonials.ts           # Testimonial data
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   ├── content/
│   │   │   └── projects.ts           # Project content loader
│   │   └── data/
│   │       ├── certificates.ts
│   │       └── ...                   # Data loaders
│   │
│   ├── types/
│   │   └── content.ts                # TypeScript definitions
│   │
│   └── global.d.ts                   # Global type declarations
│
├── components.json                   # shadcn/ui config
├── eslint.config.mjs                 # ESLint configuration
├── next-env.d.ts                     # Next.js types
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.mjs                # PostCSS config
├── tsconfig.json                     # TypeScript config
├── PERFORMANCE.md                    # Performance optimization guide
└── README.md                         # Project documentation
```

### 4.2 Key Configuration Files

#### next.config.ts
```typescript
// Image optimization, Webpack config, experimental features
- Cloudinary domain whitelisting
- Asset loader for 3D models (.glb, .gltf)
- Package import optimization for @react-three
```

#### tsconfig.json
```json
// Path aliases
- @/* → src/*
- @content/* → content/*
```

---

## 5. Core Features

### 5.1 Homepage Features

#### 5.1.1 Hero Section
- **Component**: `src/components/sections/hero-section.tsx`
- **Features**:
  - Animated gradient background
  - Profile image with glow effect
  - Dynamic typing animation
  - CTA buttons (Contact, Projects, Download CV)
  - Social media links
- **Animation**: Framer Motion fade-in/slide-up

#### 5.1.2 Achievements Gallery
- **Component**: `src/components/sections/CircularGallery.tsx`
- **Technology**: WebGL via OGL library
- **Features**:
  - 3D circular carousel with bend control
  - Texture-mapped achievement images
  - Smooth scroll/drag interaction
  - Lazy loading with `next/dynamic`
  - Configurable parameters:
    - `bend`: Curve intensity (0 = flat, >0 = convex, <0 = concave)
    - `borderRadius`: Image corner rounding
    - `scrollSpeed`: Scroll sensitivity
    - `scrollEase`: Animation smoothness
- **Performance**:
  - Skip rendering when tab hidden
  - Delta checking to prevent unnecessary renders
  - Optimized texture settings (no mipmaps, LINEAR filtering)

#### 5.1.3 Preview Sections
- Projects Preview (3 featured projects)
- Skills Preview (top skills)
- Certificates Preview (recent certificates)

### 5.2 Project Showcase

#### 5.2.1 Projects Index (`/projects`)
- **Component**: `src/app/projects/page.tsx`
- **Features**:
  - Grid layout of project cards
  - Filter by category (web, web3, tools)
  - Hover effects and animations
  - Direct links to case studies

#### 5.2.2 Project Detail Pages (`/projects/[slug]`)
- **Technology**: MDX with Next.js dynamic routes
- **Features**:
  - Rich markdown content
  - Frontmatter metadata (stack, role, features, impact)
  - Cover images
  - Demo and GitHub repository links
  - Reading time estimation
  - Related projects

**Frontmatter Schema**:
```typescript
{
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  category?: "web" | "web3" | "tools";
  role: string;
  features: string[];
  impact: string;
  demoUrl?: string;
  repoUrl?: string;
  cover: string;
  date: string;
  status?: "draft" | "published";
}
```

### 5.3 Skills System

#### 5.3.1 Skills Page (`/skills`)
- **Component**: `src/app/skills/page.tsx`
- **Features**:
  - Categorized skill grid
  - Interactive skill cards with hover effects
  - Skill level indicators (Foundational, Intermediate, Advanced, Expert)
  - Frequency badges (Daily, Weekly, Occasionally, Learning)
  - "Since" year and project count
  - Evidence links (repo, demo, certificate)

**Skill Data Schema**:
```typescript
{
  name: string;
  category: string;
  level: "Foundational" | "Intermediate" | "Advanced" | "Expert";
  frequency: "Daily" | "Weekly" | "Occasionally" | "Learning";
  since: number;
  projects: number;
  lastUsed?: string;
  links?: SkillEvidenceLink[];
  description?: string;
  icon?: string;
}
```

### 5.4 Education & Certification

#### 5.4.1 Education Timeline (`/education`)
- **Component**: `src/components/sections/education-vertical-timeline.tsx`
- **Library**: `react-vertical-timeline-component`
- **Features**:
  - Animated vertical timeline
  - School, major, and date ranges
  - Highlight bullets for achievements
  - Responsive mobile layout

#### 5.4.2 Certificates Grid (`/certificates`)
- **Component**: `src/components/sections/certificates-grid.tsx`
- **Features**:
  - Masonry-style grid layout
  - Certificate preview images
  - Modal/lightbox for full view
  - Download links

### 5.5 Contact System

#### 5.5.1 Contact Form (`/contact`)
- **Component**: `src/components/sections/contact-form.tsx`
- **Technology**: React Hook Form + Zod validation
- **Fields**:
  - Name (required, 2-50 characters)
  - Email (required, valid format)
  - Message (required, 10-1000 characters)
- **Validation**:
  - Real-time field validation
  - Error messages in Indonesian
  - Submit button state management
- **API**: `/api/contact/route.ts`

#### 5.5.2 Email API (`/api/contact`)
- **Technology**: Resend API
- **Features**:
  - Server-side email sending
  - Rate limiting (future enhancement)
  - Error handling
  - Email template with `@react-email/render`

---

## 6. Component Library

### 6.1 Layout Components

#### 6.1.1 Site Header
- **Path**: `src/components/layout/site-header.tsx`
- **Features**:
  - Logo/site name
  - Desktop navigation (Radix Navigation Menu)
  - Mobile hamburger menu (Radix Sheet)
  - Theme toggle
  - Sticky positioning

#### 6.1.2 Site Footer
- **Path**: `src/components/layout/site-footer.tsx`
- **Features**:
  - Quick links (About, Education, Skills)
  - Resources links (Projects, Contact)
  - Social media icons
  - Copyright notice

#### 6.1.3 Page Transition
- **Path**: `src/components/layout/page-transition.tsx`
- **Features**:
  - Smooth page transitions with Framer Motion
  - Fade-in animation on route change

### 6.2 UI Components (shadcn/ui)

All components in `src/components/ui/` follow shadcn/ui patterns:

| Component | Purpose | Radix Primitive |
|-----------|---------|-----------------|
| **Badge** | Status indicators | - |
| **Button** | Interactive buttons | @radix-ui/react-slot |
| **Card** | Content containers | - |
| **Input** | Form text input | - |
| **Label** | Form labels | @radix-ui/react-label |
| **Separator** | Visual dividers | @radix-ui/react-separator |
| **Sheet** | Mobile menu/sidebar | @radix-ui/react-dialog |
| **Textarea** | Multi-line input | - |
| **Navigation Menu** | Desktop navigation | @radix-ui/react-navigation-menu |

### 6.3 Custom Components

#### 6.3.1 Glowing Effect
- **Path**: `src/components/sections/Glowing-Effect.tsx`
- **Purpose**: Animated gradient background
- **Technology**: Canvas API with requestAnimationFrame
- **Use Cases**: Hero section, CTA sections

#### 6.3.2 Protected Image
- **Path**: `src/components/shared/protected-image.tsx`
- **Purpose**: Prevent right-click save and drag
- **Features**:
  - Context menu disabled
  - Drag prevention
  - User-select disabled
  - Watermark-ready

#### 6.3.3 Reveal Section
- **Path**: `src/components/shared/reveal-section.tsx`
- **Purpose**: Scroll-triggered animations
- **Technology**: Framer Motion + Intersection Observer
- **Variants**: Fade, slide-up, scale

#### 6.3.4 Segmented Meter
- **Path**: `src/components/skills/segmented-meter.tsx`
- **Purpose**: Visual skill level indicator
- **Levels**:
  - Foundational: 1/4 filled
  - Intermediate: 2/4 filled
  - Advanced: 3/4 filled
  - Expert: 4/4 filled

---

## 7. Data Management

### 7.1 Data Sources

#### 7.1.1 JSON Data Files (`content/data/`)

**profile.json**:
```json
{
  "name": "Achmad Dzaki Habibullah Al Azhar",
  "headline": "Fullstack Web Developer",
  "location": "Probolinggo, Jawa Timur, Indonesia",
  "timezone": "Asia/Jakarta",
  "about": "...",
  "availability": ["Freelance", "Internship"],
  "email": "xdzakyz@gmail.com",
  "resumeUrl": "/resume.pdf"
}
```

**skills.json**:
```json
{
  "skills": [
    {
      "name": "React",
      "category": "Frontend",
      "level": "Advanced",
      "frequency": "Daily",
      "since": 2023,
      "projects": 12
    }
  ]
}
```

**achievements.json**:
```json
[
  {
    "image": "/images/achievements/award-1.jpg",
    "text": "Achievement Title"
  }
]
```

#### 7.1.2 MDX Content (`content/projects/`)

**Example: kaskelas.mdx**:
```mdx
---
slug: kaskelas
title: "KasKelas - Classroom Finance Management"
stack: ["Next.js", "Tailwind CSS", "Supabase"]
category: web
role: "Full Stack Developer"
demoUrl: "https://kaskelas.vercel.app"
cover: "/images/projects/kaskelas.png"
date: "2024-11-15"
---

# Project content in markdown...
```

### 7.2 Data Loaders

#### 7.2.1 Project Loader
- **Path**: `src/lib/content/projects.ts`
- **Functions**:
  - `getAllProjects()`: Fetch all MDX files
  - `getProjectBySlug(slug)`: Fetch single project
  - `getProjectSlugs()`: Get all slugs for SSG

#### 7.2.2 Certificate Loader
- **Path**: `src/lib/data/certificates.ts`
- **Functions**:
  - `getCertificates()`: Load from JSON
  - Filter/sort logic

### 7.3 Type Definitions

All types defined in `src/types/content.ts`:
- `ProjectFrontmatter`
- `SkillItem`
- `EducationItem`
- `CertificateItem`
- `SocialLink`
- `Testimonial`
- `BlogPostMeta`

---

## 8. API Documentation

### 8.1 Contact Form API

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to discuss a project..."
}
```

**Validation** (Zod schema):
```typescript
{
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000)
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": "Failed to send email"
}
```

**Error Codes**:
- `400`: Validation error
- `500`: Server error (Resend API failure)

**Rate Limiting**: Not implemented (future enhancement)

### 8.2 Internal APIs

#### 8.2.1 Web Vitals Reporter
- **Path**: `src/components/web-vitals-reporter.tsx`
- **Hook**: `useReportWebVitals()` from Next.js
- **Metrics**: LCP, FID, CLS, INP, TTFB
- **Integration**: Vercel Analytics

---

## 9. Performance Optimization

### 9.1 Implemented Optimizations

#### 9.1.1 Image Optimization
- **Technology**: `next/image`
- **CDN**: Cloudinary for remote images
- **Features**:
  - Automatic WebP conversion
  - Responsive sizing
  - Lazy loading (below fold)
  - Priority loading (LCP images)
  - Blur placeholder

#### 9.1.2 Code Splitting
- **Dynamic Imports**:
  ```typescript
  const AchievementsGallery = dynamic(
    () => import('@/components/sections/achievements-gallery'),
    { loading: () => <Skeleton /> }
  );
  ```
- **Route-based splitting**: Automatic with Next.js App Router

#### 9.1.3 Font Optimization
- **Strategy**: `next/font/google`
- **Fonts**: Geist, Geist Mono
- **Settings**:
  - `display: 'swap'` (prevent FOIT)
  - Preconnect to `fonts.googleapis.com`
  - Variable fonts for size reduction

#### 9.1.4 WebGL Optimization (CircularGallery)
- Skip rendering when `document.hidden`
- Delta checking before render
- Optimized texture settings:
  - `generateMipmaps: false`
  - `minFilter: LINEAR`
  - `magFilter: LINEAR`
  - `wrapS/T: CLAMP_TO_EDGE`
- Reduced DPR: `Math.min(devicePixelRatio, 2)`

#### 9.1.5 Bundle Optimization
- **Experimental**: `optimizePackageImports` for `@react-three`
- **Tree shaking**: Enabled via ES modules
- **Minification**: Automatic with Turbopack

### 9.2 Performance Monitoring

#### 9.2.1 Web Vitals Tracking
- **File**: `src/components/web-vitals-reporter.tsx`
- **Metrics**:
  - **LCP**: Target <2.5s
  - **CLS**: Target <0.1
  - **INP**: Target <200ms
  - **FID**: Target <100ms (deprecated, use INP)
  - **TTFB**: Target <600ms

#### 9.2.2 Vercel Analytics
- **Integration**: `@vercel/analytics`
- **Data**: Real User Monitoring (RUM)
- **Dashboard**: Vercel deployment dashboard

### 9.3 Performance Documentation
- **File**: `PERFORMANCE.md`
- **Contents**:
  - Before/after optimization examples
  - Testing procedures (Lighthouse, PageSpeed)
  - Prioritized TODO checklist
  - Troubleshooting guide

---

## 10. SEO & Metadata

### 10.1 Static SEO

#### 10.1.1 Metadata Configuration
- **File**: `src/app/layout.tsx`
- **Settings**:
  ```typescript
  export const metadata: Metadata = {
    title: "Dzaky - Fullstack Web Developer",
    description: "Portfolio of Achmad Dzaki...",
    keywords: ["fullstack", "web developer", "react", "next.js"],
    authors: [{ name: "Achmad Dzaki..." }],
    openGraph: { ... },
    twitter: { ... }
  }
  ```

#### 10.1.2 Robots.txt
- **File**: `src/app/robots.ts`
- **Configuration**:
  ```typescript
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      },
      sitemap: 'https://dzaky.com/sitemap.xml'
    }
  }
  ```

#### 10.1.3 Sitemap
- **File**: `src/app/sitemap.ts`
- **Dynamic Generation**:
  - Homepage
  - Static pages (About, Skills, Education, Contact)
  - Dynamic project pages
  - Blog posts (if applicable)
- **Priority**:
  - Homepage: 1.0
  - Main pages: 0.8
  - Project pages: 0.6
- **Update Frequency**: Weekly

#### 10.1.4 Open Graph Image
- **File**: `src/app/opengraph-image.tsx`
- **Type**: Dynamic image generation
- **Size**: 1200x630px (Twitter/OG standard)
- **Content**: Name, title, site URL

### 10.2 Dynamic SEO

#### 10.2.1 Project Page Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      images: [project.cover]
    }
  }
}
```

### 10.3 Structured Data (JSON-LD)
**Status**: Future enhancement
**Planned Types**:
- Person (schema.org/Person)
- WebSite (schema.org/WebSite)
- CreativeWork (schema.org/CreativeWork) for projects

---

## 11. Deployment & DevOps

### 11.1 Build Configuration

#### 11.1.1 Build Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

#### 11.1.2 Build Process
1. **Dependency Installation**: `npm install`
2. **Type Checking**: TypeScript compilation
3. **Linting**: ESLint validation
4. **Static Generation**: SSG pages built
5. **Asset Optimization**: Images, fonts, bundles
6. **Output**: `.next/` directory

### 11.2 Vercel Deployment

#### 11.2.1 Configuration
- **Framework**: Next.js (auto-detected)
- **Node Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next/`
- **Environment Variables**:
  - `RESEND_API_KEY` (required for contact form)
  - `NEXT_PUBLIC_SITE_URL` (optional)

#### 11.2.2 Deployment Flow
```
Git Push → Vercel Webhook → Build Trigger
    ↓
  Build Process (Turbopack)
    ↓
  Static Assets → CDN (Edge Network)
    ↓
  Serverless Functions → Lambda
    ↓
  Deployment Complete → Preview URL / Production
```

#### 11.2.3 Branch Strategy
- **main**: Production deployment (dzaky.com)
- **develop**: Staging/preview deployment
- **feature/***: Preview deployments per PR

### 11.3 Environment Variables

| Variable | Type | Purpose | Required |
|----------|------|---------|----------|
| `RESEND_API_KEY` | Secret | Email API authentication | Yes (for contact) |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical URL for sitemap | No |
| `VERCEL_URL` | Auto | Vercel deployment URL | Auto-injected |

### 11.4 CI/CD Pipeline

**Automated Checks**:
1. ✅ ESLint validation
2. ✅ TypeScript type checking
3. ✅ Build success verification
4. ⏳ Unit tests (future)
5. ⏳ E2E tests (future)

---

## 12. Security Considerations

### 12.1 Implemented Security Measures

#### 12.1.1 Content Security Policy (CSP)
- **Image CSP**: Defined in `next.config.ts`
  ```typescript
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  ```
- **SVG Safety**: `dangerouslyAllowSVG: true` with CSP

#### 12.1.2 Form Validation
- **Client-side**: React Hook Form + Zod
- **Server-side**: API route validation
- **Sanitization**: HTML escaping in email templates

#### 12.1.3 API Security
- **CORS**: Next.js default (same-origin)
- **HTTPS**: Enforced by Vercel
- **Email Validation**: Regex + Zod schema

#### 12.1.4 Image Protection
- **Protected Image Component**: Prevents right-click/drag
- **Watermarking**: Ready for implementation
- **EXIF Stripping**: Automatic via `next/image`

### 12.2 Future Security Enhancements

#### 12.2.1 Rate Limiting
- **Contact Form**: 5 requests/hour per IP
- **Library**: `@vercel/rate-limit` or `rate-limiter-flexible`

#### 12.2.2 CAPTCHA Integration
- **Provider**: reCAPTCHA v3 or Turnstile
- **Threshold**: Score-based validation

#### 12.2.3 Input Sanitization
- **Library**: DOMPurify for HTML content
- **Context**: MDX rendering, user-generated content

### 12.3 Privacy Compliance

#### 12.3.1 Data Collection
- **Analytics**: Vercel Analytics (anonymous)
- **Contact Form**: Email, name, message (not stored)
- **Cookies**: Theme preference (localStorage)

#### 12.3.2 GDPR Considerations
- No personal data storage
- Email sent via Resend (GDPR-compliant)
- Cookie consent: Not required (no tracking cookies)

---

## 13. Browser Compatibility

### 13.1 Supported Browsers

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| **Chrome** | 90+ | Primary development browser |
| **Firefox** | 88+ | Full support |
| **Safari** | 14+ | WebGL fallback tested |
| **Edge** | 90+ | Chromium-based |
| **Opera** | 76+ | Chromium-based |
| **Mobile Safari** | iOS 14+ | Touch interactions optimized |
| **Chrome Android** | 90+ | Responsive design |

### 13.2 Progressive Enhancement

#### 13.2.1 JavaScript Disabled
- **Graceful Degradation**: Core content accessible
- **Navigation**: Standard links (no client-side routing)
- **Forms**: Server-side fallback

#### 13.2.2 WebGL Fallback
- **Detection**: Canvas/WebGL capability check
- **Fallback**: Static image grid for CircularGallery
- **Error Handling**: Try-catch on WebGL initialization

### 13.3 Feature Detection

**Polyfills Not Required**:
- React 19 targets modern browsers
- ES2017+ features used
- No IE11 support

**CSS Features**:
- Grid Layout (96% global support)
- Flexbox (99% global support)
- CSS Custom Properties (94% global support)
- CSS Animations (97% global support)

---

## 14. Future Enhancements

### 14.1 Planned Features

#### 14.1.1 Blog System (Q1 2026)
- **Technology**: MDX with full-text search
- **Features**:
  - Tag-based filtering
  - Code syntax highlighting
  - Reading time estimation
  - Social sharing
  - Comments (via Giscus)

#### 14.1.2 Testimonials Section
- **Data Source**: `src/data/testimonials.ts`
- **Display**: Carousel with avatars
- **Integration**: LinkedIn recommendations API

#### 14.1.3 GitHub Activity Widget
- **API**: GitHub GraphQL API
- **Display**: Recent contributions, starred repos
- **Update**: Real-time or daily caching

#### 14.1.4 Dark/Light Mode Toggle
- **Current**: Permanent dark mode
- **Enhancement**: User preference with `next-themes`
- **Storage**: localStorage persistence

#### 14.1.5 Internationalization (i18n)
- **Languages**: Indonesian (primary), English
- **Library**: `next-intl` or `next-i18next`
- **Content**: Separate JSON files per locale

### 14.2 Performance Goals

#### 14.2.1 Core Web Vitals Targets (2026)
- **LCP**: <2.0s (currently <2.5s target)
- **CLS**: <0.05 (currently <0.1 target)
- **INP**: <150ms (currently <200ms target)
- **Lighthouse Score**: 95+ (all categories)

#### 14.2.2 Optimization Roadmap
- [ ] Implement Intersection Observer for lazy sections
- [ ] Replace Framer Motion with CSS animations (where possible)
- [ ] Memoize heavy components (ProjectsPreview, SkillsGrid)
- [ ] Service Worker for offline capability
- [ ] Resource hints (preload, prefetch) for critical routes

### 14.3 Testing Infrastructure

#### 14.3.1 Unit Testing
- **Framework**: Vitest
- **Coverage Target**: 80%
- **Priority**: Utility functions, data loaders

#### 14.3.2 E2E Testing
- **Framework**: Playwright
- **Scenarios**:
  - Contact form submission
  - Project navigation
  - Mobile menu interaction
  - WebGL gallery interaction

#### 14.3.3 Accessibility Testing
- **Tool**: axe-core + Playwright
- **Standard**: WCAG 2.1 Level AA
- **Automation**: CI/CD integration

### 14.4 Content Enhancements

#### 14.4.1 Case Studies
- In-depth project breakdowns
- Challenge-Solution-Result format
- Embedded demos/videos
- Client testimonials

#### 14.4.2 Tech Talks & Presentations
- Slide embeds (Speakerdeck, SlideShare)
- Video recordings (YouTube)
- Speaking engagements timeline

#### 14.4.3 Open Source Contributions
- GitHub contribution graph
- Pull request highlights
- Maintained packages/libraries

---

## 15. Development Workflow

### 15.1 Local Development

#### 15.1.1 Prerequisites
- Node.js 20+
- npm 10+
- Git

#### 15.1.2 Setup
```bash
# Clone repository
git clone https://github.com/xDzaky/dzaky-portfolio.git
cd dzaky-portfolio

# Install dependencies
npm install

# Create .env.local
echo "RESEND_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev
```

#### 15.1.3 Development URLs
- **Local**: http://localhost:3000
- **Turbopack**: Enabled by default

### 15.2 Code Style

#### 15.2.1 ESLint Rules
- Extends `next/core-web-vitals`
- TypeScript strict mode
- Unused variable warnings
- Console.log warnings (production)

#### 15.2.2 Naming Conventions
- **Components**: PascalCase (`HeroSection.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase with `Type` suffix (`ProjectFrontmatter`)
- **Constants**: UPPER_SNAKE_CASE

### 15.3 Git Workflow

#### 15.3.1 Branch Naming
- `feature/add-blog-system`
- `fix/contact-form-validation`
- `chore/update-dependencies`
- `docs/update-readme`

#### 15.3.2 Commit Messages
```
feat: Add blog post filtering by tags
fix: Resolve CircularGallery bend parameter issue
perf: Optimize WebGL render loop
docs: Update TECH_SPEC with new features
```

---

## 16. Troubleshooting

### 16.1 Common Issues

#### 16.1.1 Build Errors

**Issue**: `ssr: false is not allowed with next/dynamic`  
**Solution**: Remove `ssr: false` (Next.js 15 App Router restriction)

**Issue**: WebGL context creation failed  
**Solution**: 
- Check browser WebGL support
- Reduce `dpr` in CircularGallery renderer
- Add error boundary with fallback

#### 16.1.2 Performance Issues

**Issue**: High CLS on CircularGallery  
**Solution**: 
- Set fixed height on container
- Use loading skeleton with same dimensions

**Issue**: Slow page load  
**Solution**:
- Check image sizes (use next/image)
- Verify lazy loading implementation
- Check bundle size with `@next/bundle-analyzer`

### 16.2 Debugging

#### 16.2.1 React DevTools
- Component hierarchy inspection
- Props/state debugging
- Performance profiling

#### 16.2.2 Network Tab
- Check image loading
- Verify API responses
- Monitor bundle sizes

#### 16.2.3 Lighthouse
```bash
# Run Lighthouse audit
npm run build
npm run start
# Open Chrome DevTools > Lighthouse
```

---

## 17. Contact & Support

### 17.1 Developer Information
- **Name**: Achmad Dzaki Habibullah Al Azhar
- **Email**: xdzakyz@gmail.com
- **Location**: Probolinggo, East Java, Indonesia
- **School**: SMK Negeri 1 Kota Probolinggo (Class XI, RPL)

### 17.2 Social Media
- **GitHub**: [github.com/xDzaky](https://github.com/xDzaky)
- **LinkedIn**: [linkedin.com/in/xDzaky](https://linkedin.com/in/xDzaky)
- **Instagram**: [@xDzaky](https://instagram.com/xDzaky)

### 17.3 Project Links
- **Production**: TBD
- **Repository**: Private/TBD
- **Documentation**: This file (TECH_SPEC.md)

---

## 18. Changelog

### Version 0.1.0 (December 3, 2025)
- ✅ Initial project setup with Next.js 15
- ✅ Implemented core pages (Home, About, Projects, Skills, Education, Certificates, Contact)
- ✅ CircularGallery WebGL component with configurable bend parameter
- ✅ Contact form with Resend integration
- ✅ Performance optimizations (lazy loading, font optimization, render optimization)
- ✅ SEO implementation (sitemap, robots, OG image)
- ✅ Mobile-responsive design
- ✅ Dark mode theme
- ✅ Vercel Analytics integration
- ✅ Comprehensive documentation (README, PERFORMANCE.md, TECH_SPEC.md)

---

## 19. License

**Type**: Personal Portfolio (All Rights Reserved)  
**Usage**: Not licensed for redistribution  
**Code Sharing**: Components may be shared with attribution

---

## 20. Appendix

### 20.1 Glossary

- **SSG**: Static Site Generation
- **SSR**: Server-Side Rendering
- **CSR**: Client-Side Rendering
- **ISR**: Incremental Static Regeneration
- **LCP**: Largest Contentful Paint
- **CLS**: Cumulative Layout Shift
- **INP**: Interaction to Next Paint
- **TTFB**: Time to First Byte
- **MDX**: Markdown + JSX
- **OGL**: Open Graphics Library (WebGL wrapper)
- **Radix UI**: Headless UI component library
- **shadcn/ui**: Accessible component system

### 20.2 References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [OGL Library](https://github.com/oframe/ogl)
- [Vercel Platform](https://vercel.com/docs)
- [Web.dev Core Web Vitals](https://web.dev/vitals)

---

**Document Version**: 1.0.0  
**Last Updated**: December 3, 2025  
**Next Review**: March 2026

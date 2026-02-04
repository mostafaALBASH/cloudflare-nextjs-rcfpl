# 🔍 COMPREHENSIVE VERIFICATION PROMPT

## Purpose
Verify that the Next.js RCFPL application migration meets 100% of the requirements specified in the comprehensive migration prompt. This is a complete quality assurance checklist to ensure production readiness.

---

## 📋 HOW TO USE THIS PROMPT

**Instruction for AI Agent:**
> "Thoroughly test and verify the Next.js RCFPL application against ALL items in this verification checklist. For each section, test the functionality/feature, then report: ✅ PASS with brief confirmation, or ❌ FAIL with specific issue details. Provide a final summary with pass/fail count and any critical issues requiring fixes."

---

## 🎯 SECTION 1: CORE FUNCTIONALITY VERIFICATION

### 1.1 Search Functionality
- [ ] **Test 1**: Type "Salah" in search box - should filter to matching players instantly
- [ ] **Test 2**: Clear search - should show all players again
- [ ] **Test 3**: Search with partial match "Haa" - should show Haaland and similar
- [ ] **Test 4**: Search is debounced (300ms) - rapid typing doesn't cause multiple renders
- [ ] **Test 5**: Search works in combination with other filters
- [ ] **Test 6**: Search filter badge appears when searching
- [ ] **Test 7**: Clicking X on search badge clears search

**Expected Result**: Search updates results smoothly, no lag, works with other filters.

---

### 1.2 Team/Club Filter
- [ ] **Test 1**: Select "LIV" from team dropdown - shows only Liverpool players
- [ ] **Test 2**: Select "MCI" - shows only Manchester City players
- [ ] **Test 3**: Team filter works with search simultaneously
- [ ] **Test 4**: Team filter works with position filter simultaneously
- [ ] **Test 5**: Team filter badge shows selected team
- [ ] **Test 6**: Clicking X on team badge clears filter
- [ ] **Test 7**: "All Teams" option resets filter

**Expected Result**: Team filter accurately filters players, works with other filters.

---

### 1.3 Position Filter
- [ ] **Test 1**: Select "GKP" - shows only goalkeepers with 🧤 icon
- [ ] **Test 2**: Select "DEF" - shows only defenders with 🛡️ icon
- [ ] **Test 3**: Select "MID" - shows only midfielders with ⚡ icon
- [ ] **Test 4**: Select "FWD" - shows only forwards with 🎯 icon
- [ ] **Test 5**: Position filter works with search simultaneously
- [ ] **Test 6**: Position filter works with team filter simultaneously
- [ ] **Test 7**: Position badge shows selected position with correct emoji
- [ ] **Test 8**: Mobile: Position buttons change color when selected (GKP=purple, DEF=blue, MID=green, FWD=red)

**Expected Result**: Position filter accurately filters, correct visual indicators.

---

### 1.4 Sorting Functionality
- [ ] **Test 1**: Sort by "Avg Points" (default) - highest points first
- [ ] **Test 2**: Toggle to ascending - lowest points first
- [ ] **Test 3**: Sort by "Consistency Score" - highest scores first
- [ ] **Test 4**: Sort by "Return Rate" - highest rates first
- [ ] **Test 5**: Sort by "5+ Returns Count" - most returns first
- [ ] **Test 6**: Sort by "Hauls (10+)" - most hauls first
- [ ] **Test 7**: Sort by "Blank Rate" - verify order changes
- [ ] **Test 8**: Sort by "Volatility (SD)" - verify order changes
- [ ] **Test 9**: Sort by "Matches" - verify order changes
- [ ] **Test 10**: Sort by "Player Name" - alphabetical order
- [ ] **Test 11**: Sort badge shows current sort with ↑/↓ indicator
- [ ] **Test 12**: Sort persists when using filters
- [ ] **Test 13**: Table headers show sort indicator on active column

**Expected Result**: All 9 sort options work correctly, visual indicators accurate.

---

### 1.5 Pagination
- [ ] **Test 1**: Initial page shows 10 players (or less if total < 10)
- [ ] **Test 2**: Click "Next" - advances to page 2
- [ ] **Test 3**: Click "Previous" - goes back to page 1
- [ ] **Test 4**: "Previous" button disabled on page 1
- [ ] **Test 5**: "Next" button disabled on last page
- [ ] **Test 6**: Current page number displays correctly
- [ ] **Test 7**: Total pages calculates correctly (total items / 10)
- [ ] **Test 8**: Pagination resets to page 1 when filters change
- [ ] **Test 9**: URL doesn't change during pagination (client-side only)
- [ ] **Test 10**: Pagination works with filtered results

**Expected Result**: Smooth pagination, correct calculations, proper button states.

---

### 1.6 View Toggle (Card ↔ Table)
- [ ] **Test 1**: Default view on mobile (<768px) is Card View
- [ ] **Test 2**: Default view on desktop (>1024px) is Table View
- [ ] **Test 3**: Toggle to Card View shows card layout
- [ ] **Test 4**: Toggle to Table View shows table layout
- [ ] **Test 5**: Toast notification appears: "📱 Switched to Card View" or "📊 Switched to Table View"
- [ ] **Test 6**: Toast auto-dismisses after 2 seconds
- [ ] **Test 7**: View preference persists during filtering/sorting
- [ ] **Test 8**: Smooth transition animation between views
- [ ] **Test 9**: Active view button highlighted (blue background)
- [ ] **Test 10**: Responsive: view toggle shows "Cards"/"Table" text on desktop, emoji on mobile

**Expected Result**: Seamless view switching, correct defaults, toast notifications work.

---

### 1.7 CSV Export
- [ ] **Test 1**: Click export button - downloads CSV file
- [ ] **Test 2**: CSV filename includes date/timestamp or descriptive name
- [ ] **Test 3**: CSV includes all visible columns with proper headers
- [ ] **Test 4**: CSV exports filtered data (if filters active)
- [ ] **Test 5**: CSV exports sorted data (matches current sort)
- [ ] **Test 6**: CSV format is valid (opens in Excel/Google Sheets)
- [ ] **Test 7**: Special characters in player names handled correctly
- [ ] **Test 8**: Export button accessible on mobile (FAB with ⬇️)
- [ ] **Test 9**: Export button on desktop shows "Export CSV" text

**Expected Result**: CSV downloads correctly with filtered/sorted data.

---

### 1.8 Mobile Filter Panel
- [ ] **Test 1**: FAB button visible on mobile (<1024px)
- [ ] **Test 2**: FAB shows badge with active filter count
- [ ] **Test 3**: Clicking FAB opens bottom sheet panel
- [ ] **Test 4**: Panel has semi-transparent backdrop overlay
- [ ] **Test 5**: Clicking backdrop closes panel
- [ ] **Test 6**: Panel slides up smoothly with animation
- [ ] **Test 7**: Panel contains: Search, Sort, Team, Position sections
- [ ] **Test 8**: Sort order toggle (High to Low ↔ Low to High) works
- [ ] **Test 9**: Position buttons toggleable (tap to select/deselect)
- [ ] **Test 10**: "Apply Filters" button applies and closes panel
- [ ] **Test 11**: "Clear All" button resets all temp filters in panel
- [ ] **Test 12**: Close X button closes panel without applying
- [ ] **Test 13**: Panel scrollable if content exceeds viewport
- [ ] **Test 14**: Panel max-height is 85vh

**Expected Result**: Mobile filter panel fully functional with smooth UX.

---

### 1.9 Active Filter Badges
- [ ] **Test 1**: No filters active - "Active Filters" section shows only sort badge
- [ ] **Test 2**: Search active - search badge appears with query text
- [ ] **Test 3**: Team active - team badge appears with team name
- [ ] **Test 4**: Position active - position badge appears with position
- [ ] **Test 5**: Sort badge always visible showing current sort
- [ ] **Test 6**: Each badge has correct color (search=blue, team=emerald, position=purple, sort=cyan)
- [ ] **Test 7**: Each badge has X button to clear individual filter
- [ ] **Test 8**: "Clear All" button visible when filters active
- [ ] **Test 9**: "Clear All" clears all filters and resets to defaults
- [ ] **Test 10**: Badge animations (slideIn) work smoothly

**Expected Result**: Filter badges accurately reflect active state, clear buttons work.

---

### 1.10 Collapsible Sections
- [ ] **Test 1**: "What is Return Consistency in FPL?" section collapsed by default
- [ ] **Test 2**: Clicking expands section with smooth animation
- [ ] **Test 3**: Chevron icon rotates 180° when expanded
- [ ] **Test 4**: Content displays correctly when expanded
- [ ] **Test 5**: Clicking again collapses section
- [ ] **Test 6**: "Methodology" section works identically
- [ ] **Test 7**: Sections have hover effect on header
- [ ] **Test 8**: Collapse/expand is smooth (not jumpy)

**Expected Result**: Collapsible sections work smoothly with animations.

---

## 🎨 SECTION 2: STYLING & DESIGN VERIFICATION

### 2.1 Color Scheme
- [ ] **Test 1**: Background gradient: slate-900 (#0f172a) → slate-800 (#1e293b) → slate-900
- [ ] **Test 2**: Heading gradient: blue-400 (#60a5fa) → cyan-400 (#22d3ee)
- [ ] **Test 3**: Primary text: slate-100 (#f1f5f9) or slate-200 (#e2e8f0)
- [ ] **Test 4**: Secondary text: slate-400 (#94a3b8)
- [ ] **Test 5**: Card backgrounds: gradient from-slate-800 to-slate-800/80
- [ ] **Test 6**: Avg Points color: emerald-400 (#34d399)
- [ ] **Test 7**: Returns color: green-400/cyan-400
- [ ] **Test 8**: Blanks color: rose-400
- [ ] **Test 9**: Position badges:
  - GKP: purple (bg-purple-900/30 text-purple-400)
  - DEF: blue (bg-blue-900/30 text-blue-400)
  - MID: green (bg-green-900/30 text-green-400)
  - FWD: red (bg-red-900/30 text-red-400)

**Expected Result**: All colors match specification exactly.

---

### 2.2 Typography
- [ ] **Test 1**: Font family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
- [ ] **Test 2**: Main heading (h1): text-2xl sm:text-3xl lg:text-4xl font-bold
- [ ] **Test 3**: Body text: leading-relaxed
- [ ] **Test 4**: Gradient text on headings: bg-clip-text text-transparent
- [ ] **Test 5**: Font weights correct: normal, semibold, bold as specified
- [ ] **Test 6**: Text sizes responsive (smaller on mobile, larger on desktop)

**Expected Result**: Typography matches design system.

---

### 2.3 Spacing & Layout
- [ ] **Test 1**: Container max-width: max-w-screen-2xl
- [ ] **Test 2**: Container padding: px-4 sm:px-6 lg:px-8
- [ ] **Test 3**: Section spacing: mb-6 sm:mb-8
- [ ] **Test 4**: Card padding: p-4
- [ ] **Test 5**: Button height: h-12
- [ ] **Test 6**: Input height: h-12
- [ ] **Test 7**: Border radius: rounded-xl for cards, rounded-lg for inputs
- [ ] **Test 8**: Gap between elements consistent with Tailwind spacing

**Expected Result**: Spacing consistent throughout, matches original.

---

### 2.4 Buttons & Interactivity
- [ ] **Test 1**: Primary button: gradient from-blue-600 to-blue-700
- [ ] **Test 2**: Button hover: from-blue-500 to-blue-600
- [ ] **Test 3**: Button active: scale-95 transform
- [ ] **Test 4**: Button disabled: opacity-50 cursor-not-allowed
- [ ] **Test 5**: Transition duration: 200ms
- [ ] **Test 6**: Export button: gradient from-emerald-600 to-emerald-700
- [ ] **Test 7**: Secondary buttons: bg-slate-700 border-slate-600
- [ ] **Test 8**: Button touch targets ≥44px for mobile
- [ ] **Test 9**: Hover effects work on desktop, not triggered on mobile

**Expected Result**: All button states and interactions work correctly.

---

### 2.5 Cards (Card View)
- [ ] **Test 1**: Card background: from-slate-800 to-slate-800/90
- [ ] **Test 2**: Card border: border-slate-700
- [ ] **Test 3**: Card hover: border-blue-500/50
- [ ] **Test 4**: Card border-radius: rounded-xl
- [ ] **Test 5**: Card shadow on hover: shadow-lg shadow-blue-500/10
- [ ] **Test 6**: Player name: text-lg font-bold text-blue-300
- [ ] **Test 7**: Team badge: bg-slate-700 rounded-full
- [ ] **Test 8**: Position badge: color-coded correctly
- [ ] **Test 9**: Metrics grid: grid-cols-2 gap-2
- [ ] **Test 10**: Card animation: fadeInUp on mount

**Expected Result**: Cards styled identically to original.

---

### 2.6 Table (Table View)
- [ ] **Test 1**: Table container: bg-slate-800/60 border-slate-700 rounded-xl
- [ ] **Test 2**: Table header: gradient from-slate-800 to-slate-700
- [ ] **Test 3**: Header border: border-b-2 border-slate-600
- [ ] **Test 4**: First column (player name): sticky left-0 z-20
- [ ] **Test 5**: First column border: border-r border-slate-600
- [ ] **Test 6**: Row hover: bg-slate-700/30
- [ ] **Test 7**: Row border: border-b border-slate-700/50
- [ ] **Test 8**: Numeric columns: text-right tabular-nums
- [ ] **Test 9**: Text columns: text-left
- [ ] **Test 10**: Column minimum widths preserved
- [ ] **Test 11**: Horizontal scroll on mobile with custom scrollbar
- [ ] **Test 12**: Sort indicator (↑↓) shows on active column

**Expected Result**: Table styling matches, sticky column works, scrolling smooth.

---

### 2.7 Animations
- [ ] **Test 1**: Card fadeInUp: 0.3s ease-out
- [ ] **Test 2**: Filter badge slideIn: 0.2s ease-out
- [ ] **Test 3**: FAB pulse: 2s infinite
- [ ] **Test 4**: View transition: viewFadeIn 0.3s ease-out
- [ ] **Test 5**: Panel slide up: 0.3s ease-out
- [ ] **Test 6**: Toast notification: fade in/out transitions
- [ ] **Test 7**: Collapsible section expand/collapse smooth
- [ ] **Test 8**: Button scale on active: scale-95
- [ ] **Test 9**: All transitions respect prefers-reduced-motion
- [ ] **Test 10**: No janky animations or layout shifts

**Expected Result**: Smooth animations throughout, no performance issues.

---

### 2.8 Custom Scrollbars
- [ ] **Test 1**: Table horizontal scrollbar: height 10px
- [ ] **Test 2**: Scrollbar track: bg #1e293b, rounded
- [ ] **Test 3**: Scrollbar thumb: bg #475569, rounded
- [ ] **Test 4**: Scrollbar thumb hover: bg #64748b
- [ ] **Test 5**: Filter panel scrollbar: width 6px
- [ ] **Test 6**: Scrollbars styled in Webkit browsers (Chrome, Safari, Edge)
- [ ] **Test 7**: Graceful fallback in Firefox

**Expected Result**: Custom scrollbars match design.

---

### 2.9 FOUC Prevention
- [ ] **Test 1**: On hard refresh - no unstyled content flash
- [ ] **Test 2**: Background gradient shows immediately
- [ ] **Test 3**: Body hidden until React hydrates
- [ ] **Test 4**: Smooth fade-in transition when content appears
- [ ] **Test 5**: Critical CSS in <head> before external stylesheets
- [ ] **Test 6**: No white flash before styles load

**Expected Result**: Zero flash of unstyled content, smooth loading.

---

## 🔍 SECTION 3: SEO & METADATA VERIFICATION

### 3.1 Basic Meta Tags
- [ ] **Test 1**: Page title: "Return Consistency in FPL – Reliable Fantasy Premier League Players | RCFPL"
- [ ] **Test 2**: Meta description: 155 chars max, includes "5+ point returns"
- [ ] **Test 3**: Meta keywords: includes FPL, Fantasy Premier League, etc.
- [ ] **Test 4**: Author: "Mostafa Elbesh"
- [ ] **Test 5**: Robots: index, follow, max-image-preview:large
- [ ] **Test 6**: Canonical URL: https://rcfpl.netlify.app/ (or your deployment URL)
- [ ] **Test 7**: Theme color: #38bdf8
- [ ] **Test 8**: Viewport: width=device-width, initial-scale=1.0
- [ ] **Test 9**: Charset: UTF-8

**Verification**: View page source or use browser dev tools → Elements → <head>

---

### 3.2 Open Graph Tags
- [ ] **Test 1**: og:type = "website"
- [ ] **Test 2**: og:url = correct URL
- [ ] **Test 3**: og:title = optimized title
- [ ] **Test 4**: og:description = engaging description
- [ ] **Test 5**: og:image = 1200x630px image URL
- [ ] **Test 6**: og:image:width = "1200"
- [ ] **Test 7**: og:image:height = "630"
- [ ] **Test 8**: og:site_name = "RCFPL"
- [ ] **Test 9**: og:locale = "en_US"

**Verification**: Use Facebook Sharing Debugger or view source

---

### 3.3 Twitter Card Tags
- [ ] **Test 1**: twitter:card = "summary_large_image"
- [ ] **Test 2**: twitter:url = correct URL
- [ ] **Test 3**: twitter:title = optimized title
- [ ] **Test 4**: twitter:description = description
- [ ] **Test 5**: twitter:image = large image URL
- [ ] **Test 6**: twitter:creator = "@mostafaALBASH"

**Verification**: Use Twitter Card Validator or view source

---

### 3.4 JSON-LD Structured Data (Schema.org)
#### WebApplication Schema
- [ ] **Test 1**: @type: "WebApplication" present
- [ ] **Test 2**: name includes "RCFPL"
- [ ] **Test 3**: applicationCategory: "SportsApplication"
- [ ] **Test 4**: featureList array with 9 features
- [ ] **Test 5**: offers.price = "0" (free)
- [ ] **Test 6**: author.name = "Mostafa Elbesh"
- [ ] **Test 7**: isAccessibleForFree: true
- [ ] **Test 8**: datePublished: "2025-08-01"
- [ ] **Test 9**: dateModified: "2026-01-31"
- [ ] **Test 10**: aggregateRating present (5/5)

#### FAQPage Schema
- [ ] **Test 11**: @type: "FAQPage" present
- [ ] **Test 12**: mainEntity array with 8 questions
- [ ] **Test 13**: Question 1: "What is Return Consistency in FPL?"
- [ ] **Test 14**: Question 2: "How is the Consistency Score calculated?"
- [ ] **Test 15**: All 8 Q&A pairs have proper structure
- [ ] **Test 16**: Answers are detailed and accurate

#### Organization Schema
- [ ] **Test 17**: @type: "Organization" present
- [ ] **Test 18**: name: "RCFPL"
- [ ] **Test 19**: logo reference included
- [ ] **Test 20**: sameAs array with GitHub link

#### WebSite Schema
- [ ] **Test 21**: @type: "WebSite" present
- [ ] **Test 22**: SearchAction with URL template
- [ ] **Test 23**: inLanguage: "en-US"

#### BreadcrumbList Schema
- [ ] **Test 24**: @type: "BreadcrumbList" present
- [ ] **Test 25**: 3 items: Home → Analysis → Methodology
- [ ] **Test 26**: Position numbers 1, 2, 3

**Verification**: View page source, search for `<script type="application/ld+json">`, or use Google Rich Results Test

---

### 3.5 Semantic HTML & ARIA
- [ ] **Test 1**: <header> has role="banner" and itemscope
- [ ] **Test 2**: <main> has role="main" and itemscope
- [ ] **Test 3**: <footer> has role="contentinfo" and itemscope
- [ ] **Test 4**: <nav> elements have aria-label
- [ ] **Test 5**: Buttons have aria-label where needed
- [ ] **Test 6**: <article> tags for definition/methodology
- [ ] **Test 7**: Proper heading hierarchy (h1 → h2 → h3)
- [ ] **Test 8**: Lists use <ul>, <ol> where appropriate
- [ ] **Test 9**: itemprop attributes on key elements
- [ ] **Test 10**: No generic <div> where semantic element exists

**Verification**: Use accessibility inspector or view source

---

### 3.6 PWA Manifest
- [ ] **Test 1**: /manifest.json exists and is accessible
- [ ] **Test 2**: name: "RCFPL - Return Consistency for Fantasy Premier League"
- [ ] **Test 3**: short_name: "RCFPL"
- [ ] **Test 4**: display: "standalone"
- [ ] **Test 5**: background_color: "#0f172a"
- [ ] **Test 6**: theme_color: "#38bdf8"
- [ ] **Test 7**: icons array with 512x512 SVG
- [ ] **Test 8**: categories: ["sports", "productivity", "utilities"]
- [ ] **Test 9**: Link tag in <head>: <link rel="manifest" href="/manifest.json">

**Verification**: Check /manifest.json URL directly

---

### 3.7 Robots.txt
- [ ] **Test 1**: /robots.txt exists and is accessible
- [ ] **Test 2**: User-agent: * Allow: /
- [ ] **Test 3**: GPTBot: Allow
- [ ] **Test 4**: ChatGPT-User: Allow
- [ ] **Test 5**: Google-Extended: Allow
- [ ] **Test 6**: ClaudeBot: Allow
- [ ] **Test 7**: anthropic-ai: Allow
- [ ] **Test 8**: PerplexityBot: Allow
- [ ] **Test 9**: Applebot: Allow
- [ ] **Test 10**: Amazonbot: Allow
- [ ] **Test 11**: Sitemap reference: Sitemap: https://your-domain/sitemap.xml

**Verification**: Navigate to /robots.txt

---

### 3.8 Sitemap.xml
- [ ] **Test 1**: /sitemap.xml exists and is accessible
- [ ] **Test 2**: Valid XML structure
- [ ] **Test 3**: Main URL (/) present with priority 1.0
- [ ] **Test 4**: /#definition present with priority 0.8
- [ ] **Test 5**: /#methodology present with priority 0.8
- [ ] **Test 6**: lastmod dates present (2026-01-31)
- [ ] **Test 7**: changefreq: daily for main, weekly for sections
- [ ] **Test 8**: Proper XML namespace declarations

**Verification**: Navigate to /sitemap.xml

---

### 3.9 Favicon & Icons
- [ ] **Test 1**: Favicon present (SVG data URI or file)
- [ ] **Test 2**: Icon colors: blue (#38bdf8), slate (#1e293b)
- [ ] **Test 3**: Apple touch icon present
- [ ] **Test 4**: Icon displays correctly in browser tab
- [ ] **Test 5**: Icon displays correctly when added to home screen (mobile)

**Verification**: Check browser tab, mobile home screen

---

## ⚡ SECTION 4: PERFORMANCE VERIFICATION

### 4.1 Core Web Vitals
**Test using**: Lighthouse, PageSpeed Insights, or Chrome DevTools Performance tab

- [ ] **Test 1**: LCP (Largest Contentful Paint) < 2.5 seconds
- [ ] **Test 2**: FID (First Input Delay) < 100ms
- [ ] **Test 3**: CLS (Cumulative Layout Shift) < 0.1
- [ ] **Test 4**: TTI (Time to Interactive) < 3.5 seconds
- [ ] **Test 5**: TBT (Total Blocking Time) < 200ms

**Expected**: All vitals in "Good" green zone

---

### 4.2 Build & Bundle
- [ ] **Test 1**: `npm run build` completes without errors
- [ ] **Test 2**: No TypeScript errors during build
- [ ] **Test 3**: No ESLint errors
- [ ] **Test 4**: Bundle size reasonable (<500KB main JS)
- [ ] **Test 5**: CSS extracted and minified
- [ ] **Test 6**: Static assets optimized
- [ ] **Test 7**: Build output includes optimized HTML, CSS, JS
- [ ] **Test 8**: Source maps generated for debugging (dev mode)

**Verification**: Run build command, check output size

---

### 4.3 Runtime Performance
- [ ] **Test 1**: Initial page load feels instant (<1s)
- [ ] **Test 2**: Search input responsive (no lag during typing)
- [ ] **Test 3**: Filter changes apply immediately
- [ ] **Test 4**: Sort changes apply immediately
- [ ] **Test 5**: View toggle instant
- [ ] **Test 6**: Pagination smooth
- [ ] **Test 7**: Animations don't cause jank (60fps)
- [ ] **Test 8**: No console errors during interaction
- [ ] **Test 9**: No memory leaks (test by heavy interaction)
- [ ] **Test 10**: Scroll performance smooth on mobile

**Verification**: Use Chrome DevTools Performance profiler

---

### 4.4 Optimization Techniques
- [ ] **Test 1**: Code splitting implemented (if applicable)
- [ ] **Test 2**: Components memoized where appropriate
- [ ] **Test 3**: Expensive calculations use useMemo
- [ ] **Test 4**: Event handlers use useCallback to prevent re-renders
- [ ] **Test 5**: Debouncing on search (300ms)
- [ ] **Test 6**: No unnecessary re-renders (React DevTools Profiler)
- [ ] **Test 7**: Images optimized (if any present)
- [ ] **Test 8**: Lazy loading for below-fold content (if applicable)

**Verification**: Code review + React DevTools

---

## ♿ SECTION 5: ACCESSIBILITY VERIFICATION

### 5.1 Keyboard Navigation
- [ ] **Test 1**: Tab key navigates through all interactive elements
- [ ] **Test 2**: Tab order logical (top to bottom, left to right)
- [ ] **Test 3**: Focus visible on all elements (2px outline)
- [ ] **Test 4**: Enter key activates buttons
- [ ] **Test 5**: Escape key closes filter panel (mobile)
- [ ] **Test 6**: Arrow keys work in dropdowns
- [ ] **Test 7**: No keyboard traps
- [ ] **Test 8**: Skip to main content link (if present)

**Verification**: Navigate entire app using only keyboard

---

### 5.2 Screen Reader
**Test using**: NVDA (Windows), JAWS, or VoiceOver (Mac/iOS)

- [ ] **Test 1**: Page title announced correctly
- [ ] **Test 2**: Headings announced with level (h1, h2, h3)
- [ ] **Test 3**: Buttons announce their purpose
- [ ] **Test 4**: Form inputs have associated labels
- [ ] **Test 5**: Filter changes announced
- [ ] **Test 6**: Page navigation announced
- [ ] **Test 7**: Table structure announced (headers, rows, cells)
- [ ] **Test 8**: Empty states readable
- [ ] **Test 9**: Loading states announced
- [ ] **Test 10**: Error messages readable

**Verification**: Enable screen reader, navigate app

---

### 5.3 Color & Contrast
**Test using**: Chrome DevTools Accessibility panel, Contrast Checker

- [ ] **Test 1**: Text contrast ≥4.5:1 (normal text)
- [ ] **Test 2**: Large text contrast ≥3:1
- [ ] **Test 3**: Button text contrast ≥4.5:1
- [ ] **Test 4**: Focus indicators contrast ≥3:1
- [ ] **Test 5**: No information conveyed by color alone
- [ ] **Test 6**: Color blindness modes - still usable
- [ ] **Test 7**: High contrast mode supported

**Verification**: Use contrast checker tools, test in grayscale

---

### 5.4 ARIA Labels & Roles
- [ ] **Test 1**: All interactive elements have accessible names
- [ ] **Test 2**: Landmark roles present (banner, main, navigation, contentinfo)
- [ ] **Test 3**: aria-label on buttons without visible text
- [ ] **Test 4**: aria-pressed on toggle buttons (view toggle)
- [ ] **Test 5**: aria-expanded on collapsible sections
- [ ] **Test 6**: aria-controls linking controls to targets
- [ ] **Test 7**: aria-live for dynamic updates (toast notifications)
- [ ] **Test 8**: No redundant ARIA (if semantic HTML sufficient)

**Verification**: Inspect HTML with browser dev tools

---

### 5.5 Focus Management
- [ ] **Test 1**: Focus moves into filter panel when opened
- [ ] **Test 2**: Focus trapped in modal/panel while open
- [ ] **Test 3**: Focus returns to trigger when panel closes
- [ ] **Test 4**: Focus visible on all interactive elements
- [ ] **Test 5**: Focus doesn't get lost during state changes
- [ ] **Test 6**: Focus order matches visual order

**Verification**: Test with keyboard navigation

---

### 5.6 Mobile Accessibility
- [ ] **Test 1**: Touch targets ≥44x44px (iOS) or 48x48px (Android)
- [ ] **Test 2**: Tap delays removed (-webkit-tap-highlight-color: transparent)
- [ ] **Test 3**: Pinch to zoom enabled
- [ ] **Test 4**: Orientation changes handled (portrait/landscape)
- [ ] **Test 5**: Voice control works (Siri, Google Assistant)
- [ ] **Test 6**: Screen reader gestures work (swipe, tap)

**Verification**: Test on real mobile devices

---

## 📱 SECTION 6: RESPONSIVE DESIGN VERIFICATION

### 6.1 Mobile (<768px)
- [ ] **Test 1**: Card view default on mobile
- [ ] **Test 2**: Single column layout
- [ ] **Test 3**: FAB buttons visible (filter + export)
- [ ] **Test 4**: Header responsive (stacked or horizontal)
- [ ] **Test 5**: Stats cards 2 columns (grid-cols-2)
- [ ] **Test 6**: Filter panel full-screen bottom sheet
- [ ] **Test 7**: Table horizontal scroll enabled
- [ ] **Test 8**: Text sizes appropriate for mobile
- [ ] **Test 9**: Touch targets sized correctly
- [ ] **Test 10**: No horizontal overflow
- [ ] **Test 11**: Viewport meta tag present and correct

**Test devices**: iPhone SE (375px), iPhone 12 (390px), Android (360px)

---

### 6.2 Tablet (768px - 1024px)
- [ ] **Test 1**: Card view default (can toggle to table)
- [ ] **Test 2**: Desktop controls visible (no FAB)
- [ ] **Test 3**: Stats cards 4 columns (lg:grid-cols-4)
- [ ] **Test 4**: 2-column card grid possible
- [ ] **Test 5**: Filter controls inline (not bottom sheet)
- [ ] **Test 6**: Adequate spacing between elements
- [ ] **Test 7**: Table readable if toggled to table view

**Test devices**: iPad (768px), iPad Pro (1024px)

---

### 6.3 Desktop (>1024px)
- [ ] **Test 1**: Table view default on desktop
- [ ] **Test 2**: Desktop controls visible at top
- [ ] **Test 3**: Stats cards 4 columns
- [ ] **Test 4**: Table fully visible without scroll (if columns fit)
- [ ] **Test 5**: Sticky table column works
- [ ] **Test 6**: Hover effects active
- [ ] **Test 7**: No FAB buttons (desktop controls used)
- [ ] **Test 8**: Max container width: max-w-screen-2xl
- [ ] **Test 9**: Centered layout with padding

**Test resolutions**: 1366x768, 1920x1080, 2560x1440

---

### 6.4 Breakpoint Transitions
- [ ] **Test 1**: Smooth transition when resizing browser
- [ ] **Test 2**: No layout breaking at breakpoint edges
- [ ] **Test 3**: View mode auto-switches at breakpoints (if designed)
- [ ] **Test 4**: Elements reposition smoothly
- [ ] **Test 5**: No content clipping during resize

**Verification**: Slowly resize browser from mobile to desktop and back

---

## 🧪 SECTION 7: DATA & LOGIC VERIFICATION

### 7.1 Data Loading
- [ ] **Test 1**: player-metrics.json imported correctly
- [ ] **Test 2**: All players display (check total count)
- [ ] **Test 3**: All columns present with data
- [ ] **Test 4**: No missing or undefined values displayed
- [ ] **Test 5**: Data types correct (numbers as numbers, strings as strings)
- [ ] **Test 6**: No data corruption or parsing errors

**Verification**: Check console for errors, verify total player count

---

### 7.2 Calculations & Formatting
- [ ] **Test 1**: Consistency Score displays correctly
- [ ] **Test 2**: Low sample indicator shows when matches < 6
- [ ] **Test 3**: Percentages formatted correctly (return_rate, blanks_rate)
- [ ] **Test 4**: Decimal places consistent (typically 1 or 2 decimals)
- [ ] **Test 5**: Position icons display correctly (🧤 🛡️ ⚡ 🎯)
- [ ] **Test 6**: Team abbreviations display correctly
- [ ] **Test 7**: Player names display fully (not truncated incorrectly)

**Verification**: Spot check various players' data

---

### 7.3 Filter Logic
- [ ] **Test 1**: Search filters by player name (case-insensitive)
- [ ] **Test 2**: Team filter shows only selected team
- [ ] **Test 3**: Position filter shows only selected position
- [ ] **Test 4**: Combined filters work (AND logic, not OR)
- [ ] **Test 5**: Filters return correct subset of data
- [ ] **Test 6**: Empty result set handled gracefully
- [ ] **Test 7**: Filter reset returns to full dataset

**Verification**: Test filter combinations, verify counts

---

### 7.4 Sort Logic
- [ ] **Test 1**: Ascending sort orders correctly (low to high)
- [ ] **Test 2**: Descending sort orders correctly (high to low)
- [ ] **Test 3**: Numeric sorts compare numerically (not lexicographically)
- [ ] **Test 4**: String sorts (player name) alphabetical
- [ ] **Test 5**: Sort stable (equal values maintain original order)
- [ ] **Test 6**: Sort persists through pagination

**Verification**: Sort by each column, verify order

---

### 7.5 Pagination Logic
- [ ] **Test 1**: Page size always 10 (except last page)
- [ ] **Test 2**: Total pages = ceil(total items / 10)
- [ ] **Test 3**: Page 1 shows items 1-10
- [ ] **Test 4**: Page 2 shows items 11-20
- [ ] **Test 5**: Last page shows remaining items
- [ ] **Test 6**: Current page doesn't exceed total pages
- [ ] **Test 7**: Pagination resets when filters change

**Verification**: Manually count items, verify page calculations

---

## 🔧 SECTION 8: CODE QUALITY VERIFICATION

### 8.1 TypeScript
- [ ] **Test 1**: Zero TypeScript errors in build
- [ ] **Test 2**: No `any` types used (or minimal with justification)
- [ ] **Test 3**: All props typed with interfaces
- [ ] **Test 4**: All function return types explicit or inferred correctly
- [ ] **Test 5**: Strict mode enabled
- [ ] **Test 6**: Type imports used correctly
- [ ] **Test 7**: Enums or union types for constants

**Verification**: Run `tsc --noEmit`, check for errors

---

### 8.2 Code Structure
- [ ] **Test 1**: Components organized in /components folder
- [ ] **Test 2**: Utilities in /lib or /utils folder
- [ ] **Test 3**: Types/interfaces in dedicated file
- [ ] **Test 4**: Configuration constants separated
- [ ] **Test 5**: No duplicate code (DRY principle)
- [ ] **Test 6**: Functions single responsibility
- [ ] **Test 7**: Component size reasonable (<300 lines)
- [ ] **Test 8**: Proper file naming conventions

**Verification**: Code review

---

### 8.3 React Best Practices
- [ ] **Test 1**: Functional components used
- [ ] **Test 2**: Hooks used correctly (not in conditions/loops)
- [ ] **Test 3**: useEffect cleanup functions where needed
- [ ] **Test 4**: Memoization (useMemo, useCallback) for performance
- [ ] **Test 5**: Key props on list items
- [ ] **Test 6**: No inline function definitions in JSX (performance)
- [ ] **Test 7**: Proper state management (useState)
- [ ] **Test 8**: "use client" directive where needed

**Verification**: Code review + React DevTools

---

### 8.4 Error Handling
- [ ] **Test 1**: Try-catch blocks around risky operations
- [ ] **Test 2**: Error boundaries for component errors (if applicable)
- [ ] **Test 3**: Graceful fallbacks for missing data
- [ ] **Test 4**: User-friendly error messages
- [ ] **Test 5**: Console errors logged appropriately
- [ ] **Test 6**: No unhandled promise rejections

**Verification**: Intentionally break things, see how app handles

---

### 8.5 Comments & Documentation
- [ ] **Test 1**: Complex logic commented
- [ ] **Test 2**: JSDoc comments on public functions
- [ ] **Test 3**: TypeScript interfaces documented
- [ ] **Test 4**: README.md present with setup instructions
- [ ] **Test 5**: No outdated or misleading comments
- [ ] **Test 6**: TODO comments have context

**Verification**: Code review

---

## 🚀 SECTION 9: PRODUCTION READINESS

### 9.1 Build Process
- [ ] **Test 1**: `npm run build` succeeds
- [ ] **Test 2**: Build warnings addressed
- [ ] **Test 3**: Production build optimized (minified)
- [ ] **Test 4**: Environment variables handled correctly
- [ ] **Test 5**: .env.example provided if using env vars
- [ ] **Test 6**: .gitignore includes node_modules, .next, etc.

**Verification**: Run production build

---

### 9.2 Deployment
- [ ] **Test 1**: next.config.js/ts configured for static export (if needed)
- [ ] **Test 2**: Public assets in /public folder
- [ ] **Test 3**: _headers file configured (if using Netlify/Vercel)
- [ ] **Test 4**: robots.txt in /public
- [ ] **Test 5**: sitemap.xml in /public
- [ ] **Test 6**: manifest.json in /public
- [ ] **Test 7**: Deployment preview works
- [ ] **Test 8**: Production URL correct in metadata

**Verification**: Test deployment on staging environment

---

### 9.3 Security
- [ ] **Test 1**: No sensitive data in code
- [ ] **Test 2**: No API keys committed
- [ ] **Test 3**: Dependencies up to date (no critical vulnerabilities)
- [ ] **Test 4**: XSS protection (React escapes by default)
- [ ] **Test 5**: CSRF not applicable (no forms submitting to server)
- [ ] **Test 6**: Content Security Policy headers (if applicable)

**Verification**: Run `npm audit`, check security headers

---

### 9.4 Browser Compatibility
- [ ] **Test 1**: Chrome (latest) - fully functional
- [ ] **Test 2**: Firefox (latest) - fully functional
- [ ] **Test 3**: Safari (latest) - fully functional
- [ ] **Test 4**: Edge (latest) - fully functional
- [ ] **Test 5**: Chrome Mobile (Android) - fully functional
- [ ] **Test 6**: Safari Mobile (iOS) - fully functional
- [ ] **Test 7**: No browser-specific bugs
- [ ] **Test 8**: Graceful degradation for older browsers (if supporting)

**Verification**: Test on each browser

---

### 9.5 Final Checks
- [ ] **Test 1**: No console errors in production build
- [ ] **Test 2**: No console warnings (or documented/acceptable)
- [ ] **Test 3**: No 404 errors for assets
- [ ] **Test 4**: All links work (no broken links)
- [ ] **Test 5**: Forms submit correctly (if any)
- [ ] **Test 6**: App works offline (if PWA features enabled)
- [ ] **Test 7**: App passes Lighthouse audit (score >90 all categories)
- [ ] **Test 8**: SEO audit tools pass (Google Search Console, etc.)

**Verification**: Full regression test

---

## 📊 FINAL SUMMARY TEMPLATE

After completing all tests above, AI should provide this summary:

```
=== RCFPL NEXT.JS MIGRATION VERIFICATION RESULTS ===

TOTAL TESTS: [X]
✅ PASSED: [X]
❌ FAILED: [X]
⚠️ WARNINGS: [X]

--- SECTION BREAKDOWN ---
Section 1 - Core Functionality: [X/Y passed]
Section 2 - Styling & Design: [X/Y passed]
Section 3 - SEO & Metadata: [X/Y passed]
Section 4 - Performance: [X/Y passed]
Section 5 - Accessibility: [X/Y passed]
Section 6 - Responsive Design: [X/Y passed]
Section 7 - Data & Logic: [X/Y passed]
Section 8 - Code Quality: [X/Y passed]
Section 9 - Production Readiness: [X/Y passed]

--- CRITICAL ISSUES (if any) ---
[List any blocking issues that must be fixed]

--- NON-CRITICAL ISSUES (if any) ---
[List minor issues or improvements]

--- RECOMMENDATIONS ---
[Any suggestions for optimization or enhancement]

--- PRODUCTION STATUS ---
✅ READY FOR PRODUCTION
or
❌ NOT READY - [X] critical issues must be resolved

--- NEXT STEPS ---
[What needs to be done before deployment]
```

---

## 🎯 PASSING CRITERIA

To be considered **100% complete and production-ready**:

- ✅ **Functionality**: 100% of tests in Section 1 pass
- ✅ **Styling**: 95%+ of tests in Section 2 pass (minor visual differences acceptable)
- ✅ **SEO**: 100% of critical SEO tests in Section 3 pass
- ✅ **Performance**: All Core Web Vitals in "Good" range (Section 4)
- ✅ **Accessibility**: 90%+ of tests in Section 5 pass (WCAG 2.1 AA)
- ✅ **Responsive**: 100% of tests in Section 6 pass
- ✅ **Data Logic**: 100% of tests in Section 7 pass
- ✅ **Code Quality**: 90%+ of tests in Section 8 pass
- ✅ **Production Ready**: 100% of tests in Section 9 pass

**ZERO critical errors** in any category.

---

**END OF VERIFICATION PROMPT**

Use this prompt after the migration is complete to ensure 100% accuracy and production readiness.

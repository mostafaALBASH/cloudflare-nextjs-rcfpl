# RCFPL Next.js - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Type Checking
npx tsc --noEmit     # Check TypeScript types

# Linting
npm run lint         # Run ESLint
```

---

## 🎯 Key Features

### Data Display
- **Card View** - Mobile-optimized player cards
- **Table View** - Desktop-optimized data table with sticky columns
- **View Toggle** - Switch between card and table views
- **Pagination** - 10 players per page

### Filtering & Search
- **Search** - Real-time search by player name (debounced 300ms)
- **Team Filter** - Filter by club/team
- **Position Filter** - Filter by position (GKP, DEF, MID, FWD)
- **Combined Filters** - All filters work together
- **Clear Filters** - Individual and "Clear All" options

### Sorting
- 9 sort options:
  1. Avg Points (default)
  2. Consistency Score
  3. Return Rate
  4. 5+ Returns Count
  5. Hauls (10+)
  6. Blank Rate
  7. Volatility (SD)
  8. Matches
  9. Player Name
- Ascending/descending toggle
- Visual sort indicators

### Export
- **CSV Export** - Download filtered/sorted data
- Includes all player metrics
- Proper CSV formatting

### Mobile Features
- **FAB Buttons** - Filter and Export floating action buttons
- **Bottom Sheet** - Mobile filter panel
- **Touch Optimized** - Large touch targets
- **Responsive** - Automatic view switching

---

## 📊 Data Structure

### Player Metrics
Each player has these metrics:
- **id** - Unique identifier
- **web_name** - Player name
- **team** - Club abbreviation
- **element_type** - Position (GKP/DEF/MID/FWD)
- **matches_counted** - Appearances
- **returns_5plus_count** - 5+ point returns
- **return_rate_raw** - Raw return rate %
- **return_rate_smooth** - Smoothed return rate %
- **blanks_le2_count** - Blanks (≤2 points)
- **blanks_rate** - Blank rate %
- **hauls_10plus_count** - 10+ point hauls
- **points_avg** - Average points
- **points_sd** - Points volatility
- **consistency_score** - Composite score (0-100)

### Data Location
`src/data/player-metrics.json`

---

## 🎨 Customization

### Colors
Edit `src/app/globals.css` for color scheme changes.

Key colors:
- Background: `#0f172a` → `#1e293b` (gradient)
- Accent: `#60a5fa` → `#22d3ee` (blue to cyan)
- Success: `#34d399` (emerald)
- Danger: `#fb7185` (rose)

### Configuration
Edit `src/lib/config.ts` for app settings:
- `DEFAULT_PAGE_SIZE` - Items per page (default: 10)
- `DEFAULT_SORT_BY` - Default sort column
- `SEARCH_DEBOUNCE_DELAY` - Search delay (default: 300ms)
- `MOBILE_BREAKPOINT` - Mobile threshold (default: 768px)

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Inline Tailwind classes
- Animations: CSS keyframes in globals.css

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Card view default
- Bottom sheet filter panel
- FAB buttons visible
- Single column layout

### Tablet (768px - 1024px)
- Card view default
- Desktop controls visible
- 2-column card grid

### Desktop (> 1024px)
- Table view default
- Full desktop controls
- Horizontal scrolling table
- All filters inline

---

## 🔍 SEO Features

### Meta Tags
- 35+ meta tags implemented
- Open Graph for social sharing
- Twitter Card for Twitter
- PWA manifest for mobile

### Structured Data
6 JSON-LD schemas:
1. WebApplication
2. FAQPage
3. Organization
4. WebSite
5. BreadcrumbList
6. Semantic HTML enhancements

### Files
- `public/robots.txt` - Search engine instructions
- `public/sitemap.xml` - Site map
- `public/manifest.json` - PWA configuration
- `public/_headers` - Security headers

---

## 🛠️ Development Tips

### Adding New Metrics
1. Update `src/lib/types.ts` (PlayerMetrics interface)
2. Update `src/lib/config.ts` (COLUMN_LABELS, COLUMN_TOOLTIPS)
3. Add to `src/data/player-metrics.json`
4. Update components as needed

### Modifying Sort Options
1. Edit `src/lib/config.ts` (SORT_OPTIONS array)
2. Sort logic is automatic (no additional code needed)

### Changing Page Size
1. Edit `src/lib/config.ts` (DEFAULT_PAGE_SIZE)
2. Pagination adjusts automatically

### Adding Filters
1. Add state in `src/components/FPLViewer.tsx`
2. Add filter logic in `src/lib/utils.ts` (filterData function)
3. Add UI controls in desktop and mobile sections

---

## 🐛 Troubleshooting

### TypeScript Errors
```bash
npx tsc --noEmit
```
Check for type errors and fix them.

### Build Errors
```bash
npm run build
```
Review console output for specific errors.

### Module Not Found
```bash
npm install
```
Reinstall dependencies.

### Port Already in Use
Change port in package.json or kill process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

### Components
- [Tippy.js](https://atomiks.github.io/tippyjs/) - Tooltips
- [@tippyjs/react](https://github.com/atomiks/tippyjs-react) - React wrapper

---

## 💡 Tips & Best Practices

### Performance
- ✅ Use React.memo for expensive components
- ✅ Use useMemo for computed values
- ✅ Use useCallback for event handlers
- ✅ Lazy load components when possible

### Type Safety
- ✅ Always define interfaces for props
- ✅ Use strict TypeScript settings
- ✅ Avoid `any` types
- ✅ Enable type checking in editor

### Accessibility
- ✅ Use semantic HTML
- ✅ Add ARIA labels
- ✅ Test keyboard navigation
- ✅ Ensure color contrast

### Mobile
- ✅ Test on real devices
- ✅ Use touch-optimized controls
- ✅ Implement proper loading states
- ✅ Optimize for slow connections

---

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive commit messages

### Testing
- Test all breakpoints
- Verify TypeScript types
- Check accessibility
- Test keyboard navigation

---

## 📞 Support

**Developer**: Mostafa Elbesh  
**Email**: mosteloy@gmail.com  
**GitHub**: [@mostafaALBASH](https://github.com/mostafaALBASH)

---

## 📄 License

This project is open source and available for use.

---

**Happy Coding! 🎉**

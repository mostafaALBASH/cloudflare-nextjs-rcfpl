# Implementation Request: External JSON Data Loading

## Objective
Convert the application from bundling JSON data files to fetching them via HTTP requests for better performance and caching optimization.

## Requirements

### 1. Data Fetching Strategy
- **Remove** JSON imports from the application bundle
- **Fetch** all JSON data via HTTP requests at runtime
- Start with `player-metrics.json` as the primary data source

### 2. Environment-Based URLs
- **Local Development**: Fetch from `/data/` (served from `public/data/`)
- **Production**: Fetch from `https://www.rcfpl.net/data/`
- Use environment detection to automatically switch between environments

### 3. Caching Configuration
Set up Cloudflare-compatible caching headers in `public/_headers`:

```
/data/*.v*.json
  Cache-Control: public, max-age=31536000, immutable

/data/index.json
  Cache-Control: public, max-age=300
```

**Explanation:**
- Versioned files (`*.v*.json`): Cache for 1 year (immutable)
- Index/catalog files: Cache for 5 minutes (frequently updated)

### 4. File Structure
- Move all JSON files to `public/data/` directory
- JSON files should NOT be imported in the code
- JSON files should be served as static assets

### 5. Implementation Details
- Create a data fetching utility/service
- Handle loading states and errors gracefully
- Ensure type safety with TypeScript
- Support both development and production environments
- No breaking changes to existing functionality

### 6. Deliverables
- ✅ Working HTTP-based data fetching
- ✅ Proper caching headers configured
- ✅ Environment-based URL handling
- ✅ Type-safe implementation
- ✅ Error handling and loading states
- ✅ Production-ready code
- ✅ No additional setup required by end users

### 7. Success Criteria
- Application runs without errors in both dev and production
- JSON files are NOT included in the JavaScript bundle
- Data is fetched via network requests
- Proper cache headers are applied
- Bundle size is reduced (JSON not included)

## Technical Context
- **Framework**: Next.js (App Router)
- **CDN**: Cloudflare
- **Production URL**: https://www.rcfpl.net/
- **TypeScript**: Required
- **Hosting**: Cloudflare (based on wrangler.jsonc presence)

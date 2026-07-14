# Google Analytics & Tracking RAG Reference Document
**Project**: about-me (Vite, React 19, TypeScript, Tailwind v4)
**Measurement ID**: `G-JE6MNVN8K7`

---

## 1. Unified Analytics SDK (`src/utils/analytics.ts`)

The project utilizes a client-side analytics SDK middleware that enriches all events with device and traffic metadata before transmitting them to **Google Analytics (gtag)** and **Firebase Analytics**.

### Exported Categories
```typescript
export const ANALYTICS_CATEGORIES = {
    NAVIGATION: 'navigation',
    INTERACTION: 'interaction',
    DOWNLOAD: 'download',
    CONTACT: 'contact',
    SOCIAL: 'social',
    PROJECTS: 'projects',
    TIMELINE: 'timeline',
    SKILLS: 'skills',
    CONTENT: 'content',
    EXTERNAL_LINK: 'external_link',
};
```

### SDK Event Families
- `trackPage()`: Logs custom page view details.
- `trackSection(sectionName, state, extraParams)`: Tracks entry and exit for viewport sections.
- `trackCTA(ctaName, action, section, extraParams)`: Tracks general CTA impressions and clicks.
- `trackJourney(step, sectionName, sectionOrder, timeToReach, scrollPercentage)`: Logs visitor funnel milestones.
- `trackConversion(type, details)`: Tracks conversions like form success or resume download.
- `trackPerformance(metricName, value, extraParams)`: Log web vitals and asset download speeds.
- `trackError(errorType, message, stack, component, action)`: Reports runtime or network issues.
- `trackAIProduct(productName, step, extraParams)`: Logs AI product funnel events.
- `trackArticle(articleTitle, step, extraParams)`: Logs article reading funnel events.

### Auto-Enriched Metadata (Middleware Payload)

#### Device Intelligence
Every event payload automatically embeds:
* `device_type`: `'desktop' | 'mobile' | 'tablet'`
* `browser`: Browser name (e.g. `'Chrome'`, `'Firefox'`, `'Safari'`, `'Edge'`)
* `os`: Client operating system (e.g. `'Windows'`, `'macOS'`, `'iOS'`, `'Android'`, `'Linux'`)
* `screen_resolution`: e.g. `'1920x1080'`
* `viewport`: Current window viewport size (e.g. `'1280x720'`)
* `theme`: `'dark' | 'light'`
* `network_speed`: Connection effective type (e.g. `'4g'`, `'3g'`)
* `touch_device`: Boolean (touch capacity)
* `language`: Client language (e.g. `'en-US'`)
* `timezone`: Client timezone string (e.g. `'Asia/Kolkata'`)

#### Traffic Intelligence
Extracted on session start, saved in `sessionStorage` and sent on every event:
* `utm_source`: e.g. `'linkedin'`
* `utm_medium`: e.g. `'social'`
* `utm_campaign`: Campaign name
* `utm_content`: Campaign content
* `referrer`: Document referrer URL
* `landing_page`: Landing path (e.g. `'/index.html#projects'`)

#### Custom User Properties (Session-level)
Set once per session in Firebase:
* `visitor_type`: Segmented value based on activity score:
  * `Cold Visitor`: 0 - 30 score
  * `Interested`: 30 - 80 score
  * `Recruiter`: 80 - 150 score (or auto-detected recruiter intent)
  * `Highly Interested`: 150+ score
* `engagement_score`: Client-side accumulated activity score.
* `country` & `city`: Resolved asynchronously via GeoIP query to `https://ipapi.co/json/`.
* `first_visit` & `returning_user`: Derived from persistent localStorage.

---

## 2. Automated Behavioral Observers (`src/components/common/AnalyticsTracker.tsx`)

A global provider wrapping the application that tracks automated interactions.

### Section View & Engagement
* **Intersection Tracking**: Observes all sections (`#about`, `#timeline`, `#skills`, `#projects`, `#articles`, `#ai-arsenal`, `#ai-products`, `#rewards`, `#contact`, `#cv`).
* **Event**: `section_view`
  * Logs entry/exit state.
* **Event**: `section_view_first`
  * Fires exactly once per section during the session when first entering it.
* **Event**: `section_engagement`
  * Fires when leaving a section or tab unloads.
  * Parameters:
    * `section_name`: String
    * `engagement_seconds`: Total seconds spent on section
    * `active_time`: Seconds user was active (moved mouse, clicked, scrolled, touched screen)
    * `inactive_time`: Seconds user was idle or tab was hidden

### Scroll Depth
* **Event**: `scroll_depth`
  * Fires exactly once per session when reaching: `25%`, `50%`, `75%`, `90%`, and `100%` of page height.
  * Parameters:
    * `scroll_percentage`: Number
    * `time_to_reach`: Seconds from session start
    * `landing_page`: Landing page path

### Visitor Journey
* **Event**: `visitor_journey`
  * Tracks progress in the chronological visitor journey:
    `Landing (0) -> Hero Viewed (1) -> About Viewed (2) -> Experience Viewed (3) -> Projects Viewed (4) -> AI Products Viewed (5) -> Articles Viewed (6) -> Contact Viewed (7) -> Resume Downloaded (8)`
  * Parameters:
    * `journey_step`: Step description (e.g. `'About Viewed'`)
    * `section_name`: Mapped section identifier
    * `section_order`: Numeric step index (0-8)
    * `time_to_reach_section`: Seconds to reach
    * `scroll_percentage`: Scroll depth at trigger

### Session End Summary
* **Event**: `session_summary`
  * Triggered using the Page Visibility API (`visibilityState === 'hidden'`) once per session.
  * Parameters:
    * `session_duration`: Total active session time (seconds)
    * `pages`: Count of page views (`1` for single-page app)
    * `sections_viewed`: Count of unique sections visited
    * `deepest_scroll`: Maximum scroll percentage reached
    * `resume_downloaded`: Boolean
    * `products_opened`: Count of AI products opened
    * `articles_clicked`: Count of articles clicked
    * `contact_clicked`: Count of contact options clicked
    * `engagement_score`: Cumulative score
    * `visitor_segment`: Visitor classification

---

## 3. Funnel & Interactive Event Schemas

### A. Resume Funnel
Tracks the visitor's interaction with professional credentials:
1. `Resume Button Viewed`: CV Section enters viewport.
2. `Resume Clicked`: Clicks 'Download CV' or 'Preview CV' (Parameters: `resume_source: 'download_button' | 'preview_button'`).
3. `Resume Downloaded`: Tracks PDF generation and click download.
4. `Resume Opened`: Document rendered in preview modal.
5. `Returned to Website`: Fired when preview modal closes.

### B. Contact Funnel
Monitors preferred contact channels and communication intent:
* `Contact Viewed`: Contact section enters viewport.
* `Email Click` / `Phone Click` / `LinkedIn Click` / `GitHub Click`: Click on mailto/tel/external links.
* `Email Copied` / `Phone Copied`: Intercepts copy actions (`Ctrl+C` or context menu copy) inside the contact card.
* `Contact Form Submit`: Attempting form submit.
* `conversion` (Type: `'contact_form_success'`): Successful EmailJS message dispatch.

### C. AI Product Funnel (ITR Copilot)
Monitors adoption flow of AI products:
1. `Product Viewed`: Card enters viewport.
2. `Card Hover`: Mouse hovers card.
3. `Explore Click`: Click card primary button.
4. `Modal Open`: Main product modal mounts.
5. `features_tab` / `architecture_tab` / `audience_tab`: Swapping between product tabs.
6. `prompt_viewed`: Activating the "Show Prompt Preview" block.
7. `prompt_copied`: Triggering prompt clipboard copies.
8. `downloaded`: Fetching prompt as txt download file.
9. `linkedin_article_click`: Link click to read about product on LinkedIn.
10. `returned_later`: Triggered if they reopen the product modal in a subsequent session.

### D. Article Funnel
Tracks reading actions on external articles:
* `Article Card Visible`: Card enters viewport.
* `Hovered`: Mouse over article thumbnail.
* `Clicked`: Clicking card or "Read more".
* `Reading Started`: Triggered immediately on clicking external link.

### E. Project Funnel
Tracks interest in portfolio code repositories:
* `Project Viewed`: Card enters viewport.
* `GitHub Click`: Source link click.
* `Live Demo Click`: Live demo redirection.
* `Tech Stack Expanded`: Click on individual technology badges.

---

## 4. Performance & Error Analytics

### Web Vitals
Logged via PerformanceObserver callbacks:
* `first_contentful_paint` (FCP)
* `largest_contentful_paint` (LCP)
* `CLS` (Layout Shift)
* `interaction_to_next_paint` (INP)
* `TTFB` (Time to First Byte)
* `page_load`: Navigation duration
* `image_load_time`: Image load duration
* `bundle_download`: Script download duration

### Error Tracking
* `React Error Boundary`: Catches UI render crashes, logs error message and component stack trace before fallback rendering.
* `API Failure`: EmailJS dispatcher failures.
* `Unhandled JavaScript Error` & `Unhandled Promise Rejection`: Captured globally on window and logged before dev silence.

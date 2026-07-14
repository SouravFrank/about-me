# Google Analytics & Tracking RAG Reference Document
**Project**: about-me (Vite, React 19, TypeScript, Tailwind v4)
**Measurement ID**: `G-JE6MNVN8K7`

---

## 1. Core Analytics Infrastructure

### Global script Injection (`index.html`)
Google Analytics 4 is loaded via Google Tag Manager in the HTML `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JE6MNVN8K7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JE6MNVN8K7', {
    'anonymize_ip': true,
    'allow_google_signals': false
  });
</script>
```

### Firebase Analytics Bridge (`src/utils/analytics.ts`)
The project utilizes a unified tracking helper that logs to both **Google Analytics (gtag)** and **Firebase Analytics** (if initialized and not blocked by adblockers).

* **Exported Categories**:
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

* **Helper Function signature**:
  `trackEvent(eventName: string, eventParams: Record<string, any>)`
  * Developer console output is logged during development mode (`import.meta.env.DEV`).
  * Safety guards: Silently fails on script blockers or non-browser environments.

---

## 2. Automated Event Listeners

### Outbound & Navigational Link Interception (`src/utils/trackLinks.tsx`)
The app is wrapped globally with a `<TrackLinks>` component in `main.tsx` / `App.tsx`. It intercepts all click events on `<a>` tags:
* **Event**: `link_click`
* **Parameters**:
  * `category`: `'external_link'` (if link target is `_blank`) or `'navigation'` (if internal)
  * `url`: Link target attribute value (`href`)
  * `text`: Link description string (`textContent`)
  * `is_external`: Boolean
  * `section`: Identifies the parent section container via DOM lookup (`data-section` attribute)

---

## 3. Pre-existing Codebase Events

### Page View Custom
Fires on App mounting.
* **Event**: `page_view_custom`
* **Parameters**:
  * `page_title`: `document.title`
  * `page_location`: `window.location.href`
  * `page_path`: `window.location.pathname`
  * `dark_mode`: Boolean

### Theme Changes
Fires when toggling between dark/light modes.
* **Event**: `theme_change`
* **Parameters**:
  * `category`: `'interaction'`
  * `new_theme`: `'dark' | 'light'`

### Card Button Actions
Fires when clicking standalone CTA buttons.
* **Event**: `button_click`
* **Parameters**:
  * `category`: `'interaction'`
  * `button_label`: String
  * `button_variant`: String
  * `is_download`: Boolean

### Article Interactions
Fired on the articles scroll cards.
* **Event**: `article_hover` (tracks scroll views on desktop)
  * `category`: `'interaction'`
  * `article_title`: String
  * `article_index`: Number
* **Event**: `article_interaction` (tracks clicks)
  * `category`: `'content'`
  * `action`: `'click'`
  * `article_title`: String
  * `article_index`: Number
  * `click_area`: `'card' | 'link' | 'read_more'`
  * `device_type`: `'mobile' | 'desktop'`

### Slider Scrolling
Fired when dragging or clicking arrows on horizontal carousels.
* **Event**: `horizontal_scroll`
* **Parameters**:
  * `category`: `'interaction'`
  * `direction`: `'left' | 'right'`
  * `container_width`: Number

---

## 4. Phase 1 AI Products Section Events
Fired from components inside `src/components/sections/aiProducts/`.

### Product Card Click
Logged when clicking the primary card CTA ("Explore Product").
* **Event**: `product_card_click`
* **Parameters**:
  * `product_name`: String (e.g. `'🇮🇳 ITR Copilot'`)
  * `product_version`: String (e.g. `'1.0'`)

### Product Modal Open
Fired when the modal mounts.
* **Event**: `product_modal_open`
* **Parameters**:
  * `product_name`: String
  * `source`: `'click'` (from card click) or `'deep_link'` (from URL loading `/#product=itr-copilot`)

### LinkedIn Article Open
Fired when clicking "Read LinkedIn Article" on standard modal or the success screen.
* **Event**: `product_article_click`
* **Parameters**:
  * `product_name`: String

### Product Copy/Download Actions
Tracks prompt acquisition rates.
* **Event**: `product_copy_prompt` (Fired only when copying successfully completes)
  * `product_name`: String
* **Event**: `product_download` (Fired when user either copies or downloads the text file)
  * `product_name`: String
  * `download_method`: `'copy'` or `'download'`

### Product Modal Close
Triggered when the modal unmounts.
* **Event**: `product_modal_close`
* **Parameters**:
  * `product_name`: String
  * `time_spent_seconds`: Number (Measures how long the user reviewed details in seconds)

---

## 5. Custom Dimensions Registry (Admin Setup Required)
To extract parameters from custom events inside GA4's analytics console, create custom dimension mapping:

| Dimension Name | Scope | Description | Event Parameter |
| :--- | :--- | :--- | :--- |
| **Download Method** | Event | Differentiates file downloads from clipboard copies | `download_method` |
| **Product Name** | Event | Identifies which copilot was selected | `product_name` |
| **Product Version** | Event | Tracks version identifier | `product_version` |
| **Source** | Event | Distinguishes normal clicks from URL deep links | `source` |
| **Time Spent Seconds** | Event | Measures viewport interaction duration | `time_spent_seconds` |

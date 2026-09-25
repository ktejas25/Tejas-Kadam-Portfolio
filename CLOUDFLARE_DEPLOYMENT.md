# Cloudflare Integration & Production Deployment Guide

A complete, production-ready guide for configuring, previewing, and deploying **Tejas Kadam's Portfolio** to **Cloudflare**.

---

## 1. Project Architecture

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + React Router 6 (SPA) | Single-page portfolio application with client-side routing |
| **Build Tool & Bundler** | Vite 7 (`@vitejs/plugin-react-swc`) | High-speed ESM bundler producing optimized production assets in `dist/spa` |
| **Styling & UI** | TailwindCSS 3, Radix UI Primitives, Lucide Icons | Responsive glassmorphism aesthetic with dark/light themes |
| **Backend & APIs** | Express 5 / Native Web Fetch APIs | Lightweight microservices (`/api/ping`, `/api/demo`) |
| **Database** | None required | Static showcase data contained within application schemas |
| **Authentication** | None required | Public developer portfolio |
| **File / Media Storage**| Static files in `public/` | Pre-rendered graphics, favicon, resume PDF served directly via Edge CDN |
| **Contact Dispatch** | Web3Forms (`https://api.web3forms.com/submit`) | Client-side validated asynchronous form dispatch with offline resilience |

---

## 2. Cloudflare Architecture

```text
User / Browser
      │
      ▼
 Cloudflare Global Anycast Edge Network (275+ Data Centers)
 ┌─────────────────────────────────────────────────────────┐
 │                                                         │
 │  • Automatic TLS 1.3 / HTTPS Termination                │
 │  • Cloudflare DDoS Protection & Rate Limiting           │
 │  • Global Edge CDN Caching (Cache-Control via _headers)  │
 │  • HTTP Strict Transport Security (HSTS)                │
 │                                                         │
 └────────────────────────────┬────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
    [Cloudflare Pages / Assets]   [Cloudflare Edge Worker / Functions]
    • Static SPA Assets           • /api/ping
    • index.html (SPA Fallback)   • /api/demo
    • Immutable JS/CSS Caching    • Edge environment variables
               │                             │
               └──────────────┬──────────────┘
                              ▼
                Third-Party Contact API
                 (api.web3forms.com)
```

### Chosen Cloudflare Services:
1. **Cloudflare Workers with Static Assets** (or **Cloudflare Pages**):
   - **Static Assets (`dist/spa`)**: Houses client bundle with `single-page-application` routing.
   - **Edge Worker (`server/worker.ts`) / Pages Functions (`functions/api/`)**: Provides sub-millisecond API responses without cold starts or server maintenance.
2. **Cloudflare DNS & SSL/TLS**:
   - Universal SSL with automated renewal, HTTP to HTTPS redirection, and TLS 1.3.

---

## 3. Required Cloudflare Services

* **Cloudflare Workers** (with Static Assets binding `env.ASSETS`)
* **Cloudflare Pages** (compatible via `dist/spa` + `functions/api/`)
* **Cloudflare DNS** (for apex and `www` custom domain routing)
* **Cloudflare SSL/TLS** (configured to **Full (Strict)** mode)

---

## 4. Environment Variables

All variables are defined in `.env.example`.

### Public Frontend Variables (Vite & Cloudflare Pages)
*Safe for client-side bundle exposure:*
* `VITE_PUBLIC_BUILDER_KEY`: Public Builder.io key (optional).
* `VITE_WEB3FORMS_ACCESS_KEY`: Public Web3Forms API key for portfolio contact form submission.

### Server / Secret Variables
*Never exposed to client browser:*
* `PING_MESSAGE`: Message returned by `/api/ping` edge endpoint.
* `PORT`: Port for optional standalone local Node.js server.

---

## 5. Configuration Files Created

| File | Purpose |
| :--- | :--- |
| `wrangler.jsonc` | Unified Cloudflare Workers configuration with Static Assets binding and built-in SPA fallback (`not_found_handling: "single-page-application"`). |
| `public/_headers` | Cloudflare security headers (HSTS, CSP, X-Frame-Options) and immutable asset caching. |
| `server/worker.ts` | Edge Worker entrypoint executing `/api/*` routes and delegating static requests. |
| `functions/api/ping.ts` | Cloudflare Pages Function endpoint for `/api/ping`. |
| `functions/api/demo.ts` | Cloudflare Pages Function endpoint for `/api/demo`. |
| `.env.example` | Template documenting public and secret environment variables. |

---

## 6. Build Configuration

* **Build Command**: `pnpm build:client` (or `npm run build:client`)
* **Build Output Directory**: `dist/spa`
* **Root Directory**: `/` (repository root)
* **Node.js Version**: `20.x` or `22.x`

---

## 7. Deployment Commands

### Option A: Cloudflare Workers with Static Assets (Recommended CLI)

```bash
# 1. Install dependencies
pnpm install

# 2. Authenticate Wrangler with your Cloudflare account
npx wrangler login

# 3. Test locally in Cloudflare Edge emulation
pnpm preview:cf

# 4. Deploy directly to Cloudflare production
pnpm deploy:cf
```

### Option B: Cloudflare Pages CLI Deployment

```bash
# 1. Build the production client
pnpm pages:build

# 2. Deploy directly to Cloudflare Pages
pnpm pages:deploy
```

### Option C: Cloudflare Git-Based Integration (GitHub to Cloudflare Dashboard)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository: `ktejas25/Tejas-Kadam-Portfolio`.
4. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `pnpm build:client` (or `npm run build:client`)
   - **Build output directory**: `dist/spa`
5. Configure Environment Variables:
   - `VITE_WEB3FORMS_ACCESS_KEY`: `<your-web3forms-key>`
   - `PING_MESSAGE`: `ping from Cloudflare Edge`
6. Click **Save and Deploy**.

---

## 8. Custom Domain & DNS Setup

To route your personal domain (e.g., `tejaskadam.dev` or `yourdomain.com`):

### In Cloudflare Dashboard:
1. Navigate to **Workers & Pages** > Click on your project (`tejas-kadam-portfolio`).
2. Go to **Settings** > **Domains & Custom Domains** > **Add a Custom Domain**.
3. Enter your custom domain (e.g., `tejaskadam.dev` or `portfolio.yourdomain.com`).
4. Cloudflare automatically sets up the DNS records:

| Type | Name | Content / Target | Proxy status |
| :--- | :--- | :--- | :--- |
| `CNAME` | `@` (or apex) | `tejas-kadam-portfolio.pages.dev` | Proxied (Orange Cloud) |
| `CNAME` | `www` | `tejas-kadam-portfolio.pages.dev` | Proxied (Orange Cloud) |

---

## 9. SSL / TLS Configuration

1. In Cloudflare Dashboard, go to **SSL/TLS** > **Overview**.
2. Set SSL/TLS encryption mode to **Full (Strict)**.
3. Under **Edge Certificates**:
   - Turn **Always Use HTTPS** `ON`.
   - Set **Minimum TLS Version** to `TLS 1.2` (TLS 1.3 is enabled automatically).
   - Turn **Automatic HTTPS Rewrites** `ON`.

---

## 10. Local Development & Preview Testing

* **Standard Local Dev (Vite + Express)**:
  ```bash
  pnpm dev
  ```
  Accessible at `http://localhost:8080`.

* **Cloudflare Edge Local Preview (Wrangler Emulation)**:
  ```bash
  pnpm preview:cf
  ```
  Accessible at `http://localhost:8787`.

* **Type Check & Test Suites**:
  ```bash
  pnpm typecheck
  pnpm test
  ```

---

## 11. Troubleshooting Common Cloudflare Issues

### 1. "Invalid _redirects configuration: Infinite loop detected [code: 100324]"
* **Cause**: In Cloudflare Workers Static Assets, using `/* /index.html 200` in a `_redirects` file conflicts with Cloudflare's automatic path normalization (`/index.html` -> `/`), causing an infinite loop error.
* **Fix**: Do not use `/* /index.html 200` in `_redirects`. In `wrangler.jsonc`, `"not_found_handling": "single-page-application"` is the official native Cloudflare mechanism that handles SPA routing cleanly without redirect loops.

### 2. "Page Not Found / 404 on Page Refresh"
* **Cause**: Client-side SPA routing not falling back to `index.html`.
* **Fix**: Ensure `wrangler.jsonc` has `"not_found_handling": "single-page-application"` in the `assets` block.

### 2. "Mixed Content Warning / Insecure Request"
* **Cause**: Hardcoded `http://` URLs in assets or APIs.
* **Fix**: All assets and contact submissions are configured with root-relative paths (`/assets/*`) and secure HTTPS endpoints.

### 3. "CORS Error on /api/ping or /api/demo"
* **Cause**: Missing CORS headers on edge responses.
* **Fix**: Edge handlers in `server/worker.ts` and `functions/api/` include `"Access-Control-Allow-Origin": "*"`.

### 4. "Contact Form Submission Failed"
* **Cause**: Missing or invalid Web3Forms access key.
* **Fix**: Check `VITE_WEB3FORMS_ACCESS_KEY` in environment variables or configure your active access key in Cloudflare Pages / Workers settings.

---

## 12. Rollback Procedure

If an unexpected regression occurs in production:
1. In Cloudflare Dashboard, open **Workers & Pages** > `tejas-kadam-portfolio`.
2. Navigate to **Deployments**.
3. Locate the previous healthy deployment.
4. Click **Manage** > **Rollback to this deployment**. Rollback takes effect globally within seconds.

---

## 13. Maintenance

* **Updating Dependencies**: Periodically run `pnpm update` and verify `pnpm test` and `pnpm typecheck`.
* **Static Assets**: When adding new images or PDFs to `public/`, they are automatically fingerprinted or cached according to `public/_headers`.

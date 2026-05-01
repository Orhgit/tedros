# Step 0 Runbook — Owner Pre-Deploy Actions (RIN-460)

**Total time**: ~15 minutes
**When to run**: When ready to deploy Tedros v1.0 to production
**Prerequisites**: Active Devim account (control.devim.cloud), Cloudflare account (or willingness to create free one), GitHub access to Orhgit/tedros, terminal on owner's mac

After completing this runbook, the entire deploy chain (RIN-461 → RIN-465) can run autonomously in a single Claude Code session.

---

## Why this runbook exists

Steps 1–7 of the deploy require credentials, dashboards, and physical actions in third-party UIs (Devim, Cloudflare, registrar) that Claude cannot perform. This runbook breaks Step 0 into 5 micro-actions, each with explicit click paths, so the owner runs them as a single 15-min session without interpretation.

---

## Action 1 — Reset Devim FTP password (2 minutes) ⚠️ URGENT

**Why first**: The current FTP password was exposed in a chat. Even though Tedros will not use Devim going forward, the credential is still active and grants write access to merkaz-h.co.il.

**Steps**:

1. Open https://control.devim.cloud → log in with owner credentials
2. Top nav: **Websites** → click **tedros.co.il** (current Devim-hosted site)
3. Right-side panel: **Advanced** → **Manage FTP account**
4. Click **Reset password**
5. Choose any password (will not be reused — Tedros migrates off Devim in Step 6 / RIN-466)
6. Confirm

**Success criterion**: New password takes effect immediately. Old password rejected on next FTP attempt. (No need to test — just reset and move on.)

**If stuck**: Devim chat support → "I need to rotate the FTP password for tedros.co.il". Response time ~10 min.

---

## Action 2 — Add tedros.co.il to Cloudflare (5 minutes)

**Why**: Cloudflare provides the CDN, SSL termination, and (critically) the Tunnel that lets Tedros run on Hetzner without exposing ports to the internet. Free plan covers everything Tedros needs.

**Steps**:

1. Open https://dash.cloudflare.com → log in (sign up free if no account)
2. Top-right: **Add a Site**
3. Enter: `tedros.co.il`
4. Choose plan: **Free** (the only option needed)
5. Cloudflare scans existing DNS records — review them:
   - Keep any **MX** (email) and **TXT** (verification) records as-is
   - For **A**/**AAAA** records pointing to Devim's IP — these will be replaced in Step 3 of the deploy. Leave them for now; Cloudflare will update them later.
6. Click **Continue**
7. Cloudflare shows **2 nameservers** (e.g., `nina.ns.cloudflare.com`, `tom.ns.cloudflare.com`). **Copy these.** You'll paste them in Action 3.

**Success criterion**: Cloudflare dashboard shows tedros.co.il in the site list with status **Pending Nameserver Update**.

**If stuck**: Cloudflare community chat is fast. Most "stuck" cases are typos in domain name.

---

## Action 3 — Switch nameservers at registrar (5 minutes — most variable)

**Why**: Until the registrar (where you originally bought tedros.co.il) points to Cloudflare's nameservers, Cloudflare cannot manage DNS. This is the longest step because each registrar has different UI.

**Steps**:

1. Identify the registrar — usually visible in the original purchase email, or run `whois tedros.co.il | grep -i registrar` in terminal.
   - Common Israeli registrars: **Hosting.co.il, NameCheap, GoDaddy, Domain.com.il (ISOC-IL)**
2. Log in to the registrar's control panel
3. Find the domain → **DNS** or **Nameservers** settings
4. Switch from "registrar default" to **Custom nameservers**
5. Paste the 2 Cloudflare nameservers from Action 2
6. **Save**

**Wait time**: DNS propagation is **2–24 hours**. Usually <1 hour for Israeli registrars. You can proceed to Action 4 immediately — Cloudflare will email you once propagation completes.

**Success criterion**: Cloudflare dashboard for tedros.co.il transitions to **Active** (green check). Email from `noreply@cloudflare.com` confirms.

**If stuck**:

- Don't change A/AAAA records yet. Just nameservers.
- If the registrar requires confirmation via email, check spam folder.
- ISOC-IL is the slowest — can take 24h.

---

## Action 4 — Create Cloudflare Tunnel + token (3 minutes)

**Why**: This token is the secret that the Hetzner container uses to connect outbound to Cloudflare's edge. No inbound ports needed on Hetzner.

**Steps**:

1. Cloudflare dashboard → **Zero Trust** (left sidebar, gear icon)
2. **Networks** → **Tunnels** → **Create a tunnel**
3. **Cloudflared** (default option)
4. Tunnel name: `tedros-prod`
5. **Save tunnel**
6. Cloudflare shows **install instructions** with a token (long string starting with `eyJh...`). **Copy the token** — store securely (1Password, owner's password manager).
7. **Skip** the install instructions on the page (Step 2 of the deploy will install cloudflared in the container).
8. **Public hostname** tab:
   - Subdomain: leave blank
   - Domain: `tedros.co.il`
   - Path: leave blank
   - Service type: `HTTP`
   - URL: `localhost:3000`
   - **Save**
9. Add a second public hostname:
   - Subdomain: `www`
   - Domain: `tedros.co.il`
   - Service type: `HTTP`
   - URL: `localhost:3000`
   - **Save** (Tedros redirects www → apex internally)

**Success criterion**: Tunnel `tedros-prod` shows **status: pending** (will go green once cloudflared starts in the container in RIN-462). Token is saved in password manager.

**If stuck**: Zero Trust setup may prompt for org name on first use — call it `tedros` and proceed.

---

## Action 5 — (Optional) Resend API key (2 minutes)

**Why**: Real outbound emails (magic-link login, lead notifications) require Resend. Skipping uses the no-op mock adapter — site works fine but no emails actually send.

**Skip if**: Launch v1.0 doesn't need login emails (true for read-only public surface).

**Steps**:

1. https://resend.com → sign up (free, 3K emails/month)
2. **API Keys** → **Create API Key**
3. Name: `tedros-prod`, Permission: **Full access**, Domain: leave default
4. Copy the key (starts with `re_...`). Store in password manager.
5. **Domains** → **Add domain** → `tedros.co.il`
6. Resend shows DNS records to add — **add them in Cloudflare DNS** (3 TXT records typically). Cloudflare → DNS → Add record → paste each. **Proxied: OFF** for these (DNS-only, gray cloud).
7. Click **Verify** in Resend (DNS propagation ~5 min usually).

**Success criterion**: Resend dashboard shows tedros.co.il as **verified**.

**If skipping**: Set `RESEND_API_KEY=` (empty) in `.env.production` later. Mock adapter logs to stdout instead.

---

## Action 6 — (Optional) GitHub deploy SSH key (2 minutes)

**Why**: Required for RIN-464 (CI/CD on merge to main). Skip if you want manual deploys initially.

**Skip if**: First deploy will be manual (RIN-462 + RIN-463 done; CI/CD added later).

**Steps**:

1. On owner's mac, terminal: `ssh-keygen -t ed25519 -f ~/.ssh/tedros-deploy -C "tedros-github-deploy" -N ""`
2. View public key: `cat ~/.ssh/tedros-deploy.pub` — copy entire output
3. Save the **private key** (`~/.ssh/tedros-deploy`, no extension) for Step 4.3 of the deploy. Don't paste it anywhere yet.
4. The public key will be installed on the Hetzner container in RIN-461 — keep it ready.

**Success criterion**: Two files exist: `~/.ssh/tedros-deploy` (private) and `~/.ssh/tedros-deploy.pub` (public).

---

## After completing the runbook

You have:

- ✅ Devim FTP rotated (security risk closed)
- ✅ tedros.co.il in Cloudflare, nameservers switched at registrar (DNS propagating)
- ✅ Cloudflare Tunnel created, token in password manager
- ⏳ DNS propagation: 1–24h depending on registrar
- (Optional) Resend API key
- (Optional) GitHub deploy SSH key pair

**Next step**: Confirm in chat to your Tedros agent: "Step 0 done. Tunnel token is in 1Password under [name]. Ready for Steps 1–5." That triggers a single deploy session — RIN-461 (LXD container) → RIN-462 (compose up) → RIN-463 (Tunnel install) → RIN-464 (CI/CD if SSH key was made) → RIN-465 (verification + GSC submit).

Total time from "Step 0 done" to "site live": ~30 minutes of agent runtime, assuming DNS propagation completed.

---

## What goes wrong (3 common pitfalls)

1. **DNS propagation takes longer than expected** (>4h). Fix: wait. Check progress with `dig +short NS tedros.co.il @8.8.8.8` — should show Cloudflare NS, not registrar NS.
2. **Tunnel token leaks**: if accidentally pasted in chat or commit. Fix: Cloudflare → Zero Trust → Tunnels → tedros-prod → **Refresh token**, save new token, redeploy container.
3. **Cloudflare's automated DNS scan misses some records**. Fix: log in to old DNS provider before nameserver switch, screenshot all records, manually re-add anything Cloudflare didn't catch.

---

## Open question for owner

After this runbook, you can either:

**Option A — Run Steps 1–5 in one Claude Code session** (recommended). I drive the LXD setup, docker compose up, Tunnel install, and verification. ~30 min agent runtime.

**Option B — Ramp up manually**, taking ownership of each step yourself (RIN-461 → RIN-465 each have detailed scripts in their Linear descriptions).

**Recommendation**: Option A. The scripts are deterministic and the verification (curl + healthz + GSC submit) confirms each step before moving on.

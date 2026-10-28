# QA checklist — status at handover (26 Oct 2026)

| Check | Result |
|---|---|
| Production build + TypeScript | Pass (67 static pages) |
| Internal links / anchors / images (automated crawl of out/) | 0 broken |
| One H1 per page; unique titles & meta descriptions; canonicals | Pass |
| JSON-LD parses (Organization, WebSite, BreadcrumbList, Product, Article, FAQPage) | Pass; no prices/ratings |
| sitemap.xml, robots.txt, IndexNow key | Generated |
| Horizontal scroll at 390 px and 1440 px | None |
| Mobile menu with nested products; desktop mega menu; Escape closes | Verified in Chrome |
| Product order 1 Film Faced · 2 Furniture · 3 Upholstery · 4 Packing | Pass (nav, home, footer, RFQ) |
| 8 EU market pages, France/Netherlands excluded | Pass |
| RFQ: validation, preselect via ?product= / ?country= / ?doc=, honeypot, consent | Implemented |
| RFQ never fakes success (error shown when no backend, e.g. local preview) | Pass locally |
| No unverified certificates/specs shown as held | Reviewed |

## To verify after deploy
- [ ] Submit a test RFQ on Netlify (with attachment) and confirm the email notification.
- [ ] Lighthouse mobile run on the live URL.
- [ ] Screen reader pass (NVDA/VoiceOver) on menu and RFQ form.
- [ ] Safari / Firefox check of the 3D film panel.

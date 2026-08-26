# portfolio-v2

Personal site for Ana Carolina Cunha, built with Next.js, Tailwind CSS and shadcn/ui. Deployed as a static export to GitHub Pages by `.github/workflows`.

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # static export to ./out
npm run lint
npm run typecheck
```

## Content

Page content lives in data files rather than in the components:

- `app/projects/projects.ts` — research and project entries, rendered by `app/projects/page.tsx`
- `app/blog/blog-posts.ts` — blog posts, rendered by `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`
- `public/pdfs/` — papers and reports linked from both

A project links to its post through `blogSlug`, and each post finds its project by reversing that lookup, so the relationship is defined once in `projects.ts`.

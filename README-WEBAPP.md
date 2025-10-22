# Vector Database Comparison 2025 - Web App

This is an interactive React web app showcasing real-world benchmark results from testing 5 vector databases.

## Features

- 📊 **Real Performance Benchmarks** - Actual query times from hands-on testing
- 🎨 **Interactive Visual Charts** - Color-coded performance bars
- 💡 **Real-World Insights** - Lessons learned from production testing
- 🔍 **Detailed Methodology** - Transparent testing approach
- 💰 **Cost Comparison** - Real pricing for 1M vectors

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure

```
.
├── index.html                          # HTML entry point
├── src/
│   ├── main.tsx                        # React entry point
│   └── index.css                       # Tailwind CSS imports
├── vector-db-comparison-2025.tsx      # Main comparison component
├── notebooks/                          # Jupyter notebooks with benchmarks
│   ├── 01_chroma.ipynb
│   ├── 02_weaviate.ipynb
│   ├── 03_milvus.ipynb
│   ├── 04_qdrant.ipynb
│   └── 05_pinecone.ipynb
└── utils/                              # Benchmark utilities
    └── benchmark.py
```

## Benchmark Data

All performance data is sourced from real testing:
- **Dataset**: 100 articles (outdoor/travel content)
- **Embedding Model**: sentence-transformers/all-MiniLM-L6-v2 (384 dim)
- **Test Queries**: 5 standardized queries
- **Filters Tested**: Category, date range, boolean, combined filters

### Results Summary

| Database | Avg Query Time | Rank |
|----------|---------------|------|
| Milvus/Zilliz | 50.7ms | 🥇 1st |
| Weaviate | 51.7ms | 🥈 2nd |
| Qdrant | 73.1ms | 🥉 3rd |
| Pinecone | 106.3ms | 4th |
| Chroma | 275.4ms | 5th |

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## Development

### Updating Benchmark Data

If you re-run the notebooks and get new benchmark results:

1. Update the `performanceData` array in `vector-db-comparison-2025.tsx`
2. Update the `performance` and `rank` fields in the `databases` array
3. Rebuild and redeploy

### Customization

- **Colors**: Edit Tailwind classes in the component
- **Icons**: Import additional icons from `lucide-react`
- **Layout**: Modify the component JSX structure

## License

MIT

## Contributing

Benchmark data is reproducible via the Jupyter notebooks in `notebooks/`. Run the notebooks to verify results.

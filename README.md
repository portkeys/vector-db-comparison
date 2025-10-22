# Vector Database Comparison 2025

**A production-ready comparison of 5 vector databases with real benchmarks, interactive web app, and hands-on Jupyter notebooks.**

🌐 **[Live Demo](#)** | 📊 **[View Benchmarks](#benchmarks)** | 📓 **[Jupyter Notebooks](./notebooks/)**

---

## 🎯 What's Inside

This project provides **three ways** to explore vector database capabilities:

### 1. 🌐 Interactive Web App (React + TypeScript)
A beautiful, responsive comparison dashboard with:
- Real performance benchmarks (query times from actual testing)
- Feature comparison across 5 databases
- Cost calculator links for production planning
- Production lessons learned

**[Quick Start: Web App](#web-app-quick-start)** | **[Deploy to Vercel](#deployment)**

### 2. 📓 Jupyter Notebooks (Python)
Hands-on testing notebooks for each database:
- Step-by-step implementation guides
- Real code examples (upsert, search, filtering)
- Performance measurements
- Metadata filtering tests

**[Quick Start: Notebooks](#notebooks-quick-start)**

### 3. 📊 Benchmark Results
Real-world testing with 100 articles, 5 standardized queries:

| Database | Avg Query Time | Cost (1M @ 1536-dim) | Best For |
|----------|---------------|---------------------|----------|
| **Milvus/Zilliz** | 50.7ms 🥇 | $115/mo | Fastest queries + good flexibility |
| **Weaviate** | 51.7ms 🥈 | $160/mo | Native datetime/geo + hybrid search |
| **Qdrant** | 73.1ms 🥉 | $103/mo | **Best balance** (speed + flexibility + cost) |
| **Pinecone** | 106.3ms | $30/mo | Cheapest (⚠️ poor schema flexibility) |
| **Chroma** | 275.4ms | $139/mo | Easiest setup + prototyping |

---

## 🚀 Web App Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

### Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

---

## 📓 Notebooks Quick Start

### Prerequisites
- Python 3.10+
- API keys for vector databases (free tiers available)

### Installation

```bash
# Using uv (recommended)
uv sync

# Or using pip
pip install -e .
```

### Configure API Keys

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
# PINECONE_API_KEY=your-key-here
# WEAVIATE_API_KEY=your-key-here
# etc.
```

### Run Notebooks

```bash
jupyter notebook notebooks/
```

**Recommended order:**
1. `01_chroma.ipynb` - Easiest to start (schema-less, no config)
2. `02_weaviate.ipynb` - Native datetime filtering
3. `03_milvus.ipynb` - Fastest queries (AUTOINDEX)
4. `04_qdrant.ipynb` - Most flexible metadata
5. `05_pinecone.ipynb` - Learn schema limitations

---

## 📁 Project Structure

```
VectorDB/
├── 🌐 Web App (React/TypeScript)
│   ├── index.html                      # Entry point
│   ├── src/
│   │   ├── main.tsx                    # React entry
│   │   └── index.css                   # Tailwind imports
│   ├── vector-db-comparison-2025.tsx   # Main comparison component
│   ├── vite.config.ts                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind configuration
│   └── package.json                    # Node dependencies
│
├── 📓 Jupyter Notebooks
│   └── notebooks/
│       ├── 01_chroma.ipynb             # Chroma DB testing
│       ├── 02_weaviate.ipynb           # Weaviate testing
│       ├── 03_milvus.ipynb             # Milvus/Zilliz testing
│       ├── 04_qdrant.ipynb             # Qdrant testing
│       └── 05_pinecone.ipynb           # Pinecone testing
│
├── 🛠️ Python Utilities
│   ├── utils/
│   │   └── benchmark.py                # Benchmark utilities
│   ├── pyproject.toml                  # Python dependencies
│   └── test_embeddings.py              # Embedding model tests
│
├── 📊 Data & Config
│   ├── sample_articles.json            # 100 test articles
│   ├── .env.example                    # Environment template
│   └── .gitignore                      # Git ignore rules
│
└── 📚 Documentation
    ├── README-WEBAPP.md                # Web app documentation
    ├── CHANGELOG-TSX.md                # Comparison app updates
    └── README.md                       # This file
```

---

## 🎨 Features Tested

### 1. ⚡ Query Speed
Average query time across 5 standardized semantic searches with metadata filtering.

### 2. 🔀 Hybrid Search
Combining vector similarity (semantic) with keyword search (BM25/TF-IDF):
- **🟢 Integrated** (Weaviate): Single API call
- **🔵 Middle Ground** (Qdrant): Supported but manual fusion
- **🟠 Manual** (Pinecone, Chroma, Milvus): DIY approach

### 3. 🏷️ Metadata Filtering
Production-critical feature for filtering by:
- Categories (exact match)
- Date ranges (>=, <=)
- Boolean flags (evergreen content)
- Combined filters (AND/OR logic)

**Native datetime support:** Only Weaviate and Qdrant support native datetime/geo filtering.

### 4. 🔧 Schema Flexibility
Can you add new metadata fields without rebuilding?
- **Excellent:** Qdrant (schema-less JSON), Chroma
- **Good:** Weaviate, Milvus (dynamic fields)
- **Poor:** Pinecone Serverless (must declare all fields at creation)

### 5. 💻 Ease of Use
- Free tier availability
- Documentation quality
- Code complexity
- Setup time

### 6. 💰 Cost
Real pricing for 1M vectors @ 1536 dimensions (OpenAI embedding size) from official calculators.

---

## 🔑 Free Tier Access

All databases offer free tiers for testing:

| Database | Free Tier | Signup Link |
|----------|-----------|-------------|
| **Chroma** | $5 free credits, 5GB storage | [trychroma.com](https://www.trychroma.com) |
| **Qdrant** | 1GB free forever cluster | [cloud.qdrant.io](https://cloud.qdrant.io) |
| **Pinecone** | 2GB storage, 2M writes/mo | [pinecone.io](https://www.pinecone.io) |
| **Weaviate** | 14-day free trial | [console.weaviate.cloud](https://console.weaviate.cloud) |
| **Milvus (Zilliz)** | 5GB, 2.5M vCUs | [cloud.zilliz.com](https://cloud.zilliz.com) |

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
vercel
```

Follow the prompts:
- Set up and deploy: `Y`
- Scope: Select your account
- Link to existing project: `N`
- Project name: `vector-db-comparison` (or your choice)
- Directory: `./` (current directory)
- Override settings: `N`

**Step 3: Production Deployment**
```bash
vercel --prod
```

Your app is now live! Vercel will provide a URL like `https://vector-db-comparison.vercel.app`

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist/ folder
# Drag and drop dist/ folder to Netlify dashboard
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

Enable GitHub Pages in repository settings → Pages → Source: gh-pages branch

---

## 🐙 Push to GitHub

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Vector Database Comparison 2025

- Interactive React/TypeScript web app
- 5 Jupyter notebooks with benchmarks
- Real performance data from 100 articles
- Production-ready comparison framework"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `vector-db-comparison-2025`
3. Description: `Production-ready comparison of 5 vector databases with real benchmarks`
4. **Public** or **Private** (your choice)
5. **Do NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vector-db-comparison-2025.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Connect Vercel to GitHub (Optional but Recommended)

For automatic deployments on every push:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

Now every push to `main` branch will automatically deploy to Vercel!

---

## 📊 Benchmarks

### Test Configuration
- **Dataset:** 100 articles (outdoor/travel content)
- **Embedding Model:** sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
- **Test Queries:** 5 standardized semantic searches
- **Filters:** Category, date range, boolean, combined filters
- **Distance Metric:** COSINE similarity

### Key Findings

✅ **Milvus AUTOINDEX** delivers fastest queries (50.7ms) with zero manual tuning
✅ **Weaviate** close second with best schema flexibility (51.7ms)
✅ **Qdrant** excellent balance of speed, flexibility, and cost (73.1ms, $103/mo)
⚠️ **Chroma** slower but easiest setup for prototypes (275.4ms)
📊 **5.4x performance gap** between fastest and slowest

### Production Lessons Learned

**⚠️ Critical: Schema Flexibility Matters**

When migrating 1M vectors from Pinecone pod-based to serverless, we discovered you **MUST** define which metadata fields to index at creation time. After migration, adding new metadata fields (geo-location, time-based filtering) was **impossible** without rebuilding the entire index.

**Recommendations:**
- **Need flexibility?** → Qdrant or Chroma (schema-less)
- **Need speed?** → Milvus/Zilliz (50.7ms, AUTOINDEX)
- **Need native datetime/geo?** → Weaviate or Qdrant only
- **Need cheapest?** → Pinecone ($30/mo, but plan schema carefully!)
- **Need best balance?** → Qdrant ($103/mo, 73.1ms, excellent flexibility)

---

## 🤝 Contributing

This project is designed for educational purposes and sharing production insights. Feel free to:
- Open issues for questions
- Submit PRs for improvements
- Share your own benchmark results
- Suggest additional databases to test

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Embedding Model:** sentence-transformers/all-MiniLM-L6-v2 (Hugging Face)
- **Vector Databases:** Chroma, Qdrant, Pinecone, Weaviate, Milvus/Zilliz
- **UI Framework:** React, TypeScript, Vite, Tailwind CSS

---

**Built with ❤️ for developers evaluating vector databases for production**

**Questions?** Open an issue or reach out!

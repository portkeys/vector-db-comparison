# Vector Database Comparison 2025

**Chroma, Pinecone, Weaviate, Milvus and Qdrant**

🌐 **[My Comparison](https://vector-db-comparison.vercel.app)** | 📓 **[Jupyter Notebooks](./notebooks/)**

---

## 🎯 What You'll Find Here

### 🌐 Interactive Comparison Web App
A live, interactive dashboard comparing 5 vector databases:
- Real performance benchmarks from testing 100 articles
- Feature comparison (hybrid search, metadata filtering, schema flexibility)
- Cost analysis with calculator links
- Production lessons learned

**➡️ [View Live App](https://vector-db-comparison.vercel.app)**

### 📓 Implementation Notebooks
Hands-on Jupyter notebooks with code implementation for each database:
- Step-by-step setup and implementation
- Upsert operations, semantic search, metadata filtering
- Performance measurements and benchmarking
- Production tips and gotchas

**➡️ [Browse Notebooks](./notebooks/)**

---

## 📊 Quick Comparison

Real-world testing with 100 articles, 5 standardized queries:

| Database | Avg Query Time | Cost (1M @ 1536-dim) | Best For |
|----------|---------------|---------------------|----------|
| **Milvus/Zilliz** | 50.7ms 🥇 | $115/mo | Fastest queries + good flexibility |
| **Weaviate** | 51.7ms 🥈 | $160/mo | Native datetime/geo + hybrid search |
| **Qdrant** | 73.1ms 🥉 | $103/mo | **Best balance** (speed + flexibility + cost) |
| **Pinecone** | 106.3ms | $30/mo | Cheapest (⚠️ poor schema flexibility) |
| **Chroma** | 275.4ms | $139/mo | Easiest setup + prototyping |

**Key Insight:** 5.4x performance gap between fastest and slowest!

---

## 🚀 Run Locally

Want to explore the comparison app locally?

```bash
# Clone the repository
git clone https://github.com/portkeys/vector-db-comparison.git
cd vector-db-comparison

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 📓 Run Notebooks

Want to test vector databases yourself?

### Prerequisites
- Python 3.10+
- API keys for vector databases (all have free tiers)

### Setup

```bash
# Install Python dependencies
uv sync
# or: pip install -e .

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
# PINECONE_API_KEY=your-key-here
# WEAVIATE_API_KEY=your-key-here
# etc.

# Launch Jupyter
jupyter notebook notebooks/
```

### Notebooks Overview

1. **`01_chroma.ipynb`** - Easiest to start, schema-less metadata
2. **`02_weaviate.ipynb`** - Native datetime filtering, hybrid search
3. **`03_milvus.ipynb`** - Fastest queries with AUTOINDEX
4. **`04_qdrant.ipynb`** - Most flexible metadata filtering
5. **`05_pinecone.ipynb`** - Simplest API (⚠️ plan schema carefully)

Each notebook includes:
- Free tier setup instructions
- Data ingestion with embeddings
- Semantic search examples
- Metadata filtering tests
- Performance benchmarks

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

## 🎨 What We Tested

### ⚡ Query Speed
Average query time across 5 semantic searches with metadata filtering
- **Winner:** Milvus/Zilliz (50.7ms)

### 🔀 Hybrid Search
Combining vector similarity with keyword search (BM25/TF-IDF)
- **Integrated (easiest):** Weaviate - single API call
- **Middle Ground:** Qdrant - manual fusion logic
- **Manual (most code):** Pinecone, Chroma, Milvus

### 🏷️ Metadata Filtering
Filtering by categories, date ranges, boolean flags
- **Native datetime/geo:** Only Weaviate and Qdrant
- **Others:** Require workarounds (timestamps, coordinate pairs)

### 🔧 Schema Flexibility
Can you add new metadata fields without rebuilding?
- **Excellent:** Qdrant (schema-less), Chroma
- **Good:** Weaviate, Milvus (dynamic fields)
- **Poor:** Pinecone Serverless (declare all fields upfront)

### 💰 Cost
Real pricing for 1M vectors @ 1536 dimensions (OpenAI embedding size)
- **5x cost variation** between cheapest ($30) and most expensive ($160)
- See detailed cost breakdown in the [live app](https://vector-db-comparison.vercel.app)

---

## ⚠️ Production Lesson Learned

**Critical: Schema Flexibility Matters**

When migrating 1M vectors from Pinecone pod-based to serverless, we discovered you **MUST** define all filterable metadata fields at index creation. Adding new fields later (geo-location, time-based filtering) was **impossible** without a complete rebuild.

**Our Recommendations:**
- **Need flexibility?** → Qdrant or Chroma (schema-less)
- **Need speed?** → Milvus/Zilliz (50.7ms, AUTOINDEX)
- **Need native datetime/geo?** → Weaviate or Qdrant only
- **Need cheapest?** → Pinecone ($30/mo, but plan schema carefully!)
- **Need best balance?** → Qdrant ($103/mo, 73.1ms, excellent flexibility)

---

## 📁 Project Structure

```
vector-db-comparison/
├── 🌐 Web App (React/TypeScript)
│   ├── src/                            # React components
│   ├── vector-db-comparison-2025.tsx   # Main comparison component
│   ├── package.json                    # Dependencies
│   └── vite.config.ts                  # Build configuration
│
├── 📓 Jupyter Notebooks
│   └── notebooks/
│       ├── 01_chroma.ipynb             # Chroma testing
│       ├── 02_weaviate.ipynb           # Weaviate testing
│       ├── 03_milvus.ipynb             # Milvus/Zilliz testing
│       ├── 04_qdrant.ipynb             # Qdrant testing
│       └── 05_pinecone.ipynb           # Pinecone testing
│
├── 🛠️ Python Utilities
│   ├── utils/                          # Benchmark helpers
│   └── pyproject.toml                  # Python dependencies
│
└── 📊 Data
    ├── sample_articles.json            # 100 test articles
    └── .env.example                    # Environment template
```

---

## 📊 Configuration

- **Dataset:** 100 articles (outdoor/travel content)
- **Embedding Model:** sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
- **Test Queries:** 5 standardized semantic searches
- **Filters:** Category, date range, boolean, combined filters
- **Distance Metric:** COSINE similarity

### Key Findings

✅ **Milvus AUTOINDEX** - Fastest queries (50.7ms) with zero manual tuning
✅ **Weaviate** - Best developer experience with native datetime support (51.7ms)
✅ **Qdrant** - Excellent balance of speed, flexibility, and cost (73.1ms, $103/mo)
⚠️ **Chroma** - Slower but easiest setup for prototypes (275.4ms)
📊 **5.4x performance gap** between fastest and slowest

---

## 🤝 Contributing

This project shares production insights from real-world testing. Feel free to:
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

**Questions?** Open an issue or check out the [live demo](https://vector-db-comparison.vercel.app)!

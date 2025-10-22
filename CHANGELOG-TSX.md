# TSX Comparison App Updates

## Summary of Changes (October 21, 2025)

### Major Updates

#### 1. **Removed Untested Databases**
- ❌ Removed Vespa (not tested)
- ❌ Removed pgvector (not tested)
- ✅ Now showing only 5 tested databases: Chroma, Milvus/Zilliz, Pinecone, Weaviate, Qdrant

#### 2. **Updated Prominent Users**
- **Chroma**: Added "Weights & Biases"
- **Qdrant**: Added "Tripadvisor, Hubspot, Disney Plus"
- **Pinecone**: Updated to "Shopify, Gong, Microsoft, Notion" (removed Hubspot - moved to Qdrant)

#### 3. **New 5-Feature Comparison Framework**

Replaced old features (DB Features, Embedding Mgmt, SQL-Like Filtering, Full Text Search) with production-critical features:

**New Features:**
1. **Hybrid Search Capabilities** (✓/✗)
   - Combining vector similarity with keyword search (BM25/TF-IDF)

2. **Metadata Filtering** (Excellent/Good/Partial/Limited/Poor)
   - Data type support (native datetime, geo-location)
   - Filtering strategies (pre-filtering, post-filtering, metadata-aware HNSW)
   - Performance impact

3. **Schema Flexibility** (Excellent/Good/Partial/Limited/Poor)
   - Ability to add new metadata fields without rebuilding
   - Critical for evolving production systems

4. **Implementation Ease** (Excellent/Good/Partial/Limited/Poor)
   - Free tier availability
   - Documentation quality
   - Code complexity (from Jupyter notebooks)
   - Setup time

5. **Cost** (Real pricing with calculator links)
   - 1M vectors @ 1536 dimensions (OpenAI embedding size)
   - Links to official cost calculators

#### 4. **Accurate Cost Data**

Updated with real costs from official calculators:

| Database | Cost (1M @ 1536-dim) | Calculator Link |
|----------|---------------------|-----------------|
| **Pinecone Serverless** | $30/mo | [Calculator](https://www.pinecone.io/pricing/estimate/) |
| **Qdrant** | $103/mo | [Calculator](https://cloud.qdrant.io/calculator) |
| **Milvus/Zilliz** | $115/mo | [Calculator](https://zilliz.com/pricing#calculator) |
| **Chroma** | $139/mo | [Calculator](https://www.trychroma.com/pricing) |
| **Weaviate** | $160/mo | [Calculator](https://weaviate.io/pricing/serverless) |

**Key Insight:** 5x cost variation between cheapest (Pinecone $30) and most expensive (Weaviate $160)!

#### 5. **Enhanced Feature Ratings**

**Hybrid Search:**
- ✅ Chroma, Milvus/Zilliz, Weaviate, Qdrant
- ❌ Pinecone (no hybrid search support)

**Metadata Filtering:**
- **Excellent:** Weaviate, Qdrant (native datetime & geo support)
- **Good:** Milvus/Zilliz (timestamp-based, good filtering)
- **Partial:** Chroma (basic filtering)
- **Limited:** Pinecone (must declare fields at creation)

**Schema Flexibility:**
- **Excellent:** Qdrant (schema-less JSON), Chroma (add any field anytime)
- **Good:** Weaviate (can add fields, may need re-indexing), Milvus (dynamic $meta fields)
- **Poor:** Pinecone (cannot add filterable fields after creation)

**Implementation Ease:**
- **Excellent:** Pinecone (2-min setup), Chroma (simple API)
- **Good:** Weaviate, Qdrant, Milvus (good docs, free tier)

#### 6. **Visual Improvements**

**New Quality Badge System:**
- Color-coded badges: Excellent (green), Good (blue), Partial (yellow), Limited (orange), Poor (red)
- Makes feature comparison instantly visual

**Clickable Cost Links:**
- Each cost in the table is a clickable link to the official calculator
- Includes cost details below the main cost

**Updated Column Definitions:**
- Production-focused explanations
- Real-world examples
- Performance impact notes

#### 7. **Cost Comparison Summary Redesign**

**Old Grouping:**
- Best Value: Chroma ($5-10/mo) ❌ Inaccurate
- Balanced: Milvus/Qdrant ($15-40/mo) ❌ Inaccurate
- Premium: Pinecone/Weaviate ($50-100/mo) ❌ Inaccurate

**New Grouping (Accurate):**
- **Most Affordable:** Pinecone $30/mo (⚠️ with schema flexibility warning)
- **Best Balance:** Qdrant $103/mo, Milvus $115/mo
- **Premium Tier:** Chroma $139/mo, Weaviate $160/mo

### Key Insights Added

1. **Metadata Filtering is Often Overlooked:**
   - Only Weaviate and Qdrant support native datetime and geolocation
   - Others require workarounds (timestamps, coordinate pairs)
   - Post-filtering can require retrieving 10x more results internally

2. **Schema Flexibility Matters:**
   - Pinecone Serverless: Must declare ALL filterable fields at index creation
   - Cannot add indexed fields later without complete rebuild
   - This was the most painful lesson from production experience

3. **Cost Transparency:**
   - Real pricing from official calculators
   - 5x cost variation between providers
   - Pinecone cheapest but with major schema limitations

### Before & After Comparison

**Before:**
- Generic feature checkboxes (✓/✗/⚠️)
- Estimated costs ($5-100/mo ranges)
- All features weighted equally
- No production context

**After:**
- Production-critical features with quality ratings
- Exact costs ($30-160/mo) with calculator links
- Features weighted by production impact
- Real-world lessons and warnings
- Only tested databases (5 instead of 7)

## Impact

This update transforms the comparison from a generic feature checklist to a **production-ready decision framework** based on:

1. ✅ **Real benchmark data** (from your Jupyter notebooks)
2. ✅ **Accurate cost calculations** (from official providers)
3. ✅ **Production lessons learned** (schema flexibility pain points)
4. ✅ **Feature priorities** (what actually matters in production)

The comparison now helps developers make **informed decisions** based on their specific needs:

- Need cheapest? → Pinecone (but plan schema carefully!)
- Need flexibility? → Qdrant or Chroma
- Need native datetime/geo? → Weaviate or Qdrant only
- Need fastest queries? → Milvus/Zilliz (50.7ms)
- Need best balance? → Qdrant ($103/mo, 73.1ms, excellent flexibility)

## Technical Notes

- All costs verified with official calculators as of Oct 21, 2025
- Benchmark data from 100 articles, 5 standardized queries, 384-dim embeddings
- Feature ratings based on hands-on implementation in Jupyter notebooks
- Schema flexibility ratings based on real migration pain points

# Pinecone Free Tier Setup Guide

## Overview
- **Free Tier (Starter)**: yes. About 100k vectors (1536 dims).
- **Pricing after free tier**: $50/mo minimum (Standard Severless tier)
- **Best for**: Fastest deployment, fully managed, serverless auto-scaling
- **Key Limitation**: ⚠️ Metadata schema must be declared upfront - cannot add indexed fields later

## Important Warning About Metadata

**CRITICAL**: Pinecone Serverless requires you to define which metadata fields to index at creation time. You **CANNOT** add new indexed metadata fields after creation without rebuilding the entire index.

Plan ALL metadata fields before creating your index!

## Step-by-Step Setup

### 1. Create Pinecone Account

1. Go to [Pinecone](https://www.pinecone.io/)
2. Click **"Sign Up Free"** or **"Get Started"**
3. Sign up with:
   - Google account
   - Github account

### 2. Create API Key

1. After login, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name (e.g., `vectordb-project`)
4. Copy and save the API key (shown only once)

### 3. Note Your Environment

Check your **Environment** in the console (e.g., `us-east-1-aws`, `eu-west-1-aws`)

### 4. Configure Environment Variables

Add to your `.env` file:

```bash
PINECONE_API_KEY=your_api_key_here
PINECONE_ENVIRONMENT=us-east-1-aws  # Your actual environment
```

### 5. Create Your Index

**IMPORTANT**: Define metadata schema NOW!

1. Go to **"Indexes"** in sidebar
2. Click **"Create Index"**
3. Configure:
   - **Name**: `articles` (lowercase, no special chars)
   - **Dimensions**: `1024` (for Qwen3 embeddings)
   - **Metric**: `cosine`
   - **Environment**: Choose serverless region
   - **Metadata Configuration**: Click **"Configure Metadata"**

4. **Define Metadata Fields** (THIS IS CRITICAL):
   ```
   Fields to index:
   - category (string)
   - source (string)
   - evergreen (boolean)
   - published_date (string/datetime)

   You MUST declare all fields you'll ever want to filter on!
   ```

5. Click **"Create Index"**

### 6. Test Connection (Python)

```python
from pinecone import Pinecone, ServerlessSpec

# Initialize Pinecone
pc = Pinecone(api_key="your_api_key_here")

# Check connection
print(pc.list_indexes())

# Connect to your index
index = pc.Index("articles")
print(index.describe_index_stats())
```

## Inserting Data

```python
# Prepare vectors with metadata
vectors = [
    {
        "id": "article_1",
        "values": [0.1, 0.2, 0.3, ...],  # 1024-dim embedding
        "metadata": {
            "title": "Article Title",
            "category": "Technology",  # Must be in defined schema
            "source": "EXAMPLE",
            "published_date": "2025-10-16T14:09:00Z",
            "url": "https://example.com/article",
            "evergreen": False
        }
    }
]

# Upsert to index
index.upsert(vectors=vectors)
```

## Metadata Filtering Examples

```python
# Filter by category
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=10,
    filter={
        "category": {"$eq": "Technology"}
    },
    include_metadata=True
)

# Filter by date range
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=10,
    filter={
        "$and": [
            {"category": {"$eq": "Technology"}},
            {"published_date": {"$gte": "2025-09-01T00:00:00Z"}}
        ]
    },
    include_metadata=True
)

# Multiple conditions
results = index.query(
    vector=[0.1, 0.2, ...],
    filter={
        "$and": [
            {"category": {"$in": ["Technology", "Science"]}},
            {"evergreen": {"$eq": False}}
        ]
    }
)
```

## Free Tier Limits

- **Storage**: 2GB
- **Write Operations**: 2M writes/month
- **Read Operations**: 1M reads/month
- **Indexes**: 1 index in Starter plan
- **Pods**: N/A (serverless only in free tier)

## Monitoring Usage

1. Go to Pinecone Console
2. Check **"Usage"** section
3. Monitor:
   - Storage used (out of 2GB)
   - Write operations used
   - Read operations used
4. Usage resets monthly

## Key Limitations

### ⚠️ Metadata Schema Rigidity

**Cannot do after index creation:**
- Add new indexed metadata fields
- Change metadata field types
- Remove metadata fields from index

**If you need new fields:**
1. Create new index with updated schema
2. Re-embed and re-upload all data
3. Delete old index

This is Pinecone's biggest limitation compared to Qdrant/Chroma!

## Tips & Best Practices

1. **Plan metadata schema carefully** - List ALL possible filter fields upfront
2. **Use batch upserts** - More efficient (up to 100 vectors per request)
3. **Monitor usage** - Free tier limits can be hit quickly
4. **Use namespaces** - Organize data within single index
5. **Include essential metadata only** - Every field counts toward storage

## Common Issues

**Issue**: "Cannot filter on field 'X'"
- **Solution**: Field wasn't declared in metadata schema. Must rebuild index.

**Issue**: "Dimension mismatch"
- **Solution**: Ensure all vectors are exactly 1024 dimensions

**Issue**: "Quota exceeded"
- **Solution**: Reached monthly read/write limits. Wait for reset or upgrade.

**Issue**: "Index name invalid"
- **Solution**: Use lowercase letters, numbers, hyphens only

## Workaround for Schema Flexibility

Store additional metadata as non-indexed fields:
- They won't be filterable
- But will be returned with results
- Useful for display purposes (title, url, etc.)

## Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Python SDK Guide](https://docs.pinecone.io/docs/python-client)
- [Metadata Filtering](https://docs.pinecone.io/docs/metadata-filtering)
- [Serverless Indexes](https://docs.pinecone.io/docs/serverless-indexes)

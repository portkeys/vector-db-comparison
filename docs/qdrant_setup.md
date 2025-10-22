# Qdrant Cloud Free Tier Setup Guide

## Overview
- **Free Tier**: 1GB cluster, free forever
- **Pricing after free tier**: ~$25-40/mo for 1M vectors (usage-based)
- **Best for**: Most flexible metadata, Rust-built performance, schema-less JSON payloads
- **Key Feature**: Add any metadata fields dynamically, create indexes on-the-fly

## Step-by-Step Setup

### 1. Create Qdrant Cloud Account

1. Go to [Qdrant Cloud](https://cloud.qdrant.io/)
2. Click **"Get Started Free"** or **"Sign Up"**
3. Sign up with:
   - Google account
   - GitHub account
   - Email + password

### 2. Create Your First Cluster

1. After login, click **"Create Cluster"**
2. Configure cluster:
   - **Name**: `articles-cluster` (or your choice)
   - **Region**: Choose closest to you (AWS/GCP, multiple regions)
   - **Tier**: **Free** (1GB cluster)
   - **Version**: Latest stable version (auto-selected)
3. Click **"Create"**
4. Wait 1-2 minutes for cluster provisioning

### 3. Get Your API Credentials

1. Click on your cluster name
2. In the cluster details, you'll see:
   - **Cluster URL**: `https://xxxxx.qdrant.io` (your endpoint)
   - **API Key**: Click to reveal/generate
3. Copy both values

### 4. Configure Environment Variables

Add to your `.env` file:

```bash
QDRANT_URL=https://xxxxx.qdrant.io
QDRANT_API_KEY=your_api_key_here
```

### 5. Test Connection (Python)

```python
from qdrant_client import QdrantClient

# Connect to Qdrant Cloud
client = QdrantClient(
    url="https://xxxxx.qdrant.io",
    api_key="your_api_key_here"
)

# Test connection
print(client.get_collections())  # Should return empty list initially
```

## Creating a Collection

```python
from qdrant_client.models import Distance, VectorParams, PointStruct

# Create collection
client.create_collection(
    collection_name="articles",
    vectors_config=VectorParams(
        size=1024,  # Qwen3-Embedding-0.6B dimension
        distance=Distance.COSINE
    )
)

# Insert points with schema-less metadata
client.upsert(
    collection_name="articles",
    points=[
        PointStruct(
            id=1,
            vector=[0.1, 0.2, 0.3, ...],  # 1024-dim embedding
            payload={
                "title": "Article Title",
                "category": "Technology",
                "published_date": "2025-10-16T14:09:00Z",
                "source": "EXAMPLE",
                "url": "https://example.com/article",
                # Add ANY field you want - schema-less!
                "tags": ["ai", "ml"],
                "evergreen": False
            }
        )
    ]
)
```

## Key Advantages

1. **Most Flexible Metadata**: JSON payload - add any fields anytime
2. **Dynamic Indexing**: Create payload indexes on new fields without rebuilding
3. **High Performance**: Rust-built, fast queries
4. **Great Free Tier**: 1GB free forever (no credit expiration)

## Metadata Filtering Examples

```python
from qdrant_client.models import Filter, FieldCondition, MatchValue, Range

# Filter by category
results = client.search(
    collection_name="articles",
    query_vector=[0.1, 0.2, ...],
    limit=10,
    query_filter=Filter(
        must=[
            FieldCondition(
                key="category",
                match=MatchValue(value="Technology")
            )
        ]
    )
)

# Filter by date range
results = client.search(
    collection_name="articles",
    query_vector=[0.1, 0.2, ...],
    query_filter=Filter(
        must=[
            FieldCondition(
                key="category",
                match=MatchValue(value="Technology")
            ),
            FieldCondition(
                key="published_date",
                range=Range(
                    gte="2025-09-01T00:00:00Z",
                    lte="2025-10-16T23:59:59Z"
                )
            )
        ]
    )
)
```

## Creating Payload Indexes (Optional but Recommended)

Speed up filtering by creating indexes on frequently filtered fields:

```python
from qdrant_client.models import PayloadSchemaType

# Create index on category field
client.create_payload_index(
    collection_name="articles",
    field_name="category",
    field_schema=PayloadSchemaType.KEYWORD
)

# Create index on published_date for range queries
client.create_payload_index(
    collection_name="articles",
    field_name="published_date",
    field_schema=PayloadSchemaType.DATETIME
)
```

You can add these indexes ANYTIME - even after data is already loaded!

## Free Tier Limits

- **Storage**: 1GB cluster
- **Memory**: Shared resources
- **Vectors**: ~100K-200K vectors (depends on metadata size)
- **Collections**: Unlimited
- **API Calls**: Unlimited
- **Duration**: Free forever (no expiration)

## Monitoring Usage

1. Go to Qdrant Cloud Dashboard
2. Click on your cluster
3. View:
   - Storage used
   - Number of vectors
   - Collection stats
4. Set up alerts if nearing 1GB limit

## Tips & Best Practices

1. **Use batch upsert** - Much faster than single inserts
2. **Create payload indexes** - Dramatically speeds up filtered queries
3. **Monitor storage** - 1GB is generous but finite
4. **Use quantization** - Can compress vectors to fit more data (advanced)
5. **Leverage schema-less payloads** - Easiest metadata management

## Common Issues

**Issue**: "Collection already exists"
- **Solution**: Use `recreate_collection=True` or check existing collections first

**Issue**: "Vector dimension mismatch"
- **Solution**: Ensure all vectors are exactly 1024 dimensions

**Issue**: "Storage limit exceeded"
- **Solution**: Delete old collections or upgrade to paid tier

**Issue**: "Slow filtered queries"
- **Solution**: Create payload indexes on filtered fields

## Resources

- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Qdrant Python Client](https://python-client.qdrant.tech/)
- [Qdrant Cloud Console](https://cloud.qdrant.io/)
- [Filtering Guide](https://qdrant.tech/documentation/concepts/filtering/)

# Milvus (Zilliz Cloud) Free Tier Setup Guide

## Overview
- **Free Tier**: 5GB storage, 2.5M vCUs (Zilliz Cloud)
- **Pricing after free tier**: ~$15-30/mo for 1M vectors on serverless
- **Best for**: Enterprise features, hybrid sparse+dense vectors, GPU acceleration, BM25 full-text search
- **Metadata Flexibility**: Dynamic fields via $meta, can add static fields to existing collections (v2.6+)

## Step-by-Step Setup

### 1. Create Zilliz Cloud Account

1. Go to [Zilliz Cloud](https://cloud.zilliz.com/) (Managed Milvus service)
2. Click **"Start Free"** or **"Sign Up"**
3. Sign up with:
   - Google account
   - GitHub account

### 2. Create a Cluster

1. After login, click **"Create Cluster"**
2. Configure:
   - **Cluster Name**: `articles-cluster`
   - **Cloud Provider**: AWS or GCP
   - **Region**: Choose closest to you
   - **Cluster Type**: **Free** (free tier)
3. Click **"Create Cluster"**
4. Wait 3-5 minutes for provisioning

### 3. Get Your Credentials

1. Click on your cluster name
2. In cluster details, find:
   - **Endpoint**: `https://xxxxx.api.gcp-us-west1.zillizcloud.com`
   - **Token**: Click "Generate Token" or use existing
3. Copy both values

### 4. Configure Environment Variables

Add to your `.env` file:

```bash
ZILLIZ_ENDPOINT=https://xxxxx.api.gcp-us-west1.zillizcloud.com
ZILLIZ_API_KEY=your_token_here
```

### 5. Test Connection (Python)

```python
from pymilvus import connections, utility

# Connect to Zilliz Cloud
connections.connect(
    alias="default",
    uri="https://xxxxx.api.gcp-us-west1.zillizcloud.com",
    token="your_token_here"
)

# Test connection
print(utility.list_collections())  # Should return empty list initially
```

## Creating a Collection

Milvus requires explicit schema definition:

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

# Define fields
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=False),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1024),

    # Static schema fields
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=500),
    FieldSchema(name="category", dtype=DataType.VARCHAR, max_length=100),
    FieldSchema(name="source", dtype=DataType.VARCHAR, max_length=100),
    FieldSchema(name="url", dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name="published_date", dtype=DataType.VARCHAR, max_length=100),
    FieldSchema(name="evergreen", dtype=DataType.BOOL),

    # Dynamic fields support (v2.6+)
    # Use $meta field for undefined/flexible metadata
]

# Enable dynamic fields
schema = CollectionSchema(
    fields=fields,
    description="Article collection with embeddings",
    enable_dynamic_field=True  # Allows $meta JSON field
)

# Create collection
collection = Collection(
    name="articles",
    schema=schema
)

print(f"Collection created: {collection.name}")
```

## Creating Index (Required for Search)

```python
from pymilvus import Collection

collection = Collection("articles")

# Create HNSW index for vector field
index_params = {
    "metric_type": "COSINE",
    "index_type": "HNSW",
    "params": {"M": 16, "efConstruction": 256}
}

collection.create_index(
    field_name="embedding",
    index_params=index_params
)

# Load collection into memory (required before querying)
collection.load()
```

## Inserting Data

```python
# Prepare data
entities = [
    [1, 2, 3],  # ids
    [[0.1, 0.2, ...], [0.3, 0.4, ...], ...],  # embeddings (1024-dim)
    ["Article 1", "Article 2", ...],  # titles
    ["Technology", "Science", ...],   # categories
    ["SOURCE1", "SOURCE2", ...],      # sources
    ["https://...", "https://...", ...],  # urls
    ["2025-10-16", "2025-10-15", ...],   # published_dates
    [False, True, ...],  # evergreen
]

# Insert
insert_result = collection.insert(entities)
print(f"Inserted {insert_result.insert_count} entities")

# Must flush to persist data
collection.flush()
```

## Using Dynamic Fields

```python
# Insert with dynamic metadata via $meta
entities_with_meta = [
    [4, 5],  # ids
    [[0.5, 0.6, ...], [0.7, 0.8, ...]],  # embeddings
    ["Article 4", "Article 5"],  # titles
    # ... other static fields ...

    # Dynamic fields (anything not in schema)
    [
        {"custom_field": "value1", "another_field": 123},
        {"custom_field": "value2", "extra_data": [1, 2, 3]}
    ]
]
```

## Querying and Filtering

```python
# Vector search with filter
search_params = {
    "metric_type": "COSINE",
    "params": {"ef": 64}
}

results = collection.search(
    data=[[0.1, 0.2, ...]],  # Query vector
    anns_field="embedding",
    param=search_params,
    limit=10,
    expr='category == "Technology"',  # Filter expression
    output_fields=["title", "category", "url", "published_date"]
)

# Access results
for hits in results:
    for hit in hits:
        print(f"ID: {hit.id}, Score: {hit.score}, Title: {hit.entity.get('title')}")
```

## Advanced Filtering

```python
# Multiple conditions
results = collection.search(
    data=[[0.1, 0.2, ...]],
    anns_field="embedding",
    param=search_params,
    limit=10,
    expr='category == "Technology" and evergreen == False',
    output_fields=["*"]  # Return all fields
)

# Date-based filtering (as string comparison)
results = collection.search(
    data=[[0.1, 0.2, ...]],
    anns_field="embedding",
    param=search_params,
    expr='published_date >= "2025-09-01" and category in ["Technology", "Science"]'
)
```

## Key Advantages

1. **Enterprise-Grade**: Used by eBay, Walmart, PayPal
2. **Hybrid Search**: Sparse + dense vectors, BM25 full-text search
3. **GPU Acceleration**: NVIDIA CAGRA for faster indexing
4. **Dynamic Fields**: Add undefined fields via $meta JSON
5. **Scalability**: Handles billions of vectors

## Free Tier Limits (Zilliz Cloud)

- **Storage**: 5GB
- **Compute**: 2.5M vCUs
- **Collections**: Unlimited
- **API Calls**: No hard limit
- **Duration**: Free credits (monitor usage)

## Monitoring Usage

1. Go to Zilliz Cloud Console
2. Click on your cluster
3. View **Monitoring** tab:
   - Storage used
   - vCUs consumed
   - Collection statistics
   - Query performance

## Tips & Best Practices

1. **Always load collections** - `collection.load()` before querying
2. **Flush after inserts** - Ensures data persistence
3. **Create indexes** - Required for vector search
4. **Use batch inserts** - More efficient than single inserts
5. **Monitor memory** - Loaded collections consume RAM
6. **Use dynamic fields** - For flexible metadata
7. **Expression syntax** - Learn Milvus boolean expressions

## Common Issues

**Issue**: "Collection not loaded"
- **Solution**: Call `collection.load()` before searching

**Issue**: "Index not created"
- **Solution**: Create index on vector field before searching

**Issue**: "Expression syntax error"
- **Solution**: Check Milvus expression syntax (different from SQL)

**Issue**: "Dimension mismatch"
- **Solution**: Ensure vectors are exactly 1024 dimensions

**Issue**: "Out of memory"
- **Solution**: Unload unused collections or upgrade cluster

## Expression Syntax Examples

```python
# Comparison operators
'age > 18'
'price <= 100.0'
'category == "Technology"'
'category != "Sports"'

# Logical operators
'age > 18 and city == "NYC"'
'category == "Tech" or category == "Science"'

# IN operator
'category in ["Tech", "Science", "AI"]'
'id in [1, 2, 3, 4, 5]'

# String matching (limited)
'title like "AI%"'  # Starts with "AI"

# Combining conditions
'(category == "Tech" or category == "Science") and published_date >= "2025-09-01"'
```

## Resources

- [Milvus Documentation](https://milvus.io/docs)
- [PyMilvus SDK](https://milvus.io/docs/install-pymilvus.md)
- [Zilliz Cloud Console](https://cloud.zilliz.com/)
- [Boolean Expression Rules](https://milvus.io/docs/boolean.md)
- [Index Types](https://milvus.io/docs/index.md)

# Weaviate Cloud Free Tier Setup Guide

## Overview
- **Free Tier**: 14-day free trial (Serverless)
- **Pricing after trial**: $25/mo minimum, ~$50-100/mo for 1M vectors
- **Best for**: GraphQL/REST/gRPC APIs, hybrid BM25 + vector search, knowledge graphs
- **Metadata Flexibility**: Can add properties after creation, but may need re-indexing

## Step-by-Step Setup

### 1. Create Weaviate Cloud Account

1. Go to [Weaviate Cloud](https://console.weaviate.cloud/)
2. Click **"Sign Up"** or **"Start Free"**
3. Sign up with:
   - Google account

### 2. Create a Cluster

1. After login, click **"Create Cluster"**
2. Configure:
   - **Cluster Name**: `articles-cluster`
   - **Deployment Type**: **Sandbox** (free for 14 days)
   - **Region**: choose the one closest to you
   - **Enable Authentication**: Yes (recommended)
3. Click **"Create"**
4. Wait 2-3 minutes for provisioning

### 3. Get Your Credentials

1. Click on your cluster name
2. Copy the following:
   - **Cluster URL**: `https://xxxxx.weaviate.network`
   - **API Key**: Click "API Keys" → "Generate New Key"
3. Save both credentials securely

### 4. Configure Environment Variables

Add to your `.env` file:

```bash
WEAVIATE_URL=https://xxxxx.weaviate.network
WEAVIATE_API_KEY=your_api_key_here
```

### 5. Test Connection (Python)

```python
import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.Client(
    url="https://xxxxx.weaviate.network",
    auth_client_secret=AuthApiKey(api_key="your_api_key_here")
)

# Test connection
print(client.is_ready())  # Should return True
print(client.get_meta())   # Should return cluster metadata
```

## Creating a Collection (Class)

Weaviate uses "classes" (similar to collections in other DBs):

```python
# Define schema
article_class = {
    "class": "Article",
    "description": "News and blog articles",
    "vectorizer": "none",  # We'll provide our own embeddings
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
            "description": "Article title"
        },
        {
            "name": "subtitle",
            "dataType": ["text"],
            "description": "Article subtitle"
        },
        {
            "name": "category",
            "dataType": ["text"],
            "description": "Article category",
            "indexFilterable": True,  # Enable filtering
            "indexSearchable": True   # Enable text search
        },
        {
            "name": "source",
            "dataType": ["text"],
            "indexFilterable": True
        },
        {
            "name": "publishedDate",
            "dataType": ["date"],  # Use date type for timestamps
            "description": "Publication timestamp"
        },
        {
            "name": "url",
            "dataType": ["text"]
        },
        {
            "name": "evergreen",
            "dataType": ["boolean"]
        },
        {
            "name": "tags",
            "dataType": ["text[]"],  # Array of strings
            "description": "Article tags"
        }
    ]
}

# Create the class
client.schema.create_class(article_class)
```

## Inserting Data

```python
from weaviate.util import generate_uuid5

# Insert single article
client.data_object.create(
    class_name="Article",
    data_object={
        "title": "Article Title",
        "subtitle": "Article Subtitle",
        "category": "Technology",
        "source": "EXAMPLE",
        "publishedDate": "2025-10-16T14:09:00Z",
        "url": "https://example.com/article",
        "evergreen": False,
        "tags": ["ai", "ml"]
    },
    vector=[0.1, 0.2, 0.3, ...],  # 1024-dim embedding
    uuid=generate_uuid5("article_1")
)

# Batch insert (recommended for multiple articles)
with client.batch as batch:
    batch.batch_size = 100

    for article in articles:
        batch.add_data_object(
            data_object={
                "title": article["title"],
                "category": article["category"],
                # ... other fields
            },
            class_name="Article",
            vector=article["embedding"]
        )
```

## Key Advantages

1. **Hybrid Search**: Combine vector similarity with BM25 keyword search
2. **Multiple APIs**: GraphQL, REST, gRPC - choose what you prefer
3. **Rich Schema**: Strongly typed properties with validation
4. **Knowledge Graphs**: Can link objects with references

## Querying and Filtering

### Vector Search with Filters

```python
# GraphQL-style query (Weaviate's primary interface)
result = (
    client.query
    .get("Article", ["title", "category", "publishedDate", "url"])
    .with_near_vector({"vector": [0.1, 0.2, ...]})
    .with_where({
        "path": ["category"],
        "operator": "Equal",
        "valueText": "Technology"
    })
    .with_limit(10)
    .do()
)
```

### Date Range Filtering

```python
result = (
    client.query
    .get("Article", ["title", "publishedDate"])
    .with_near_vector({"vector": [0.1, 0.2, ...]})
    .with_where({
        "operator": "And",
        "operands": [
            {
                "path": ["category"],
                "operator": "Equal",
                "valueText": "Technology"
            },
            {
                "path": ["publishedDate"],
                "operator": "GreaterThanEqual",
                "valueDate": "2025-09-01T00:00:00Z"
            }
        ]
    })
    .with_limit(10)
    .do()
)
```

### Hybrid Search (Vector + Keywords)

```python
result = (
    client.query
    .get("Article", ["title", "category"])
    .with_hybrid(
        query="artificial intelligence",  # Keyword search
        vector=[0.1, 0.2, ...],          # Vector search
        alpha=0.5  # 0.5 = equal weight, 0 = pure keyword, 1 = pure vector
    )
    .with_limit(10)
    .do()
)
```

## Free Trial Limits

- **Duration**: 14 days
- **Storage**: Varies (generally sufficient for testing)
- **Requests**: No hard limit during trial
- **Cluster Type**: Serverless only

## Monitoring Usage

1. Go to Weaviate Cloud Console
2. Click on your cluster
3. View:
   - Object count
   - Storage used
   - Trial days remaining

## Adding Properties Later

You CAN add properties to existing classes:

```python
# Add new property to existing class
new_property = {
    "name": "viewCount",
    "dataType": ["int"]
}

client.schema.property.create("Article", new_property)
```

**Important**: Existing objects won't have this property indexed. You may need to re-import data for full functionality.

## Tips & Best Practices

1. **Use batch imports** - Much faster than single inserts
2. **Try hybrid search** - Weaviate's unique strength
3. **Design schema carefully** - Changing types later is hard
4. **Use GraphQL playground** - Test queries in the console
5. **Monitor trial period** - Only 14 days free

## Common Issues

**Issue**: "Class already exists"
- **Solution**: Delete class first with `client.schema.delete_class("Article")`

**Issue**: "Vector dimension mismatch"
- **Solution**: Ensure vectors are exactly 1024 dimensions

**Issue**: "Property not filterable"
- **Solution**: Set `indexFilterable: True` in schema property definition

**Issue**: GraphQL query syntax errors
- **Solution**: Use the GraphQL playground in console to test queries

## Resources

- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [Python Client](https://weaviate.io/developers/weaviate/client-libraries/python)
- [GraphQL API](https://weaviate.io/developers/weaviate/api/graphql)
- [Filtering Guide](https://weaviate.io/developers/weaviate/search/filters)
- [Hybrid Search](https://weaviate.io/developers/weaviate/search/hybrid)

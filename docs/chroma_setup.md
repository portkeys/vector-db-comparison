# Chroma Cloud Free Tier Setup Guide

## Overview
- **Free Tier**: $5 free credits, 5GB storage, 2.5M vCUs (Vector Compute Units)
- **Pricing after free tier**: Usage-based ($2.50/GB write, storage costs)
- **Best for**: Schema-less metadata, built-in embedding management, easy setup
- **Key Feature**: Can add metadata fields dynamically without pre-declaration

## Step-by-Step Setup

### 1. Create Chroma Cloud Account

1. Go to [Chroma Cloud](https://www.trychroma.com/)
2. Click "Sign Up"
3. Sign up with:
   - Google account
   - GitHub account
   - Email

### 2. Create Your First Database

1. After login, click **"Create Database"**
2. Choose settings:
   - **Name**: `articles` (or your preferred name)
3. Click **"Create database"**
4. Configure Chroma SDK

### 3. Get Your API Credentials

1. Navigate to **Settings** or **API Keys** section
2. You'll need:
   - **API Key**: Your authentication token
   - **Database URL/Host**: Your database endpoint (e.g., `api.trychroma.com` or similar)
3. Click **"Create API Key"** or **"Generate Token"**
4. **Important**: Copy and save your API key immediately (it won't be shown again)

### 4. Configure Environment Variables

Add to your `.env` file:

```bash
CHROMA_API_KEY=your_api_key_here
CHROMA_TENANT=your_tenant_id_here
CHROMA_DATABASE=articles
```

**Note**: You can find your tenant ID in the Chroma Cloud console under your database settings.

## Key Advantages

1. **Schema-less Metadata**: Add any fields anytime without rebuilding
2. **Built-in Embedding Support**: Can use Chroma's built-in embedding functions (optional)
3. **Easy Filtering**: Simple Python dict-style filtering
4. **Fast Setup**: Quickest to get started

## Metadata Filtering Examples

```python
# Filter by category
results = collection.query(
    query_embeddings=[[0.1, 0.2, ...]],
    n_results=10,
    where={"category": "Technology"}
)

# Filter by date range (if using timestamp)
results = collection.query(
    query_embeddings=[[0.1, 0.2, ...]],
    where={
        "$and": [
            {"category": "Technology"},
            {"published_date": {"$gte": "2025-09-01"}}
        ]
    }
)
```

## Free Tier Limits

- **Storage**: 5GB
- **Compute**: 2.5M vCUs (vector compute units)
- **Collections**: Unlimited
- **API Calls**: No hard limit, usage-based

## Monitoring Usage

1. Go to Chroma Cloud Dashboard
2. Check **Usage** or **Billing** section
3. Monitor:
   - Storage used
   - vCUs consumed
   - Estimated costs

## Tips & Best Practices

1. **Use batch operations** - More efficient than single inserts
2. **Monitor your credits** - $5 goes quickly with large datasets
3. **Test locally first** - Use local Chroma (`chromadb.Client()`) for development
4. **Leverage schema-less nature** - Don't worry about planning all metadata fields upfront

## Common Issues

**Issue**: "Authentication failed"
- **Solution**: Verify API key is correct in `.env` file

**Issue**: "Collection already exists"
- **Solution**: Use `get_or_create_collection()` instead of `create_collection()`

**Issue**: "Out of credits"
- **Solution**: Upgrade to paid tier or use self-hosted Chroma

## Resources

- [Chroma Documentation](https://docs.trychroma.com/)
- [Chroma Python Client](https://docs.trychroma.com/reference/py-client)
- [Chroma Cloud Pricing](https://www.trychroma.com/pricing)

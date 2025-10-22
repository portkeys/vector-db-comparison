# Chroma Collection Management & Upsert Guide

## Does Chroma Support Upsert?

**YES!** Chroma supports upsert operations via the `.add()` method.

## How Upsert Works in Chroma

When you call `collection.add()` with an ID that already exists:
- **Existing behavior**: Chroma will **update** the existing record
- Same as upsert in other databases
- No need for separate `update()` or `upsert()` methods

```python
# First insert
collection.add(
    ids=["article_123"],
    embeddings=[[0.1, 0.2, ...]],
    metadatas=[{"title": "Original Title"}]
)

# Later update (same ID) - This is an UPSERT
collection.add(
    ids=["article_123"],  # Same ID
    embeddings=[[0.3, 0.4, ...]],  # New embedding
    metadatas=[{"title": "Updated Title"}]  # New metadata
)
# Result: article_123 is updated, not duplicated
```

## Best Practices

### 1. Get or Create Pattern

Instead of always deleting:

```python
# Good: Preserve existing data
try:
    collection = client.get_collection(name="articles")
    print(f"Using existing collection with {collection.count()} items")
except:
    collection = client.create_collection(name="articles")
    print("Created new collection")
```

### 2. Incremental Updates

Add new articles without deleting old ones:

```python
# Add new articles
new_articles = load_new_articles()  # Only new ones
for article in new_articles:
    collection.add(
        ids=[f"article_{article['id']}"],
        embeddings=[embedding],
        metadatas=[metadata]
    )
```

### 3. Batch Upsert

Update multiple articles efficiently:

```python
# Upsert in batches
collection.add(
    ids=[f"article_{a['id']}" for a in articles],
    embeddings=embeddings_list,
    metadatas=metadata_list
)
# Existing IDs are updated, new IDs are inserted
```

### 4. Check Before Insert

Avoid unnecessary upserts:

```python
# Get existing IDs
existing = collection.get(ids=[f"article_{id}" for id in new_ids])

# Filter to only truly new articles
new_only = [a for a in articles if f"article_{a['id']}" not in existing['ids']]

# Insert only new
if new_only:
    collection.add(...)
```

## When to Delete and Recreate

Only delete when you need to:

1. **Change schema** - Different metadata fields
2. **Change embedding model** - Different dimensions
3. **Fix data errors** - Corrupted data
4. **Testing** - Clean slate for experiments

## Collection Management Commands

```python
# List all collections
collections = client.list_collections()

# Get specific collection
collection = client.get_collection(name="articles")

# Check collection size
count = collection.count()

# Delete collection (careful!)
client.delete_collection(name="articles")

# Get collection metadata
info = collection.get()
```

## Updating Metadata Only

You can update just metadata without re-embedding:

```python
# Get existing embedding
result = collection.get(ids=["article_123"], include=["embeddings"])
existing_embedding = result['embeddings'][0]

# Update with same embedding, new metadata
collection.add(
    ids=["article_123"],
    embeddings=[existing_embedding],  # Reuse existing
    metadatas=[{"title": "New Title", "updated": True}]
)
```

## Partial Updates

Chroma replaces the entire metadata object, so preserve fields you want to keep:

```python
# Get current metadata
current = collection.get(ids=["article_123"], include=["metadatas"])
metadata = current['metadatas'][0]

# Update specific field
metadata['views'] = metadata.get('views', 0) + 1

# Upsert with merged metadata
collection.add(
    ids=["article_123"],
    embeddings=[...],  # Same or new
    metadatas=[metadata]  # Merged metadata
)
```

## Cost Implications

Since Chroma charges for:
- **Storage**: 5GB free, then $2.50/GB
- **Compute**: vCUs for operations

**Upserting is more cost-effective than delete + recreate:**
- Upsert: Only pays for changed data
- Delete + Recreate: Pays for full rewrite

## Example: Production Workflow

```python
# Daily article ingestion
def update_article_database():
    # Get existing collection
    collection = client.get_collection("articles")

    # Load today's new articles
    new_articles = fetch_new_articles()

    # Generate embeddings only for new content
    new_embeddings = generate_embeddings(new_articles)

    # Upsert (updates existing, inserts new)
    collection.add(
        ids=[f"article_{a['id']}" for a in new_articles],
        embeddings=new_embeddings,
        metadatas=[get_metadata(a) for a in new_articles]
    )

    print(f"Updated {len(new_articles)} articles")
    print(f"Total articles: {collection.count()}")
```

## Summary

✅ **Chroma supports upsert** via `.add()` method
✅ **Same ID = Update**, new ID = Insert
✅ **Preserve collections** between runs
✅ **More cost-effective** than recreating
✅ **Faster** for incremental updates

Use delete + recreate only when truly necessary!

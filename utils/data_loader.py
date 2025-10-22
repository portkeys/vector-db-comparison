"""Data loading utilities for article data."""

import json
from typing import List, Dict, Any
from pathlib import Path
from utils.date_utils import prepare_date_for_db


def load_articles(file_path: str = "sample_articles.json") -> List[Dict[str, Any]]:
    """
    Load articles from JSON file.

    Args:
        file_path: Path to the articles JSON file

    Returns:
        List of article dictionaries
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Articles file not found: {file_path}")

    with open(path, 'r', encoding='utf-8') as f:
        articles = json.load(f)

    print(f"Loaded {len(articles)} articles from {file_path}")
    return articles


def get_article_metadata(article: Dict[str, Any], db_type: str = "generic") -> Dict[str, Any]:
    """
    Extract metadata from an article for vector database storage.

    Args:
        article: Article dictionary
        db_type: Database type for format compatibility
            - "generic": Full flexibility (lists, native types)
            - "chroma": Chroma-compatible (no lists, strings only)
            - "pinecone": Pinecone-compatible (similar to Chroma)

    Returns:
        Metadata dictionary suitable for the specified vector DB
    """
    tags = article.get("denormalized_tags", [])

    # Base metadata with native Python types (most flexible)
    created_at_raw = article.get("item_created_at", "")

    metadata = {
        "id": article.get("id"),
        "source": article.get("item_source", ""),
        "title": article.get("item_title", ""),
        "subtitle": article.get("item_subtitle", ""),
        "category": article.get("category_name", ""),
        "tags": tags,  # Keep as list for DBs that support it
        "evergreen": article.get("evergreen", False),
        "url": article.get("item_url", ""),
        "created_at": prepare_date_for_db(created_at_raw, db_type),
    }

    # Apply DB-specific transformations
    if db_type in ["chroma", "pinecone", "milvus"]:
        # Chroma/Pinecone/Milvus: Convert lists to comma-separated strings
        # These DBs don't support native arrays (Milvus stores as VARCHAR)
        # Ensure all values are primitives (str, int, float, bool)
        metadata["tags"] = ", ".join(tags) if isinstance(tags, list) else str(tags)
        metadata["id"] = int(metadata["id"])
        metadata["evergreen"] = bool(metadata["evergreen"])
        # Ensure all other fields are strings (except created_at which is already timestamp)
        for key in ["source", "title", "subtitle", "category", "url"]:
            metadata[key] = str(metadata[key])

    return metadata
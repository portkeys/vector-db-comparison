"""Test script to verify Qwen3-Embedding-0.6B integration."""

import sys
from utils.embeddings import EmbeddingGenerator
from utils.data_loader import load_articles
import time

def test_embedding_model():
    """Test the embedding model integration."""

    print("=" * 70)
    print("Testing Qwen3-Embedding-0.6B Embedding Model")
    print("=" * 70)

    # 1. Initialize model
    print("\n1. Initializing model...")
    start_time = time.time()
    model = EmbeddingGenerator()
    load_time = time.time() - start_time
    print(f"   ✓ Model loaded in {load_time:.2f} seconds")

    # 2. Test single embedding
    print("\n2. Testing single text embedding...")
    test_text = "This is a test article about hiking in the mountains."
    embedding = model.embed_text(test_text)

    print(f"   ✓ Generated embedding")
    print(f"     - Dimension: {len(embedding)}")
    print(f"     - Type: {type(embedding)}")
    print(f"     - First 5 values: {embedding[:5]}")
    print(f"     - Value range: [{embedding.min():.4f}, {embedding.max():.4f}]")

    # Verify dimension
    assert len(embedding) == 1024, f"Expected 1024 dimensions, got {len(embedding)}"
    print(f"   ✓ Dimension verified: 1024")

    # 3. Test batch embeddings
    print("\n3. Testing batch embedding...")
    test_texts = [
        "Outdoor adventure in national parks",
        "Cycling race training techniques",
        "Best travel destinations in 2025",
        "Fitness and performance optimization",
        "Equipment reviews and recommendations"
    ]

    start_time = time.time()
    batch_embeddings = model.embed_batch(test_texts, show_progress=False)
    batch_time = time.time() - start_time

    print(f"   ✓ Generated {len(batch_embeddings)} embeddings")
    print(f"     - Shape: {batch_embeddings.shape}")
    print(f"     - Time: {batch_time:.2f} seconds")
    print(f"     - Average: {batch_time/len(test_texts):.3f} sec/text")

    # Verify batch shape
    assert batch_embeddings.shape == (5, 1024), f"Expected (5, 1024), got {batch_embeddings.shape}"
    print(f"   ✓ Batch shape verified")

    # 4. Test with actual article data
    print("\n4. Testing with actual article data...")
    articles = load_articles("sample_articles.json")

    # Test embedding a few articles
    sample_articles = articles[:3]
    article_embeddings = []

    start_time = time.time()
    for article in sample_articles:
        embedding = model.embed_article(article)
        article_embeddings.append(embedding)
    embed_time = time.time() - start_time

    print(f"   ✓ Generated embeddings for {len(sample_articles)} articles")
    print(f"     - Time: {embed_time:.2f} seconds")
    print(f"     - Average: {embed_time/len(sample_articles):.3f} sec/article")

    # Show sample article details
    print(f"\n   Sample article processed:")
    print(f"     - Title: {sample_articles[0]['item_title'][:60]}...")
    print(f"     - Embedding dimension: {len(article_embeddings[0])}")

    # 5. Verify embedding similarity
    print("\n5. Testing embedding similarity...")
    import numpy as np

    # Two similar texts
    text1 = "hiking and outdoor adventures"
    text2 = "outdoor hiking activities"
    emb1 = model.embed_text(text1)
    emb2 = model.embed_text(text2)

    # Two different texts
    text3 = "cycling race performance"
    emb3 = model.embed_text(text3)

    # Calculate cosine similarity
    def cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    sim_similar = cosine_similarity(emb1, emb2)
    sim_different = cosine_similarity(emb1, emb3)

    print(f"   Similarity (hiking vs outdoor hiking): {sim_similar:.4f}")
    print(f"   Similarity (hiking vs cycling): {sim_different:.4f}")

    assert sim_similar > sim_different, "Similar texts should have higher similarity!"
    print(f"   ✓ Similarity test passed (similar > different)")

    print("\n" + "=" * 70)
    print("✓ ALL TESTS PASSED!")
    print("=" * 70)
    print("\nEmbedding model is ready for use in vector databases.")
    print(f"Model: Qwen/Qwen3-Embedding-0.6B")
    print(f"Dimension: 1024")
    print(f"Performance: ~{embed_time/len(sample_articles):.3f} sec/article")

if __name__ == "__main__":
    try:
        test_embedding_model()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

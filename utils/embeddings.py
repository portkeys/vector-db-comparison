"""Embedding generation utilities using sentence-transformers."""

from sentence_transformers import SentenceTransformer
from typing import List, Union
import numpy as np
import os
import warnings

# Suppress the progress bar context warning in Jupyter
warnings.filterwarnings('ignore', category=UserWarning, module='huggingface_hub')
os.environ['HF_HUB_DISABLE_PROGRESS_BARS'] = '0'


class EmbeddingGenerator:
    """Generate embeddings using all-MiniLM-L6-v2 model (384 dimensions)."""

    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        """
        Initialize the embedding model.

        Args:
            model_name: HuggingFace model identifier
                Default: all-MiniLM-L6-v2 (384-dim, ~80MB, fast)
        """
        print(f"Loading embedding model: {model_name}")

        # Load model with try-except to handle progress bar issues gracefully
        try:
            self.model = SentenceTransformer(model_name, device='cpu')
        except Exception as e:
            # If there's any issue, try without progress bars
            print(f"Note: Progress display issue (this is normal): {type(e).__name__}")
            self.model = SentenceTransformer(model_name, device='cpu')

        # Get actual dimension from model
        self.dimension = self.model.get_sentence_embedding_dimension()
        print(f"✓ Model loaded successfully. Embedding dimension: {self.dimension}")

    def embed_text(self, text: str) -> np.ndarray:
        """
        Generate embedding for a single text.

        Args:
            text: Input text string

        Returns:
            Numpy array of shape (1024,)
        """
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding

    def embed_batch(self, texts: List[str], batch_size: int = 32, show_progress: bool = True) -> np.ndarray:
        """
        Generate embeddings for multiple texts.

        Args:
            texts: List of input text strings
            batch_size: Number of texts to process at once
            show_progress: Whether to show progress bar

        Returns:
            Numpy array of shape (n, 1024)
        """
        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            show_progress_bar=show_progress,
            convert_to_numpy=True
        )
        return embeddings

    def embed_article(self, article: dict) -> np.ndarray:
        """
        Generate embedding for an article by combining title, subtitle, and body.

        Args:
            article: Dictionary with 'item_title', 'item_subtitle', 'body_content' keys

        Returns:
            Numpy array of shape (1024,)
        """
        # Combine article fields for richer embeddings
        text_parts = []

        if article.get('item_title'):
            text_parts.append(f"Title: {article['item_title']}")

        if article.get('item_subtitle'):
            text_parts.append(f"Subtitle: {article['item_subtitle']}")

        if article.get('body_content'):
            # Truncate body to avoid extremely long texts
            body = article['body_content'][:2000]  # First 2000 chars
            text_parts.append(f"Content: {body}")

        combined_text = "\n".join(text_parts)
        return self.embed_text(combined_text)


# Convenience function for quick usage
def get_embedding_model() -> EmbeddingGenerator:
    """Get a ready-to-use embedding generator instance."""
    return EmbeddingGenerator()

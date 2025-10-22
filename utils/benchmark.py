"""Performance benchmarking utilities for vector databases."""

import time
import numpy as np
from typing import List, Callable, Dict, Any


# Standard test queries for consistent comparison across all vector DBs
STANDARD_TEST_QUERIES = [
    "outdoor hiking adventures",
    "cycling race performance",
    "travel destinations and tips",
    "fitness training techniques",
    "gear reviews and recommendations"
]


def benchmark_queries(
    query_function: Callable[[str], Any],
    test_queries: List[str] = None,
    num_results: int = 10,
    verbose: bool = True
) -> Dict[str, float]:
    """
    Benchmark vector database query performance with standard test queries.

    Args:
        query_function: Function that takes a query string and returns results.
                       Should handle embedding generation internally.
        test_queries: List of test query strings. Defaults to STANDARD_TEST_QUERIES.
        num_results: Number of results to retrieve per query (default: 10)
        verbose: Whether to print individual query times (default: True)

    Returns:
        Dictionary with performance metrics:
        - 'query_times': List of individual query times in seconds
        - 'avg_ms': Average query time in milliseconds
        - 'min_ms': Minimum query time in milliseconds
        - 'max_ms': Maximum query time in milliseconds
        - 'total_queries': Number of queries executed

    Example:
        def my_query_fn(query_text):
             embedding = model.embed(query_text)
             return collection.search(embedding, limit=10)

         results = benchmark_queries(my_query_fn)
         print(f"Average: {results['avg_ms']:.1f}ms")
    """
    if test_queries is None:
        test_queries = STANDARD_TEST_QUERIES

    query_times = []

    if verbose:
        print("Running performance benchmark...\n")

    for query in test_queries:
        start = time.time()
        _ = query_function(query)
        elapsed = time.time() - start

        query_times.append(elapsed)

        if verbose:
            # Truncate long queries for display
            display_query = query[:40] + "..." if len(query) > 40 else query
            print(f"'{display_query}' -> {elapsed*1000:.1f}ms")

    # Calculate statistics
    avg_time = np.mean(query_times)
    min_time = np.min(query_times)
    max_time = np.max(query_times)

    if verbose:
        print("\nPerformance Summary:")
        print(f"  - Average query time: {avg_time*1000:.1f}ms")
        print(f"  - Min query time: {min_time*1000:.1f}ms")
        print(f"  - Max query time: {max_time*1000:.1f}ms")

    return {
        'query_times': query_times,
        'avg_ms': avg_time * 1000,
        'min_ms': min_time * 1000,
        'max_ms': max_time * 1000,
        'total_queries': len(test_queries)
    }


def format_benchmark_results(results: Dict[str, float]) -> str:
    """
    Format benchmark results as a readable string.

    Args:
        results: Dictionary from benchmark_queries()

    Returns:
        Formatted string with benchmark results
    """
    return f"""Performance Benchmark Results:
  - Queries tested: {results['total_queries']}
  - Average time: {results['avg_ms']:.1f}ms
  - Min time: {results['min_ms']:.1f}ms
  - Max time: {results['max_ms']:.1f}ms
  - Consistency: {'Good' if results['max_ms'] - results['min_ms'] < 50 else 'Variable'}"""

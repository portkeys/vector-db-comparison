"""Date and time utilities for vector database metadata."""

from datetime import datetime
from typing import Union


def parse_datetime_string(date_str: str) -> datetime:
    """
    Parse various datetime string formats.

    Args:
        date_str: Date string in various formats

    Returns:
        datetime object
    """
    # Common formats in the data
    formats = [
        "%Y-%m-%d %H:%M:%S.%f %z",  # 2025-10-16 14:09:00.000000 +00:00
        "%Y-%m-%d %H:%M:%S %z",      # 2025-10-16 14:09:00 +00:00
        "%Y-%m-%dT%H:%M:%S.%fZ",     # 2025-10-16T14:09:00.000000Z
        "%Y-%m-%dT%H:%M:%SZ",        # 2025-10-16T14:09:00Z
        "%Y-%m-%d %H:%M:%S.%f",      # 2025-10-16 14:09:00.000000
        "%Y-%m-%d %H:%M:%S",         # 2025-10-16 14:09:00
        "%Y-%m-%d",                  # 2025-10-16
    ]

    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue

    raise ValueError(f"Could not parse date string: {date_str}")


def datetime_to_timestamp(dt: Union[datetime, str]) -> int:
    """
    Convert datetime to Unix timestamp (integer).

    Args:
        dt: datetime object or date string

    Returns:
        Unix timestamp as integer
    """
    if isinstance(dt, str):
        dt = parse_datetime_string(dt)

    return int(dt.timestamp())


def date_string_to_timestamp(date_str: str) -> int:
    """
    Convert date string to Unix timestamp for database queries.

    Args:
        date_str: Date string (e.g., "2025-10-16" or "2025-10-16 14:09:00")

    Returns:
        Unix timestamp as integer
    """
    dt = parse_datetime_string(date_str)
    return int(dt.timestamp())


def timestamp_to_datetime_string(timestamp: int, format: str = "%Y-%m-%d %H:%M:%S") -> str:
    """
    Convert Unix timestamp back to datetime string.

    Args:
        timestamp: Unix timestamp
        format: Output format string

    Returns:
        Formatted datetime string
    """
    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime(format)


def prepare_date_for_db(date_value: Union[str, datetime, int], db_type: str = "generic") -> Union[str, int, datetime]:
    """
    Prepare date value for specific database type.

    Args:
        date_value: Date as string, datetime, or timestamp
        db_type: Database type
            - "chroma": Returns timestamp (int) - only supports numeric comparisons
            - "pinecone": Returns timestamp (int) - only supports numeric comparisons
            - "milvus": Returns timestamp (int) - only supports numeric comparisons
            - "qdrant": Returns datetime object - native datetime support
            - "weaviate": Returns datetime object - native datetime support
            - "generic": Returns datetime object for maximum flexibility

    Returns:
        Date in appropriate format for the database
    """
    if db_type in ["chroma", "pinecone", "milvus"]:
        # These DBs need numeric timestamps for range queries
        if isinstance(date_value, int):
            return date_value
        elif isinstance(date_value, str):
            return date_string_to_timestamp(date_value)
        elif isinstance(date_value, datetime):
            return datetime_to_timestamp(date_value)

    # For Qdrant, Weaviate, and generic: return native datetime object
    if db_type in ["qdrant", "weaviate", "generic"]:
        if isinstance(date_value, datetime):
            return date_value
        elif isinstance(date_value, str):
            return parse_datetime_string(date_value)
        elif isinstance(date_value, int):
            return datetime.fromtimestamp(date_value)

    # Fallback to string
    if isinstance(date_value, datetime):
        return date_value.strftime("%Y-%m-%d %H:%M:%S")
    return str(date_value)

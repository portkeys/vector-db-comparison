import { Zap, Database, DollarSign, TrendingUp } from 'lucide-react';

const VectorDBComparison = () => {

  // Real benchmark data from testing (100 articles, 5 standardized queries)
  const performanceData = [
    { name: 'Milvus/Zilliz', avgMs: 50.7, color: 'bg-purple-500' },
    { name: 'Weaviate', avgMs: 51.7, color: 'bg-blue-500' },
    { name: 'Qdrant', avgMs: 73.1, color: 'bg-red-500' },
    { name: 'Pinecone', avgMs: 106.3, color: 'bg-green-500' },
    { name: 'Chroma', avgMs: 275.4, color: 'bg-yellow-500' }
  ];

  const maxMs = Math.max(...performanceData.map(d => d.avgMs));

  const databases = [
    {
      name: 'Chroma',
      logo: '🔵🔴🟡',
      users: 'Weights & Biases',
      hybridSearch: 'limited',
      metadataFiltering: 'good',
      schemaFlexibility: 'excellent',
      implementationEase: 'excellent',
      freeTier: 'Yes - $5 free credits, 5GB storage, 2.5M vCUs',
      productionCost: '$139/mo',
      costCalculator: 'https://www.trychroma.com/pricing',
      costDetails: '1M docs @ 1536-dim: $139/mo (1M writes, 1M queries)',
      performance: 275.4,
      rank: 5
    },
    {
      name: 'Milvus/Zilliz',
      logo: '👁️',
      users: 'eBay, Walmart, Salesforce, PayPal, 300+ enterprises',
      hybridSearch: 'limited',
      metadataFiltering: 'good',
      schemaFlexibility: 'good',
      implementationEase: 'good',
      freeTier: 'Yes - Free tier (5GB, 2.5M vCUs)',
      productionCost: '$115/mo',
      costCalculator: 'https://zilliz.com/pricing#calculator',
      costDetails: '1M vectors @ 1536-dim: $114.77/mo (Zilliz Cloud)',
      performance: 50.7,
      rank: 1
    },
    {
      name: 'Pinecone',
      logo: '🌲',
      users: 'Shopify, Gong, Microsoft, Notion',
      hybridSearch: 'limited',
      metadataFiltering: 'limited',
      schemaFlexibility: 'poor',
      implementationEase: 'excellent',
      freeTier: 'Yes - Starter: 2GB storage, 2M write units, 1M read units/mo',
      productionCost: '$30/mo',
      costCalculator: 'https://www.pinecone.io/pricing/estimate/',
      costDetails: '1M vectors @ 1536-dim: $30/mo (Serverless)',
      performance: 106.3,
      rank: 4
    },
    {
      name: 'Weaviate',
      logo: '🌊',
      users: 'Red Hat, Stack Overflow, Red Bull',
      hybridSearch: 'excellent',
      metadataFiltering: 'excellent',
      schemaFlexibility: 'good',
      implementationEase: 'good',
      freeTier: 'Yes - 14-day free trial (Serverless)',
      productionCost: '$160/mo',
      costCalculator: 'https://weaviate.io/pricing/serverless',
      costDetails: '1M vectors @ 1536-dim: $160/mo (Serverless Cloud)',
      performance: 51.7,
      rank: 2
    },
    {
      name: 'Qdrant',
      logo: '⚡',
      users: 'Tripadvisor, Hubspot, Disney Plus',
      hybridSearch: 'good',
      metadataFiltering: 'excellent',
      schemaFlexibility: 'excellent',
      implementationEase: 'good',
      freeTier: 'Yes - 1GB free forever cluster',
      productionCost: '$103/mo',
      costCalculator: 'https://cloud.qdrant.io/calculator',
      costDetails: '1M vectors @ 1536-dim: $102.51/mo (pod-based, AWS us-west-2)',
      performance: 73.1,
      rank: 3
    }
  ];

  const realWorldInsights = [
    {
      title: 'Fastest Query Performance',
      winner: 'Milvus/Zilliz Cloud',
      emoji: '🏆',
      detail: '50.7ms average - AUTOINDEX optimization delivers enterprise-grade speed with zero manual tuning',
      metric: '5.4x faster than Chroma'
    },
    {
      title: 'Best Developer Experience',
      winner: 'Weaviate',
      emoji: '💻',
      detail: 'Native datetime support, flexible schema, GraphQL API. 51.7ms queries with excellent filtering',
      metric: 'index_filterable & index_range_filterable make filtering seamless'
    },
    {
      title: 'Most Cost-Effective',
      winner: 'Chroma',
      emoji: '💰',
      detail: '$5-10/mo for 1M vectors. Schema-less metadata, built-in embedding management, generous free tier',
      metric: 'Best for prototypes and small-scale deployments'
    },
    {
      title: 'Best Metadata Flexibility',
      winner: 'Qdrant',
      emoji: '🔧',
      detail: 'Schema-less JSON payloads. Add any metadata field anytime without rebuilding. Dynamic payload indexes',
      metric: 'Zero downtime schema evolution'
    },
    {
      title: 'Easiest Deployment',
      winner: 'Pinecone',
      emoji: '⚡',
      detail: 'Gen-2 serverless auto-configures everything. No index tuning, no loading, no maintenance',
      metric: '2-minute setup to production'
    }
  ];

  const testingSetup = {
    dataset: '100 articles (outdoor/travel content)',
    embeddings: 'sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)',
    queries: '5 standardized test queries',
    filters: 'Category, date range, boolean (evergreen), combined filters',
    metric: 'COSINE similarity'
  };

  const renderQuality = (quality: string) => {
    const badges: { [key: string]: JSX.Element } = {
      'excellent': <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Excellent</span>,
      'good': <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Good</span>,
      'limited': <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">Limited</span>,
      'poor': <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">Poor</span>
    };
    return badges[quality.toLowerCase()] || null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Managed Embedding Databases
        <span className="block text-lg text-gray-600 mt-2 font-normal">2025 October Edition - Real-World Testing</span>
      </h1>

      {/* Performance Benchmark Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg border-2 border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Performance Benchmark Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Test Configuration
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Dataset:</strong> {testingSetup.dataset}</p>
              <p><strong>Embedding Model:</strong> {testingSetup.embeddings}</p>
              <p><strong>Test Queries:</strong> {testingSetup.queries}</p>
              <p><strong>Filters Tested:</strong> {testingSetup.filters}</p>
              <p><strong>Distance Metric:</strong> {testingSetup.metric}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Findings
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>✅ <strong>Milvus AUTOINDEX</strong> delivers fastest queries (50.7ms)</p>
              <p>✅ <strong>Weaviate</strong> close second with best schema flexibility (51.7ms)</p>
              <p>✅ <strong>Qdrant</strong> excellent balance of speed & features (73.1ms)</p>
              <p>⚠️ <strong>Chroma</strong> slower but easiest setup (275.4ms)</p>
              <p>📊 <strong>5.4x performance gap</strong> between fastest and slowest</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-4">Average Query Time (Lower is Better)</h3>
          <div className="space-y-3">
            {performanceData.map((db, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-32 text-sm font-medium text-gray-700">{db.name}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className={`${db.color} h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500`}
                    style={{ width: `${(db.avgMs / maxMs) * 100}%` }}
                  >
                    {db.avgMs.toFixed(1)}ms
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">
            * Tested on managed cloud tiers with 100 articles. Performance may vary with dataset size and configuration.
          </p>
        </div>
      </div>

      {/* Real-World Insights */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Testing Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {realWorldInsights.map((insight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{insight.emoji}</span>
                <h3 className="font-bold text-gray-900 text-sm">{insight.title}</h3>
              </div>
              <p className="text-lg font-semibold text-indigo-600 mb-2">{insight.winner}</p>
              <p className="text-sm text-gray-700 mb-2">{insight.detail}</p>
              <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded">{insight.metric}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vector DB</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Query Speed</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prominent Users</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hybrid Search</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Metadata Filtering</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Schema Flexibility</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Ease of Use</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Free Tier</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cost (1M @ 1536-dim)</th>
            </tr>
          </thead>
          <tbody>
            {databases.map((db, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{db.logo}</span>
                    <span className="font-semibold text-gray-900">{db.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  {db.performance ? (
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg text-gray-900">{db.performance}ms</span>
                      {db.rank && (
                        <span className="text-xs text-gray-500">
                          {db.rank === 1 ? '🥇 Fastest' : db.rank === 2 ? '🥈 2nd' : db.rank === 3 ? '🥉 3rd' : `#${db.rank}`}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Not tested</span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{db.users}</td>
                <td className="px-4 py-4 text-center">{renderQuality(db.hybridSearch)}</td>
                <td className="px-4 py-4 text-center">{renderQuality(db.metadataFiltering)}</td>
                <td className="px-4 py-4 text-center">{renderQuality(db.schemaFlexibility)}</td>
                <td className="px-4 py-4 text-center">{renderQuality(db.implementationEase)}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{db.freeTier}</td>
                <td className="px-4 py-4 text-sm font-medium">
                  <a href={db.costCalculator} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                    {db.productionCost}
                  </a>
                  <div className="text-xs text-gray-500 mt-1">{db.costDetails}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-600 justify-center bg-gray-50 p-4 rounded-lg">
        <div className="font-semibold text-gray-700">Legend:</div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 font-semibold rounded">Excellent</span>
          <span>Best-in-class</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 font-semibold rounded">Good</span>
          <span>Solid choice</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 font-semibold rounded">Limited</span>
          <span>Requires workarounds</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-red-100 text-red-800 font-semibold rounded">Poor</span>
          <span>Major limitations</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">📚 Feature Definitions - What Really Matters in Production</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <p><strong>⚡ Query Speed:</strong> Average query time from real-world testing with 100 articles and 5 standardized queries. Includes embedding generation and result retrieval. Critical for user experience.</p>

          <p><strong>🔀 Hybrid Search:</strong> Combining vector similarity (semantic) with keyword search (BM25/TF-IDF). Implementation approaches:
            <br/>• <strong>🟢 Integrated (Weaviate):</strong> Single API call handles everything - sparse/dense vector creation, querying, and fusion. Easiest to use.
            <br/>• <strong>🔵 Middle Ground (Qdrant):</strong> Supports both vectors in one system but you manage the combination logic. More control, more code.
            <br/>• <strong>🟠 Manual (Pinecone, Chroma, Milvus):</strong> Create sparse and dense vectors separately, query both systems, merge and re-rank results yourself. Most granular control, most code.
            <br/>• <em>Example use case:</em> "Python developer in San Francisco" needs both semantic job matching AND exact location keywords.</p>

          <p><strong>🏷️ Metadata Filtering:</strong> The most overlooked feature during prototyping but crucial for production. Includes:
            <br/>• <strong>Data type support:</strong> Only Weaviate and Qdrant support native datetime and geolocation. Others require workarounds (timestamps, coordinate pairs).
            <br/>• <strong>Filtering strategies:</strong> Pre-filtering (filter before vector search), post-filtering (filter after), or metadata-aware HNSW (Weaviate's approach - fastest).
            <br/>• <strong>Performance impact:</strong> Post-filtering can require retrieving 10x more results internally. Pre-filtering is more efficient but not all DBs support it well.</p>

          <p><strong>🔧 Schema Flexibility:</strong> Your data WILL evolve. Can you add new metadata fields without rebuilding?
            <br/>• <strong>🟢 Excellent:</strong> Qdrant (schema-less JSON), Chroma (add any field anytime)
            <br/>• <strong>🔵 Good:</strong> Weaviate (can add fields, may need re-indexing), Milvus (dynamic fields via $meta)
            <br/>• <strong>🔴 Poor:</strong> Pinecone Serverless (must declare ALL filterable fields at index creation - cannot change later without full rebuild)</p>

          <p><strong>💻 Ease of Use:</strong> Developer experience matters. Evaluated on:
            <br/>• <strong>Free tier availability:</strong> Can you test without a credit card?
            <br/>• <strong>Documentation quality:</strong> Clear examples, troubleshooting guides
            <br/>• <strong>Code complexity:</strong> Lines of code needed for basic operations (from our Jupyter notebooks)
            <br/>• <strong>Setup time:</strong> Minutes to first query</p>

          <p><strong>💰 Cost:</strong> Real pricing for 1M vectors @ 1536 dimensions (OpenAI ada-002 embedding size). Calculated using each provider's official cost estimator. Click the cost to see the calculator. Costs can vary 5x between providers for the same workload.</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">⚠️ Critical Lesson: Metadata Schema Flexibility</h3>
        <p className="text-sm text-gray-700 mb-3">
          <strong>Real-world problem:</strong> When migrating 1M vectors from Pinecone pod-based to serverless, we discovered you <strong>MUST</strong> define which metadata fields to index at creation time. After migration, adding new metadata fields (geo-location, time-based filtering, categories) for filtering was impossible without rebuilding the entire index.
        </p>
        <div className="text-sm text-gray-700">
          <p className="font-semibold mb-2">How each database handles adding metadata fields dynamically:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">❌</span>
              <div><strong>Pinecone Serverless:</strong> Metadata fields for indexing MUST be declared at index/namespace creation. <span className="text-red-600 font-semibold">Cannot add indexed fields later</span>. Requires complete rebuild to change schema.</div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">⚠️</span>
              <div><strong>Weaviate:</strong> Can add properties to schema after creation, but new properties won't be indexed for existing objects. May need re-indexing or collection recreation for full functionality.</div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✅</span>
              <div><strong>Qdrant:</strong> Schema-less payload (JSON). Add any metadata fields anytime. Create payload indexes on new fields dynamically without rebuilding. Most flexible approach. <em className="text-green-700">(Verified in testing: 73.1ms avg query time)</em></div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✅</span>
              <div><strong>Milvus:</strong> Dynamic field feature ($meta JSON field) allows adding undefined fields. Can also add static fields to existing collections (v2.6+). New fields must be nullable for existing entities. <em className="text-green-700">(Verified in testing: 50.7ms avg query time with AUTOINDEX)</em></div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✅</span>
              <div><strong>Chroma:</strong> Schema-less metadata storage. Add any metadata fields at insertion time without pre-declaration. Flexible for evolving schemas. <em className="text-green-700">(Verified in testing)</em></div>
            </li>
          </ul>
          <p className="mt-3 p-3 bg-amber-100 rounded border border-amber-300 font-semibold text-gray-800">
            💡 <strong>Recommendation:</strong> Always enable dynamic fields/schema-less mode when creating collections, even if you know your initial schema. For Pinecone Serverless, plan ALL possible metadata fields upfront or risk costly rebuilds later.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">🔍 Testing Methodology & Learnings</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <p className="font-semibold mb-1">What We Tested:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Basic semantic search:</strong> Vector similarity without filters</li>
              <li><strong>Metadata filtering:</strong> Category filters (exact match)</li>
              <li><strong>Date range filtering:</strong> Timestamp/datetime comparisons ({'>'}=, {'<'}=)</li>
              <li><strong>Boolean filtering:</strong> Evergreen flag (true/false)</li>
              <li><strong>Combined filters:</strong> Multiple conditions with AND/OR logic</li>
              <li><strong>Batch insertion:</strong> 20 articles per batch, 100 total articles</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">Key Discoveries:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Milvus AUTOINDEX:</strong> Zero manual tuning, enterprise performance. No need for HNSW parameter optimization on Zilliz Cloud.</li>
              <li><strong>Weaviate datetime:</strong> DATE type supports full RFC 3339 datetime (not just dates). Requires index_range_filterable for date comparisons.</li>
              <li><strong>Qdrant filters:</strong> Uses dictionary-based filters (not class objects). Native datetime support with proper timezone handling.</li>
              <li><strong>Pinecone metadata indexing:</strong> Currently in early access (Oct 2025). Default filtering works but lacks custom indexing optimization.</li>
              <li><strong>Chroma schema-less:</strong> Most flexible metadata, but trades off query speed for simplicity. Great for prototypes.</li>
              <li><strong>Performance vs. Dataset Size:</strong> These benchmarks are on 100 articles. Results may vary significantly with millions of vectors.</li>
            </ul>
          </div>
          <div className="p-3 bg-purple-100 rounded border border-purple-300">
            <p className="font-semibold text-purple-900">💡 Developer Tip:</p>
            <p className="text-purple-800 mt-1">
              All databases support upsert operations (insert or update). Use upsert instead of insert for idempotent data loading - it allows re-running scripts without duplicate key errors and enables easy data updates.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Cost Comparison Summary (1M vectors @ 1536-dim)
        </h3>
        <p className="text-xs text-gray-600 mb-3">Based on official cost calculators from each provider. Actual costs may vary with usage patterns.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="font-semibold text-green-900">💰 Most Affordable</p>
            <p className="text-green-800 mt-1"><strong>Pinecone Serverless:</strong> $30/mo</p>
            <p className="text-xs text-green-700 mt-1">⚠️ But poor schema flexibility - plan all fields upfront!</p>
          </div>
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <p className="font-semibold text-blue-900">⚖️ Best Balance</p>
            <p className="text-blue-800 mt-1"><strong>Qdrant:</strong> $103/mo</p>
            <p className="text-blue-800 mt-1"><strong>Milvus/Zilliz:</strong> $115/mo</p>
            <p className="text-xs text-blue-700 mt-1">Great performance + excellent flexibility + reasonable cost</p>
          </div>
          <div className="bg-orange-50 p-3 rounded border border-orange-200">
            <p className="font-semibold text-orange-900">📈 Higher Cost Range</p>
            <p className="text-orange-800 mt-1"><strong>Chroma:</strong> $139/mo</p>
            <p className="text-orange-800 mt-1"><strong>Weaviate:</strong> $160/mo</p>
            <p className="text-xs text-orange-700 mt-1">Note: Weaviate has native datetime/geo. Chroma doesn't but offers excellent schema flexibility</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">💡 Cost can vary 5x between providers. Always use official calculators for your specific workload. Click cost links in table above.</p>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
        <p>Last updated: October 2025 | Testing performed on managed cloud instances with free/starter tiers</p>
        <p className="mt-1">Benchmark source code and Jupyter notebooks available for reproducibility</p>
      </div>
    </div>
  );
};

export default VectorDBComparison;

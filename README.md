# 🔍 Vizzy-Search

A lightweight, performant fuzzy search library for React with built-in memoization using Levenshtein distance.

## Features

- 🚀 **Fast & Efficient** - Optimized with React's `useMemo` for performance
- 🎯 **Configurable** - Adjustable threshold, limit, and case sensitivity
- 📦 **Lightweight** - Minimal dependencies, TypeScript support
- 🔧 **Simple API** - Easy to integrate with existing React apps

## Installation

```bash
npm install vizzy-search
```

## Quick Start

```jsx
import { useFuzzySearch } from 'vizzy-search';

function SearchComponent() {
  const [query, setQuery] = useState('');
  
  const items = ['Batman', 'Superman', 'Spiderman', 'Iron Man'];
  
  const { search } = useFuzzySearch(items, {
    threshold: 0.6,    // 0-1, lower = more strict
    limit: 10,         // max results
    caseSensitive: false
  });
  
  const results = search(query);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search heroes..."
      />
      {results.map(result => (
        <div key={result.item}>
          {result.item} - Score: {result.score.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
```

## API

### `useFuzzySearch(items, options)`

**Parameters:**
- `items` - Array of strings to search through
- `options` - Configuration object

**Options:**
- `threshold` (number, default: 0.6) - Match threshold (0-1)
- `limit` (number, optional) - Maximum number of results
- `caseSensitive` (boolean, default: false) - Case sensitive matching

**Returns:**
- `search(query)` - Function that returns array of `{ item, score, distance }`

## Direct Levenshtein

```jsx
import { levenshtein } from 'vizzy-search';

const distance = levenshtein('batman', 'batmann'); // Returns: 1
```

## License

MIT © [Visalan-H](https://github.com/Visalan-H)

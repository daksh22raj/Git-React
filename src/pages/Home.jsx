import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import UserCard from "../components/UserCard";

export default function Home({ setSelectedUser }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(query);

  const { data, loading } = useFetch(
    debounced
      ? `https://api.github.com/search/users?q=${debounced}&page=${page}&per_page=12`
      : null
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // reset page on new search
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span>⚡</span> Live GitHub API
        </div>
        <h1>Discover GitHub Developers</h1>
        <p>Search millions of GitHub users and explore their open-source repositories instantly.</p>

        {/* Search */}
        <div className="search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="user-search"
            className="search"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search GitHub users…"
            autoComplete="off"
            autoFocus
          />
        </div>
      </section>

      <div className="container">
        {/* Landing state */}
        {!debounced && !loading && (
          <div className="landing-hint">
            <div className="hint-icon">👆</div>
            <p>Start typing to search GitHub users</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loader-container">
            <div className="spinner" />
            <span>Searching users…</span>
          </div>
        )}

        {/* Results */}
        {debounced && !loading && (
          <>
            {data.length > 0 && (
              <div className="section-header">
                <span className="section-title">Search Results</span>
                <span className="results-count">{data.length} users found</span>
              </div>
            )}

            {data.length === 0 ? (
              <div className="empty-box">
                <div className="empty-icon">🔍</div>
                <p>No users found for "<strong>{debounced}</strong>"</p>
                <span>Try a different username or keyword</span>
              </div>
            ) : (
              <div className="grid">
                {data.map((u) => (
                  <UserCard key={u.id} user={u} onClick={setSelectedUser} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data.length > 0 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  ← Prev
                </button>
                <span className="page-indicator">Page {page}</span>
                <button
                  className="page-btn"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

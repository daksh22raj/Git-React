import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import RepoCard from "../components/RepoCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";

export default function UserDetails({ username, goBack }) {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [reposRes, userRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}/repos?per_page=100`),
          axios.get(`https://api.github.com/users/${username}`),
        ]);
        setRepos(reposRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const languages = useMemo(() => {
    const langs = repos.map((r) => r.language).filter(Boolean);
    return [...new Set(langs)].sort();
  }, [repos]);

  const processedRepos = useMemo(() => {
    let result = [...repos];
    if (language) result = result.filter((r) => r.language === language);
    if (sort === "stars") result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === "forks") result.sort((a, b) => b.forks_count - a.forks_count);
    else if (sort === "updated") result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return result;
  }, [repos, sort, language]);

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      {/* Back */}
      <button className="back-btn" onClick={goBack}>
        ← Back to Search
      </button>

      {user && (
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={user.avatar_url}
            alt={user.login}
          />
          <div className="profile-info">
            <h2>{user.name || user.login}</h2>
            <div className="profile-handle">@{user.login}</div>
            {user.bio && (
              <p style={{ marginTop: 8, fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {user.bio}
              </p>
            )}
            <div style={{ display: "flex", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                ⭐ <strong style={{ color: "var(--text)" }}>{user.public_repos}</strong> repos
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                👥 <strong style={{ color: "var(--text)" }}>{user.followers}</strong> followers
              </span>
              {user.location && (
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  📍 {user.location}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="controls">
        <select
          id="sort-select"
          className="control-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="stars">⭐ Most Stars</option>
          <option value="forks">🍴 Most Forks</option>
          <option value="updated">🕐 Recently Updated</option>
        </select>

        <select
          id="lang-select"
          className="control-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        {(sort || language) && (
          <button
            className="page-btn"
            onClick={() => { setSort(""); setLanguage(""); }}
            style={{ fontSize: "0.8rem" }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {!loading && processedRepos.length > 0 && (
        <div className="section-header">
          <span className="section-title">Repositories</span>
          <span className="results-count">{processedRepos.length} repos</span>
        </div>
      )}

      {loading && <Loader />}
      {error && <Error message={error} />}
      {!loading && !error && processedRepos.length === 0 && repos.length > 0 && (
        <Empty message="No repos match the selected filter." />
      )}
      {!loading && !error && repos.length === 0 && !loading && (
        <Empty message="This user has no public repositories." />
      )}

      <div className="grid">
        {processedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
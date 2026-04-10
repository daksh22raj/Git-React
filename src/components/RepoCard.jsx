// Language → color mapping (GitHub-style)
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Rust: "#dea584",
  Go: "#00ADD8",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export default function RepoCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || "#8b949e";

  return (
    <div className="repo-card">
      
      <div className="repo-name">
        <svg
          className="repo-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v18H3z" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {repo.name}
        </a>
      </div>

     
      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

     
      <div className="repo-meta">
        {repo.language && (
          <span className="repo-stat" style={{ gap: 6 }}>
            <span
              className="repo-lang-dot"
              style={{ background: langColor }}
            />
            <span className="repo-lang">{repo.language}</span>
          </span>
        )}

        <span className="repo-stat stars">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {repo.stargazers_count.toLocaleString()}
        </span>

        <span className="repo-stat forks">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="18" r="3"/>
            <circle cx="6" cy="6" r="3"/>
            <circle cx="18" cy="6" r="3"/>
            <path d="M18 9a9 9 0 0 1-9 9M6 9a9 9 0 0 0 9 9"/>
          </svg>
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

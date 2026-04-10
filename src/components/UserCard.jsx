export default function UserCard({ user, onClick }) {
  return (
    <div
      className="user-card"
      onClick={() => onClick(user.login)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(user.login)}
      aria-label={`View ${user.login}'s repositories`}
    >
      <img
        className="user-avatar"
        src={user.avatar_url}
        alt={user.login}
        loading="lazy"
      />
      <div className="user-name">{user.login}</div>
      <div className="user-handle">@{user.login}</div>
      <div className="view-btn">View Repos →</div>
    </div>
  );
}

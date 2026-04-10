export default function Empty({ message }) {
  return (
    <div className="empty-box" role="status">
      <div className="empty-icon">🔍</div>
      <p>{message || "No results found"}</p>
      <span>Try adjusting your search or filters</span>
    </div>
  );
}
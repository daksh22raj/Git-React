export default function Error({ message }) {
  return (
    <div className="error-box" role="alert">
      <span style={{ fontSize: "1.2rem" }}>⚠️</span>
      <span>{message || "Something went wrong. Please try again."}</span>
    </div>
  );
}
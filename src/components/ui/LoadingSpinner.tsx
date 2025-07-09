export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-64" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

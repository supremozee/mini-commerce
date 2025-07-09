interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
}

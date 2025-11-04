export default function FailedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center">
      <h1 className="text-4xl font-bold text-red-700 mb-3">Payment Failed ❌</h1>
      <p className="text-lg text-gray-600 mb-6">Something went wrong. Please try again.</p>
      <a href="/pricing" className="text-primary underline">Back to Pricing</a>
    </div>
  );
}

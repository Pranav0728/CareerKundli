export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-3">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-600 mb-6">Welcome to Career Kundli Pro!</p>
      <a href="/" className="text-primary underline">Go to Dashboard</a>
    </div>
  );
}

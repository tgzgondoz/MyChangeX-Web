const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
    <div className="text-center text-white">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      <h1 className="text-4xl font-bold mt-6">MyChangeX</h1>
      <p className="text-lg mt-4">Loading your experience...</p>
    </div>
  </div>
);

export default LoadingScreen;
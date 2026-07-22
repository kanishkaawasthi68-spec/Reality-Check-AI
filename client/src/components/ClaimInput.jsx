function ClaimInput({
  claim,
  setClaim,
  error,
  loading,
  handleVerify,
}) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Verify Any Claim
      </h2>

      <p className="text-gray-500 mb-6">
        Paste any news, statement or URL and let AI verify it.
      </p>

      <textarea
        rows={5}
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="Example: The Taj Mahal is located in Delhi."
        className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {error && (
        <p className="mt-3 text-red-600 font-medium">
          {error}
        </p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "🔄 Verifying..." : "🔍 Verify Claim"}
      </button>
    </div>
  );
}

export default ClaimInput;
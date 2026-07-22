function ResultCard({ result }) {
  return (
    <div className="mt-10 bg-white border rounded-2xl shadow-lg p-6 text-left">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        AI Verification Result
      </h2>

      <div className="space-y-5">
        <div>
          <p className="font-semibold text-gray-700">✅ Verdict</p>

          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold text-white ${
              result.verdict?.toLowerCase().includes("true")
                ? "bg-green-600"
                : result.verdict?.toLowerCase().includes("false")
                ? "bg-red-600"
                : "bg-yellow-500"
            }`}
          >
            {result.verdict}
          </span>
        </div>

        <div>
          <p className="font-semibold text-gray-700">🎯 Confidence</p>

          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: result.confidence || "0%",
                }}
              ></div>
            </div>

            <p className="mt-2 font-medium">
              {result.confidence}
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700">📖 Reason</p>
          <p>{result.reason}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">🔗 Sources</p>

          <ul className="list-disc ml-6 mt-2">
            {result.sources?.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
import { useState } from 'react'
import axios from 'axios'

function Dashboard() {

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = async () => {

    if (!file) return

    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {

      const response = await axios.post(
        'http://localhost:8000/analyze',
        formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      )

      setResult(response.data)

    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Enterprise Incident Resolution Agent
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl">

        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0])
            }
          }}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {loading ? 'Analyzing...' : 'Analyze Incident'}
        </button>
      </div>

      {loading && (
        <div className="mt-10 space-y-2">
          <p>Analyzing incident...</p>
          <p>Parsing logs...</p>
          <p>Searching historical incidents...</p>
          <p>Generating recommendations...</p>
        </div>
      )}

      {result && (
        <div className="mt-10 bg-gray-900 p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4">
            RCA Report
          </h2>

          <div className="mb-6">
            <h3 className="font-bold text-green-400">Severity</h3>
            <p>{result.severity}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-red-400">Root Cause</h3>
            <p>{result.root_cause}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-yellow-400">
              Similar Incidents
            </h3>
            <p>{result.similar_incidents}</p>
          </div>

          <div>
            <h3 className="font-bold text-blue-400">
              Recommendations
            </h3>
            <p>{result.recommendations}</p>
          </div>

        </div>
      )}

    </div>
  )
}

export default Dashboard
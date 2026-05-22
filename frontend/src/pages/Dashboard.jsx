// import { useState } from 'react'
// import axios from 'axios'
//
// function Dashboard() {
//
//   const [file, setFile] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)
//
//   const handleUpload = async () => {
//
//     if (!file) return
//
//     setLoading(true)
//
//     const formData = new FormData()
//     formData.append('file', file)
//
//     try {
//
//       const response = await axios.post(
//         'http://localhost:8000/analyze',
//         formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//       )
//
//       setResult(response.data)
//
//     } catch (error) {
//       console.error(error)
//     }
//
//     setLoading(false)
//   }
//
//   return (
//     <div className="min-h-screen bg-black text-white p-10">
//
//       <h1 className="text-4xl font-bold mb-10">
//         Enterprise Incident Resolution Agent
//       </h1>
//
//       <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl">
//
//         <input
//           type="file"
//           onChange={(e) => {
//             if (e.target.files && e.target.files[0]) {
//               setFile(e.target.files[0])
//             }
//           }}
//           className="mb-4"
//         />
//
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           {loading ? 'Analyzing...' : 'Analyze Incident'}
//         </button>
//       </div>
//
//       {loading && (
//         <div className="mt-10 space-y-2">
//           <p>Analyzing incident...</p>
//           <p>Parsing logs...</p>
//           <p>Searching historical incidents...</p>
//           <p>Generating recommendations...</p>
//         </div>
//       )}
//
//       {result && (
//         <div className="mt-10 bg-gray-900 p-6 rounded-xl">
//
//           <h2 className="text-2xl font-bold mb-4">
//             RCA Report
//           </h2>
//
//           <div className="mb-6">
//             <h3 className="font-bold text-green-400">Severity</h3>
//             <p>{result.severity}</p>
//           </div>
//
//           <div className="mb-6">
//             <h3 className="font-bold text-red-400">Root Cause</h3>
//             <p>{result.root_cause}</p>
//           </div>
//
//           <div className="mb-6">
//             <h3 className="font-bold text-yellow-400">
//               Similar Incidents
//             </h3>
//             <p>{result.similar_incidents}</p>
//           </div>
//
//           <div>
//             <h3 className="font-bold text-blue-400">
//               Recommendations
//             </h3>
//             <p>{result.recommendations}</p>
//           </div>
//
//         </div>
//       )}
//
//     </div>
//   )
// }
//
// export default Dashboard


import { useState } from 'react'
import axios from 'axios'
import {
  CheckCircle,
  AlertTriangle,
  ServerCrash,
  BrainCircuit,
  ShieldAlert,
  Upload
} from 'lucide-react'

function Dashboard() {

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = async () => {

    if (!file) return

    setLoading(true)
    setResult(null)

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

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3 text-cyan-400">
          AI Incident Response System
        </h1>

        <p className="text-gray-400 text-lg">
          Enterprise Agentic AI Platform for Incident Analysis & RCA
        </p>

      </div>

      {/* Upload Section */}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10 shadow-2xl">

        <div className="flex items-center gap-3 mb-6">

          <Upload className="text-cyan-400" />

          <h2 className="text-2xl font-semibold">
            Upload Incident Logs
          </h2>

        </div>

        <input
          type="file"
          onChange={(e) => {

            if (e.target.files && e.target.files[0]) {

              setFile(e.target.files[0])

            }

          }}
          className="mb-6 block w-full text-sm text-gray-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-cyan-600 file:text-white
          hover:file:bg-cyan-700"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
        >
          {loading ? 'Analyzing Incident...' : 'Analyze Incident'}
        </button>

      </div>

      {/* Agent Execution Flow */}

      {loading && (

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">

            <BrainCircuit className="text-purple-400" />

            <h2 className="text-2xl font-semibold text-purple-400">
              Agent Execution Flow
            </h2>

          </div>

          <div className="space-y-4 text-lg">

            <div className="animate-pulse">
              ⏳ Incident Classification Agent Running...
            </div>

            <div className="animate-pulse">
              ⏳ Log Analysis Agent Running...
            </div>

            <div className="animate-pulse">
              ⏳ Retrieval Agent Searching Historical Incidents...
            </div>

            <div className="animate-pulse">
              ⏳ Recommendation Agent Generating Fixes...
            </div>

          </div>

        </div>

      )}

      {/* RCA Results */}

      {result && (

        <div className="space-y-8">

          {/* Top Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Severity */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">

              <div className="flex items-center gap-3 mb-4">

                <AlertTriangle className="text-red-400" />

                <h3 className="text-xl font-bold text-red-400">
                  Severity
                </h3>

              </div>

              <p className="text-2xl font-semibold">
                {result.severity}
              </p>

            </div>

            {/* Impacted System */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">

              <div className="flex items-center gap-3 mb-4">

                <ServerCrash className="text-cyan-400" />

                <h3 className="text-xl font-bold text-cyan-400">
                  Impacted System
                </h3>

              </div>

              <p className="text-2xl font-semibold">
                {result.impacted_system}
              </p>

            </div>

          </div>

          {/* Root Cause */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

            <div className="flex items-center gap-3 mb-5">

              <ShieldAlert className="text-yellow-400" />

              <h2 className="text-2xl font-bold text-yellow-400">
                Root Cause Analysis
              </h2>

            </div>

            <p className="text-lg leading-relaxed text-gray-300">
              {result.root_cause}
            </p>

          </div>

          {/* Bottom Grid */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Similar Incidents */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center gap-3 mb-5">

                <CheckCircle className="text-green-400" />

                <h2 className="text-2xl font-bold text-green-400">
                  Similar Incidents
                </h2>

              </div>

              <div className="space-y-3 text-gray-300">

                {Array.isArray(result.similar_incidents)
                  ? result.similar_incidents.map((incident, index) => (

                    <div
                      key={index}
                      className="bg-black/30 p-4 rounded-lg border border-gray-800"
                    >
                      {incident}
                    </div>

                  ))
                  : (
                    <p>{result.similar_incidents}</p>
                  )
                }

              </div>

            </div>

            {/* Recommendations */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center gap-3 mb-5">

                <BrainCircuit className="text-blue-400" />

                <h2 className="text-2xl font-bold text-blue-400">
                  Recommendations
                </h2>

              </div>

              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {result.recommendations}
              </p>

            </div>

          </div>

          {/* Agent Steps */}

          {result.steps && (

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold text-purple-400 mb-6">
                Agent Workflow Execution
              </h2>

              <div className="space-y-3">

                {result.steps.map((step, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 bg-black/30 p-4 rounded-lg border border-gray-800"
                  >
                    <CheckCircle className="text-green-400 w-5 h-5" />

                    <span>{step}</span>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  )
}

export default Dashboard
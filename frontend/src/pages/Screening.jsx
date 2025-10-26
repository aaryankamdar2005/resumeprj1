import { useState } from "react"
import axios from "axios"

export default function Screening() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState("No file selected")
  const backendurl = import.meta.env.VITE_BACKEND_URL

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload a resume file (.pdf or .docx)")
      return
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description")
      return
    }

    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append("resume", file)
    formData.append("jobDescription", jobDescription)

    try {
      const response = await axios.post(`${backendurl}/api/screen/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      })

      if (response.data.process) {
        const text = response.data.process

        const extractMultiLine = (label, text) => {
          const regex = new RegExp(`\\*\\*${label}:\\*\\*([\\s\\S]*?)(?=\\*\\*\\w+:\\*\\*|$)`, "i")
          const match = text.match(regex)
          return match ? match[1].trim() : "Not Provided"
        }

        const extractSingleLine = (label, text) => {
          const regex = new RegExp(`\\*\\*${label}:\\*\\* ([^\\n]*)`, "i")
          const match = text.match(regex)
          return match ? match[1].trim() : "Not Provided"
        }

        const feedbackSection = text.split("**Constructive Feedback:**")[1] || ""
        const feedbackItems = feedbackSection
          .split(/\d+\.|\+|-/)
          .filter((item) => item.trim().length > 0)
          .map((item) => item.trim())

        const scoreRegex = /\*\*Match Score:\*\* (\d+)/i
        const scoreMatch = text.match(scoreRegex)
        const matchScore = scoreMatch ? Number.parseInt(scoreMatch[1]) : 0

        setResult({
          name: extractSingleLine("Name", text),
          contact: extractMultiLine("Contact Info", text),
          skills: extractMultiLine("Skills", text),
          experience: extractMultiLine("Experience", text),
          education: extractMultiLine("Education", text),
          certifications: extractMultiLine("Certifications", text),
          summary: extractMultiLine("Summary", text),
          matchScore: matchScore,
          constructiveFeedback: feedbackItems,
          rawResponse: text,
        })
      } else {
        setError("The response doesn't contain the expected data format")
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to process resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-gray-900">
            Resume <span className="font-semibold">Screening</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 font-light">
            Analyze your resume against job descriptions with AI
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload & Analyze</h2>

            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Resume File</label>
                <label className="flex flex-col items-center justify-center w-full px-6 py-12 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition group">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-700 font-medium">{fileName}</p>
                  <p className="text-xs text-gray-500 mt-1 font-light">PDF or DOCX</p>
                  <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition h-48 resize-none font-light"
                  placeholder="Paste the job description here..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded-full font-medium text-sm transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>

              <div className="space-y-6">
                {/* Match Score */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-900">Match Score</span>
                    <span
                      className={`text-2xl font-bold ${
                        result.matchScore < 50
                          ? "text-red-600"
                          : result.matchScore < 70
                            ? "text-yellow-600"
                            : result.matchScore < 90
                              ? "text-blue-600"
                              : "text-green-600"
                      }`}
                    >
                      {result.matchScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        result.matchScore < 50
                          ? "bg-red-500"
                          : result.matchScore < 70
                            ? "bg-yellow-500"
                            : result.matchScore < 90
                              ? "bg-blue-500"
                              : "bg-green-500"
                      }`}
                      style={{ width: `${result.matchScore}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-light">
                    {result.matchScore < 50
                      ? "Low Match"
                      : result.matchScore < 70
                        ? "Moderate Match"
                        : result.matchScore < 90
                          ? "Good Match"
                          : "Excellent Match"}
                  </p>
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Constructive Feedback</h3>
                  <ul className="space-y-2">
                    {result.constructiveFeedback.length > 0 ? (
                      result.constructiveFeedback.map((point, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start font-light">
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500 font-light">No specific feedback provided</li>
                    )}
                  </ul>
                </div>

                {/* Export Button */}
                <button
                  onClick={() => {
                    const element = document.createElement("a")
                    const file = new Blob([JSON.stringify(result, null, 2)], { type: "text/plain" })
                    element.href = URL.createObjectURL(file)
                    element.download = "resume-analysis.json"
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}
                  className="w-full py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full transition text-sm font-medium"
                >
                  Export Analysis
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-sm font-medium text-gray-900">No analysis yet</h3>
                <p className="mt-1 text-sm text-gray-500 font-light">
                  Upload a resume to see results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

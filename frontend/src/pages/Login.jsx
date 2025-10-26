import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Formcontext } from "../Formcontext/Formcontext"

const Login = () => {
  const navigate = useNavigate()
  const { setCookieToken } = useContext(Formcontext)
  const backendurl = import.meta.env.VITE_BACKEND_URL

  const [login, setLogin] = useState("Login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (login === "Signup") {
        const response = await axios.post(backendurl + "/api/user/signup", { name, email, password })
        if (response.data.success) {
          localStorage.setItem("authtoken", response.data.token)
          setCookieToken(response.data.token)
          navigate("/create")
        }
      } else {
        const response = await axios.post(backendurl + "/api/user/login", { email, password })
        if (response.data.success) {
          localStorage.setItem("authtoken", response.data.token)
          setCookieToken(response.data.token)
          navigate("/create")
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl">ResumeBuilder</span>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {login === "Signup" ? (
              <>
                Create your <span className="font-semibold">account</span>
              </>
            ) : (
              <>
                Welcome <span className="font-semibold">back</span>
              </>
            )}
          </h1>
          <p className="text-gray-600 text-sm font-light">
            {login === "Signup" ? "Start building professional resumes today" : "Sign in to continue"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {login === "Signup" && (
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-2">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition font-light"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition font-light"
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition font-light"
                placeholder="••••••••"
                type="password"
              />
            </div>

            {login === "Login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
                  <span className="ml-2 text-sm text-gray-600 font-light">Remember me</span>
                </label>
                <button type="button" className="text-sm text-gray-600 hover:text-gray-900 transition font-light">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition duration-200"
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
                  Processing...
                </span>
              ) : (
                login
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center font-light">
              {login === "Signup" ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => {
                  setLogin(login === "Signup" ? "Login" : "Signup")
                  setError("")
                }}
                className="text-gray-900 hover:underline font-medium transition"
              >
                {login === "Signup" ? "Login" : "Sign up"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-xs text-gray-500 font-light">
          By continuing, you agree to our{" "}
          <a href="#" className="text-gray-900 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-900 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login

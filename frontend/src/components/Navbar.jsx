import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formcontext } from "@/Formcontext/Formcontext"

const Navbar = () => {
  const navigate = useNavigate()
  const context = useContext(Formcontext)
  const { setCookieToken, cookieToken } = context || { setCookieToken: () => {}, cookieToken: null }
  const [isTokenAvailable, setIsTokenAvailable] = useState(false)
  const [login, setLogin] = useState("Login")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authtoken")
    if (token) {
      setIsTokenAvailable(true)
      setLogin("Logout")
    } else {
      setIsTokenAvailable(false)
      setLogin("Login")
    }
  }, [login, cookieToken])

  const logOut = () => {
    setCookieToken(null)
    localStorage.removeItem("authtoken")
    navigate("/login")
  }

  return (
    <nav className="w-full py-4 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-gray-900 font-semibold text-lg hidden sm:inline">ResumeBuilder</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <button 
          
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
          >
            Builder
          </button>
          <button 
           
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
          >
            Examples
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
            Templates
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
            Resources
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setVisible(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Login/Logout Button */}
          <button
            onClick={() => {
              if (login === "Login") {
                navigate("/login")
              } else {
                logOut()
              }
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {login}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <span className="text-gray-900 font-semibold text-lg">Menu</span>
              <button
                onClick={() => setVisible(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col p-4 gap-1">
              <button 
               
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                Builder
              </button>
              <button 
              
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                Examples
              </button>
              <button className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                Templates
              </button>
              <button className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

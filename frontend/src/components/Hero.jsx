import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* Minimalist Hero Section */}
      <section className="w-full min-h-screen px-4 md:px-8 py-20 bg-white relative overflow-hidden flex items-center">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content - 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              {/* Elegant Badge */}
              <div className="inline-flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="text-sm font-medium text-gray-700">Powered by AI</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight">
                  Build Your
                  <span className="block font-semibold mt-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Perfect Resume
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  A sophisticated AI-powered platform that helps you craft professional resumes that stand out. Simple, elegant, and effective.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/create")}
                  className="group inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Start Creating
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate("/screen")}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full transition-all duration-200"
                >
                  Screen 
                </button>
              </div>

              {/* Minimal Stats */}
              <div className="flex items-center gap-8 pt-8">
                {[
                  { value: "50K+", label: "Created" },
                  { value: "95%", label: "Success" },
                  { value: "2 min", label: "Average" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - 7 columns */}
            <div className="lg:col-span-7 relative">
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Features Section */}
      <section className="w-full px-4 md:px-8 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Everything you need,
              <span className="block font-semibold mt-2">nothing you don't</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Content",
                description: "Let AI help you write compelling content that highlights your strengths and achievements.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              },
              {
                title: "Professional Templates",
                description: "Choose from carefully crafted templates designed by hiring managers and recruiters.",
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              },
              {
                title: "Instant Download",
                description: "Export your resume as a high-quality PDF ready to send to employers in seconds.",
                icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 md:px-8 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">How it works</p>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                  Simple, fast,
                  <span className="block font-semibold mt-2">and effective</span>
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Enter Your Details", desc: "Tell us about your experience, education, and skills" },
                  { step: "02", title: "AI Enhancement", desc: "Our AI optimizes your content for maximum impact" },
                  { step: "03", title: "Download & Apply", desc: "Get your professional resume ready in minutes" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-900">{item.step}</span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/resume")}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started Now
              </button>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero

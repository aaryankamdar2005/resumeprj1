"use client"

import { useContext } from "react"
import { Formcontext } from "@/Formcontext/Formcontext"
import { jsPDF } from "jspdf"

const Form = () => {
  const context = useContext(Formcontext)
  const { formData, updateFormData } = context || { formData: {}, updateFormData: () => {} }

  const onsubmitHandle = (e) => {
    e.preventDefault()
  }

  const generatePdf = async () => {
    try {
      const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
      const response = await fetch(backendurl + "/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "Resume", inputText: JSON.stringify(formData) }),
      })

      const data = await response.json()

      if (data.generatedText) {
        const doc = new jsPDF()
        doc.setFontSize(14)
        doc.text(data.generatedText, 20, 30, { maxWidth: 170 })
        doc.save("resume.pdf")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const previewHandler = (e) => {
    const { name, value } = e.target
    updateFormData(name, value)
  }

  return (
    <form
      onChange={onsubmitHandle}
      className="w-full max-w-4xl mx-auto px-4 py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-8 border-b border-slate-700">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Build Your Resume
          </h1>
          <p className="text-slate-400 text-base mt-2">Fill in your information to create a professional resume</p>
        </div>
        <button
          onClick={generatePdf}
          type="button"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
        >
          Download PDF
        </button>
      </div>

      {/* Personal Information Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></span>
          Personal Information
        </h2>
        <div className="space-y-5 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Contact Information</label>
            <input
              name="contact"
              value={formData.contact || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="john@example.com | +1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></span>
          Education
        </h2>
        <div className="space-y-5 bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">School/University</label>
              <input
                name="school"
                value={formData.school || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Degree</label>
              <input
                name="degree"
                value={formData.degree || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="Bachelor of Science"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
              <input
                name="location"
                value={formData.location || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Graduation Date</label>
              <input
                name="date"
                value={formData.date || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                type="date"
              />
            </div>
          </div>
        </div>
        <button className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 border border-slate-600">
          + Add Education
        </button>
      </div>

      {/* Experience Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></span>
          Experience
        </h2>
        <div className="space-y-5 bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Job Title</label>
              <input
                name="title"
                value={formData.title || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="Senior Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Company</label>
              <input
                name="company"
                value={formData.company || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="Company Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
              <input
                name="clocation"
                value={formData.clocation || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Employment Date</label>
              <input
                name="cdate"
                value={formData.cdate || ""}
                onChange={previewHandler}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                type="date"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Job Description</label>
            <input
              name="detail"
              value={formData.detail || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
        </div>
        <button className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 border border-slate-600">
          + Add Experience
        </button>
      </div>

      {/* Technical Skills Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></span>
          Technical Skills
        </h2>
        <div className="space-y-5 bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Languages</label>
            <input
              name="language"
              value={formData.language || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="JavaScript, Python, Java"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Frameworks</label>
            <input
              name="framework"
              value={formData.framework || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="React, Node.js, Django"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Tools & Technologies</label>
            <input
              name="tools"
              value={formData.tools || ""}
              onChange={previewHandler}
              className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              placeholder="Git, Docker, AWS"
            />
          </div>
        </div>
        <button className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 border border-slate-600">
          + Add Skills
        </button>
      </div>
    </form>
  )
}

export default Form

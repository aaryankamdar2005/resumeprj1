import { useContext } from "react"
import { Formcontext } from "../Formcontext/Formcontext"

const Resumepreview = () => {
  const { formData, updateFormData } = useContext(Formcontext)

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-8 py-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">{formData.name || "Your Name"}</h1>
        <p className="text-gray-600 mt-2 font-light">{formData.contact || "your.email@example.com"}</p>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Education Section */}
        {formData.school && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Education
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{formData.school}</p>
                  <p className="text-gray-700 font-light">{formData.degree}</p>
                </div>
                <p className="text-gray-600 text-sm font-light">{formData.date}</p>
              </div>
              <p className="text-gray-600 text-sm font-light">{formData.location}</p>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {formData.title && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Experience
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{formData.title}</p>
                  <p className="text-gray-700 font-light">{formData.company}</p>
                </div>
                <p className="text-gray-600 text-sm font-light">{formData.cdate}</p>
              </div>
              <p className="text-gray-600 text-sm font-light">{formData.clocation}</p>
              <p className="text-gray-700 leading-relaxed font-light">{formData.detail}</p>
            </div>
          </div>
        )}

        {/* Technical Skills Section */}
        {(formData.language || formData.framework || formData.tools) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Technical Skills
            </h2>
            <div className="space-y-2">
              {formData.language && (
                <p className="text-gray-700 font-light">
                  <span className="font-semibold text-gray-900">Languages:</span> {formData.language}
                </p>
              )}
              {formData.framework && (
                <p className="text-gray-700 font-light">
                  <span className="font-semibold text-gray-900">Frameworks:</span> {formData.framework}
                </p>
              )}
              {formData.tools && (
                <p className="text-gray-700 font-light">
                  <span className="font-semibold text-gray-900">Tools:</span> {formData.tools}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Resumepreview

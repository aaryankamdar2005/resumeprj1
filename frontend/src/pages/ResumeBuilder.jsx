import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResumeBuilder() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [myResumes, setMyResumes] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('authtoken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
    } else {
      loadMyResumes();
    }
  }, []);

  const loadMyResumes = async () => {
    try {
      const token = getToken();
      if (!token) return;
      
      const response = await axios.get('http://localhost:8000/api/resume/my-resumes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMyResumes(response.data.data || []);
    } catch (err) {
      console.error('Error loading resumes:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      }
    }
  };

  const generateResume = async () => {
    if (!prompt.trim()) {
      setError('Please enter your professional information');
      return;
    }

    setLoading(true);
    setError('');
    setResumeData(null);
    setPdfUrl('');

    try {
      const token = getToken();
      if (!token) {
        setError('Please log in to generate resume');
        navigate('/login');
        return;
      }
      
      const response = await axios.post(
        'http://localhost:8000/api/resume/generate',
        { prompt },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      setResumeData(response.data.data.resumeData);
      setPdfUrl(response.data.data.downloadUrl);
      setError('');
      loadMyResumes();
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('authtoken');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.error || 'Failed to generate resume');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Delete this resume permanently?')) return;

    try {
      const token = getToken();
      await axios.delete(`http://localhost:8000/api/resume/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      loadMyResumes();
    } catch (err) {
      setError('Failed to delete resume');
    }
  };

  const downloadPDF = () => {
    if (pdfUrl) window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                Resume <span className="font-semibold">Builder</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600 font-light">
                Create professional, ATS-optimized resumes with AI
              </p>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {showHistory ? 'Hide' : 'Show'} History
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-gray-900 bg-gray-100 rounded-full">
                {myResumes.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resume History */}
        {showHistory && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Your Resumes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {myResumes.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-sm font-medium text-gray-900">No resumes yet</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">Get started by creating your first resume below.</p>
                </div>
              ) : (
                myResumes.map((resume) => (
                  <div key={resume._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {resume.resumeData.personalInfo.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 font-light">
                          {new Date(resume.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <a
                          href={`http://localhost:8000/api/resume/download/${resume.pdfFilename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => deleteResume(resume._id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-full transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Professional Information
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-sm text-gray-900 placeholder-gray-400 font-light"
                placeholder="Enter your professional details...

Example:
Full Name: John Doe
Email: john.doe@email.com
Education: B.Tech Computer Science, MIT (2018-2022)
Experience: Senior Software Engineer at Google (2022-Present)
Skills: React, Node.js, Python, AWS, Docker
Projects: E-commerce Platform, Chat Application
Achievements: AWS Certified, Code Jam Finalist"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={20}
              />
              
              <button 
                className={`w-full mt-6 py-3 rounded-full font-medium text-sm transition-all ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                onClick={generateResume}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Resume'
                )}
              </button>

              {error && (
                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {resumeData ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-green-800">Resume generated successfully</p>
                </div>

                <button 
                  onClick={downloadPDF}
                  className="w-full flex justify-center items-center px-4 py-3 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  </div>
                  <div className="px-6 py-6 max-h-[800px] overflow-y-auto">
                    {/* Personal Info */}
                    <div className="text-center pb-6 border-b border-gray-200 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {resumeData.personalInfo.name}
                      </h2>
                      <p className="text-sm text-gray-600 font-light">
                        {resumeData.personalInfo.email}
                      </p>
                    </div>

                    {/* Education */}
                    {resumeData.education && resumeData.education.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                          Education
                        </h3>
                        {resumeData.education.map((edu, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-gray-900 text-sm">{edu.institution}</p>
                              <p className="text-xs text-gray-600">{edu.years}</p>
                            </div>
                            <div className="flex justify-between items-start">
                              <p className="text-sm text-gray-700 font-light">{edu.degree}</p>
                              <p className="text-xs text-gray-600">{edu.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience && resumeData.experience.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                          Experience
                        </h3>
                        {resumeData.experience.map((exp, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-gray-900 text-sm">{exp.position}</p>
                              <p className="text-xs font-medium text-gray-700">{exp.company}</p>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-xs text-gray-600">{exp.location}</p>
                              <p className="text-xs text-gray-600">{exp.duration}</p>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-light">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects && resumeData.projects.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                          Projects
                        </h3>
                        {resumeData.projects.map((proj, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-semibold text-gray-900 text-sm">{proj.name}</p>
                              <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{proj.technologies}</p>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-light">
                              {proj.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements && resumeData.achievements.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                          Achievements
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-light">
                          {resumeData.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills && (
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                          Technical Skills
                        </h3>
                        <div className="space-y-2 text-sm font-light">
                          <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Languages:</span> {resumeData.skills.languages}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Frameworks:</span> {resumeData.skills.frameworks}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Tools:</span> {resumeData.skills.tools}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-sm font-medium text-gray-900">No resume yet</h3>
                <p className="mt-1 text-sm text-gray-500 font-light">
                  Enter your information to generate a preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;

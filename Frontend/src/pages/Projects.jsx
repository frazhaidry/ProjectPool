import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../contexts/ProjectContext'
import { useAuth } from '../contexts/AuthContext'
import { FolderOpen, ArrowRight, Clock, Users } from 'lucide-react'

const Projects = () => {
  const { projects, fetchProjects, loading } = useProject()
  const { isAuthenticated } = useAuth()
  const [submittedProjects, setSubmittedProjects] = useState(new Set())

  useEffect(() => {
    fetchProjects()
  }, [])

  const getStatusBadge = (projectId) => {
    if (submittedProjects.has(projectId)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Submitted
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Available
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
       <div className="text-center mb-16 px-4 sm:px-6">
  {/* Icon */}
  <div className="flex justify-center mb-4 animate-bounce-slow">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 7l6 6-6 6M9 7h12M9 17h12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>

  {/* Heading with gradient text and animated underline */}
  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 animate-fade-up"> 
    <span className="relative inline-block"> 
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Available Projects 
      </span> 🚀
      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full opacity-70 animate-underline-glow"></span>
    </span>
  </h1>

  {/* Paragraph */}
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
    Explore a curated collection of real-world projects 🧠, designed to help you learn, grow 🌱, and gain hands-on experience across different domains 🛠️.
  </p>
</div>



        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      Project #{project.id}
                    </span>
                  </div>
                  {getStatusBadge(project.id)}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Team Project</span>
                    </div>
                    {/* <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Ongoing</span>
                    </div> */}
                  </div>

                <Link
                 to={`/projects/${project.id}`}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-md shadow-sm overflow-hidden transition-all duration-300 group"
                  >
                 <span className="relative z-10">View</span>
                 <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                 {/* Shimmer effect on hover */}
                 <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {!isAuthenticated && (
          <section className="mt-5 w-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 py-16 px-6 sm:px-10 lg:px-16">
  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
    <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
      🚀 Ready to Submit a Project?
    </h3>
    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
      Sign up or log in to submit your project choice and start collaborating with your team in a few clicks.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
      {/* Sign Up Button */}
      <Link
        to="/signup"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create Account
      </Link>

      {/* Login Button */}
      <Link
        to="/login"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m6-6l-6 6 6 6" />
        </svg>
        Login
      </Link>
    </div>
  </div>
</section>



        )}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Projects Available
            </h3>
            <p className="text-gray-600">
              Check back later for new project opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects

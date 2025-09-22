import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../contexts/ProjectContext'
import { useAuth } from '../contexts/AuthContext'
import { FolderOpen, ArrowRight, Clock, Users, Filter, X } from 'lucide-react'

const Projects = () => {
  const { projects, fetchProjects, loading } = useProject()
  const { isAuthenticated } = useAuth()
  const [filter, setFilter] = useState('all') // 'all', 'available', 'taken'
  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  // Filter projects based on availability
  useEffect(() => {
    if (!projects.length) {
      setFilteredProjects([])
      return
    }

    let filtered = projects
    if (filter === 'available') {
      filtered = projects.filter(project => project.isAvailable)
    } else if (filter === 'taken') {
      filtered = projects.filter(project => !project.isAvailable)
    }
    
    setFilteredProjects(filtered)
  }, [projects, filter])

  const getStatusBadge = (project) => {
    if (!project.isAvailable) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Taken
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
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

        {/* Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'available'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Available ({projects.filter(p => p.isAvailable).length})
              </button>
              <button
                onClick={() => setFilter('taken')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'taken'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Taken ({projects.filter(p => !p.isAvailable).length})
              </button>
              
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-1"
                  title="Clear filter"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>



        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full">
              {/* Card Header */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Top Row - Project Info & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-500 block truncate">
                        Project #{project.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    {getStatusBadge(project)}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-6 min-h-[4.5rem]">
                  {project.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Project Meta */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1.5">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">Team Project</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">Active</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span>View</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No Projects Available' : `No ${filter} Projects`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Check back later for new project opportunities.'
                : `Try changing the filter to see other projects.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects

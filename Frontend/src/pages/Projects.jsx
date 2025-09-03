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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our curated list of exciting projects. Each project offers unique learning opportunities and real-world experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Ongoing</span>
                    </div>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Submit a Project?
              </h3>
              <p className="text-gray-600 mb-6">
                Sign up or log in to submit your project choice and start collaborating with your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="btn btn-primary">
                  Create Account
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
              </div>
            </div>
          </div>
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

import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProject } from '../contexts/ProjectContext'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { 
  ArrowLeft, 
  FolderOpen, 
  Users, 
  Clock, 
  CheckCircle, 
  UserPlus,
  Phone,
  User
} from 'lucide-react'

const ProjectDetail = () => {
  const { id } = useParams()
  const { fetchProject, submitProject } = useProject()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await fetchProject(id)
        setProject(projectData)
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
      await submitProject(id, data)
      setShowSubmissionForm(false)
      reset()
      navigate('/my-submissions')
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Link to="/projects" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FolderOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Project #{project.id}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">
                    {project.title}
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Available
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Size</p>
                  <p className="text-lg font-semibold text-gray-900">2-5 Members</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">4-8 Weeks</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-gray-900">Open</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Submission Section */}
          {isAuthenticated ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Submit This Project?
                </h2>
                <p className="text-gray-600">
                  Fill out the form below with your team details to submit this project.
                </p>
              </div>

              {!showSubmissionForm ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowSubmissionForm(true)}
                    className="btn btn-primary text-lg px-8 py-3"
                  >
                    <UserPlus className="h-5 w-5" />
                    Submit Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Team Lead Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('teamLeadPhone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9+\-\s()]+$/,
                              message: 'Please enter a valid phone number'
                            }
                          })}
                          type="tel"
                          className="form-input pl-10"
                          placeholder="Enter phone number"
                        />
                      </div>
                      {errors.teamLeadPhone && (
                        <p className="form-error">{errors.teamLeadPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Team Members</label>
                    <p className="text-sm text-gray-500 mb-4">
                      Add at least one team member (including yourself)
                    </p>
                    
                    <div className="space-y-4">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <input
                              {...register(`members.${index}.name`, {
                                required: index === 0 ? 'Team lead name is required' : false
                              })}
                              type="text"
                              className="form-input"
                              placeholder="Full Name"
                            />
                            {errors.members?.[index]?.name && (
                              <p className="form-error">{errors.members[index].name.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <input
                              {...register(`members.${index}.rollNumber`, {
                                required: index === 0 ? 'Team lead roll number is required' : false
                              })}
                              type="text"
                              className="form-input"
                              placeholder="Roll Number"
                            />
                            {errors.members?.[index]?.rollNumber && (
                              <p className="form-error">{errors.members[index].rollNumber.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <input
                              {...register(`members.${index}.enrollNumber`, {
                                required: index === 0 ? 'Team lead enrollment number is required' : false
                              })}
                              type="text"
                              className="form-input"
                              placeholder="Enrollment Number"
                            />
                            {errors.members?.[index]?.enrollNumber && (
                              <p className="form-error">{errors.members[index].enrollNumber.message}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowSubmissionForm(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="spinner mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Submit Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to submit a project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

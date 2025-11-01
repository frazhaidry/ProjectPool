import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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

import { fetchProject, submitProject } from '../store/projectSlice'

const ProjectDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await dispatch(fetchProject(id)).unwrap()
        setProject(projectData)
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [dispatch, id])

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
      await dispatch(submitProject({ projectId: id, submissionData: data })).unwrap()
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
    <div className="min-h-screen bg-blue-100 py-8">
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
            isAdmin ? (
              /* Admin Message */
              <div className="bg-white rounded-xl shadow-lg p-10 max-w-md mx-auto text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Admin Access
                </h2>
                <p className="text-gray-600 mb-6">
                  As an admin, you can manage project submissions but cannot submit projects yourself.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/admin"
                    className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                  >
                    Go to Admin Dashboard
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-block px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
                  >
                    Back to Projects
                  </Link>
                </div>
              </div>
            ) : (
              /* Student/Faculty Submission Form */
              <div className="bg-white rounded-xl shadow-lg p-10 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                    Ready to Submit This Project?
                  </h2>
                  <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    Fill out the form below with your team details to submit this project.
                  </p>
                </div>

                {!showSubmissionForm ? (
                  <div className="text-center">
                    <button
                      onClick={() => setShowSubmissionForm(true)}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                    >
                      <UserPlus className="h-6 w-6" />
                      Submit Project
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700" htmlFor="teamLeadPhone">
                          Team Lead Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="teamLeadPhone"
                            {...register('teamLeadPhone', {
                              required: 'Phone number is required',
                              pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: 'Please enter a valid phone number',
                              },
                            })}
                            type="tel"
                            className={`w-full rounded-md border border-gray-300 px-4 pl-10 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.teamLeadPhone ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter phone number"
                          />
                        </div>
                        {errors.teamLeadPhone && (
                          <p className="text-sm text-red-600 mt-1">{errors.teamLeadPhone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block font-semibold text-gray-700">
                        Team Members
                      </label>
                      <p className="text-sm text-gray-500 mb-6 max-w-md">
                        Add at least one team member (including yourself)
                      </p>

                      <div className="space-y-6">
                        {[0, 1, 2].map((index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <input
                                {...register(`members.${index}.name`, {
                                  required: index === 0 ? 'Team lead name is required' : false,
                                })}
                                type="text"
                                placeholder="Full Name"
                                className={`w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.members?.[index]?.name ? 'border-red-500' : ''
                                }`}
                              />
                              {errors.members?.[index]?.name && (
                                <p className="text-xs text-red-600 mt-1">{errors.members[index].name.message}</p>
                              )}
                            </div>

                            <div>
                              <input
                                {...register(`members.${index}.rollNumber`, {
                                  required: index === 0 ? 'Team lead roll number is required' : false,
                                })}
                                type="text"
                                placeholder="Roll Number"
                                className={`w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.members?.[index]?.rollNumber ? 'border-red-500' : ''
                                }`}
                              />
                              {errors.members?.[index]?.rollNumber && (
                                <p className="text-xs text-red-600 mt-1">{errors.members[index].rollNumber.message}</p>
                              )}
                            </div>

                            <div>
                              <input
                                {...register(`members.${index}.enrollNumber`, {
                                  required: index === 0 ? 'Team lead enrollment number is required' : false,
                                })}
                                type="text"
                                placeholder="Enrollment Number"
                                className={`w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.members?.[index]?.enrollNumber ? 'border-red-500' : ''
                                }`}
                              />
                              {errors.members?.[index]?.enrollNumber && (
                                <p className="text-xs text-red-600 mt-1">{errors.members[index].enrollNumber.message}</p>
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
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ${
                          submitting ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                      >
                        {submitting ? (
                          <>
                            <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 border-white border-t-transparent rounded-full"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Submit Project
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-10 max-w-md mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 mb-8">
                You need to be logged in to submit a project.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/login"
                  className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                >
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

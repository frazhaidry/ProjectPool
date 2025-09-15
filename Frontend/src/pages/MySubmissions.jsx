import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../contexts/ProjectContext'
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Users,
  Phone,
  Calendar
} from 'lucide-react'
// import { useAuth } from '../contexts/AuthContext'

const MySubmissions = () => {
  const { submissions, fetchMySubmissions, loading } = useProject()
  const [localSubmissions, setLocalSubmissions] = useState([])
//   const { isAdmin } = useAuth()
//  console.log(isAdmin)

  useEffect(() => {
    fetchMySubmissions()
  }, [])

  useEffect(() => {
    setLocalSubmissions(submissions)
  }, [submissions])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'Pending':
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    
    switch (status) {
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'Pending':
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
       
          <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Submissions
          </h1>
          <p className="text-gray-600">
            Track the status of your project submissions and team details.
          </p>
         </div>
        

        {localSubmissions.length === 0 ? (
         <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
  {/* Icon Container */}
  <div className="mx-auto mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-blue-50">
    <FolderOpen className="h-10 w-10 text-blue-600" />
  </div>

  {/* Heading */}
  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
    No Submissions Yet
  </h3>

  {/* Description */}
  <p className="text-gray-500 max-w-md mx-auto mb-6">
    You haven't submitted any projects yet. Start exploring our project listings and find one that excites you.
  </p>

  {/* CTA Button */}
  <Link
    to="/projects"
    className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition"
  >
    Browse Projects
  </Link>
</div>

        ) : (
          <div className="space-y-6">
            {localSubmissions.map((submission) => (
              <div key={submission._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Submission Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {submission.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Project ID: #{submission.projectId}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(submission.status)}
                      <span className={getStatusBadge(submission.status)}>
                        {submission.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Project Description</h4>
                    <p className="text-gray-700">{submission.projectDescription}</p>
                  </div>

                  {/* Team Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Team Members
                      </h4>
                      <div className="space-y-2">
                        {submission.members.map((member, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-500">
                                  Roll: {member.rollNumber} | Enroll: {member.enrollNumber}
                                </p>
                              </div>
                              {index === 0 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Team Lead
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Information
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Team Lead Phone</p>
                        <p className="font-medium text-gray-900">{submission.teamLeadPhone}</p>
                      </div>

                      <h4 className="text-sm font-medium text-gray-500 mb-3 mt-4 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Submission Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Submitted On</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(submission.createdAt)}
                        </p>
                        {submission.updatedAt !== submission.createdAt && (
                          <>
                            <p className="text-sm text-gray-600 mt-2">Last Updated</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(submission.updatedAt)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Message */}
                  {submission.status === 'Pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        <p className="text-yellow-800">
                          Your submission is under review. You'll be notified once the status is updated.
                        </p>
                      </div>
                    </div>
                  )}

                  {submission.status === 'Approved' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-green-800">
                          Congratulations! Your project has been approved. You can now start working on it.
                        </p>
                      </div>
                    </div>
                  )}

                  {submission.status === 'Rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-red-800">
                          Your submission has been rejected. Please contact the administrator for more details.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default MySubmissions

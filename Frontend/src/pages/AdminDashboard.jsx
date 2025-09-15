import { useEffect, useState } from 'react'
import { useProject } from '../contexts/ProjectContext'
import { 
  Users, 
  FolderOpen, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Phone,
  Calendar,
  Filter
} from 'lucide-react'

const AdminDashboard = () => {
  const { submissions, fetchAllSubmissions, updateSubmissionStatus, loading } = useProject()
  const [localSubmissions, setLocalSubmissions] = useState([])
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })

  useEffect(() => {
    fetchAllSubmissions()
  }, [])

  useEffect(() => {
    setLocalSubmissions(submissions)
    calculateStats(submissions)
  }, [submissions])

  const calculateStats = (subs) => {
    const stats = {
      total: subs.length,
      pending: subs.filter(s => s.status === 'Pending').length,
      approved: subs.filter(s => s.status === 'Approved').length,
      rejected: subs.filter(s => s.status === 'Rejected').length
    }
    setStats(stats)
  }

  const filteredSubmissions = localSubmissions.filter(submission => {
    if (filter === 'all') return true
    return submission.status.toLowerCase() === filter
  })

  const handleStatusUpdate = async (submissionId, newStatus) => {
    try {
      await updateSubmissionStatus(submissionId, newStatus)
      // Update local state
      setLocalSubmissions(prev => 
        prev.map(sub => 
          sub._id === submissionId ? { ...sub, status: newStatus } : sub
        )
      )
      // Recalculate stats
      const updatedSubmissions = localSubmissions.map(sub => 
        sub._id === submissionId ? { ...sub, status: newStatus } : sub
      )
      calculateStats(updatedSubmissions)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

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
      month: 'short',
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and review all project submissions from students.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Submissions</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Submissions Found
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No submissions have been made yet.' 
                : `No ${filter} submissions found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions.map((submission) => (
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

                  {/* Submitted By */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Submitted By
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-900">
                        {submission.submittedBy?.firstName} {submission.submittedBy?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{submission.submittedBy?.emailId}</p>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Project Description</h4>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{submission.projectDescription}</p>
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
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600">Team Lead Phone</p>
                        <p className="font-medium text-gray-900">{submission.teamLeadPhone}</p>
                      </div>

                      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
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

                  {/* Action Buttons */}
                  {submission.status === 'Pending' && (
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                      <button
                        onClick={() => handleStatusUpdate(submission._id, 'Rejected')}
                        className="btn btn-danger p-2 m-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1 "
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(submission._id, 'Approved')}
                        className="btn btn-success p-2 m-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 "
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </button>
                    </div>
                  )}

                  {submission.status !== 'Pending' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500 text-center">
                        Status updated on {formatDate(submission.updatedAt)}
                      </p>
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

export default AdminDashboard

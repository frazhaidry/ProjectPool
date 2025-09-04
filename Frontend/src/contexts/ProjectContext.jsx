import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../utils/api'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'



const ProjectContext = createContext()

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const { isAuthenticated} = useAuth()
  const [projects, setProjects] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)

  /** ✅ Fetch all projects */
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get('/projects')
      setProjects(response.data)
      return response.data
    } catch (error) {
      toast.error('Failed to fetch projects')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /** ✅ Fetch single project */
  const fetchProject = useCallback(async (id) => {
    try {
      const response = await api.get(`/projects/${id}`)
      return response.data
    } catch (error) {
      toast.error('Failed to fetch project details')
      throw error
    }
  }, [])

  /** ✅ Submit project */
  const submitProject = useCallback(async (projectId, submissionData) => {
    try {
      const response = await api.post(`/submissions/${projectId}`, submissionData)
      toast.success('Project submitted successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Submission failed'
      toast.error(message)
      throw error
    }
  }, [])

  /** ✅ Fetch my submissions */
  const fetchMySubmissions = useCallback(async () => {
    try {
      const response = await api.get('/submissions/my')
      setSubmissions(response.data)
      return response.data
    } catch (error) {
      toast.error('Failed to fetch submissions')
      throw error
    }
  }, [])

  /** ✅ Fetch all submissions (Admin) */
  const fetchAllSubmissions = useCallback(async () => {
    try {
      const response = await api.get('/submissions')
      setSubmissions(response.data.submissions)
      return response.data.submissions
    } catch (error) {
      toast.error('Failed to fetch all submissions')
      throw error
    }
  }, [])

  /** ✅ Update submission status */
  const updateSubmissionStatus = useCallback(async (submissionId, status) => {
    try {
      const response = await api.put(`/submissions/${submissionId}/status`, { status })
      toast.success(`Submission ${status.toLowerCase()} successfully!`)

      // Update local state
      setSubmissions(prev =>
        prev.map(sub =>
          sub._id === submissionId ? { ...sub, status } : sub
        )
      )

      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update status'
      toast.error(message)
      throw error
    }
  }, [])

  // ✅ Auto-load projects once on mount
 useEffect(() => {
  if (isAuthenticated) {
    fetchProjects()
  }
}, [isAuthenticated, fetchProjects])

  const value = {
    projects,
    submissions,
    loading,
    fetchProjects,
    fetchProject,
    submitProject,
    fetchMySubmissions,
    fetchAllSubmissions,
    updateSubmissionStatus
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'  // Import reselect
import { api } from '../utils/api'
import toast from 'react-hot-toast'


export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
  try {
    const response = await api.get('/projects')
    return response.data
  } catch (error) {
    toast.error('Failed to fetch projects')
    throw error
  }
})


export const fetchProject = createAsyncThunk('project/fetchProject', async (id) => {
  try {
    const response = await api.get(`/projects/${id}`)
    return response.data
  } catch (error) {
    toast.error('Failed to fetch project details')
    throw error
  }
})


export const submitProject = createAsyncThunk('project/submitProject', async ({ projectId, submissionData }) => {
  try {
    const response = await api.post(`/submissions/${projectId}`, submissionData)
    toast.success('Project submitted successfully!')
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Submission failed'
    toast.error(message)
    throw error
  }
})


export const fetchMySubmissions = createAsyncThunk('project/fetchMySubmissions', async () => {
  try {
    const response = await api.get('/submissions/my')
    return response.data
  } catch (error) {
    toast.error('Failed to fetch your submissions')
    throw error
  }
})


export const fetchAllSubmissions = createAsyncThunk('project/fetchAllSubmissions', async () => {
  try {
    const response = await api.get('/submissions')
    return response.data.submissions || []
  } catch (error) {
    toast.error('Failed to fetch all submissions')
    throw error
  }
})


export const updateSubmissionStatus = createAsyncThunk('project/updateSubmissionStatus', async ({ submissionId, status }) => {
  try {
    const response = await api.put(`/submissions/${submissionId}/status`, { status })
    toast.success(`Submission ${status.toLowerCase()} successfully!`)
    return { submissionId, status }
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update submission status'
    toast.error(message)
    throw error
  }
})


const initialState = {
  projects: [],
  submissions: [],
  loading: false,
}


const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.rejected, (state) => { state.loading = false })
    
      .addCase(fetchProject.pending, (state) => { state.loading = true })
      .addCase(fetchProject.fulfilled, (state) => { state.loading = false })
      .addCase(fetchProject.rejected, (state) => { state.loading = false })

      .addCase(submitProject.pending, (state) => { state.loading = true })
      .addCase(submitProject.fulfilled, (state) => { state.loading = false })
      .addCase(submitProject.rejected, (state) => { state.loading = false })

      .addCase(fetchMySubmissions.pending, (state) => { state.loading = true })
      .addCase(fetchMySubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload
        state.loading = false
      })
      .addCase(fetchMySubmissions.rejected, (state) => { state.loading = false })

      .addCase(fetchAllSubmissions.pending, (state) => { state.loading = true })
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload
        state.loading = false
      })
      .addCase(fetchAllSubmissions.rejected, (state) => { state.loading = false })

      .addCase(updateSubmissionStatus.fulfilled, (state, action) => {
        const { submissionId, status } = action.payload
        state.submissions = state.submissions.map(sub =>
          sub._id === submissionId ? { ...sub, status } : sub
        )
      })
  },
})

export default projectSlice.reducer

export const selectProjects = (state) => state.project.projects

// Memoized selector using reselect to prevent unnecessary rerenders
export const selectSubmissions = createSelector(
  (state) => state.project.submissions,
  (submissions) => submissions
)

export const selectProjectLoading = (state) => state.project.loading

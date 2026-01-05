import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import issueService from '../../services/issueService';
import type {
  Issue,
  IssueFilters,
  CreateIssueRequest,
  UpdateIssueRequest,
  IssueCounts,
  PaginationInfo,
  ApiError,
} from '../../types';

// =============================================================================
// Types
// =============================================================================

interface IssuesState {
  issues: Issue[];
  selectedIssue: Issue | null;
  counts: IssueCounts | null;
  pagination: PaginationInfo | null;
  filters: IssueFilters;
  loading: boolean;
  loadingCounts: boolean;
  loadingDetail: boolean;
  error: string | null;
}

// =============================================================================
// Initial State
// =============================================================================

const initialState: IssuesState = {
  issues: [],
  selectedIssue: null,
  counts: null,
  pagination: null,
  filters: {
    page: 1,
    limit: 10,
    status: 'all',
    priority: 'all',
  },
  loading: false,
  loadingCounts: false,
  loadingDetail: false,
  error: null,
};

// =============================================================================
// Async Thunks
// =============================================================================

/**
 * Fetch issues with filters
 */
export const fetchIssues = createAsyncThunk<
  { issues: Issue[]; pagination: PaginationInfo },
  IssueFilters | undefined,
  { rejectValue: string }
>('issues/fetchAll', async (filters, { rejectWithValue }) => {
  try {
    const response = await issueService.getIssues(filters);
    if (response.success) {
      return { issues: response.data, pagination: response.pagination };
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to fetch issues'
    );
  }
});

/**
 * Fetch single issue by ID
 */
export const fetchIssueById = createAsyncThunk<
  Issue,
  string,
  { rejectValue: string }
>('issues/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await issueService.getIssueById(id);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to fetch issue'
    );
  }
});

/**
 * Fetch issue counts
 */
export const fetchIssueCounts = createAsyncThunk<
  IssueCounts,
  void,
  { rejectValue: string }
>('issues/fetchCounts', async (_, { rejectWithValue }) => {
  try {
    const response = await issueService.getIssueCounts();
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to fetch counts'
    );
  }
});

/**
 * Create a new issue
 */
export const createIssue = createAsyncThunk<
  Issue,
  CreateIssueRequest,
  { rejectValue: string }
>('issues/create', async (data, { rejectWithValue }) => {
  try {
    const response = await issueService.createIssue(data);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to create issue'
    );
  }
});

/**
 * Update an issue
 */
export const updateIssue = createAsyncThunk<
  Issue,
  { id: string; data: UpdateIssueRequest },
  { rejectValue: string }
>('issues/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await issueService.updateIssue(id, data);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to update issue'
    );
  }
});

/**
 * Change issue status (resolve or close)
 */
export const changeIssueStatus = createAsyncThunk<
  Issue,
  { id: string; status: 'Resolved' | 'Closed' },
  { rejectValue: string }
>('issues/changeStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = status === 'Resolved' 
      ? await issueService.resolveIssue(id)
      : await issueService.closeIssue(id);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to update status'
    );
  }
});

/**
 * Delete an issue
 */
export const deleteIssue = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('issues/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await issueService.deleteIssue(id);
    if (response.success) {
      return id; // Return ID for removal from state
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to delete issue'
    );
  }
});

// =============================================================================
// Slice
// =============================================================================

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<IssueFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSelectedIssue: (state) => {
      state.selectedIssue = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Issues
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.issues;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch issues';
      });

    // Fetch Issue by ID
    builder
      .addCase(fetchIssueById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedIssue = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload || 'Failed to fetch issue';
      });

    // Fetch Counts
    builder
      .addCase(fetchIssueCounts.pending, (state) => {
        state.loadingCounts = true;
      })
      .addCase(fetchIssueCounts.fulfilled, (state, action) => {
        state.loadingCounts = false;
        state.counts = action.payload;
      })
      .addCase(fetchIssueCounts.rejected, (state) => {
        state.loadingCounts = false;
      });

    // Create Issue
    builder
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.unshift(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create issue';
      });

    // Update Issue
    builder
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(i => i._id === action.payload._id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.selectedIssue?._id === action.payload._id) {
          state.selectedIssue = action.payload;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update issue';
      });

    // Change Status
    builder
      .addCase(changeIssueStatus.fulfilled, (state, action) => {
        const index = state.issues.findIndex(i => i._id === action.payload._id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
      });

    // Delete Issue
    builder
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.issues = state.issues.filter(i => i._id !== action.payload);
        if (state.selectedIssue?._id === action.payload) {
          state.selectedIssue = null;
        }
      });
  },
});

export const { setFilters, clearFilters, clearSelectedIssue, clearError } = issuesSlice.actions;
export default issuesSlice.reducer;

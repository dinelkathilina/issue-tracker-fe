import api from './api';
import type {
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
  IssueFilters,
  ApiResponse,
  PaginatedResponse,
  IssueCounts,
} from '../types';

/**
 * Issue service for CRUD operations on issues.
 */

export const issueService = {
  /**
   * Get all issues with optional filters and pagination
   */
  async getIssues(filters: IssueFilters = {}): Promise<PaginatedResponse<Issue>> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters.severity && filters.severity !== 'all') params.append('severity', filters.severity);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    const response = await api.get<PaginatedResponse<Issue>>(`/api/issues?${params.toString()}`);
    return response.data;
  },

  /**
   * Get a single issue by ID
   */
  async getIssueById(id: string): Promise<ApiResponse<Issue>> {
    const response = await api.get<ApiResponse<Issue>>(`/api/issues/${id}`);
    return response.data;
  },

  /**
   * Get issue status counts
   */
  async getIssueCounts(): Promise<ApiResponse<IssueCounts>> {
    const response = await api.get<ApiResponse<IssueCounts>>('/api/issues/counts');
    return response.data;
  },

  /**
   * Create a new issue
   */
  async createIssue(data: CreateIssueRequest): Promise<ApiResponse<Issue>> {
    const response = await api.post<ApiResponse<Issue>>('/api/issues', data);
    return response.data;
  },

  /**
   * Update an existing issue
   */
  async updateIssue(id: string, data: UpdateIssueRequest): Promise<ApiResponse<Issue>> {
    const response = await api.put<ApiResponse<Issue>>(`/api/issues/${id}`, data);
    return response.data;
  },

  /**
   * Mark an issue as resolved
   */
  async resolveIssue(id: string): Promise<ApiResponse<Issue>> {
    const response = await api.patch<ApiResponse<Issue>>(`/api/issues/${id}/resolve`);
    return response.data;
  },

  /**
   * Close an issue
   */
  async closeIssue(id: string): Promise<ApiResponse<Issue>> {
    const response = await api.patch<ApiResponse<Issue>>(`/api/issues/${id}/close`);
    return response.data;
  },

  /**
   * Delete an issue
   */
  async deleteIssue(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/api/issues/${id}`);
    return response.data;
  },
};

export default issueService;

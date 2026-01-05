/**
 * Shared TypeScript types for the Issue Tracker application.
 * These types mirror the backend API data structures.
 */

// =============================================================================
// User & Auth Types
// =============================================================================

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// =============================================================================
// Issue Types
// =============================================================================

export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueSeverity = 'Minor' | 'Major' | 'Critical';

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  priority: IssuePriority;
  severity: IssueSeverity;
}

export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  severity?: IssueSeverity;
}

export interface IssueFilters {
  search?: string;
  status?: IssueStatus | 'all';
  priority?: IssuePriority | 'all';
  severity?: IssueSeverity | 'all';
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface IssueCounts {
  Open: number;
  'In Progress': number;
  Resolved: number;
  Closed: number;
  total: number;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationInfo;
}

export interface ApiError {
  success: false;
  message: string;
}

import { useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {
  Button,
  Select,
  SelectItem,
  useDisclosure,
  Input,
  Spinner,
} from "@heroui/react";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { IssueCard } from "../components/issues/IssueCard";
import AddNewModal from "../components/Modal/AddNewModal";
import EditModal from "../components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchIssues,
  fetchIssueCounts,
  updateIssue,
  deleteIssue,
  setFilters,
  clearFilters,
} from "../store/slices/issuesSlice";
import type { Issue as ApiIssue } from "../types";

// Adapter type for IssueCard compatibility
interface CardIssue {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  severity: "Minor" | "Major" | "Critical";
}

// Convert API issue to card format
const toCardIssue = (issue: ApiIssue): CardIssue => ({
  id: issue._id,
  title: issue.title,
  description: issue.description,
  status: issue.status,
  priority: issue.priority,
  severity: issue.severity,
});

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const addModal = useDisclosure();
  const editModal = useDisclosure();

  const { issues, counts, loading, loadingCounts, filters, error } =
    useAppSelector((state) => state.issues);
  const [selectedIssue, setSelectedIssue] = useState<CardIssue | undefined>();
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    confirmColor:
      | "primary"
      | "danger"
      | "warning"
      | "success"
      | "default"
      | "secondary";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    confirmColor: "primary",
    onConfirm: () => {},
  });
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch issues on mount and when filters change
  useEffect(() => {
    const fetchFilters = {
      ...filters,
      search: debouncedSearchTerm || undefined,
    };
    dispatch(fetchIssues(fetchFilters));
  }, [dispatch, filters, debouncedSearchTerm]);

  // Fetch counts on mount
  useEffect(() => {
    dispatch(fetchIssueCounts());
  }, [dispatch]);

  // Refetch counts when issues change
  useEffect(() => {
    if (issues.length > 0) {
      dispatch(fetchIssueCounts());
    }
  }, [dispatch, issues]);

  const handleStatusChange = useCallback(
    async (id: string, newStatus: CardIssue["status"]) => {
      if (
        newStatus === "In Progress" ||
        newStatus === "Resolved" ||
        newStatus === "Closed"
      ) {
        setConfirmState({
          isOpen: true,
          title: `Confirm Status Change`,
          message: `Are you sure you want to mark this issue as ${newStatus}?`,
          confirmLabel: `Mark as ${newStatus}`,
          confirmColor:
            newStatus === "Resolved"
              ? "success"
              : newStatus === "In Progress"
              ? "warning"
              : "danger",
          onConfirm: async () => {
            await dispatch(updateIssue({ id, data: { status: newStatus } }));
            dispatch(fetchIssueCounts());
            setConfirmState((prev) => ({ ...prev, isOpen: false }));
          },
        });
        return;
      }

      await dispatch(updateIssue({ id, data: { status: newStatus } }));
      dispatch(fetchIssueCounts());
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (issue: CardIssue) => {
      setSelectedIssue(issue);
      editModal.onOpen();
    },
    [editModal]
  );

  const handleFilterChange = useCallback(
    (key: "status" | "priority", value: string) => {
      dispatch(setFilters({ [key]: value }));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    dispatch(clearFilters());
  }, [dispatch]);

  const handleDeleteClick = useCallback(
    (id: string) => {
      setConfirmState({
        isOpen: true,
        title: "Confirm Delete",
        message:
          "Are you sure you want to delete this issue? This action cannot be undone.",
        confirmLabel: "Delete",
        confirmColor: "danger",
        onConfirm: async () => {
          await dispatch(deleteIssue(id));
          dispatch(fetchIssues(filters));
          dispatch(fetchIssueCounts());
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
        },
      });
    },
    [dispatch, filters]
  );

  // Status summary from API counts
  const statusSummary = {
    Open: counts?.Open || 0,
    "In Progress": counts?.["In Progress"] || 0,
    Resolved: counts?.Resolved || 0,
  };

  return (
    <div className="p-2 flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Issue Dashboard
          </h1>
          <p className="text-default-500">
            Manage and track your project issues
          </p>
        </div>
        <Button color="primary" onPress={addModal.onOpen}>
          Add New Issue
        </Button>
      </div>

      {/* Status Summary Section */}
      <div className="flex flex-wrap gap-4 px-1 py-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-500/20 shadow-sm transition-all hover:shadow-md">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Open:
          </span>
          {loadingCounts ? (
            <Spinner size="sm" />
          ) : (
            <span className="text-lg font-bold text-primary">
              {statusSummary.Open}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-warning-50 dark:bg-warning-900/20 rounded-xl border border-warning-100 dark:border-warning-500/20 shadow-sm transition-all hover:shadow-md">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-sm font-semibold text-warning-600 dark:text-warning-400">
            In Progress:
          </span>
          {loadingCounts ? (
            <Spinner size="sm" />
          ) : (
            <span className="text-lg font-bold text-warning">
              {statusSummary["In Progress"]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success-50 dark:bg-success-900/20 rounded-xl border border-success-100 dark:border-success-500/20 shadow-sm transition-all hover:shadow-md">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-sm font-semibold text-success-600 dark:text-success-400">
            Resolved:
          </span>
          {loadingCounts ? (
            <Spinner size="sm" />
          ) : (
            <span className="text-lg font-bold text-success">
              {statusSummary.Resolved}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <Input
          isClearable
          className="w-full md:max-w-[44%]"
          placeholder="Search by title or description..."
          startContent={
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="18"
              role="presentation"
              viewBox="0 0 24 24"
              width="18"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          }
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <div className="flex gap-3 w-full md:w-auto">
          <Select
            className="max-w-xs min-w-[120px]"
            labelPlacement="outside"
            placeholder="Status"
            selectedKeys={[filters.status || "all"]}
            onSelectionChange={(keys) =>
              handleFilterChange("status", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="all">All Statuses</SelectItem>
            <SelectItem key="Open">Open</SelectItem>
            <SelectItem key="In Progress">In Progress</SelectItem>
            <SelectItem key="Resolved">Resolved</SelectItem>
            <SelectItem key="Closed">Closed</SelectItem>
          </Select>
          <Select
            className="max-w-xs min-w-[120px]"
            labelPlacement="outside"
            placeholder="Priority"
            selectedKeys={[filters.priority || "all"]}
            onSelectionChange={(keys) =>
              handleFilterChange("priority", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="all">All Priorities</SelectItem>
            <SelectItem key="Low">Low</SelectItem>
            <SelectItem key="Medium">Medium</SelectItem>
            <SelectItem key="High">High</SelectItem>
            <SelectItem key="Critical">Critical</SelectItem>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" label="Loading issues..." />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="col-span-full py-10 flex flex-col items-center justify-center text-danger bg-danger-50 dark:bg-danger-900/20 rounded-xl border-2 border-dashed border-danger-200">
          <p className="text-xl">{error}</p>
          <Button
            className="mt-4"
            color="primary"
            variant="light"
            onPress={() => dispatch(fetchIssues(filters))}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Issues Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={toCardIssue(issue)}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-default-400 bg-default-50 rounded-xl border-2 border-dashed border-default-200">
              <p className="text-xl">No issues found matching your filters</p>
              <Button
                className="mt-4"
                variant="light"
                onPress={handleClearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      <AddNewModal
        isOpen={addModal.isOpen}
        onOpenChange={addModal.onOpenChange}
        onSuccess={() => {
          dispatch(fetchIssues(filters));
          dispatch(fetchIssueCounts());
        }}
      />
      <EditModal
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        issue={selectedIssue}
        onSuccess={() => {
          dispatch(fetchIssues(filters));
          dispatch(fetchIssueCounts());
        }}
      />
      <ConfirmationModal
        isOpen={confirmState.isOpen}
        onOpenChange={(isOpen) =>
          setConfirmState((prev) => ({ ...prev, isOpen }))
        }
        title={confirmState.title}
        message={confirmState.message}
        confirmLabel={confirmState.confirmLabel}
        confirmColor={confirmState.confirmColor}
        onConfirm={confirmState.onConfirm}
      />
    </div>
  );
};

// Need to add useState for missing import
import { useState } from "react";

export default Dashboard;

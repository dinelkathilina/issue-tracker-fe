import React, { useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {
  Button,
  Select,
  SelectItem,
  useDisclosure,
  Input,
} from "@heroui/react";
import { IssueCard, type Issue } from "../components/issues/IssueCard";
import { mockIssues } from "../data/mockIssues";

import AddNewModal from "../components/Modal/AddNewModal";
import EditModal from "../components/Modal/EditModal";

const Dashboard = () => {
  const addModal = useDisclosure();
  const editModal = useDisclosure();
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>();

  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        issue.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || issue.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || issue.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [issues, debouncedSearchTerm, statusFilter, priorityFilter]);

  const handleStatusChange = (id: string, newStatus: Issue["status"]) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleEdit = (issue: Issue) => {
    setSelectedIssue(issue);
    editModal.onOpen();
  };

  const statusSummary = useMemo(() => {
    const counts = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
    };
    issues.forEach((issue) => {
      if (issue.status in counts) {
        counts[issue.status as keyof typeof counts]++;
      }
    });
    return counts;
  }, [issues]);

  return (
    <div className="p-2 flex flex-col gap-4">
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
          <span className="text-lg font-bold text-primary">
            {statusSummary.Open}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-warning-50 dark:bg-warning-900/20 rounded-xl border border-warning-100 dark:border-warning-500/20 shadow-sm transition-all hover:shadow-md">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-sm font-semibold text-warning-600 dark:text-warning-400">
            In Progress:
          </span>
          <span className="text-lg font-bold text-warning">
            {statusSummary["In Progress"]}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success-50 dark:bg-success-900/20 rounded-xl border border-success-100 dark:border-success-500/20 shadow-sm transition-all hover:shadow-md">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-sm font-semibold text-success-600 dark:text-success-400">
            Resolved:
          </span>
          <span className="text-lg font-bold text-success">
            {statusSummary.Resolved}
          </span>
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
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) =>
              setStatusFilter(Array.from(keys)[0] as string)
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
            selectedKeys={[priorityFilter]}
            onSelectionChange={(keys) =>
              setPriorityFilter(Array.from(keys)[0] as string)
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="col-span-full py-10 flex flex-col items-center justify-center text-default-400 bg-default-50 rounded-xl border-2 border-dashed border-default-200">
            <p className="text-xl">No issues found matching your filters</p>
            <Button
              className="mt-4"
              variant="light"
              onPress={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      <AddNewModal
        isOpen={addModal.isOpen}
        onOpenChange={addModal.onOpenChange}
      />
      <EditModal
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        issue={selectedIssue}
      />
    </div>
  );
};

export default Dashboard;

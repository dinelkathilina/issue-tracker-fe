import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  severity: "Minor" | "Major" | "Critical";
}

interface IssueCardProps {
  issue: Issue;
  onStatusChange: (id: string, newStatus: Issue["status"]) => void;
  onEdit: (issue: Issue) => void;
  onDelete: (id: string) => void;
}

export const statusColorMap: Record<
  Issue["status"],
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined
> = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

export const priorityColorMap: Record<
  Issue["priority"],
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined
> = {
  Low: "secondary",
  Medium: "success",
  High: "warning",
  Critical: "danger",
};

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="max-w-[400px] border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-lg backdrop-saturate-150 shadow-lg">
      <CardHeader className="flex justify-between items-start gap-3 px-6 pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-large font-bold text-foreground/90">
            {issue.title}
          </p>
          <div className="flex gap-2 items-center">
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[issue.status]}
              size="sm"
              variant="dot"
            >
              {issue.status}
            </Chip>
            <Chip
              className="capitalize"
              color={priorityColorMap[issue.priority]}
              size="sm"
              variant="flat"
            >
              {issue.priority}
            </Chip>
          </div>
        </div>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light" radius="full">
              <VerticalDotsIcon className="text-default-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Issue actions"
            onAction={(key) => {
              if (key === "edit") onEdit(issue);
              else if (key === "delete") onDelete(issue.id);
              else onStatusChange(issue.id, key as Issue["status"]);
            }}
          >
            <DropdownItem
              key="In Progress"
              color="warning"
              description="Work is started"
            >
              Mark as In Progress
            </DropdownItem>
            <DropdownItem
              key="Resolved"
              color="success"
              description="Issue is fixed"
            >
              Mark as Resolved
            </DropdownItem>
            <DropdownItem
              key="Closed"
              color="danger"
              description="Close the issue"
            >
              Mark as Closed
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              className="text-danger"
              description="Permanently delete this issue"
            >
              Delete Issue
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody className="px-6 py-4">
        <p className="text-default-500 text-small leading-relaxed">
          {issue.description}
        </p>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-col">
            <span className="text-tiny uppercase font-bold text-default-400">
              Severity
            </span>
            <span className="text-small font-medium text-default-600">
              {issue.severity}
            </span>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="px-6 py-4 justify-between">
        <Link
          href={`/dashboard/issues/${issue.id}`}
          className="text-tiny text-primary-500 font-semibold"
        >
          View Details
        </Link>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => onEdit(issue)}
          startContent={<EditIcon />}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

// Icons (inline for simplicity and premium feel)
const VerticalDotsIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
  >
    <path
      d="M11.06 6.02L5.41 11.67C5.12 11.96 4.93 12.35 4.86 12.77L4.01 17.9C3.91 18.52 4.45 19.05 5.07 18.96L10.2 18.11C10.62 18.04 11.01 17.85 11.3 17.56L16.95 11.91L11.06 6.02ZM17.9 10.96L12.01 5.07L13.41 3.67C14.19 2.89 15.46 2.89 16.24 3.67L19.3 6.73C20.08 7.51 20.08 8.78 19.3 9.56L17.9 10.96Z"
      fill="currentColor"
    />
  </svg>
);

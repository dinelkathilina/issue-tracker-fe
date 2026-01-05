import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import {
  statusColorMap,
  priorityColorMap,
} from "../components/issues/IssueCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchIssueById,
  clearSelectedIssue,
} from "../store/slices/issuesSlice";
import EditModal from "../components/Modal/EditModal";

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editModal = useDisclosure();

  const {
    selectedIssue: issue,
    loadingDetail,
    error,
  } = useAppSelector((state) => state.issues);

  useEffect(() => {
    if (id) {
      dispatch(fetchIssueById(id));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedIssue());
    };
  }, [dispatch, id]);

  // Loading state
  if (loadingDetail) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" label="Loading issue details..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-4xl font-bold text-danger">Error</h1>
        <p className="text-default-400">{error}</p>
        <Button color="primary" onPress={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Not found state
  if (!issue) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-4xl font-bold text-default-600">Issue Not Found</h1>
        <p className="text-default-400">
          The issue you are looking for does not exist.
        </p>
        <Button color="primary" onPress={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Card issue format for EditModal
  const cardIssue = {
    id: issue._id,
    title: issue.title,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
    severity: issue.severity,
  };

  return (
    <div className="p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <Breadcrumbs>
        <BreadcrumbItem onPress={() => navigate("/dashboard")}>
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem>Issue Details</BreadcrumbItem>
        <BreadcrumbItem>#{issue._id.slice(-6)}</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-lg backdrop-saturate-150 shadow-xl">
        <CardHeader className="flex flex-col items-start gap-4 p-8">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold text-foreground">
              {issue.title}
            </h1>
            <div className="flex gap-2">
              <Chip
                className="capitalize"
                color={statusColorMap[issue.status]}
                variant="dot"
              >
                {issue.status}
              </Chip>
              <Chip
                className="capitalize"
                color={priorityColorMap[issue.priority]}
                variant="flat"
              >
                {issue.priority}
              </Chip>
            </div>
          </div>
          <div className="flex gap-6 text-default-500 flex-wrap">
            <div className="flex flex-col">
              <span className="text-tiny uppercase font-bold text-default-400">
                ID
              </span>
              <span className="text-small font-medium">
                #{issue._id.slice(-6)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-tiny uppercase font-bold text-default-400">
                Severity
              </span>
              <span className="text-small font-medium">{issue.severity}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-tiny uppercase font-bold text-default-400">
                Created
              </span>
              <span className="text-small font-medium">
                {new Date(issue.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-tiny uppercase font-bold text-default-400">
                Updated
              </span>
              <span className="text-small font-medium">
                {new Date(issue.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Description
          </h2>
          <p className="text-default-600 leading-relaxed whitespace-pre-wrap">
            {issue.description}
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="p-8 justify-between">
          <Button
            variant="flat"
            color="default"
            onPress={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
          <Button color="primary" variant="solid" onPress={editModal.onOpen}>
            Edit Issue
          </Button>
        </CardFooter>
      </Card>

      <EditModal
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        issue={cardIssue}
        onSuccess={() => {
          if (id) {
            dispatch(fetchIssueById(id));
          }
        }}
      />
    </div>
  );
};

export default IssueDetailPage;

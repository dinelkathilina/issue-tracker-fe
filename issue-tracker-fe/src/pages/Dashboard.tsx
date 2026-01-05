import React, { useState } from "react";
import { SubmitIcon } from "../components/common/SubmitIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Chip,
  Select,
  SelectItem,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";
import { IssueCard, type Issue } from "../components/issues/IssueCard";
import { mockIssues } from "../data/mockIssues";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const handleStatusChange = (id: string, newStatus: Issue["status"]) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleEdit = (issue: Issue) => {
    console.log("Editing issue:", issue);
    // In a real app, this would open the modal with issue data pre-filled
    onOpen();
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Issue Dashboard
          </h1>
          <p className="text-default-500">
            Manage and track your project issues
          </p>
        </div>
        <Button color="primary" onPress={onOpen}>
          Add New Issue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        placement="top-center"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Issue
              </ModalHeader>
              <ModalBody>
                <Form>
                  {/* Title */}
                  <Input
                    type="text"
                    label="Title"
                    placeholder="Enter issue title"
                    labelPlacement="outside-top"
                  />
                  {/* Description */}
                  <Textarea
                    className="md:w-full"
                    label="Description"
                    placeholder="Enter your description"
                    labelPlacement="outside-top"
                  />
                  {/* Priority */}
                  <div className="w-full">
                    <label className="text-foreground text-sm font-medium mb-2 block">
                      Priority
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4">
                      <Button variant="flat" size="sm">
                        <Chip color="secondary" variant="dot" size="sm">
                          Low
                        </Chip>
                      </Button>
                      <Button variant="flat" size="sm">
                        <Chip color="success" variant="dot" size="sm">
                          Medium
                        </Chip>
                      </Button>
                      <Button variant="flat" size="sm">
                        <Chip color="warning" variant="dot" size="sm">
                          High
                        </Chip>
                      </Button>
                      <Button variant="flat" size="sm">
                        <Chip color="danger" variant="dot" size="sm">
                          Critical
                        </Chip>
                      </Button>
                    </div>
                  </div>
                  {/* Severity */}
                  <Select
                    className="md:w-full"
                    label="Severity"
                    labelPlacement="outside-top"
                    placeholder="Select severity"
                  >
                    <SelectItem key="minor">Minor</SelectItem>
                    <SelectItem key="major">Major</SelectItem>
                    <SelectItem key="critical">Critical</SelectItem>
                  </Select>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" endContent={<SubmitIcon />}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;

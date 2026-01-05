import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { SubmitIcon } from "../common/SubmitIcon";

import type { Issue } from "../issues/IssueCard";

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  issue?: Issue;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  issue,
}) => {
  const [priority, setPriority] = useState<Issue["priority"]>(
    issue?.priority || "Medium"
  );

  useEffect(() => {
    if (issue?.priority) {
      setPriority(issue.priority);
    }
  }, [issue]);

  return (
    <>
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
                Edit Issue
              </ModalHeader>
              <ModalBody>
                <Form>
                  {/* Title */}
                  <Input
                    type="text"
                    label="Title"
                    placeholder="Enter issue title"
                    labelPlacement="outside-top"
                    defaultValue={issue?.title}
                  />
                  {/* Description */}
                  <Textarea
                    className="md:w-full"
                    label="Description"
                    placeholder="Enter your description"
                    labelPlacement="outside-top"
                    defaultValue={issue?.description}
                  />
                  {/* Priority */}
                  <Select
                    className="md:w-full"
                    label="Priority"
                    labelPlacement="outside-top"
                    placeholder="Select priority"
                    selectedKeys={[priority]}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0] as Issue["priority"];
                      if (val) setPriority(val);
                    }}
                  >
                    <SelectItem key="Low">Low</SelectItem>
                    <SelectItem key="Medium">Medium</SelectItem>
                    <SelectItem key="High">High</SelectItem>
                    <SelectItem key="Critical">Critical</SelectItem>
                  </Select>
                  {/* Severity */}
                  <Select
                    className="md:w-full"
                    label="Severity"
                    labelPlacement="outside-top"
                    placeholder="Select severity"
                    defaultSelectedKeys={
                      issue?.severity ? [issue.severity.toLowerCase()] : []
                    }
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
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;

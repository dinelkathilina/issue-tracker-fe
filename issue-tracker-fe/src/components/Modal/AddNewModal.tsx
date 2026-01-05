import { useState, type FormEvent } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createIssue } from "../../store/slices/issuesSlice";
import type { IssuePriority, IssueSeverity } from "../../types";

interface AddNewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

const AddNewModal: React.FC<AddNewModalProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.issues);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<IssuePriority>("Medium");
  const [severity, setSeverity] = useState<IssueSeverity>("Minor");
  const [localError, setLocalError] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setSeverity("Minor");
    setLocalError("");
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setLocalError("");

    // Validation
    if (!title.trim()) {
      setLocalError("Title is required");
      return;
    }
    if (!description.trim()) {
      setLocalError("Description is required");
      return;
    }

    const result = await dispatch(
      createIssue({
        title: title.trim(),
        description: description.trim(),
        priority,
        severity,
      })
    );

    if (createIssue.fulfilled.match(result)) {
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      size="xl"
      onOpenChange={(open) => {
        if (!open) resetForm();
        onOpenChange(open);
      }}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Issue</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                {/* Title */}
                <Input
                  type="text"
                  label="Title"
                  placeholder="Enter issue title"
                  labelPlacement="outside-top"
                  value={title}
                  onValueChange={setTitle}
                  isDisabled={loading}
                  isRequired
                />
                {/* Description */}
                <Textarea
                  className="md:w-full"
                  label="Description"
                  placeholder="Enter your description"
                  labelPlacement="outside-top"
                  value={description}
                  onValueChange={setDescription}
                  isDisabled={loading}
                  isRequired
                />
                {/* Priority */}
                <Select
                  className="md:w-full"
                  label="Priority"
                  labelPlacement="outside-top"
                  placeholder="Select priority"
                  selectedKeys={[priority]}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0] as IssuePriority;
                    if (val) setPriority(val);
                  }}
                  isDisabled={loading}
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
                  selectedKeys={[severity]}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0] as IssueSeverity;
                    if (val) setSeverity(val);
                  }}
                  isDisabled={loading}
                >
                  <SelectItem key="Minor">Minor</SelectItem>
                  <SelectItem key="Major">Major</SelectItem>
                  <SelectItem key="Critical">Critical</SelectItem>
                </Select>

                {/* Error display */}
                {(localError || error) && (
                  <div className="text-danger text-sm text-center bg-danger-50 dark:bg-danger-900/20 p-2 rounded-lg w-full">
                    {localError || error}
                  </div>
                )}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={handleClose}
                isDisabled={loading}
              >
                Close
              </Button>
              <Button
                color="primary"
                endContent={<SubmitIcon />}
                onPress={() => handleSubmit()}
                isLoading={loading}
                isDisabled={loading}
              >
                {loading ? "Creating..." : "Submit"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewModal;

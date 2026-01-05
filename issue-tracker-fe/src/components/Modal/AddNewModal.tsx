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

interface AddNewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AddNewModal: React.FC<AddNewModalProps> = ({ isOpen, onOpenChange }) => {
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
                  <Select
                    className="md:w-full"
                    label="Priority"
                    labelPlacement="outside-top"
                    placeholder="Select priority"
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
    </>
  );
};

export default AddNewModal;

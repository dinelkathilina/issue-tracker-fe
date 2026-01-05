import React from "react";
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

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top-center" size="xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Issue</ModalHeader>
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
                      <div>
                        <label className="text-white text-sm">Priority</label>
                        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4">
                          <Button>
                            <Chip color="secondary" variant="dot">
                              Low
                            </Chip>
                          </Button>
                          <Button>
                            <Chip color="success" variant="dot">
                              Medium
                            </Chip>
                          </Button>
                          <Button>
                            <Chip color="warning" variant="dot">
                              High
                            </Chip>
                          </Button>
                          <Button>
                            <Chip color="danger" variant="dot">
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
                        <SelectItem>Minor</SelectItem>
                        <SelectItem>Major</SelectItem>
                        <SelectItem>Critical</SelectItem>
                      </Select>

                      <div className="flex justify-center w-full">

                      </div>
                    </Form>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                        {/* Submit Issue */}
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

export default Dashboard;

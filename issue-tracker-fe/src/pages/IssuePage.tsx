import React from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Textarea,
  Chip,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

const IssuePage = () => {
  return (
    <>
      <main className="container mx-auto px-6 py-2 flex justify-center">
        <Card className="md:w-[500px]">
          <CardBody>
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
                <SelectItem >Minor</SelectItem>
                <SelectItem >Major</SelectItem>
                <SelectItem >Critical</SelectItem>
            </Select>
            </Form>
          </CardBody>
        </Card>
      </main>
    </>
  );
};

export default IssuePage;

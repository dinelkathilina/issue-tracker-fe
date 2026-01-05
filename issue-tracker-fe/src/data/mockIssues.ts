import type { Issue } from "../components/issues/IssueCard";

export const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Navigation bar not working on mobile",
    description:
      "The hamburger menu doesn't open when tapped on devices smaller than 768px. This is affecting user experience for mobile visitors.",
    status: "Open",
    priority: "High",
    severity: "Major",
  },
  {
    id: "2",
    title: "Login page slow response",
    description:
      "Sometimes the login button takes more than 5 seconds to respond. Need to investigate backend latency or frontend blocking.",
    status: "In Progress",
    priority: "Critical",
    severity: "Critical",
  },
  {
    id: "3",
    title: "Wrong color for Success messages",
    description:
      "Success messages are appearing in orange instead of green. Need to update the theme configuration.",
    status: "Open",
    priority: "Low",
    severity: "Minor",
  },
];

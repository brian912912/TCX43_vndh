import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("antd", () => {
  const React = require("react");
  const sanitizeProps = (props) => {
    const {
      dropdownClassName,
      onCalendarChange,
      options,
      listType,
      beforeUpload,
      fullscreen,
      ...rest
    } = props;
    return rest;
  };

  const Input = (props) => <input {...sanitizeProps(props)} />;
  const RangePicker = (props) => <input {...sanitizeProps(props)} />;
  const AutoComplete = ({ children, ...props }) => (
    <div {...sanitizeProps(props)}>{children}</div>
  );
  const DatePicker = {
    RangePicker,
  };

  return {
    Button: ({ children, ...props }) => (
      <button {...sanitizeProps(props)}>{children}</button>
    ),
    Card: ({ children, ...props }) => (
      <div {...sanitizeProps(props)}>{children}</div>
    ),
    Input,
    AutoComplete,
    Modal: ({ children, visible, ...props }) =>
      visible ? <div {...sanitizeProps(props)}>{children}</div> : null,
    Upload: {
      Dragger: ({ children, ...props }) => (
        <div {...sanitizeProps(props)}>{children}</div>
      ),
    },
    Calendar: ({ children, ...props }) => (
      <div {...sanitizeProps(props)}>{children}</div>
    ),
    DatePicker,
  };
});

jest.mock("./searchFilterModal", () => {
  return function MockSearchFilterModal() {
    return null;
  };
});

describe("traveler dashboard visibility", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("does not show the traveler dashboard before login", () => {
    render(<App />);
    expect(screen.queryByText(/tourguide experience/i)).not.toBeInTheDocument();
  });

  test("shows the traveler dashboard for traveler accounts", async () => {
    localStorage.setItem(
      "tcx43_user",
      JSON.stringify({ name: "Test Traveler", role: "Tourist" }),
    );
    localStorage.setItem("tcx43_token", "demo-token");

    render(<App />);

    expect(
      await screen.findByText(/tourguide experience/i),
    ).toBeInTheDocument();
  });

  test("can toggle to English from the navbar", () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: /en|vi/i });
    fireEvent.click(toggle);
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
  });
});

"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Space,
  Input,
  Select,
  Divider,
  DatePicker,
} from "antd";
import MdEditor from "@uiw/react-md-editor";
import Editor from "@monaco-editor/react";
import dayjs from "dayjs";
import _ from "lodash";
import { useGetQuestionDetailQuery, useUpdateQuestionDetailMutation } from "@/redux/apis/tutor/EditQuestion";


const EditQuestionContainer: React.FC<PropsType> = ({ qn_id }) => {

  const { data: questionData, error, isLoading } = useGetQuestionDetailQuery(qn_id);
  const [updateQuestionDetail, { isLoading: isUpdating, isSuccess }] = useUpdateQuestionDetailMutation();

  useEffect(() => {
    if (questionData) {
      setQuestionTitle(questionData.question.question_title);
      setDueDate(questionData.question.due_date);
      setCodeContent(questionData.question.ref_program);
      setMarkdown(questionData.question.question_statement);
      setTestCases(questionData.question.test_cases.map(tc => _.omit(tc, 'pk')));
      setLanguage(questionData.question.language);
    }
  }, [questionData]);
  
  const [currentMode, setCurrentMode] = useState("markdown");
  const [markdown, setMarkdown] = useState<string>("");
  const [testCases, setTestCases] = useState<Omit<TestCaseType, "pk">[]>([
    { input: "", output: "" },
  ]);
  const [language, setLanguage] = useState<"python" | "c">("python");
  const [codeContent, setCodeContent] = useState<string>("");
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleEditorChange = (newMarkdown:any) => {
    setMarkdown(newMarkdown);
  };

  const handleCodeEditorChange = (newCodeContent:any) => {
    setCodeContent(newCodeContent);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeLastTestCase = () => {
    if (testCases.length > 1) {
      setTestCases(testCases.slice(0, -1));
    } else {
      message.warning("At least one test case is required.");
    }
  };

  const updateTestCase = (index:any, field:any, value:any) => {
    const updatedTestCases = [...testCases];
    // @ts-ignore
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleLanguageChange = (value:any) => {
    setLanguage(value);
  };

  const handleDueDateChange = (date:any, dateString:any) => {
    setDueDate(dateString); // Update the due date state
  };

  const handleSubmission = async () => {
    if (!questionData) {
      message.error("No question data available for submission.");
      return;
    }
  
    const submissionData = {
      question: {
        id: qn_id,
        question_title: questionTitle,
        question_statement: markdown,
        ref_program: codeContent,
        language,
        due_date: dueDate,
        test_cases: testCases.map(tc => ({
          input: tc.input,
          output: tc.output,
        })),
        total_students: questionData.total_students,
        passes: questionData.passes,
        total_submissions: questionData.total_submissions,
      },
    };
  
    try {
      // @ts-ignore
      await updateQuestionDetail(submissionData).unwrap();
      message.success("Question edited successfully!");
    } catch (err) {
      console.error("Error during submission:", err);
      message.error("An error occurred while editing the question.");
    }
  };
  
  const buttonStyle = {
    backgroundColor: "#1890ff",
    color: "#fff",
    borderColor: "#1890ff",
  };

  const pageStyle = {
    padding: "20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  };

  const flexContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  return (
    <div style={pageStyle}>
      <div style={flexContainerStyle}>
        <Input
          placeholder="Question Title"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          style={{ width: "70%" }}
        />
        <DatePicker
          format="YYYY-MM-DD"
          placeholder="Select Due Date"
          value={dayjs(dueDate, "YYYY-MM-DD")}
          onChange={handleDueDateChange}
          style={{ width: "28%" }}
        />
      </div>
      {currentMode === "markdown" ? (
        <div style={{ flexGrow: 1, overflow: "auto", height: "85vh" }}>
          <MdEditor
            value={markdown}
            onChange={handleEditorChange}
            height="100%"
          />
        </div>
      ) : (
        <div style={{ flexGrow: 1, display: "flex" }}>
          <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
            {testCases.map((testCase, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#1890ff",
                      color: "white",
                      marginRight: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {index + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) =>
                        updateTestCase(index, "input", e.target.value)
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <Input
                      placeholder="Expected Output"
                      value={testCase.output}
                      onChange={(e) =>
                        updateTestCase(index, "output", e.target.value)
                      }
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
            <Space>
              <Button style={buttonStyle} onClick={addTestCase}>
                Add Test Case
              </Button>
              <Button style={buttonStyle} onClick={removeLastTestCase}>
                Remove Last Test Case
              </Button>
            </Space>
          </div>
          <div style={{ flex: 2, padding: "10px" }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <Select.Option value="c">C</Select.Option>
              <Select.Option value="java">Java</Select.Option>
              <Select.Option value="python">Python</Select.Option>
            </Select>
            <Editor
              height="95%"
              language={language}
              theme="vs-dark"
              value={codeContent}
              onChange={handleCodeEditorChange}
            />
          </div>
        </div>
      )}
      <Space
        style={{
          margin: "20px",
          padding: "10px",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        {currentMode === "markdown" ? (
          <Button
            style={buttonStyle}
            onClick={() => setCurrentMode("testCases")}
          >
            Switch to Test Cases
          </Button>
        ) : (
          <Button
            style={buttonStyle}
            onClick={() => setCurrentMode("markdown")}
          >
            Switch to Question Editor
          </Button>
        )}
      </Space>
      <Space
        style={{
          margin: "20px", // Ensure the margin matches the other Space for consistent alignment
          padding: "10px",
          position: "absolute",
          bottom: 0,
          left: "auto", 
          right: 0,
        }}
      >
        <Button type="primary" style={buttonStyle} onClick={handleSubmission}>
          Submit
        </Button>
      </Space>
    </div>
  );
  
};

export default EditQuestionContainer;
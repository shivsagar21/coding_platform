import styles from "./Layout.module.css";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import "./Editor.css";
import { debounce } from "lodash";
import { basicDarkInit } from "@uiw/codemirror-theme-basic";

const Layout = () => {
  const [value, setValue] = useState("");
  const [input, changeInput] = useState("");
  const [output, changeOutput] = useState("");

  const handleButtonClick = useCallback(async () => {
    localStorage.setItem("code",value);
    localStorage.setItem("input",input);
    localStorage.setItem("output",output);
    changeOutput("Loading...");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/run-code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: value,
          input: input,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        changeOutput(errorResponse.error || "An unknown error occurred");
        return;
      }

      const result = await response.json();
      changeOutput(result.output);
    } catch (error) {
      changeOutput("Network error: " + error.message);
    }
  }, [value, input]);

  const debouncedOnChange = useCallback(
    debounce((val) => {
      setValue(val);
    }, 1000),
    []
  );

  useEffect(() => {
    const temp_code = localStorage.getItem("code");
    const temp_inp = localStorage.getItem("input");
    const temp_out = localStorage.getItem("output");
    setValue(temp_code || "");
    changeInput(temp_inp || "");
    changeOutput(temp_out || "");
  }, []);

  return (
    <div className={styles.whole}>
      <button className={styles.btn} onClick={handleButtonClick}>
        Run Code
      </button>
      <div className={styles.container}>
        <div className={styles.jail}>
          <CodeMirror
            value={value}
            width="100%"
            theme={basicDarkInit({
              settings: {
                caret: "#c6c6c6",
                fontFamily: "monospace",
              },
            })}
            extensions={[cpp()]}
            onChange={debouncedOnChange}
            className="codeMirror"
          />
        </div>
        <div className={styles.container2}>
          <textarea
            value={input}
            className={styles.container3}
            onChange={(e) => changeInput(e.target.value)}
          ></textarea>
          <textarea
            className={styles.container3}
            value={output}
            onChange={(e) => changeOutput(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Layout;

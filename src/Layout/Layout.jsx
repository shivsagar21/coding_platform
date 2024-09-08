import styles from "./Layout.module.css";
// import Editor from "react-simple-code-editor";
import Editor from "../Components/Editor";
import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import appContext from "../store/app-context";
import Cookies from "js-cookie";

const Layout = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [input, changeInput] = useState();
  const { handleInputChange, handleButtonClick, appState, handleOutputChange } =
    useContext(appContext);
  const getInput = (val) => {
    changeInput(val);
    handleInputChange(val);
  };
  useEffect(() => {
    const temp_inp = Cookies.get("input");
    if (temp_inp) changeInput(temp_inp);
    handleInputChange(temp_inp);
  }, []);
  return (
    <div className={styles.whole}>
      <div>
        {/* <Button className="btn" onClick={()=>handleButtonClick()}>Run Code</Button> */}
        <button className={styles.btn} onClick={() => handleButtonClick()}>
          Run Code
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.jail}>
          <Editor />
        </div>
        <div className={styles.container2}>
          <div>
            <textarea
              className={styles.container3}
              value={input}
              onChange={(e) => getInput(e.target.value)}
            ></textarea>
          </div>
          <div>
            <textarea
              className={styles.container3}
              value={appState.output}
              onChange={(e) => handleOutputChange(e.target.value)}
            ></textarea>
            {/* <h1>hello</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;

import "./Layout.css";
// import Editor from "react-simple-code-editor";
import Editor from "../Components/Editor";
import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import appContext from "../store/app-context";
import Cookies from 'js-cookie';

const Layout = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [input, changeInput] = useState();
  const { handleInputChange, handleButtonClick, appState, handleOutputChange } =
    useContext(appContext);
  const getInput = (e) => {
    changeInput(e.target.value);
    handleInputChange(e.target.value);
  };
  useEffect(()=>{
    const temp_inp = Cookies.get('input');
    if(temp_inp)changeInput(temp_inp);
    handleInputChange(temp_inp);
  },[])
  return (
    <div className="flex flex-col">
      <div>
        {/* <Button className="btn" onClick={()=>handleButtonClick()}>Run Code</Button> */}
        <button className="btn" onClick={() => handleButtonClick()}>
          Run Code
        </button>
      </div>
      <div className="container">
        <Editor />
        <div className="container2">
          <div>
            <textarea
              className="container3"
              value={input}
              onChange={(e) => getInput(e)}
            ></textarea>
          </div>
          <div>
            <textarea
              className="container3"
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

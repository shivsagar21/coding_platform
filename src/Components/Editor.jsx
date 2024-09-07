import { useRef, useEffect, useState, useCallback, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import appContext from "../store/app-context";
import './Editor.css';
import Cookies from 'js-cookie';
import { debounce } from 'lodash'; // Use lodash for debounce
import { basicLight, basicLightInit, basicDark, basicDarkInit } from '@uiw/codemirror-theme-basic';


const Editor = () => {

  const { handleCodeChange } = useContext(appContext);
  const [value, setValue] = useState();
  const debouncedHandleCodeChange = useRef(
    debounce((val) => {
      handleCodeChange(val);
    }, 300) // Debounce for 300ms
  ).current;

  const onChange = (val, viewUpdate) => {
    setValue(val);
    debouncedHandleCodeChange(val);
  };

  useEffect(()=>{
    const temp = Cookies.get('code');
    if(temp){
        setValue(temp);
        handleCodeChange(temp);
    }   
  },[])
  return (
    <CodeMirror
      value={value}
      width="100%"
      // height={`${windowSize.height-42}px`}
      // height="100%"
      theme={basicDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        }
      })}
      extensions={[cpp({ jsx: true })]}
      onChange={onChange}
      className="codeMirror"
    />
  );
};
export default Editor;

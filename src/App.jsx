import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import AppProvider from "./store/AppProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppProvider>
        <Layout />
      </AppProvider>
    </>
  );

}

export default App;

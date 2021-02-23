import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

function Heading(){
  return <h1> i am a heading </h1>
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

import "./App.scss";
import { AppContextProvider } from "./AppContextProvider";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";

const App = () => {
  return (
    <AppContextProvider>
      <div className="app">
        <Editor />
        <Previewer />
      </div>
    </AppContextProvider>
  );
};

export default App;

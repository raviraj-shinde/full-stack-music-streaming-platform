import Display from "./components/Display";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <Sidebar/>
            <Display />
          </div>
          {/* Player component */}
        </div>
      </AuthWrapper>
    </>
  );
};

export default App;

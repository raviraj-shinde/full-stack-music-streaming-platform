import Display from "./components/Display";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";

const App = () => {
  return (
    <AuthWrapper>
      <Toaster />
      <Display />
    </AuthWrapper>
  );
};

export default App;

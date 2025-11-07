import { useAuth } from "../context/AuthContext";

const DisplayHome = () => {
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
    }

  return (
    <>
      <div>Display home</div>
      <button className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors flex items-center gap-1" onClick={handleLogout}>logout</button>
    </>
  );
};

export default DisplayHome;

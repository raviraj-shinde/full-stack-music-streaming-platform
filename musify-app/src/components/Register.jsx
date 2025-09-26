import { assets } from "../assets/assets";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/*Header*/}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center mb-6">
              <img src={assets.logo} alt="logo" className="w-16 h-16" />
              <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Join Musify</h2>
          <p className="text-gray-300">
            Create your account to start listening
          </p>
        </div>

        {/*Register Form*/}
        
      </div>
    </div>
  );
};

export default Register;

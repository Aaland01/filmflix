import Navbar from "./components/Navbar";
import { login } from "./services/auth.service";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        navigate('/explore');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginState("Invalid email or password");
      } else {
        setLoginState("Unknown error");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-40 pt-40 min-h-screen bg-[url('./assets/movies-bg.jpg')] bg-cover">
        <div className="flex flex-row items-center m-auto justify-center gap-56">
          <form onSubmit={handleFormSubmit} className="flex flex-col p-12 bg-[#C7D2D6] rounded-3xl w-full md:w-1/3 backdrop-blur-md bg-white/30 overflow-hidden">
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-filmflix-main">FilmFlix</h1>
              <p className="text-4xl font-bold">Sign In</p>
            </div>
            <div className="flex flex-col mb-12 rounded">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="border-2 rounded p-1"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-8">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                className="border-2 rounded p-1"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="mb-2 bg-filmflix-main p-4 text-white rounded hover:bg-filmflix-hover active:bg-filmflix-contrast focus:outline-none gap-0 py-2 px-4 ">Sign In</button>
            <div className="text-red-600 h-4">{loginState}</div>
          </form>
          <div className="flex align-middle justify-center">
            <img className="hidden w-96 md:inline align-middle" src="src/assets/filmflixlogoblack.png" alt="FilmFlix Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

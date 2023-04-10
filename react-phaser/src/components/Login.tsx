import reactStore from "../services/zustand";

export default function Login() {
  const { toggleLogin, togglePickGame } = reactStore();
  const handleClick = () => {
    toggleLogin();
    togglePickGame();
  };
  return (
    <>
      <h1>Let's Play a Game!</h1>
      <button onClick={handleClick}>Login</button>
      <button onClick={handleClick}>Sign Up</button>
      <button onClick={handleClick}>Play as Guest</button>
    </>
  );
}

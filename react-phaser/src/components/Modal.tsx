export default function Modal({ handleClick }) {
  return (
    <div className="modal">
      <h1>Let's Play a Game!</h1>
      <button onClick={handleClick}>Tic-Tac-Toe</button>
      <button>Uno</button>
      <button>Create a Room</button>
    </div>
  );
}

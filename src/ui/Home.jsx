import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="text-center my-10 mx-4 sm:mx-1">
      <h1 className="text-2xl text-stone-600 font-semibold mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"}>Lanjut Order {username}?</Button>
      )}
    </div>
  );
}

export default Home;

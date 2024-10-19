import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Selamat Datang! Mari mulai dengan isi nama dulu yaa!</p>

      <input
        type="text"
        placeholder="Masukkan nama"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input sm:w-72 my-8"
      />

      {username !== "" && (
        <div>
          <Button>Mulai order</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

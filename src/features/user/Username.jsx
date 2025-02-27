import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((store) => store.user.username);

  if (!username) return null;
  return (
    <div className="text-sm font-semibold hidden sm:block">{username}</div>
  );
}

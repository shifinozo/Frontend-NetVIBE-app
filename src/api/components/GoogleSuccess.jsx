import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
  const token = params.get("token");
  const username = params.get("username");
  const userId = params.get("userId");

  if (token && username && userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    navigate(`/profile/${username}`);
  }
}, []);

  return <p>Logging in...</p>;
}


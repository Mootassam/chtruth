import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "src/modules/auth/authService"; // adjust path if needed
import AuthToken from "src/modules/auth/authToken";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ImpersonatePage() {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      // Save token like a normal login
      AuthToken.set(token, true);

      // Redirect to dashboard (or homepage)
      navigate("/", { replace: true });
    } else {
      navigate("/auth/signin", { replace: true });
    }
  }, [token, navigate]);

  return <div>Logging in as user...</div>;
}

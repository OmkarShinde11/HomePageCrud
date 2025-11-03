import React from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuthUser } from "../feature/users/useAuthUser";

export default function ProtectedRoute({ children }) {
  const { isLoading, authUser, isError } = useAuthUser();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // if no user or token expired
  if (isError || !authUser) {
    return <Navigate to="/home" replace />;
  }

  // ✅ allow only admin users
  if (authUser?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // ✅ allowed to access
  return children;
}

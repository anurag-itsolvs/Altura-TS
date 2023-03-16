import React, { useContext, useState } from "react";

interface AuthContextValue {
  auth: any;
  authState: any
}
const defaultState = {
  auth: null,
  authState: null
};

export const AuthContext = React.createContext<AuthContextValue>(defaultState);

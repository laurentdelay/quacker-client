import { useState } from "react";
import { useAuth } from "../context/Auth";

export const useForm = (callback, initialState = {}, errorMessage = "") => {
  const [userInputs, setUserInputs] = useState(initialState);

  const { checkAuth } = useAuth();

  const handleInputChange = (e, { name }) => {
    setUserInputs((userInputs) => {
      return { ...userInputs, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage && !checkAuth(errorMessage)) return;

    try {
      await callback({ variables: userInputs });
    } catch {}
  };

  return { userInputs, handleInputChange, handleSubmit };
};

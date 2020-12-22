import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [userInputs, setUserInputs] = useState(initialState);

  const handleInputChange = (e, { name }) => {
    setUserInputs((userInputs) => {
      return { ...userInputs, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await callback({ variables: userInputs });
    } catch {}
  };

  return { userInputs, handleInputChange, handleSubmit };
};

import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";

export const useForm = (
  callback,
  initialState = {},
  errorMessage = "",
  itemName
) => {
  const [userInputs, setUserInputs] = useState(initialState);

  const { checkAuth } = useAuth();

  useEffect(() => {
    if (itemName) {
      setUserInputs((userInputs) => {
        const savedBody = sessionStorage.getItem(itemName) || "";
        if (!savedBody) {
          console.log("clearing storage");
          sessionStorage.clear();
        }
        return { ...userInputs, body: savedBody };
      });
    }
  }, [itemName]);

  const handleInputChange = (e, { name }) => {
    if (itemName) {
      sessionStorage.setItem(itemName, e.target.value);
    }
    if (itemName === "quackBody" && e.target.value.length > 256) {
      return;
    }
    setUserInputs((userInputs) => {
      return { ...userInputs, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage && !checkAuth(errorMessage)) return;

    try {
      await callback({ variables: userInputs });
      setUserInputs(initialState);
      if (itemName) {
        console.log(itemName);
        sessionStorage.removeItem(itemName);
      }
    } catch {}
  };

  return { userInputs, handleInputChange, handleSubmit };
};

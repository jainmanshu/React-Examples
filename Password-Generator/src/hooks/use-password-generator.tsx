import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (options: any, length: number) => {
    const selectedOption = options.filter((op: any) => !!op.checked);
    if (!selectedOption.length) {
      setPassword("");
      setError("Error, select atleast 1 options.");
      return;
    }

    let charSet = "";
    let generatePassword = "";

    selectedOption.forEach((op: any) => {
      switch (op.name) {
        case "uppercase":
          charSet += "ABCDEFGHIJKLMNOPQESTUVWXYZ";
          break;
        case "lowercase":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "numbers":
          charSet += "0123456789";
          break;
        case "symbols":
          charSet += "!@#$%^&*(){}><_|";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatePassword += charSet[randomIndex];
    }

    setPassword(generatePassword);
    setError("");
  };

  return { password, error, generatePassword };
};

export default usePasswordGenerator;

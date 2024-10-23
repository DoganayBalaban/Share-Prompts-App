"use client"; // error component client olmak zorunda
import { useEffect } from "react";

const error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h2>Something went worng</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
};

export default error;

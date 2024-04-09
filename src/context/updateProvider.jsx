import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import PropTypes from "prop-types";
const UpdateContext = createContext({ revalidate: () => {} });

export const UpdateProvider = ({ children }) => {
  const [updateKey, setUpdateKey] = useState(0);
  const revalidate = useCallback(() => {
    setUpdateKey((prevKey) => prevKey + 1);
  }, []);
  return (
    <UpdateContext.Provider value={{ revalidate, updateKey }}>{children}</UpdateContext.Provider>
  );
};

export const useRevalidate = () => useContext(UpdateContext);

UpdateProvider.propTypes = {
  children: PropTypes.node,
};

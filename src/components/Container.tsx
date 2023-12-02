import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="w-10/12 mx-auto">{children}</div>;
};

export default Container;

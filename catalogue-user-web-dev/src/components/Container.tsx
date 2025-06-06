import React from "react";

function Container({ children, className }: any) {
  return <div className={`max-w-7xl mx-auto px-2 w-full ${className}`}>{children}</div>;
}

export default Container;

import React from "react";

const Spinner = ({
  css,
  border = "border-yellow-400",
  height = "h-8",
  width = "w-8",
}) => {
  return (
    <>
      <div
        class={`${css} ${border} ${height} ${width} w-8 h-8 rounded-full animate-spin border-[0.3rem] border-solid  border-t-transparent`}
      ></div>
    </>
  );
};

export default Spinner;

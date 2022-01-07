import React from "react";

function HamburgerMenu({
  shown,
  isShown,
}: {
  shown: boolean;
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`hamburger ${shown && "change"}`}
      onClick={() => isShown(!shown)}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}

export default HamburgerMenu;

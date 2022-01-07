import React from "react";

function HamburgerMenu({
  isShown,
  setIsShown,
}: {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`hamburger ${isShown && "change"}`}
      onClick={() => setIsShown(!isShown)}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}

export default HamburgerMenu;

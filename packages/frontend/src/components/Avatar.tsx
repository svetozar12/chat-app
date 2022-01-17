import React from "react";
import { FaUserCircle } from "react-icons/fa";
function Avatar({
  members,
  images,
  image,
  hasAvatar,
}: {
  members: string[];
  images: string[];
  image: string;
  hasAvatar: boolean;
}) {
  return (
    <>
      {members.length > 2 ? (
        <div style={{ marginRight: "1rem" }} className="group_logo_container">
          {hasAvatar ? (
            images.map((element, index) => {
              if (index === 2) return;
              return (
                <>
                  <img
                    src={element}
                    style={{
                      borderRadius: "50px",
                      width: "2rem",
                      height: "2rem",
                    }}
                    className={`user-logo ${index === 1 && "overlay"}`}
                  />
                </>
              );
            })
          ) : (
            <div className="group_logo_container">
              <FaUserCircle
                style={{ top: "0", right: "0" }}
                className="group_logo"
              />
              <FaUserCircle
                style={{ bottom: "0", left: "0", zIndex: "1" }}
                className="group_logo"
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {hasAvatar ? (
            <img
              src={image}
              style={{ borderRadius: "50px" }}
              className="user-logo"
            />
          ) : (
            <FaUserCircle className="user-logo" />
          )}
        </>
      )}
    </>
  );
}

export default Avatar;

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
        <div className="group_logo_container">
          {hasAvatar ? (
            images.map((element, index) => {
              console.log(element, "ivan");

              if (index === 1) return;
              return (
                <>
                  <img
                    src={element}
                    style={{ borderRadius: "50px" }}
                    className={`user-logo ${index === 1 && "overlay"}`}
                  />
                </>
              );
            })
          ) : (
            <div className="group_logo_container">
              <FaUserCircle className="user-logo logo" />
              <FaUserCircle className="user-logo logo overlay" />
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

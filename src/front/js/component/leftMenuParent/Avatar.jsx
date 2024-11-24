import React from "react";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  margin: 20px auto;
  aspect-ratio: 1/1;
`;
const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  objectfit: cover;
`;
const Avatar = ({ src, alt = "Avatar", size = 60, name = "" }) => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center text-center">
      <AvatarWrapper style={{ width: `${size}px`, height: `${size}px` }}>
        <StyledAvatar src={src} alt={alt} />
      </AvatarWrapper>
      <h6 className="text-light">{name}</h6>
    </div>
  );
};

export default Avatar;

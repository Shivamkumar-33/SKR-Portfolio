import React from "react";
import { Parallax } from "react-parallax";
import parallaxImage from "../../assets/quote-background.jpg";
import { ParallaxContainer, ParallaxText } from "../styles/Parallax.styled";

const ParallaxComponent = () => {
  return (
    <Parallax 
      bgImage={parallaxImage} 
      strength={-200} 
      style={{ width: "100%" }}
      bgImageStyle={{ 
        objectFit: "cover",
        width: "100%",
        height: "auto"
      }}
      bgImageAlt="Inspirational background with motivational quote"
      lazy={true}
    >
      <ParallaxContainer>
        <ParallaxText>
          Success comes to <br />
          those who dare to begin.
        </ParallaxText>
      </ParallaxContainer>
    </Parallax>
  );
};

export default ParallaxComponent;

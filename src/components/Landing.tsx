import { PropsWithChildren } from "react";
import { profile } from "../data/portfolioContent";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              Ankit
              <br />
              <span>KOTNALA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{profile.heroLead}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{profile.heroFocus}</div>
              <div className="landing-h2-2">Builder</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Backend</div>
              <div className="landing-h2-info-1">AI Products</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

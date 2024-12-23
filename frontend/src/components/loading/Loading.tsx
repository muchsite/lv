import React from "react";
import "./loading.scss";
const Loading = () => {
  return (
    <div className="loading_container">
      <h1>Loading...</h1>
      <div className="rl_loading_container">
        <div className="rl_loading_thumb rl_loading_thumb_1"></div>
        <div className="rl_loading_thumb rl_loading_thumb_2"></div>
        <div className="rl_loading_thumb rl_loading_thumb_3"></div>
      </div>
    </div>
  );
};

export default Loading;

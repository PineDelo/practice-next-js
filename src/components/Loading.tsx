import React, { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading: React.FC = () => {
  return (
    <main>
      <FadeLoader
        cssOverride={override}
        width={7}
        radius={15}
        margin={7}
        color="#0078FE"
      />
    </main>
  );
};

export default React.memo(Loading);

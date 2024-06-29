//
//
//

"use client";

import ClipLoader from "react-spinners/ClipLoader";

interface LoadingPage_PROPS {
  loading: boolean;
}

export default function Spinner({ loading }: LoadingPage_PROPS) {
  return (
    <ClipLoader
      cssOverride={{ display: "block", margin: "100px auto" }}
      color="#3B82F6"
      size={150}
      loading={loading}
    />
  );
}

//
//
//

import { SessionProvider } from "next-auth/react";

export default function Auth_PROVIDER({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

import { WagmiProvider } from "wagmi";

import { config } from "@/lib/wagmiConfig";

function Wagmi({ children }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}

export default Wagmi;

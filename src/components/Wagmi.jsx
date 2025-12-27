import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { mainnet, bsc, sepolia, avalanche, avalancheFuji } from "wagmi/chains";

import { walletConnect, safe } from "wagmi/connectors";

const addedChains = [avalancheFuji, sepolia, mainnet, avalanche];

export const config = createConfig({
  chains: addedChains,
  connectors: [
    walletConnect({ projectId: "35c6df36716ecbd04dcc4cedba364876" }),
    safe(),
  ],
  transports: {
    [avalancheFuji.id]: http(
      "https://rpc.ankr.com/avalanche_fuji/75db6dd03e842e010cfad6dd78d69e41afce4e1c023b240abdc28feadb211d08",
    ),
    [avalanche.id]: http(
      "https://rpc.ankr.com/avalanche/75db6dd03e842e010cfad6dd78d69e41afce4e1c023b240abdc28feadb211d08",
    ),
    [sepolia.id]: http(
      "https://rpc.ankr.com/eth_sepolia/75db6dd03e842e010cfad6dd78d69e41afce4e1c023b240abdc28feadb211d08",
    ),
    [mainnet.id]: http(
      "https://rpc.ankr.com/eth/0d860fa4a096a0a07da1f7abf81b7295cc9db044e76f1a230a0b16d0181e9bc1",
    ),

    // [arbitrumSepolia.id]: http(),
    [bsc.id]: http(
      "https://rpc.ankr.com/bsc/75db6dd03e842e010cfad6dd78d69e41afce4e1c023b240abdc28feadb211d08",
    ),
    // [bscTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function Wagmi({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default Wagmi;

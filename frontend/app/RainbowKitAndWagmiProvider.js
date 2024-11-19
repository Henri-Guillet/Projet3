'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from '@/utils/sepolia';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";



const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '783015c718ec524a3280ffa19e272494',
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKitAndWagmiProvider = ({children}) => {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowKitAndWagmiProvider

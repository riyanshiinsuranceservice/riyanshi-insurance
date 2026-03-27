import React from "react"

import { TooltipProvider } from "@/components/ui/tooltip"

/**
 * Props for ContextProviders component
 */
interface IContextProviderProps {
  children: React.ReactNode
}

/**
 * ContextProviders
 *
 * A central place to compose and wrap all global context providers
 * (e.g., ThemeProvider, AuthProvider, QueryClientProvider, etc.)
 *
 * @example
 * <ContextProviders>
 *   <App />
 * </ContextProviders>
 */
const ContextProviders: React.FC<IContextProviderProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
  )
}

export default ContextProviders

import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client"
import React, { useState } from "react"
import LoginSection from "./components/LoginSection"
import MemberList from "./components/MemberList"

export const App: React.VFC = () => {
  const [
    client,
    setClient,
  ] = useState<ApolloClient<NormalizedCacheObject> | null>(null)

  return (
    <main className="h-screen grid place-items-center">
      {client ? (
        <ApolloProvider client={client}>
          <MemberList />
        </ApolloProvider>
      ) : (
        <LoginSection onClientSet={(client) => setClient(client)} />
      )}
    </main>
  )
}

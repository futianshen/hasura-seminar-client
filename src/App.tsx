import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React, { useState } from "react"
import LoginSection from "./components/LoginSection"
import MemberList from "./components/MemberList"

export const App: React.VFC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null)

  return (
    <main className="h-screen grid place-items-center">
      {authToken ? (
        <ApolloProvider
          client={
            new ApolloClient({
              uri: process.env.REACT_APP_HASURA_URI,
              cache: new InMemoryCache(),
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
          }
        >
          <MemberList />
        </ApolloProvider>
      ) : (
        <LoginSection onClientSet={(authToken) => setAuthToken(authToken)} />
      )}
    </main>
  )
}

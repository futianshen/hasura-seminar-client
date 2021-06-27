import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React, { useState } from "react"
import { useEffect } from "react"
import LoginSection from "./components/LoginSection"
import MemberList from "./components/MemberList"

export const App: React.VFC = () => {
  const initialToken =
    localStorage.getItem("authToken") === "null"
      ? null
      : localStorage.getItem("authToken")

  const [authToken, setAuthToken] = useState<string | null>(initialToken)

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken)
    }
  }, [authToken])

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

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React, { useState } from "react"
import { useEffect } from "react"
import LoginSection from "./components/LoginSection"
import MemberList from "./components/MemberList"

export const App: React.VFC = () => {
  const { apolloClient, onTokenSet } = useApolloClient()

  return (
    <main className="h-screen grid place-items-center">
      {apolloClient ? (
        <ApolloProvider client={apolloClient}>
          <MemberList onTokenSet={onTokenSet} />
        </ApolloProvider>
      ) : (
        <LoginSection onTokenSet={onTokenSet} />
      )}
    </main>
  )
}

const useApolloClient = () => {
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

  return {
    apolloClient:
      authToken &&
      new ApolloClient({
        uri: process.env.REACT_APP_HASURA_URI,
        cache: new InMemoryCache(),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    onTokenSet: (authToken: string | null) => setAuthToken(authToken),
  }
}

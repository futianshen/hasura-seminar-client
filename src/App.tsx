import React from "react"
import LoginSection from "./components/LoginSection"
import MemberList from "./components/MemberList"

export const App: React.VFC = () => (
  <main className="h-screen grid place-items-center">
    <LoginSection />
    <MemberList />
  </main>
)

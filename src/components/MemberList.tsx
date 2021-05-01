import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"

const MemberList: React.VFC = () => {
  const users: {
    id: string
    username: string
    password: string
    email: string
  }[] = [
    { id: "1", username: "username", password: "password", email: "email" },
    { id: "2", username: "username", password: "password", email: "email" },
    { id: "3", username: "username", password: "password", email: "email" },
  ]

  return (
    <section className="w-3/5">
      <Table size="md" variant="simple">
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>username</Th>
            <Th>password</Th>
            <Th>email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((v) => (
            <Tr key={v.id}>
              <Td>{v.id}</Td>
              <Td>{v.username}</Td>
              <Td>{v.password}</Td>
              <Td>{v.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </section>
  )
}

export default MemberList

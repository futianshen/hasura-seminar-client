import { gql, useQuery } from "@apollo/client"
import { Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import schemas from "../../schemas"

const MemberList: React.VFC = () => {
  const { loading, error, data } = useQuery<schemas.GET_USERS>(gql`
    query GET_USERS {
      user {
        id
        username
        password
        role
      }
    }
  `)

  if (loading || !!error || !data) {
    return <Spinner />
  }

  const users = data.user

  return (
    <section className="w-3/5">
      <Table size="md" variant="simple">
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>username</Th>
            <Th>password</Th>
            <Th>role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.password}</Td>
              <Td>{user.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </section>
  )
}

export default MemberList

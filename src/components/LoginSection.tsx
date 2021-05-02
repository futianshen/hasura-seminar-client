import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { Button, Input } from "@chakra-ui/react"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"

export const createApolloClient = (token: string) =>
  new ApolloClient({
    uri: process.env.REACT_APP_HASURA_URI,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const LoginSection: React.VFC<{
  onClientSet?: (client: ApolloClient<NormalizedCacheObject>) => void
}> = ({ onClientSet }) => {
  const { register, handleSubmit } = useForm<{
    password: string
    username: string
  }>()

  const onSubmit = handleSubmit((form) => {
    axios
      .post<{
        code: string
        result: {
          token: string
        }
      }>(`${process.env.REACT_APP_BACKEND}/login`, form)
      .then(({ data }) => {
        onClientSet?.(createApolloClient(data.result.token))
        console.log(data)
      })
      .catch((err) => console.error(err))
  })

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="flex mb-3">
          <Input
            {...register("username")}
            placeholder="username"
            variant="outline"
            className="mr-3"
          />

          <Input
            {...register("password")}
            placeholder="password"
            variant="filled"
          />
        </div>

        <div className="text-right">
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </div>
      </form>
    </section>
  )
}

export default LoginSection

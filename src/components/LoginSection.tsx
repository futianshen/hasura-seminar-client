import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { Button, Input } from "@chakra-ui/react"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    password: string
    username: string
  }>({
    resolver: yupResolver(
      object({
        username: string().required(),
        password: string().required(),
      })
    ),
  })

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
      })
      .catch((err) => console.error(err))
  })

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="flex mb-3">
          <div className="mr-3">
            <Input
              {...register("username")}
              placeholder="username"
              variant="outline"
            />
            <p>{errors.username?.message}</p>
          </div>

          <div>
            <Input
              {...register("password")}
              placeholder="password"
              variant="filled"
            />
            <p>{errors.password?.message}</p>
          </div>
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

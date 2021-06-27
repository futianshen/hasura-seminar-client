import { Button, Input } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { object, string } from "yup"

const LoginSection: React.VFC<{
  onTokenSet?: (authToken: string) => void
}> = ({ onTokenSet }) => {
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
        onTokenSet?.(data.result.token)
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

import { Button, Input } from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"

const LoginSection: React.VFC = () => {
  const { register, handleSubmit } = useForm<{
    password: string
    username: string
  }>()

  const onSubmit = handleSubmit((form) => {
    console.log(form)
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

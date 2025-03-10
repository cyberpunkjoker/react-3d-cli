import React, { FC } from "react";
import AuthButton from "./button";
import useCounter from "@/hooks/test/useCountTest";
import { Button } from "antd";

const Test: FC = () => {

  const [current, changeEvent] = useCounter()

  return (
    <div>
      Test Page
      <AuthButton> Login </AuthButton>
      <hr />

      <h3> useHook jest demo test </h3>
      <div className="text-2xl">current count: {current}</div>

      <Button onClick={() => changeEvent.inc()}>add</Button>
      <Button onClick={() => changeEvent.dec()}>substract</Button>
    </div>
  )
}

export default Test;
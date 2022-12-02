import { Form } from "@remix-run/react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div>
      <Form method="post">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" />
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};

export default Signup;

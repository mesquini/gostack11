interface ITechObject {
  title: string;
  exp: number;
}

interface ICreateUser {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | ITechObject>;
}

export default function createUser({ name, email, password }: ICreateUser) {
  const user = {
    name,
    email,
    password,
  };

  return user;
}

import * as yup from "yup";

const LoginSchemaValidation = yup
  .object({
    cpf: yup.string().required("O Password é obrigatório"),
    password: yup.string().required("O Password é obrigatório"),
  })
  .required();

export default LoginSchemaValidation;

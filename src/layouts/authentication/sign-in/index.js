/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import api from "api/api";
//constants
import { AUTH_LOGIN, AUTH_USER } from "../../../constants/ApiRoutes";
//schema
// import LoginSchemaValidation from "utils/validations/LoginSchemaValidation";

// import { Controller, useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@mui/material";

function Basic(navigation) {
  const [rememberMe, setRememberMe] = useState(false);
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  //   const {
  //     control,
  //     register,
  //     handleSubmit,
  //     onSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(LoginSchemaValidation),
  //   });

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  const findUser = async () => {
    api.get(AUTH_USER).then((response) => {
      if (Object.keys(response.data).length !== 0) {
        storeData(response.data);
      }
    });
  };

  const storeData = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const fetchUser = async () => {
    const payload = {
      login: formData.login,
      password: formData.password,
    };
    await api
      .post(AUTH_LOGIN, payload)
      .then((response) => {
        const { token_type, token } = response.data;
        localStorage.setItem("token", `${token_type} ${token}`);
        if (Object.keys(response.data).length !== 0) {
          findUser(response.data);
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const submitLogin = (data) => {
  //     console.log("clicou");
  //     console.log(data);
  //     return;
  //     fetchUser(data);
  //   };

  return (
    <form onSubmit={handleSubmit}>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Controle de Estoque
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={2}>
                {/* <MDInput label="Login" {...register("login")} fullWidth />
                {errors.login?.type === "required" && (
                  <MDTypography>O login é obrigatório</MDTypography>
                )} */}
                <MDInput name="login" label="Login" onChange={handleChange} fullWidth />
              </MDBox>
              <MDBox mb={2}>
                {/* <MDInput type="password" label="Password" {...register("password")} fullWidth />
              {errors.password && (
                <MDTypography variant="h2">{errors.password.message}</MDTypography>
              )} */}
                <MDInput
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handleChange}
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  onSubmit={handleSubmit}
                  // onPress={handleSubmit(submitLogin)}
                  fullWidth
                >
                  Entrar
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </form>
  );
}

export default Basic;

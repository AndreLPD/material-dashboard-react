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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import categoriesTableData from "./data/categoriesTableData";
import MDInput from "components/MDInput";
import { useState } from "react";
import MDButton from "components/MDButton";
import api from "api/api";
import { CATEGORIES } from "constants/ApiRoutes";
import { useRevalidate } from "context/updateProvider";

function Categories() {
  const [formData, setFormData] = useState();
  const { columns, rows } = categoriesTableData();
  const { revalidate } = useRevalidate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createCategories = async () => {
    const payload = {
      user_id: user.id,
      tenant_id: user.tenant_id,
      name: formData.category,
    };
    await api
      .post(CATEGORIES, payload)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        revalidate();
      });
  };

  const saveCategory = (e) => {
    e.preventDefault();
    createCategories();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Categorias
                </MDTypography>
              </MDBox>
              <MDBox mx={2} mt={-3} py={3} px={2}>
                <br />
                <MDTypography variant="h4" color="black">
                  Cadastrar categorias
                </MDTypography>
                <form onSubmit={saveCategory}>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Categorias:
                    </MDTypography>
                    <MDInput
                      label="Nova Categoria"
                      name="category"
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox>
                    <br />
                    <MDButton type="submit" variant="gradient" color="info" fullWidth>
                      Salvar
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
              <MDBox pt={3}>
                {/* {loading && ( */}
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                {/* )} */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Categories;

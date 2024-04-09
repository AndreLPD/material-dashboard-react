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

// Data
import productsTableData from "layouts/tables/data/productsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import api from "api/api";
import { CATEGORIES, PRODUCTS } from "constants/ApiRoutes";
import React, { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import { Button, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MDButton from "components/MDButton";
// import Loading from "components/Loading";

function Products() {
  const { columns, rows } = productsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [formData, setFormData] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCategories = async () => {
    setLoading(true);
    await api
      .get(CATEGORIES)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const saveProduct = async () => {
    const payload = {
      user_id: user.id,
      tenant_id: user.tenant_id,
      name: formData.name,
      priceWholesale: formData.priceWholesale,
      priceRetail: formData.priceRetail,
      validity: formData.validity,
      weight: formData.weight,
      category_id: formData.category_id,
    };

    await api.post(PRODUCTS, payload).then((response) => {
      console.log(response.data);
    });
  };

  const handleProduct = (e) => {
    e.preventDefault();
    saveProduct();
  };

  const handleChangeCategoryItem = (e) => {
    console.log(e.target);
    setCategory(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <form onSubmit={handleProduct}>
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
                    Produtos
                  </MDTypography>
                </MDBox>
                <MDBox mx={2} mt={-3} py={3} px={2}>
                  <br />
                  <MDTypography variant="h4" color="black">
                    Cadastrar produto
                  </MDTypography>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Nome:
                    </MDTypography>
                    <MDInput label="Nome" name="name" onChange={handleChange} fullWidth />
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Preço Atacado:
                    </MDTypography>
                    <MDInput
                      label="Preço Atacado"
                      name="priceWholesale"
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Preço Varejo:
                    </MDTypography>
                    <MDInput
                      label="Preço Varejo"
                      name="priceRetail"
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Quantidade:
                    </MDTypography>
                    <MDInput
                      label="Quantidade no Estoque"
                      name="qtd_stock"
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h15" color="black">
                      Categoria:
                    </MDTypography>
                    {/* <Loading load={loading}> */}
                    <Select
                      id="categories"
                      label="Categorias"
                      value={category}
                      onChange={handleChangeCategoryItem}
                      fullWidth
                    >
                      {categories?.map((category, index) => (
                        <>
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        </>
                      ))}
                    </Select>
                    {/* </Loading> */}
                  </MDBox>
                  <MDBox>
                    <br />
                    <MDButton type="submit" variant="gradient" color="info" fullWidth>
                      Salvar
                    </MDButton>
                  </MDBox>
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
        </form>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;

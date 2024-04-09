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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "ui_elements/LayoutContainers/DashboardLayout";
import DashboardNavbar from "ui_elements/Navbars/DashboardNavbar";
import Footer from "ui_elements/Footer";
import ReportsBarChart from "ui_elements/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "ui_elements/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "ui_elements/Cards/StatisticsCards/ComplexStatisticsCard";
import ItemButton from "ui_elements/Cards/ItemButtonCard/ItemButton";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState();
  const { sales, tasks } = reportsLineChartData;
  const navigate = useNavigate();

  const findUser = () => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    setUser(localStorageUser);
  };

  const navigateToCompra = () => navigate("/");
  const navigateToProduto = () => navigate("/produtos");
  const navigateToCategoria = () => navigate("/categories");

  useEffect(() => {
    findUser();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ItemButton
                onClick={navigateToCompra}
                variant="gradient"
                color="dark"
                icon="shopping"
                title="NOVA COMPRA"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ItemButton
                onClick={navigateToProduto}
                variant="gradient"
                color="dark"
                icon="add"
                title="NOVO PRODUTO"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ItemButton
                onClick={navigateToCategoria}
                variant="gradient"
                color="dark"
                icon="add"
                title="NOVO CATEGORIA"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;

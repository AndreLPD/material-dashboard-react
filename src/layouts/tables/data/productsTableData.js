/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import api from "api/api";
import { PRODUCTS } from "constants/ApiRoutes";
import { useEffect, useState } from "react";

export default function data() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    await api
      .get(PRODUCTS)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return {
    columns: [
      { Header: "id", accessor: "id", width: "45%", align: "left" },
      { Header: "name", accessor: "name", width: "45%", align: "left" },
      { Header: "Preço de Atacado", accessor: "priceWholesale", align: "left" },
      { Header: "Preço de Varejo", accessor: "priceRetail", align: "left" },
      { Header: "Quantidade em Estoque", accessor: "qtd_stock", align: "left" },
      { Header: "Validade", accessor: "validity", align: "left" },
      { Header: "Peso", accessor: "weight", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ],
    rows: products.map((product, index) => ({
      id: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.id}
        </MDTypography>
      ),
      name: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.name}
        </MDTypography>
      ),
      priceWholesale: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.priceWholesale}
        </MDTypography>
      ),
      priceRetail: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.priceRetail}
        </MDTypography>
      ),
      qtd_stock: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.qtd_stock}
        </MDTypography>
      ),
      validity: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.validity}
        </MDTypography>
      ),
      weight: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {product.weight}
        </MDTypography>
      ),
    })),
  };
}

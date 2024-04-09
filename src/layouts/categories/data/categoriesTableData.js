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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { CATEGORIES } from "constants/ApiRoutes";
import { useEffect, useState } from "react";
import api from "api/api";
import { useRevalidate } from "context/updateProvider";

export default function data() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { revalidate, updateKey } = useRevalidate();
  console.log(revalidate, updateKey);

  const fetchCategories = async () => {
    setLoading(true);
    await api
      .get(CATEGORIES)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, [revalidate, updateKey]);

  return {
    columns: [{ Header: "id", accessor: "id", width: "45%", align: "left" }],
    columns: [{ Header: "name", accessor: "name", align: "left" }],
    // columns: [{ Header: "update", accessor: "update", align: "left" }],
    rows: categories.map((category, index) => ({
      id: (
        <MDTypography
          key={index}
          component="p"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {category.id}
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
          {category.name}
        </MDTypography>
      ),
      //   update: (
      //     <MDTypography
      //       key={index}
      //       component="p"
      //       href="#"
      //       variant="caption"
      //       color="text"
      //       fontWeight="medium"
      //     >
      //       update
      //     </MDTypography>
      //   ),
    })),
  };
}

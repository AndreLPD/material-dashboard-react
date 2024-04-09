import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

const ItemButton = (data) => {
  const { icon, title, color, onClick } = data;
  //   console.log(icon);
  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={1}
        px={25}
        width="8rem"
        height="8rem"
      >
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MDButton
            onClick={onClick}
            variant="gradient"
            color="dark"
            justifyContent="center"
            alignItems="center"
          >
            <Icon fontSize="large" sx={{ fontWeight: "bold", marginRight: 5 }}>
              {icon}
            </Icon>
            &nbsp;{title}
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default ItemButton;

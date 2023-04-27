import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import fbIcon from "../../../assets/fbicon.png";
import linkedinIcon from "../../../assets/linkedinicon.png";
import twitterIcon from "../../../assets/twittericon.png";

const Footer = () => {
  const CustomContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    backgroundColor: "rgb(46, 161, 226)",
    padding: 25,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#fff",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  const ContactInfo = styled(Box)({
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  });

  const TypoContact = styled(Typography)({
    fontSize: "16px",
    color: "#fff",
    fontWeight: "500",
    marginLeft: "10px",
  });

  return (
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#fff",
                fontWeight: "700",
                mb: 2,
              }}
            >
              For more information
            </Typography>

            <FooterLink>About us</FooterLink>
            <br />
            <FooterLink>Physiotherapy App</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#fff",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Company
            </Typography>

            <FooterLink>Partnerships</FooterLink>
            <br />
            <FooterLink>Terms of use</FooterLink>
            <br />
            <FooterLink>Privacy</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#fff",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Get in touch
            </Typography>

            <ContactInfo>
              <PlaceIcon />
              <TypoContact>
                123 Truong Cong Dinh, Ward 12, District 9, HCM City
              </TypoContact>
            </ContactInfo>

            <ContactInfo>
              <LocalPhoneIcon />
              <TypoContact>+91 943 520 1243</TypoContact>
            </ContactInfo>

            <ContactInfo>
              <EmailIcon />
              <TypoContact>support@physicaltherapy.com.vn</TypoContact>
            </ContactInfo>

            <IconBox>
              <Typography
                sx={{ fontSize: "15px", color: "#fff", fontWeight: "300" }}
              >
                Follow us on{" "}
              </Typography>
              <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
              <img
                src={twitterIcon}
                alt="twitterIcon"
                style={{ cursor: "pointer" }}
              />
              <img
                src={linkedinIcon}
                alt="linkedinIcon"
                style={{ cursor: "pointer" }}
              />
            </IconBox>
          </Box>
        </CustomContainer>
  );
};

export default Footer;

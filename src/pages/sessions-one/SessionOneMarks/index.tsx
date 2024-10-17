import { isNull, isNumber } from "lodash";
import { useState, useEffect } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemIcon, ListItemText, Stack, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { SESSIONS_ONE_ACTIVITIES } from "@/constants";
import { commafy, formatLargeNumber } from "@/utils";
import MarksTooltip from "../components/MarksTooltip";
import Statistic from "../components/Statistic";
import OthersModal from "./OthersModal";
import { PROJECT_MAP } from "./projectList";

export enum MarksType {
  ELIGIBLE_ASSETS,
  GAS_SPENT,
}

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  lineHeight: "2.8rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  lineHeight: "2.4rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}));

const MarkList = props => {
  const { id, icon, title, data, description, isLoading } = props;
  const theme = useTheme();
  
  const [marks24hAgo, setMarks24hAgo] = useState(null); // State to store marks from 24 hours ago
  
  useEffect(() => {
    // Fetch the marks from 24 hours ago (this could be an API call or from local storage)
    // For the sake of example, let's assume we're storing it locally or fetching from a service
    const fetchMarks24hAgo = async () => {
      const marksFrom24hAgo = await fetchMarksDataFrom24hAgo(); // Replace this with actual API or logic
      setMarks24hAgo(marksFrom24hAgo);
    };
    
    fetchMarks24hAgo();
  }, []); // Fetch once when the component mounts

  // Calculer le total des marks
  const totalMarks = data.reduce((acc, item) => {
    return isNumber(item.marks) ? acc + item.marks : acc;
  }, 0);

  // Calculer la variation sur 24 heures
  const marksLast24h = marks24hAgo !== null ? totalMarks - marks24hAgo : 0;

  return (
    <>
      {/* Section pour le titre et l'icône */}
      <Stack id={id} className="session-section" direction="row" gap="0.8rem" sx={{ mb: [0, "0.8rem"] }} alignItems="center">
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={icon} inheritViewBox></SvgIcon>
        <SectionTitle>{title}</SectionTitle>
      </Stack>

      <SectionDescription>{description}</SectionDescription>

      {/* Afficher le total des marks et les marks gagnés en 24h */}
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, mb: "1.6rem" }}>
        Total des marks : {formatLargeNumber(totalMarks, 2)} {marksLast24h > 0 && `(+${formatLargeNumber(marksLast24h, 2)} gagnés sur 24h)`}
      </Typography>

      {/* Liste des projets */}
      <List sx={{ p: 0, "& *": { fontFamily: "var(--developer-page-font-family) !important" } }}>
        {data?.map((item, index) => (
          <ListItem
            key={item.project}
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: ["repeat(2, max-content) 1fr", "repeat(2, max-content) 1fr"],
              columnGap: ["0.8rem", "1.6rem"],
              rowGap: ["1.6rem"],
              height: ["auto", "5.6rem"],
              m: ["2.4rem 0 !important", "3.2rem 0 !important"],
              p: 0,
            }}
          >
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <Avatar
                variant="square"
                sx={{
                  width: ["4rem", "4.8rem"],
                  height: ["4rem", "4.8rem"],
                  borderRadius: id === SESSIONS_ONE_ACTIVITIES ? "50%" : "7px",
                  backgroundColor: "background.default",
                }}
                src={PROJECT_MAP[item.project].logo}
              ></Avatar>
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontSize: ["1.6rem", "2rem"],
                  lineHeight: ["2.4rem", "3.2rem"],
                  fontWeight: 600,
                  maxWidth: ["15.2rem", "15.2rem", "unset"],
                },
              }}
            >
              {PROJECT_MAP[item.project].name}
            </ListItemText>

            {/* Si marks null, afficher "Coming soon" */}
            {isNull(item.marks) ? (
              <Box sx={{ justifySelf: "flex-end" }}>
                <Typography sx={{ fontSize: ["1.4rem", "1.6rem"] }}>Coming soon</Typography>
              </Box>
            ) : (
              <MarksTooltip key={item.marks} disabled={!item.marks} title={item.marks ? commafy(item.marks) : "--"}>
                <Box sx={{ justifySelf: "flex-end" }}>
                  <Statistic count={isNumber(item.marks) ? formatLargeNumber(item.marks, 2) : "--"} isLoading={isLoading}></Statistic>
                </Box>
              </MarksTooltip>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MarkList;


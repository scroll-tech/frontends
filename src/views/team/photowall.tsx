import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Pic1 from "@/assets/images/homepage/team/pic_1.png";
import Pic2 from "@/assets/images/homepage/team/pic_2.png";
import Pic3 from "@/assets/images/homepage/team/pic_3.png";
import Pic4 from "@/assets/images/homepage/team/pic_4.png";
import Pic5 from "@/assets/images/homepage/team/pic_5.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Photo = styled("img")(
  ({ theme }) => `
            `
);

const PhotoContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    justify-content: space-between;
    margin-bottom: 14rem;
    ${theme.breakpoints.down("md")} {
      margin-bottom: 6rem;
    };
              `
);

const Photowall = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <PhotoContainer className="wrapper">
      {isDesktop ? (
        <>
          <Box sx={{ width: "41.2%" }}>
            <Photo src={Pic1} sx={{ marginBottom: "3.86%" }} />
            <Photo src={Pic2} sx={{ marginBottom: "3.86%" }} />
            <Photo src={Pic3} />
          </Box>
          <Box sx={{ width: "56%" }}>
            <Photo src={Pic4} sx={{ marginBottom: "3.86%" }} />
            <Photo src={Pic5} />
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="column">
          <Photo src={Pic4} sx={{ marginBottom: "6%" }} />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginBottom: "6%" }}
          >
            <Photo src={Pic1} sx={{ width: "60%" }} />
            <Photo src={Pic2} sx={{ width: "36%" }} />
          </Box>
          <Photo src={Pic3} sx={{ marginBottom: "6%" }} />
          <Photo src={Pic5} />
        </Box>
      )}
    </PhotoContainer>
  );
};

export default Photowall;

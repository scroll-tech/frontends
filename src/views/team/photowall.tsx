import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Pic1 from "@/assets/images/homepage/team/pic_1.jpg";
import Pic1Webp from "@/assets/images/homepage/team/pic_1.webp";
import Pic2 from "@/assets/images/homepage/team/pic_2.jpg";
import Pic2Webp from "@/assets/images/homepage/team/pic_2.webp";
import Pic3 from "@/assets/images/homepage/team/pic_3.jpg";
import Pic3Webp from "@/assets/images/homepage/team/pic_3.webp";
import Pic4 from "@/assets/images/homepage/team/pic_4.jpg";
import Pic4Webp from "@/assets/images/homepage/team/pic_4.webp";
import Pic5 from "@/assets/images/homepage/team/pic_5.jpg";
import Pic5Webp from "@/assets/images/homepage/team/pic_5.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import WebpImage from "@/components/WebpImage";

const Photo = styled(WebpImage)(
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
            <Photo
              src={Pic1}
              webpSrc={Pic1Webp}
              sx={{ marginBottom: "3.86%" }}
            />
            <Photo
              src={Pic2}
              webpSrc={Pic2Webp}
              sx={{ marginBottom: "3.86%" }}
            />
            <Photo src={Pic3} webpSrc={Pic3Webp} />
          </Box>
          <Box sx={{ width: "56%" }}>
            <Photo
              src={Pic4}
              webpSrc={Pic4Webp}
              sx={{ marginBottom: "3.86%" }}
            />
            <Photo src={Pic5} webpSrc={Pic5Webp} />
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="column">
          <Photo src={Pic4} webpSrc={Pic4Webp} sx={{ marginBottom: "6%" }} />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginBottom: "6%" }}
          >
            <Box sx={{ width: "60%" }}>
              <Photo src={Pic1} webpSrc={Pic1Webp} sx={{ width: "100%" }} />
            </Box>
            <Box sx={{ width: "33.19%" }}>
              <Photo src={Pic2} webpSrc={Pic2Webp} sx={{ width: "100%" }} />
            </Box>
          </Box>
          <Photo src={Pic3} webpSrc={Pic3Webp} sx={{ marginBottom: "6%" }} />
          <Photo src={Pic5} webpSrc={Pic5Webp} />
        </Box>
      )}
    </PhotoContainer>
  );
};

export default Photowall;

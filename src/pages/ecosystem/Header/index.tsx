import { Button as MuiButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"
import PageHeader from "@/components/PageHeader"
import useIsMobile from "@/hooks/useIsMobile"

const Button = styled(MuiButton)<any>(
  ({ theme }) => `
    width: 20.8rem;
    height: 5rem;
    padding: 0;
  `,
)

const typeformLink = "https://scrollzkp.typeform.com/buildwithscroll"

const Header = () => {
  const { isMobileView } = useIsMobile()

  return (
    <PageHeader title="Scroll Ecosystem">
      {isMobileView ? (
        <>
          <Typography color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: "1.4rem", fontFamily: "Inter" }}>
            Want to join the Scroll ecosystem?{" "}
            <Link external href={typeformLink} sx={{ color: "primary.main", fontSize: "inherit" }}>
              Contact us
            </Link>
          </Typography>
          {/* <Typography color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: "1.4rem", fontFamily: "Inter", mt: "2rem" }}>
              Stay up to date with our{" "}
              <Link external href="" sx={{ color: "primary.main", fontSize: "inherit" }}>
                Ecosystem Roadmap
              </Link>
            </Typography> */}
        </>
      ) : (
        <>
          <Typography color="textSecondary" sx={{ fontSize: "2.2rem" }}>
            Want to join the Scroll ecosystem?
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mt: "3rem" }} justifyContent="center">
            <Button variant="contained" href={typeformLink} target="_blank">
              Contact us
            </Button>
            {/* <Button
                color="secondary"
                href=""
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Ecosystem Roadmap
              </Button> */}
          </Stack>
        </>
      )}
    </PageHeader>
  )
}

export default Header

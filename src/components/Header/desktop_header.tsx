import { NavLink } from "react-router-dom";
import * as React from "react";
import { ExpandMore } from "@mui/icons-material";
import { Box, Link, Button, Stack, Fade, Container } from "@mui/material";
import Logo from "@/components/Logo";
import { styled } from "@mui/system";
import { navigations, homeNavigations } from "./constants";
import { medias } from "@/constants/medias";

const StyledBox = styled(Stack)(
  ({ theme }) => `
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid ${theme.palette.border.main};
  `
);
const HeaderContainer = styled(Container)(
  ({ theme }) => `
   display: flex;
   justify-content: space-between;
   align-items: center;
   
  `
);

const MenuLinkButton = styled(Link)(
  ({ theme }) => `
  font-size: 16px;
  font-weight: 600;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 4px;
  margin-right: 4px;
  line-height: 82px;
  position: relative;
  color: #000;
  &:after {
    content: '';
    left: 0;
    right: 0;
    bottom: -2px;
    position: absolute;
    border-bottom: 0 solid ${theme.palette.action.active};
  }
  &:hover{
    color: ${theme.palette.action.active};
    &:after{
        border-bottom-width: 2px;
    }
  }
  &.active {
    color: ${theme.palette.action.active};
    &:after{
        border-bottom-width: 2px;
    }
  } 
`
);

const LinkStyledButton = styled(NavLink)(
  ({ theme }) => `
  font-size: 16px;
  font-weight: 600;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 4px;
  margin-right: 4px;
  line-height: 82px;
  position: relative;
  &:after {
    content: '';
    left: 0;
    right: 0;
    bottom: -2px;
    position: absolute;
    border-bottom: 0 solid ${theme.palette.action.active};
  }
  &:hover{
    color: ${theme.palette.action.active};
    &:after{
        border-bottom-width: 2px;
    }
  }
  &.active {
    color: ${theme.palette.action.active};
    &:after{
        border-bottom-width: 2px;
    }
  } 
`
);

const LinkStyledSubButton = styled(NavLink)(
  ({ theme }) => `
    font-weight: 600;
    color:  ${theme.palette.text.primary};
    padding-left: 26px;
    padding-right: 26px;
    white-space: nowrap;
    &:hover {
        color: ${theme.palette.action.active};
        background: rgba(51, 51, 51, 0.1);
    }
    &.active {
        color: ${theme.palette.action.active};
    } 
  `
);

const SubMenuButton = styled(Box)(
  ({ theme }) => `
    font-size: 16px;
    font-weight: 600;
    padding-left: 25px;
    padding-right: 25px;
    margin-left: 4px;
    margin-right: 4px;
    line-height: 82px;
    position: relative;
    cursor: pointer;
    &:after {
      content: '';
      left: 0;
      right: 0;
      bottom: -2px;
      position: absolute;
      border-bottom: 0 solid ${theme.palette.action.active};
    }
    &:hover{
      color: ${theme.palette.action.active};
    }
    &.active {
      color: ${theme.palette.action.active};
      &:after{
          border-bottom-width: 2px;
      }
    } 
  `
);

const SubMenuList = styled(Box)(
  ({ theme }) => `
    position: absolute;
    border: 1px solid ${theme.palette.border.main};
    left: 0;
    background: #ffffff;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    `
);

const LinkButton = styled(Link)(
  ({ theme }) => `
  font-weight: 600;
  color:  ${theme.palette.text.primary};
  padding-left: 26px;
  padding-right: 26px;
  white-space: nowrap;
  &:hover {
    color: ${theme.palette.action.active};
    background: rgba(51, 51, 51, 0.1);
  }
`
);

const MediaLink = styled("a")(
  ({ theme }) => `
        height: 1.9rem;
        width: 2.4rem;
        margin-right: 2.2rem;
        &:hover {
          opacity: 0.8;
        }
      `
);

const App = (props) => {
  const [checked, setChecked] = React.useState(false);
  const list = () => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {(props.isHomepage ? homeNavigations : navigations).map((item: any) => {
        return (
          <React.Fragment key={item.key}>
            {item.children ? (
              <SubMenuButton
                onMouseEnter={() => setChecked(true)}
                onMouseLeave={() => setChecked(false)}
                key={item.key}
              >
                {item.label} <ExpandMore sx={{ marginLeft: "6px" }} />
                <Fade in={checked}>
                  <SubMenuList onClick={() => setChecked(false)}>
                    {item.children?.map((subItem: any) =>
                      subItem.isExternal ? (
                        <LinkButton
                          underline="none"
                          key={subItem.label}
                          href={subItem.href}
                        >
                          {subItem.label}
                        </LinkButton>
                      ) : (
                        <LinkStyledSubButton
                          key={subItem.label}
                          to={subItem.href}
                        >
                          {subItem.label}
                        </LinkStyledSubButton>
                      )
                    )}
                  </SubMenuList>
                </Fade>
              </SubMenuButton>
            ) : item.isExternal ? (
              <MenuLinkButton underline="none" href={item.href} key={item.key}>
                {item.label}{" "}
              </MenuLinkButton>
            ) : (
              <LinkStyledButton to={item.href} key={item.key}>
                {item.label}{" "}
              </LinkStyledButton>
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );

  return (
    <StyledBox>
      <HeaderContainer>
        <NavLink to="/" className="flex">
          <Logo></Logo>
        </NavLink>
        <Box>{list()}</Box>
        {props.isHomepage ? (
          <Box display="flex" alignItems="center">
            {medias.map((media) => (
              <MediaLink
                href={media.href}
                target="_blank"
                key={media.name}
                sx={{
                  background: `url(${media.imgSrc}) center / contain no-repeat `,
                }}
                className={media.name}
              />
            ))}
            <Button
              color="primary"
              variant="contained"
              href="https://prealpha.scroll.io/"
            >
              Join Pre-Alpha Testnet
            </Button>
          </Box>
        ) : (
          <Button href="https://guide.scroll.io/">User Guide</Button>
        )}
      </HeaderContainer>
    </StyledBox>
  );
};

export default App;

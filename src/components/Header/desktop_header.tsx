import { NavLink } from "react-router-dom";
import * as React from "react";
import { ExpandMore } from "@mui/icons-material";
import { Box, Link, Button, Stack, Fade, Container } from "@mui/material";
import { styled } from "@mui/system";
import navigations from "./constans";

const StyledBox = styled(Stack)(
  ({ theme }) => `
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
const LinkStyledButton = styled(NavLink)(
  ({ theme }) => `
  font-size: 16px;
  font-weight: 600;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 4px;
  margin-right: 4px;
  line-height: 72px;
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
    line-height: 72px;
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

const App = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const list = () => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {navigations.map((item: any) => {
        return (
          <>
            {item.children ? (
              <SubMenuButton
                onMouseEnter={handleChange}
                onMouseLeave={handleChange}
                key={item.key}
              >
                {item.label} <ExpandMore sx={{ marginLeft: "6px" }} />
                <Fade in={checked}>
                  <SubMenuList>
                    {item.children?.map((subItem: any) =>
                      subItem.isExternal ? (
                        <LinkButton underline="none" href={subItem.href}>
                          {subItem.label}
                        </LinkButton>
                      ) : (
                        <LinkStyledSubButton to={subItem.href}>
                          {subItem.label}
                        </LinkStyledSubButton>
                      )
                    )}
                  </SubMenuList>
                </Fade>
              </SubMenuButton>
            ) : (
              <LinkStyledButton to={item.key} key={item.key}>
                {item.label}{" "}
              </LinkStyledButton>
            )}
          </>
        );
      })}
    </Stack>
  );

  return (
    <StyledBox>
      <HeaderContainer>
        <Link href="/" className="flex">
          <img
            src="https://scroll.io/img/logo_with_text.png"
            alt="logo"
            className="cursor-pointer w-[96px] h-auto"
          />
        </Link>
        <Box>{list()}</Box>
        <Button href="https://guide.scroll.io/">User Guide</Button>
      </HeaderContainer>
    </StyledBox>
  );
};

export default App;

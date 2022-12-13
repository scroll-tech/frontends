import { NavLink } from "react-router-dom";
import * as React from "react";
import {
  CloseRounded,
  OpenInNew,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Collapse,
  Box,
  SwipeableDrawer,
  List,
  ListItemButton,
  Link,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../Logo";
import { navigations, homeNavigations } from "./constants";

const NavStack = styled(Stack)(
  ({ theme }) => `
  height: 69px;
  line-height: 69px;
  border-bottom: 1px solid ${theme.palette.border.main};
  padding-left: 16px;
  padding-right: 16px;
`
);

const LinkStyledButton = styled(NavLink)(
  ({ theme }) => `
  width: 100%;
  &.active {
    color: ${theme.palette.action.active}
  } 
  &:hover {
    color: ${theme.palette.action.active}
  } 
  padding: 2rem 1.6rem;
`
);

const ExternalLink = styled(Link)(
  ({ theme }) => `
  color: ${theme.palette.text.primary}
  `
);

const ListButton = styled(ListItemButton)(
  ({ theme }) => `
  font-weight: 600;
  padding: 0;
`
);

const MenuContent = styled(Box)(
  ({ theme }) => `
      width: 280px;
      padding-top: 10px;
      padding-right: 10px;
`
);

const App = (props) => {
  const [open, setOpen] = React.useState(false);
  const [activeCollapse, setActiveCollapse] = React.useState("");

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const toggleCollapse = (collapse: string) => {
    setActiveCollapse(collapse === activeCollapse ? "" : collapse);
  };

  const list = () => (
    <List
      sx={{
        width: "100%",
        paddingLeft: "20px",
        fontSize: "16px",
      }}
      component="nav"
    >
      {(props.isHomepage ? homeNavigations : navigations).map((item) => {
        if (item.href) {
          return (
            <ListButton key={item.key} onClick={() => toggleDrawer(false)}>
              {item.isExternal ? (
                <ExternalLink underline="none" href={item.href}>
                  {item.label}
                </ExternalLink>
              ) : (
                <LinkStyledButton to={item.href}>{item.label}</LinkStyledButton>
              )}
            </ListButton>
          );
        }
        return (
          <React.Fragment key={item.key}>
            <ListButton onClick={() => toggleCollapse(item.key)}>
              {item.label}{" "}
              {activeCollapse === item.key ? (
                <ExpandLess fontSize="large" sx={{ marginLeft: "6px" }} />
              ) : (
                <ExpandMore fontSize="large" sx={{ marginLeft: "6px" }} />
              )}
            </ListButton>
            <Collapse
              in={activeCollapse === item.key}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.children?.map((subItem) =>
                  subItem.isExternal ? (
                    <ListButton
                      onClick={() => toggleDrawer(false)}
                      sx={{ pl: 4 }}
                      key={subItem.key}
                    >
                      <ExternalLink underline="none" href={subItem.href}>
                        {subItem.label}
                      </ExternalLink>
                      <OpenInNew sx={{ fontSize: 14, marginLeft: "10px" }} />
                    </ListButton>
                  ) : (
                    <ListButton
                      onClick={() => toggleDrawer(false)}
                      sx={{ pl: 4 }}
                      key={subItem.key}
                    >
                      <LinkStyledButton to={subItem.href}>
                        {subItem.label}
                      </LinkStyledButton>
                    </ListButton>
                  )
                )}
              </List>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );

  return (
    <>
      <NavStack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavLink to="/" className="flex">
          <Logo></Logo>
        </NavLink>
        <MenuIcon
          fontSize="large"
          sx={{ color: "text.primary" }}
          onClick={() => toggleDrawer(true)}
        />
      </NavStack>
      <Box>
        <SwipeableDrawer
          open={open}
          anchor="right"
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <MenuContent
            role="presentation"
            onKeyDown={() => toggleDrawer(false)}
          >
            <Stack sx={{ alignItems: "end" }}>
              <CloseRounded
                fontSize="large"
                onClick={() => toggleDrawer(false)}
              />
            </Stack>
            {list()}
            {props.isHomepage ? (
              <Button
                color="primary"
                variant="contained"
                href="https://prealpha.scroll.io/"
                sx={{ position: "relative", left: "2rem" }}
              >
                Join Pre-Alpha Testnet
              </Button>
            ) : (
              <Button
                sx={{ marginTop: "32px", marginLeft: "36px" }}
                href="https://guide.scroll.io/"
              >
                User Guide
              </Button>
            )}
          </MenuContent>
        </SwipeableDrawer>
      </Box>
    </>
  );
};

export default App;

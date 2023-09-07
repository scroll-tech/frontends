import { makeStyles } from "tss-react/mui"

import { Box, Card, CardContent, CardHeader } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  card: {
    borderRadius: "2.7rem",
    boxShadow: "unset",
    width: "100%",
  },
  cardHeader: {
    padding: "2.2rem 3rem",
    backgroundColor: theme.palette.themeBackground.normal,
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 1.6rem",
    },
  },
  cardHeaderTitle: {
    fontSize: "2rem",
  },
  cardContent: {
    padding: 0,
    marginTop: "1px",
    backgroundColor: theme.palette.themeBackground.normal,
    "&:last-child": {
      paddingBottom: 0,
    },
  },

  descriptionItem: {
    padding: "2.4rem 3rem",
    minHeight: "9rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 1.6rem",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1.5rem",
      minHeight: "unset",
    },
  },
  odd: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(249, 249, 249, 0.30)",
    },
  },
  even: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(249, 249, 249, 0.30)",
    },
  },
}))

const Descriptions = props => {
  const { title, children } = props
  const { classes } = useStyles()

  return (
    <Card sx={{ width: "1036px" }} classes={{ root: classes.card }}>
      <CardHeader title={title} classes={{ root: classes.cardHeader, title: classes.cardHeaderTitle }}></CardHeader>
      <CardContent classes={{ root: classes.cardContent }}>{children}</CardContent>
    </Card>
  )
}

const DescriptionItem = props => {
  const { children, odd, ...restProps } = props
  const { classes, cx } = useStyles()

  return (
    <Box className={cx(classes.descriptionItem, odd ? classes.odd : classes.even)} {...restProps}>
      {children}
    </Box>
  )
}

export { DescriptionItem }

export default Descriptions

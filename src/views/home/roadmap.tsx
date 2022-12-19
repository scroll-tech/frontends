import { Box, Typography } from "@mui/material";

import { styled } from "@mui/system";
import SuccessIcon from "@/assets/images/homepage/home/success.png";

const RoadmapList = styled("ul")(
  ({ theme }) => `
          width: 73rem;
          // background: #E1F4FE;
          border-radius: 0.5rem;
          box-shadow: rgb(0 0 0 / 15%) 5px 5px 3px;
          ${theme.breakpoints.down("md")} {
            width: 100%;
            margin-top: 6rem;
        };
        `
);
const RoadmapListItem = styled("li")(
  ({ theme }) => `
          display: flex;
          align-items: center;
          height: 8.3rem;
          border-bottom: 1px solid #ffcad5;
          position: relative;
          z-index: 1;
          &.active {
            z-index: 2;
          }
          &:after {
            content: " ";
            background: #E1F4FE;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
          }
          &:nth-last-of-type(1) {
            border-bottom: none;
          }
          &.active:after {
            left: -1rem;
            right: -1rem;
            top: -1px;
            bottom: -1px;
            background: #ffffff;
            box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
          }
        `
);

const RoadmapSuccessIcon = styled("img")(
  ({ theme }) => `
          height: 3.5rem;
          // margin-left: 13rem;
          margin-right: 2rem;
          ${theme.breakpoints.down("md")} {
            // margin-left: 2rem;
          };
        `
);

const RoadmapIndex = styled(Typography)(
  ({ theme }) => `
        font-weight: 600;
        text-align: left;
        ${theme.breakpoints.down("md")} {
            font-size: 1.4rem;
          };
        `
);

const RoadmapName = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        ${theme.breakpoints.down("md")} {
            text-align: left;
            padding-right: 3rem;
            line-height: 2.4rem;
          };
        `
);

const IconBox = styled(Box)(
  ({ theme }) => `
      text-align: right;
      width: 10vw;
      flex-shrink: 0;
      ${theme.breakpoints.down("md")} {
        width: 20vw;
      };
    `
);

const roadmaps = [
  {
    name: "zkEVM POC",
    completed: true,
  },
  {
    name: "Pre-Alpha Testnet",
    active: true,
    completed: true,
  },
  {
    name: "Alpha Testnet",
    completed: false,
  },
  {
    name: "zkEVM Mainnet",
    completed: false,
  },
  {
    name: "Decentralized Prover Network",
    completed: false,
  },
  {
    name: "Decentralized Sequencers",
    completed: false,
  },
];

const Roadmap = () => {
  return (
    <RoadmapList>
      {roadmaps.map((roadmap, idx) => (
        <RoadmapListItem key={idx} className={roadmap.active ? "active" : ""}>
          <IconBox>
            {roadmap.completed ? (
              <RoadmapSuccessIcon
                src={SuccessIcon}
                className={roadmap.active ? "active" : ""}
              />
            ) : null}
          </IconBox>
          <Box>
            <RoadmapIndex variant="body1">Phase {++idx}</RoadmapIndex>
            <RoadmapName variant="subtitle1">{roadmap.name}</RoadmapName>
          </Box>
        </RoadmapListItem>
      ))}
    </RoadmapList>
  );
};

export default Roadmap;

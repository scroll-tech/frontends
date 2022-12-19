import { Box, Typography, Button, Link } from "@mui/material";
import { styled } from "@mui/system";
import SandyAvatar from "@/assets/images/homepage/team/Sandy.jpg";
import SandyAvatarWebp from "@/assets/images/homepage/team/Sandy.webp";

import YeAvatar from "@/assets/images/homepage/team/Ye.jpg";
import YeAvatarWebp from "@/assets/images/homepage/team/Ye.webp";

import HaichenAvatar from "@/assets/images/homepage/team/Haichen.jpg";
import HaichenAvatarWebp from "@/assets/images/homepage/team/Haichen.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import WebpImage from "@/components/WebpImage";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Twitter as TwitterIcon } from "@mui/icons-material";

const UserName = styled(Typography)(
  ({ theme }) => `
    font-size: 2.4rem;
    font-family: 'Pulp Display';
    line-height: 4.6rem;
    letter-spacing: -0.25px;
    color: ${theme.palette.text.primary};
    `
);

const Avatar = styled(WebpImage)(
  ({ theme }) => `
        width: 13.6rem;
        height: 20rem;
        object-fit: contain;
          `
);

const AvatarCard = styled(Box)(
  ({ theme }) => `
       text-align: center;
       ${theme.breakpoints.down("md")} {
        margin-bottom: 4rem;
    };
          `
);

const users = [
  {
    name: "Sandy",
    position: "Co-founder",
    avatarImg: SandyAvatar,
    avatarWebpImg: SandyAvatarWebp,
    twitterLink: "https://twitter.com/SandyPeng1",
  },
  {
    name: "Haichen",
    position: "Co-founder",
    avatarImg: HaichenAvatar,
    avatarWebpImg: HaichenAvatarWebp,
    twitterLink: "https://twitter.com/shenhaichen",
  },
  {
    name: "Ye",
    position: "Co-founder",
    avatarImg: YeAvatar,
    avatarWebpImg: YeAvatarWebp,
    twitterLink: "https://twitter.com/yezhang1998",
  },
];

const UserCard = ({ user }) => (
  <AvatarCard>
    <Avatar src={user.avatarImg} webpsrc={user.avatarWebpImg} />
    <UserName>{user.name}</UserName>
    <Typography>{user.position}</Typography>
    <Link href={user.twitterLink}>
      <TwitterIcon
        sx={{
          color: "#333",
          height: "2.2rem",
          width: "2.2rem",
          marginTop: "1.7rem",
        }}
      />
    </Link>
  </AvatarCard>
);

const Avatars = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      className={isDesktop ? "wrapper" : ""}
      display="flex"
      justifyContent="space-around"
    >
      <Swiper
        slidesPerView={isDesktop ? 3 : 2}
        spaceBetween={isDesktop ? 0 : 8}
        centeredSlides={!isDesktop}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{ width: "100%" }}
      >
        {users.map((user) => (
          <SwiperSlide key={user.name}>
            <UserCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Avatars;

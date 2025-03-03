import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack, { StackProps } from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";

import Iconify from "@/src/components/iconify";
import { IAuthorProps } from "@/src/types/author";
// import { useResponsive } from "src/hooks/use-responsive";
// import { IBlogCategoryProps } from "src/types/blog";

// import Advertisement, { AdvertisementProps } from "../../advertisement";

import PostItemMobile from "./post-item-mobile";
// import { BlogData } from "../elearning/elearning-posts-page";
import { Box } from "@mui/material";
import { _socials } from "@/src/_mock";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  author?: IAuthorProps;
  popularTags?: string[];
  categories?: { category: string; defaultTags: string[] }[];
  // advertisement?: AdvertisementProps;
  // recentPosts?: {
  //   list: BlogData[];
  // };
}

export default function PostSidebar({
  author,
  categories,
  popularTags,
  // recentPosts,
  // advertisement,
  sx,
  ...other
}: Props) {
  // const mdUp = useResponsive("up", "md");

  const renderAuthor = author && (
    <Stack spacing={2} direction="row" sx={{ mb: { md: 5 } }}>
      <Avatar src={author.avatarUrl} sx={{ width: 64, height: 64 }} />

      <Stack>
        <Typography variant="h5">{author.name}</Typography>

        <Typography
          variant="body2"
          sx={{ mt: 0.5, mb: 2, color: "text.secondary" }}
        >
          {author.role}
        </Typography>

        <Stack direction="row">
          {_socials.map((social) => (
            <IconButton key={social.value}>
              <Iconify icon={social.icon} sx={{ color: social.color }} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );

  const renderCategories = categories && (
    <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>

      { categories.map((category, index) => (
          <Stack
            key={`${category}-${index}`}
            direction="row"
            alignItems="center"
          >
            <Box
              sx={{
                mr: 2,
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />

            <Typography variant="body2"  color="inherit">
              {category.category}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  // const renderRecentPosts = recentPosts && (
  //   <Stack spacing={3}>
  //     <Typography variant="h5">Recent Posts</Typography>

  //     {recentPosts.list.map((post) => (
  //       <PostItemMobile key={post.filename} post={post} onSiderbar />
  //     ))}
  //   </Stack>
  // );

  const renderPopularTags = popularTags && (
    <Stack spacing={3}>
      <Typography variant="h5">Popular Tags</Typography>

      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {popularTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="soft"
            size="small"
            onClick={() => {}}
          />
        ))}
      </Stack>
    </Stack>
  );

  return (
    <div>
      {renderAuthor}

      {(
        <TextField
          fullWidth
          hiddenLabel
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="carbon:search"
                  width={24}
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 0 },
          ...sx,
        }}
        {...other}
      >
        {renderCategories}

        {/* {renderRecentPosts} */}

        {renderPopularTags}

        {/* {advertisement && <Advertisement advertisement={advertisement} />} */}
      </Stack>
    </div>
  );
}

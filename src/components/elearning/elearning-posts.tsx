import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import PostItem from "./elearning-post-item";
import { BlogData } from "./elearning-posts-page";

// ----------------------------------------------------------------------

type Props = {
  posts: BlogData[];
};

export default function ElearningPosts({ posts }: Props) {
  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: "grid",
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
        }}
      >
        {(posts ?? []).map((post) => (
          <PostItem key={post.filename} post={post} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          py: { xs: 8, md: 10 },
          [`& .${paginationClasses.ul}`]: {
            justifyContent: "center",
          },
        }}
      />
    </>
  );
}

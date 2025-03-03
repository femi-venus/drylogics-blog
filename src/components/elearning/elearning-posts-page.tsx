import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import yaml from "js-yaml";
import ElearningPosts from "./elearning-posts";
import { Container, Grid } from "@mui/material";
import PostSearchMobile from "./common/post-search-mobile";
import PostSidebar from "./common/post-sidebar";

export const metadata = {
  title: "Posts",
};

// ✅ Type Definitions
export interface BlogData {
  title: string;
  publishedDate: string;
  tags: string[];
  filename: string;
  image?: string;
}

interface Category {
  category: string;
  defaultTags: string[];
}

interface BlogsData {
  blogs: BlogData[];
  categories: Category[];
}

export const getStaticProps = async () => {
  try {
    const blogs = await fetchBlogData(); 
    return {
      props: { blogs },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      props: { blogs: [] }, 
    };
  }
};

// ✅ Next.js Page Component
export default function ElearningPostsPage({ blogs, categories }: BlogsData) {
  console.log("✅ Blogs data:", blogs);

  return (
    <div>
      <PostSearchMobile />
      <Container sx={{ pt: 10 }}>
        <Grid container spacing={{ md: 8 }}>
          <Grid item xs={12} md={8}>
            <ElearningPosts posts={blogs} />
          </Grid>

          <Grid item xs={12} md={4}>
            <PostSidebar
              popularTags={Array.from(
                new Set((blogs ?? []).flatMap((blog) => blog.tags ?? []))
              )}
              categories={categories ?? []}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
function fetchBlogData() {
  throw new Error("Function not implemented.");
}


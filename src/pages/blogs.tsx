import { Container, Grid } from "@mui/material";
import ElearningPosts from "../components/elearning/elearning-posts";
import PostSearchMobile from "../components/elearning/common/post-search-mobile";
import PostSidebar from "../components/elearning/common/post-sidebar"; 
import { fetchBlogData } from "../../lib/s3"; 
import MainLayout from "../components/Layout";

export const metadata = {
  title: "Posts",
};

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
    const { blogs, categories } = await fetchBlogData(); 
    return {
      props: { blogs, categories },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      props: { blogs: [], categories: [] }, 
    };
  }
};

export default function BlogsPage({ blogs, categories }: BlogsData) {
  console.log("✅ Blogs data:", blogs);
  console.log("✅ Categories data:", categories);

  return (
     <MainLayout>
      <PostSearchMobile />
      <Container sx={{ pt: 10 }}>
        <Grid container spacing={{ md: 8 }}>
          <Grid item xs={12} md={8}>
            <ElearningPosts posts={blogs} />
          </Grid>

          <Grid item xs={12} md={4}>
            <PostSidebar
              categories={categories}
              popularTags={Array.from(
                new Set((blogs ?? []).flatMap((blog) => blog.tags ?? []))
              )}
            />
          </Grid>
        </Grid>
      </Container>
      </MainLayout>
  );
}

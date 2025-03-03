import { GetStaticProps, GetStaticPaths } from "next";
import MainLayout from "../../components/Layout";
import { Blog, BlogPostData } from "@/src/types/blog";
import { fetchBlogIndex, fetchBlogPost } from "@/lib/s3";
import { Container, Divider, Grid, MenuItem, Popover, Stack, Typography } from "@mui/material";
import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs";
import Markdown from "@/src/components/markdown";
import PostTags from "@/src/components/elearning/common/post-tags";
import PostSocialsShare from "@/src/components/elearning/common/post-socials-share";
import { useCallback, useState } from "react";
import Iconify from "@/src/components/iconify";
import Image from '@/src/components/image';


export const getStaticProps: GetStaticProps<{ post: BlogPostData }> = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== "string") {
    return { notFound: true };
  }

  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return { notFound: true }; 
  }

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogIndex = await fetchBlogIndex();

  const paths = blogIndex.map((post) => ({
    params: { slug: post.filename.replace(".yml", "") },
  }));

  return {
    paths,
    fallback: false, 
  };
};

interface BlogPostProps {
  post: Blog;
}

export default function BlogPost({ post }: BlogPostProps) {
  console.log("✅ Blog Post Data:", post);

   const [open, setOpen] = useState<HTMLElement | null>(null);
  
  
    const handleClose = useCallback(() => {
      setOpen(null);
    }, []);
  
  return (
    <MainLayout>
      <Divider />

      <Container sx={{ overflow: "hidden" }}>
        <CustomBreadcrumbs
          links={[
            { name: "Home", href: "/" },
            { name: "Blogs", href: "/blogs" },
            { name: post.title },
          ]}
          sx={{ my: 5 }}
        />

     { post.image &&(  <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}
        >

          <Image
            alt="hero"
            src={post.image}
            ratio={'21/9'}
            overlay={`linear-gradient(to bottom, black 0%, 
             black
            } 99%)`}
          />
        </Stack>)}

        <Grid container spacing={3} justifyContent={{ md: "center" }}>
          <Grid xs={12} md={8}>
            <Stack
              spacing={3}
              sx={{ pb: 6, textAlign: "center", pt: { xs: 6, md: 10 } }}
            >
              <Typography variant="h2" component="h1">
                {post.title}
              </Typography>

              <Typography variant="subtitle1">By {post.publishedBy}</Typography>
              <Typography variant="caption" color="text.secondary">
                {post.publishedDate}
              </Typography>
            </Stack>

            <Divider />

            <Markdown content={post.content} firstLetter sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, mb: 3 }} />

            <PostTags tags={post.tags} />

            <PostSocialsShare />

            <Divider sx={{ mt: 8 }} />
          </Grid>
        </Grid>
      </Container>

      {/* <ElearningLatestPosts posts={blogs} /> */}

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify
            icon="carbon:share"
            width={24}
            sx={{ mr: 1, color: "blue" }}
          />
          Share via Socials
        </MenuItem>
      </Popover>
    </MainLayout>
  );
}

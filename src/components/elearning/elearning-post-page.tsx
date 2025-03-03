// "use client";

// import { useState, useCallback, useEffect } from "react";

// import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
// import Popover from "@mui/material/Popover";
// import MenuItem from "@mui/material/MenuItem";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Image from '@/src/components/image';

// import Iconify from "@/src/components/iconify";
// // // import { fDate } from "src/utils/format-time";
// // import Markdown from "@/src/components/markdown";
// // import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

// import { BlogMetadata } from "./types";
// import { alpha, Fab, Grid, useTheme } from "@mui/material";
// // import { useResponsive } from "src/hooks/use-responsive";
// import PostTags from "./common/post-tags";
// import PostSocialsShare from "./common/post-socials-share";
// import ElearningLatestPosts from "./elearning-latest-posts";
// import { Blog, BlogPostData } from "@/src/types/blog";
// import CustomBreadcrumbs from "../custom-breadcrumbs";
// import Markdown from "../markdown";
// import { fetchBlogData } from "@/lib/s3";

// export const getStaticProps = async () => {
//   try {
//     const { blogs, categories } = await fetchBlogData(); 
//     return {
//       props: { blogs, categories },
//     };
//   } catch (error) {
//     console.error("Error fetching blog data:", error);
//     return {
//       props: { blogs: [], categories: [] }, 
//     };
//   }
// };

// export default function ElearningPostView({
//   title,
//   content,
//   publishedDate,
//   publishedBy,
//   tags,
//   image,
//   updatedDate,
// }: Blog,) {
//   const theme = useTheme();


//   const [open, setOpen] = useState<HTMLElement | null>(null);


//   const handleClose = useCallback(() => {
//     setOpen(null);
//   }, []);


//   return (
//     <div>
//       <Divider />

//       <Container sx={{ overflow: "hidden" }}>
//         <CustomBreadcrumbs
//           links={[
//             { name: "Home", href: "/" },
//             { name: "Blogs", href: "/blogs" },
//             { name: title },
//           ]}
//           sx={{ my: 5 }}
//         />

//      { image &&(  <Stack
//           alignItems="center"
//           justifyContent="center"
//           sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}
//         >

//           <Image
//             alt="hero"
//             src={image}
//             ratio={'21/9'}
//             overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
//               theme.palette.common.black
//             } 99%)`}
//           />
//         </Stack>)}

//         <Grid container spacing={3} justifyContent={{ md: "center" }}>
//           <Grid xs={12} md={8}>
//             <Stack
//               spacing={3}
//               sx={{ pb: 6, textAlign: "center", pt: { xs: 6, md: 10 } }}
//             >
//               <Typography variant="h2" component="h1">
//                 {title}
//               </Typography>

//               <Typography variant="subtitle1">By {publishedBy}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {publishedDate}
//               </Typography>
//             </Stack>

//             <Divider />

//             <Markdown content={content} firstLetter sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, mb: 3 }} />

//             <PostTags tags={tags} />

//             <PostSocialsShare />

//             <Divider sx={{ mt: 8 }} />
//           </Grid>
//         </Grid>
//       </Container>

//       <ElearningLatestPosts posts={blogs} />

//       <Popover
//         open={!!open}
//         onClose={handleClose}
//         anchorEl={open}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         transformOrigin={{ vertical: "top", horizontal: "center" }}
//         slotProps={{
//           paper: {
//             sx: { width: 220 },
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Iconify
//             icon="carbon:share"
//             width={24}
//             sx={{ mr: 1, color: "blue" }}
//           />
//           Share via Socials
//         </MenuItem>
//       </Popover>
//     </div>
//   );
// }
export{}
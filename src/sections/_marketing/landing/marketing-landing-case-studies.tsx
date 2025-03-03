import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { varHover, varTranHover } from "@/src/components/animate";
import Image from "@/src/components/image";
import TextMaxLine from "@/src/components/text-max-line";
import { Grid } from "@mui/material";

export default function MarketingFeatures() {

  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 10 },
        pb: 10,
      }}
      id="features"
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Typography variant="h2">Clients</Typography>
      </Stack>

      <Grid
        spacing={3}
        container
        alignItems="center"
        sx={{
          py: { xs: 8, md: 10 },
        }}
      >
        { (
          <Grid
            xs={6}
            md={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 3,
            }}
            p={1}
          >
            <SmallItem
              category=""
              title=""
              coverUrl="/assets/images/features/feature-2.jpg"
            />
            <SmallItem
              category=""
              title=""
              coverUrl="/assets/images/features/feature-1.jpg"
            />
          </Grid>
        )}

        <Grid container xs={12} sm={12} md={8} p={1}>
          {/* Nicest Section */}
          <Grid xs={6} md={9}  p={1}>
            {/* {mdUp ? ( */}
              <LargeItem
                category=""
                title="Nicest"
                description="Nicest.ai is an AI-powered sales platform that streamlines lead generation, content creation, and campaign management."
                coverUrl="/assets/images/features/nicest.png"
                subText="New York - USA"
              />
            {/* // ) : (
            //   <SmallItem
            //     category=""
            //     title="Nicest"
            //     coverUrl="/assets/images/features/nicest.png"
            //   />
            // )} */}
          </Grid>

          {/* Nicest Section */}
          { (
            <Grid xs={6} md={3} mt={6} p={1}>
              <SmallItem
                category=""
                title=""
                coverUrl="/assets/images/features/feature-5.jpg"
              />
            </Grid>
          )}
          
            <Grid xs={6} md={3} p={1}>
              <SmallItem
                category=""
                title=""
                coverUrl="/assets/images/features/feature-5.jpg"
              />
            </Grid>

          {/* <Grid xs={6} md={3.4}>
            <SmallItem
              category=""
              title=""
              coverUrl="/assets/images/features/feature-4.jpg"
            />
          </Grid> */}

          {/* Listenfirst Media Section */}
          <Grid xs={6} md={8.5} p={1}>
            {/* {mdUp ? ( */}
              <LargeItem
                category=""
                title="Listenfirst Media"
                description="ListenFirst is the premier social media analytics platform that seamlessly brings together everything you need to unlock social insights, optimize social media marketing, and maximize social media ROI."
                coverUrl="/assets/images/features/lfm.jpg"
                subText="New York - USA"
              />
            {/* ) : (
              <SmallItem
                category=""
                title="Listenfirst Media"
                coverUrl="/assets/images/features/lfm.jpg"
              />
            )} */}
          </Grid>

          {/* merkensoft Section */}
          <Grid xs={6} md={9} p={1}>
            {/* {mdUp ? ( */}
              <LargeItem
                category=""
                title="Merkensoft"
                description="Merkensoft is a CRM and SOM SaaS product for the textile industry, enabling efficient project tracking and workflow management."
                coverUrl="/assets/images/features/merks.svg"
                subText="Tirupur - India"
              />
            {/* ) : (
              <SmallItem
                category=""
                title="Merkensoft"
                coverUrl="/assets/images/features/merks.png"
              />
            )} */}
          </Grid>
          { (
            <Grid xs={6} md={3} height="100%" p={1}>
              <SmallItem
                category=""
                title=""
                coverUrl="/assets/images/features/feature-1.jpg"
              />
            </Grid>
          )}
          
        </Grid>
        { (
          <Grid
            xs={6}
            md={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 3,
            }}
            p={1} >
            <SmallItem
              category=""
              title=""
              coverUrl="/assets/images/features/feature-1.jpg"
            />
            <SmallItem
              category=""
              title=""
              coverUrl="/assets/images/features/feature-2.jpg"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

type LargeItemProps = {
  category: string;
  title: string;
  coverUrl: string;
  description: string;
  subText: string;
};

function LargeItem({
  category,
  title,
  coverUrl,
  description,
  subText,
}: LargeItemProps) {
  return (
    <Paper
      sx={{
        display: "grid",
        borderRadius: 2,
        boxShadow:"0px 10px 30px rgba(0,0,0,0.1)",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        },
      }}
    >
      <Box sx={{ m: 2 }}>
        <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 2 }}>
          <Image alt="cover" src={coverUrl} ratio="1/1" />
        </Box>
      </Box>

      <Stack
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{ p: 3, pt: 5, height: 1 }}
      >
        <div>
          <Typography variant="overline" sx={{ color: "primary.main" }}>
            {category}
          </Typography>

          <Typography variant="h4" sx={{ mt: 1 }}>
            {title}
          </Typography>

          <TextMaxLine
            variant="subtitle2"
            line={5}
            sx={{ mb: 2, color: "text.secondary" }}
          >
            {subText}
          </TextMaxLine>

          <TextMaxLine
            variant="body2"
            line={5}
            sx={{ color: "text.secondary" }}
          >
            {description}
          </TextMaxLine>
        </div>
      </Stack>
    </Paper>
  );
}

// ----------------------------------------------------------------------

type SmallItemProps = {
  category: string;
  title: string;
  coverUrl: string;
  square?: boolean;
};

function SmallItem({ category, title, coverUrl, square }: SmallItemProps) {
  const theme = useTheme();


  return (
    <Link href="">
      <Paper
        component={m.div}
        whileHover="hover"
        sx={{
          position: "relative",
          cursor: "pointer",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 1,
            height: 1,
            zIndex: 9,
            position: "absolute",
            color: "common.white",
            textAlign: "center",
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.48 }}>
            {category}
          </Typography>
          <Typography variant="h6">{title}</Typography>
        </Stack>

        <m.div variants={varHover(1.25)} transition={varTranHover()}>
          <Image
            alt="cover"
            src={coverUrl}
            ratio={(square && "1/1") || ( "3/4") || "1/1"}
            overlay={alpha(theme.palette.grey[900], 0.68)}
          />
        </m.div>
      </Paper>
    </Link>
  );
}

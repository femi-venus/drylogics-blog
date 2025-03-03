import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Image from '@/src/components/image';
import { fDate } from '@/src/utils/format-time';
import TextMaxLine from '@/src/components/text-max-line';
import { BlogData } from './elearning-posts-page';

type Props = {
  post: BlogData;
};

export default function ElearningPostItem({ post }: Props) {
  // const formatContent = (content: string) => {
  //   const textContent = content.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
  //   return textContent;
  // };
  const slug = post.filename?.replace('.yml', '');

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Image src={post.image} alt={post.title} ratio="1/1" />

      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{fDate(post.publishedDate, 'MMM')}</Typography>
          <Divider sx={{ mt: 1, mb: 0.5 }} />
          <Typography variant="h3">{fDate(post.publishedDate, 'dd')}</Typography>
        </Stack>

        <Stack spacing={1}>
          <Link href={`/blogs/${slug}`} passHref>
            <TextMaxLine variant="h6" persistent>
              {post.title}
            </TextMaxLine>
          </Link>

          {/* <TextMaxLine variant="body2" persistent color="text.secondary">
            {formatContent(post.content).substring(0, 100)}...  
          </TextMaxLine> */}

          <Stack spacing={1.5} direction="row" alignItems="center" sx={{ pt: 1.5 }}>
            {/* <Avatar>{post.publishedBy.charAt(0)}</Avatar> */}
            <Stack>
              {/* <Typography variant="body2">{post.publishedBy}</Typography> */}
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fDate(post.publishedDate, 'PPpp')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

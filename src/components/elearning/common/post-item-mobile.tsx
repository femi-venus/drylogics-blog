import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Image from '@/src/components/image';
// import { fDate } from 'src/utils/format-time';
import TextMaxLine from '@/src/components/text-max-line';

import PostTimeBlock from './post-time-block';
import { BlogData } from '@/src/types/blog';

// ----------------------------------------------------------------------

type Props = {
  post: BlogData;
  onSiderbar?: boolean;
};

export default function PostItemMobile({ post, onSiderbar }: Props) {
  const slug = post.filename?.replace('.yml', '');
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={post.title}
        src={post.image}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit" href={`/blogs/${slug}`}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{post.title}</TextMaxLine>
        </Link>

        <PostTimeBlock createdAt={(post.publishedDate)}  />
      </Stack>
    </Stack>
  );
}

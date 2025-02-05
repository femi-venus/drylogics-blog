import React, { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Card, Stack, Typography, TextField, FormControlLabel, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  title: string;
  description: string;
  content: string;
  coverUrl: File | null;
};

function NewBlogForm() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    coverUrl: Yup.mixed()
      .test('fileType', 'Cover is required', (value) => value !== null)
      .nullable(), 
  });

  const defaultValues = useMemo(() => ({
    title: '',
    description: '',
    content: '',
    coverUrl: null,
  }), []);

  const methods = useForm<FormValues>({
    // resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue, reset, formState: { isSubmitting, isValid } } = methods;
  const values = watch();

  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      navigate('/blog');
      console.log('Submitted Data:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('coverUrl', file);
    }
  }, [setValue]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, ml:50, mt:25}}>
      <Grid container spacing={3}>
        {/* Post Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <TextField
                label="Post Title"
                variant="outlined"
                fullWidth
                {...methods.register('title')}
                error={!!methods.formState.errors.title}
                helperText={methods.formState.errors.title?.message}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                {...methods.register('description')}
                error={!!methods.formState.errors.description}
                helperText={methods.formState.errors.description?.message}
              />
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                {...methods.register('content')}
                error={!!methods.formState.errors.content}
                helperText={methods.formState.errors.content?.message}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                Upload Cover Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleDrop(Array.from(e.target.files!) || [])}

                />
              </Button>
              {values.coverUrl && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {values.coverUrl.name}
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ ml: 70 }}
            disabled={!isValid}
          >
            Create Post
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewBlogForm;

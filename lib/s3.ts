import { BlogPostData } from "@/src/types/blog";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import yaml from "js-yaml";

// ✅ Initialize S3 Client (Ensuring Credentials are Defined)
const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1", // Fallback to a default region
  credentials: fromEnv(), // Uses environment variables securely
});

// ✅ Helper Function to Fetch YAML Data from S3
async function fetchYamlFile(bucketName: string, key: string) {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const response = await s3.send(command);

    // ✅ Ensure Body exists before processing
    if (!response.Body) {
      throw new Error(`Empty response body for ${key}`);
    }

    const yamlText = await response.Body.transformToString();
    return yaml.load(yamlText) || []; // ✅ Return empty array if YAML is empty
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
    return []; // ✅ Return empty array on error
  }
}

// ✅ Fetch Blog Data & Categories
export async function fetchBlogData() {
  const bucketName = "drylogics-website";

  try {
    // ✅ Fetch blogs & categories in parallel
    const [blogs, categories] = await Promise.all([
      fetchYamlFile(bucketName, "blogs/index.yml"),
      fetchYamlFile(bucketName, "blogs/categories.yml"),
    ]);

    return { blogs, categories };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { blogs: [], categories: [] }; // ✅ Return default values on error
  }
}


export async function fetchBlogPost(slug: string): Promise<BlogPostData | null> {
  const bucketName = "drylogics-website";
  const key = `blogs/${slug}.yml`;

  const blog = await fetchYamlFile (bucketName, key);
  return blog as BlogPostData;
}

// ✅ Fetch Blog Index from `index.yml`
export async function fetchBlogIndex(): Promise<BlogPostData[]> {
  const bucketName = "drylogics-website";
  const indexKey = "blogs/index.yml"; 

  const blogs = await fetchYamlFile (bucketName, indexKey);
  return Array.isArray(blogs) ? blogs : []; // ✅ Ensure return type is always an array
}
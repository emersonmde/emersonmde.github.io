import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    language: z.enum(['rust', 'c', 'typescript', 'python', 'java']),
    shortDescription: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().url(),
    demo: z.string().url().optional(),
    docs: z.string().url().optional(),
    crate: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { blog, projects };

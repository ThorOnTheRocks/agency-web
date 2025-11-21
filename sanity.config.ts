import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { postType } from './src/sanity/schemaTypes/post';
import { projectType } from './src/sanity/schemaTypes/project';

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Admin',
  projectId: '3vo8t19p',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [postType, projectType],
  },
});

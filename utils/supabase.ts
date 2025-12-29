import { writeFile } from 'fs/promises';
import path from 'path';

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  // Convert File to Buffer
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Write to public/products
  const uploadDir = path.join(process.cwd(), 'public', 'products');
  const filePath = path.join(uploadDir, newName);

  await writeFile(filePath, buffer);

  // Return public URL
  return `/products/${newName}`;
};

// Mock Supabase export if needed by other files (though unused now)
export const supabase = null;

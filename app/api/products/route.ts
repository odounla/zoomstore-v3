import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/utils/supabase';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    try {
        const products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: search } },
                    { company: { contains: search } },
                ],
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const company = formData.get('company') as string;
        const price = Number(formData.get('price'));
        const image = formData.get('image') as File;
        const description = formData.get('description') as string;
        const featured = formData.get('featured') === 'true';

        // We probably need a default category if not provided, or fetch the first one
        // For now let's assume categoryId is passed, or fallback
        let categoryId = formData.get('categoryId') as string;

        if (!categoryId) {
            const defaultCategory = await db.category.findFirst();
            categoryId = defaultCategory?.id || '';
        }

        // Basic validation
        if (!name || !company || !price || !image) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Upload Image
        const fullPath = await uploadImage(image);

        const product = await db.product.create({
            data: {
                name,
                company,
                description: description || '',
                featured: featured || false,
                image: fullPath,
                price,
                categoryId,
                clerkId: 'api-user',
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

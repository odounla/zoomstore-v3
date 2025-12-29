const BASE_URL = 'http://localhost:3001/api';

async function testApi() {
    try {
        console.log('--- Testing Categories API ---');
        // 1. Get Categories
        console.log('Fetching categories...');
        const categoriesRes = await fetch(`${BASE_URL}/categories`);
        const categories = await categoriesRes.json();
        console.log(`Found ${categories.length} categories.`);

        // 2. Create Category
        console.log('Creating new category "Electronics"...');
        const newCatRes = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            body: JSON.stringify({ name: 'Electronics' }),
        });
        const newCat = await newCatRes.json();
        console.log('Created Category:', newCat.name, newCat.id);

        console.log('\n--- Testing Products API ---');
        // 3. Get Products
        console.log('Fetching products...');
        const productsRes = await fetch(`${BASE_URL}/products`);
        const products = await productsRes.json();
        console.log(`Found ${products.length} products.`);

        // 4. Create Product
        console.log('Creating new product...');
        const newProdRes = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            body: JSON.stringify({
                name: 'Gaming Mouse',
                company: 'Logitech',
                price: 50,
                image: 'https://example.com/mouse.jpg',
                categoryId: newCat.id,
                description: 'High precision gaming mouse',
                featured: true
            }),
        });

        if (!newProdRes.ok) {
            console.error('Failed to create product:', await newProdRes.text());
            return;
        }

        const newProd = await newProdRes.json();
        console.log('Created Product:', newProd.name, newProd.id);

        // 5. Update Product
        console.log('Updating product price...');
        const updateRes = await fetch(`${BASE_URL}/products/${newProd.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ price: 75 }),
        });
        const updatedProd = await updateRes.json();
        console.log('Updated Price:', updatedProd.price);

        // 6. Delete Product
        console.log('Deleting product...');
        const deleteRes = await fetch(`${BASE_URL}/products/${newProd.id}`, {
            method: 'DELETE'
        });
        console.log('Delete status:', deleteRes.status);

        console.log('\n--- API Verification Complete ---');

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testApi();

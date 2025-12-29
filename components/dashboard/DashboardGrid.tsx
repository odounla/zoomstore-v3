import { fetchAllProducts } from '@/utils/actions';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';

export default async function DashboardGrid() {
    const products = await fetchAllProducts({ search: '' });

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                <h3 className="text-xl font-semibold text-gray-500">Collection Empty</h3>
                <p className="text-sm text-gray-400 mt-2">Use the Quick Add form to build your catalog.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group relative bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    {/* Image Aspect Ratio wrapper */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-white/5">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                        {/* Floating Price Tag */}
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            {formatCurrency(product.price)}
                        </div>
                    </div>

                    <div className="p-5">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{product.company}</p>

                        <Link
                            href={`/products/${product.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wide hover:underline cursor-pointer"
                        >
                            View Details <LuArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

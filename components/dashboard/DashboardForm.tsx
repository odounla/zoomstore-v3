'use client';

import { LuImagePlus, LuLoader, LuCheck, LuPlus } from 'react-icons/lu';
import { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function DashboardForm() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create product');
            }

            toast({
                title: 'Success!',
                description: 'Product added via API.',
                className: 'bg-green-500 text-white border-green-600',
            });

            setPreview(null);
            form.reset();
            router.refresh();

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: 'Error',
                description: error.message,
            });
        } finally {
            setPending(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden dark:bg-black/30 dark:border-white/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 opacity-80" />

            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                    Quick Add
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">API-First: Submits to /api/products</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Modern Sofa"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="0"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Company</label>
                    <input
                        type="text"
                        name="company"
                        placeholder="Brand or Manufacturer"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        required
                    />
                </div>

                <input type="hidden" name="description" value="Added via API" />
                <input type="hidden" name="description" value="Added via API" />

                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10">
                    <input
                        type="checkbox"
                        name="featured"
                        value="true"
                        id="featured"
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        Feature on Homepage
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Image</label>
                    <div
                        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-300 h-48 flex flex-col items-center justify-center text-center p-4 
                ${isDragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/5'}
             `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                        />

                        {preview ? (
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-medium text-sm">Click to change</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <LuImagePlus className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium">Click or Drag Image Here</p>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={pending}
                    className={`w-full py-3 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed ${pending ? 'bg-primary/80' : 'bg-primary hover:bg-primary/90'
                        }`}
                >
                    {pending ? (
                        <>
                            <LuLoader className='w-5 h-5 animate-spin' />
                            <span>Publishing...</span>
                        </>
                    ) : (
                        <>
                            <LuPlus className='w-5 h-5' />
                            <span>Add to Collection</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

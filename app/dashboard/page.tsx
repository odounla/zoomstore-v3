import DashboardForm from '@/components/dashboard/DashboardForm';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { Separator } from '@/components/ui/separator';
import { requireAdminUser } from '@/utils/auth';

export default async function DashboardPage() {
    await requireAdminUser();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply filter opacity-50 animate-blob" />
            <div className="absolute top-0 -right-64 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply filter opacity-50 animate-blob animation-delay-2000" />

            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Archive.</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-2xl">
                        Curate your digital boutique. Add new pieces to your collection and manage your inventory in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Form (Sticky on Desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <DashboardForm />
                    </div>

                    {/* Right Column: Grid */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                Your Collection
                                <span className="text-xs font-normal px-2 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500">Live Preview</span>
                            </h2>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800 ml-4"></div>
                        </div>

                        <DashboardGrid />
                    </div>
                </div>
            </main>
        </div>
    );
}

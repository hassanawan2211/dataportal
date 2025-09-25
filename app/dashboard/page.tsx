'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { LogOut, User, Shield, Database, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
            } else {
                setUser(user)
            }
            setLoading(false)
        }
        checkUser()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="bg-card border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Database className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-semibold">DataPortal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{user?.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome back to your DataPortal</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">Total Analytics</p>
                                <p className="text-2xl font-bold">1,248</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">Security Status</p>
                                <p className="text-2xl font-bold">Active</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">User Since</p>
                                <p className="text-2xl font-bold">
                                    {new Date(user?.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Hello, {user?.email?.split('@')[0]}!</h2>
                    <p className="opacity-90">Welcome to your professional dashboard. Everything is looking great today.</p>
                </div>
            </main>
        </div>
    )
}

"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AuthChecker({ children }: { children: React.ReactNode }) {
    const { role, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && role !== 'user') {
            if (role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
        }
    }, [role, router, isLoading]);

    if (isLoading || role !== 'user') {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}

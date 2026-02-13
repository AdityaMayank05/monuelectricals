"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
    const convex = useMemo(() => {
        const url = process.env.NEXT_PUBLIC_CONVEX_URL;
        // Fallback URL to prevent build errors during Vercel deployment if env var is missing
        return new ConvexReactClient(url ?? "https://placeholder.convex.cloud");
    }, []);

    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

'use client'

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="
                w-[400px] h-[360px] rounded-3xl bg-white mb-5 p-4 ms-5
                shadow-lg border border-[#e5e5e5] drop-shadow-md
                transition-all duration-500 ease-in-out scale-100
                hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:scale-105 hover:bg-yellow-100
            "
        >
            {children}
        </div>
    );
}

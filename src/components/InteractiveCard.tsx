'use client'

export default function InteractiveCard({ children }: { children: React.ReactNode }) {

    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg', 'bg-white', 'scale-100');
            event.currentTarget.classList.add('shadow-[0_10px_40px_rgba(0,0,0,0.2)]', 'bg-gradient-to-br', 'from-[#fdf6e3]', 'to-[#f5deb3]', 'scale-105');
        } else {
            event.currentTarget.classList.remove('shadow-[0_10px_40px_rgba(0,0,0,0.2)]', 'bg-gradient-to-br', 'from-[#fdf6e3]', 'to-[#f5deb3]', 'scale-105');
            event.currentTarget.classList.add('shadow-lg', 'bg-white', 'scale-100');
        }
    }

    return (
        <div
            className="w-[400px] h-[360px] rounded-3xl shadow-lg bg-white mb-5 p-4 drop-shadow-md ms-5 transition-all duration-500 ease-in-out scale-100 backdrop-blur-md border border-[#e5e5e5]"
            onMouseOver={onCardMouseAction}
            onMouseOut={onCardMouseAction}
        >
            {children}
        </div>
    );
}
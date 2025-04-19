'use client'

export default function InteractiveCard({ children }: { children: React.ReactNode }) {

    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg', 'bg-white', 'scale-100');
            event.currentTarget.classList.add('shadow-2xl', 'bg-green-100', 'scale-105');
        } else {
            event.currentTarget.classList.remove('shadow-2xl', 'bg-green-100', 'scale-105');
            event.currentTarget.classList.add('shadow-lg', 'bg-white', 'scale-100');
        }
    }

    return (
        <div
            className="w-[400px] h-[260px] rounded-3xl shadow-lg bg-white mb-5 p-4 drop-shadow-md ms-5 transition-all duration-300 ease-in-out scale-100"
            onMouseOver={onCardMouseAction}
            onMouseOut={onCardMouseAction}
        >
            {children}
        </div>
    );
}
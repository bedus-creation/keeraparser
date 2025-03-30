export function Error({ message }: { message?: string }) {
    if (!message) {
        return '';
    }
    return <span className="mt-1 block text-sm text-red-500">{message}</span>;
}

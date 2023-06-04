export async function sleep(miliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({}), miliseconds);
    });
}

export function getFormattedDate(date: Date) {
    return `${date.getUTCDate().toString().padStart(2, "0")}/${date.getUTCMonth().toString().padStart(2, "0")}/${date.getUTCFullYear().toString().padStart(4, "0")}`;
}
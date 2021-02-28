export const timestampParser = (tsp) => {
    let options = {
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    let date = new Date(tsp).toLocaleDateString('fr-FR', options);
    return date.toString();
};

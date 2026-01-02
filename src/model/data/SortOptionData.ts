export type SortOption = {
    type: string;
    description: string;
    sortedBy: 'name' | 'price';
    direction?: 'asc' | 'desc';
}

export const sortOptions: SortOption[] = [
    {
        type: 'az',
        description: 'Name (A to Z)',
        sortedBy: 'name'
    },
    {
        type: 'za',
        description: 'Name (Z to A)',
        sortedBy: 'name',
        direction: 'desc'
    },
    {
        type: 'lohi',
        description: 'Price (low to high)',
        sortedBy: 'price',
        direction: 'asc'
    },
    {
        type: 'hilo',
        description: 'Price (high to low)',
        sortedBy: 'price',
        direction: 'desc'
    }
];
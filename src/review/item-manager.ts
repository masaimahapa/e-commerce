interface Item {
    id: string;
    name: string;
}

class ItemManager {
    private items: Item[];

    constructor() {
        this.items = [];
    }

    addItem(item: Item): void {
        if (!item.id || !item.name) {
            throw new Error('Item must have an id and a name');
        }
        this.items.push(item);
    }

    getItem(id: string): Item | undefined {
        return this.items.find(item => item.id === id);
    }

    removeItem(id: string): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }

    getAllItems(): ReadonlyArray<Item> {
        return this.items;
    }
}
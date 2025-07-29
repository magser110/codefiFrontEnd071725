

export class Book {
    readonly id!: number;
    // id: number = 0;
    title: string = '';
    author: string = '';
    read: boolean = false;

    constructor(init?: Partial<Omit<Book, 'id' >>){
        Object.assign(this, init);
    }
}

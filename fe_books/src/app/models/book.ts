export class Book {
    // readonly id!: number;
    id!: number;
    title: string = '';
    author: string = '';
    read: boolean = false;
    cover_image_url: string = '';
	
    // constructor(init?: Partial<Omit<Book, 'id' >>){
    //     Object.assign(this, init);
    // }
}

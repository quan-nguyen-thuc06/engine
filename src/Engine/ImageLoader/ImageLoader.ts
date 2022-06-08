export class ImageLoader {
    images!: Map<string, HTMLImageElement>;
    constructor(){
        this.images = new Map<string, HTMLImageElement>();
    }
    async addImage(src: string, name: string){
        var img = new Image();
        img.src = src;
        this.images.set(name, img);
        return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject; 
        })
    }
    getImage(name: string): HTMLImageElement {
        if(this.images.has(name))
            return this.images.get(name)!;
        return new Image();
    }
}
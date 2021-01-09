import { Image } from './../interface/image.model';

export class ImageUtils {
    public static getComicThumbnailUrl(thumbnail: Image): string {
        return `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
    }
}
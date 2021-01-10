import { Image } from './../interface/image.model';

export class ImageUtils {
    public static getThumbnailUrl(thumbnail: Image): string {
        return `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
    }
}

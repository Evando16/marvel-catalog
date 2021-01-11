import { Image } from './../interface/image.model';

export class ImageUtils {
    // Improve this point to slow connection
    // Lazy load of images: https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
    public static getThumbnailUrl(thumbnail: Image): string {
        return `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
    }
}

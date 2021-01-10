import { ImageUtils } from './image.utils';

import { TestBed } from '@angular/core/testing';
import { Image } from '../interface/image.model';

describe('ImageUtils', () => {
    let imageUtils: ImageUtils;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ImageUtils]
        });
        imageUtils = TestBed.inject(ImageUtils);
    });

    describe('Unit tests', () => {
        it('should be created', () => {
            expect(imageUtils).toBeTruthy();
        });

        it('should get thumbnail url formatted', () => {
            const thumbnail: Image = {
                extension: 'jpg',
                path: 'http://thumbnail-url'
            };

            expect(ImageUtils.getThumbnailUrl(thumbnail)).toEqual('http://thumbnail-url/portrait_incredible.jpg');
        });
    });
});

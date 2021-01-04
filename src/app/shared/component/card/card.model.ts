import { CardDetailType } from './card-detail-type.enum';
import { Image } from './../../interface/image.model';

export interface Card {
    id: number;
    title: string;
    description?: string;
    thumbnail?: Image;
    author?: Author[];
    detail?: Detail[];
}

export interface Author {
    name: string;
    role: string;
}

export interface Detail {
    name: string;
    description?: string;
    detailType: CardDetailType;
}

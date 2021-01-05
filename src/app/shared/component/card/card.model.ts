import { CardDetailType } from './card-detail-type.enum';

export interface Card {
    id: number;
    title: string;
    shortDescription?: string;
    description?: string;
    thumbnailUrl?: string;
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

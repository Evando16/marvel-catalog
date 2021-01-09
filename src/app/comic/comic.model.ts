import { Image } from './../shared/interface/image.model';

export interface ComicListItem {
    id: number;
    title: string;
    thumbnail: Image;
}

export interface CreatorList {
    items: Creator[];
}

export interface Creator {
    name: string;
    role: string;
}

export interface CharacterList {
    items: Character[];
}

export interface Character {
    name: string;
}

export interface ComicDetails {
    id: number;
    title: string;
    description: string;
    thumbnail: Image;
    creators: Creator[];
    characters: Character[];
}

export interface ComicHttpDetails {
    id: number;
    title: string;
    description: string;
    thumbnail: Image;
    creators: CreatorList;
    characters: CharacterList;
}

export interface ComicDetailsStaff {
    roleName: string;
    creator: string[];
}

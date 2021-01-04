import { Image } from './../shared/interface/image.model';

export interface ComicRequest {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
}

export interface Comic {
    id: number;
    title: string;
    description: string;
    thumbnail: Image;
    creators: CreatorList[];
    characters: CharacterList[];
}

export interface CreatorList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Creator[];
}

export interface Creator {
    name: string;
    role: string;
}

export interface CharacterList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Character[];
}

export interface Character {
    resourceURI: string;
    name: string;
    role: string;
}
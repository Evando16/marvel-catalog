import { Image } from "../shared/interface/image.model";

export interface CharacterHttp {
    id: number;
    name: string;
    thumbnail: Image;
}


export interface Character {
    id: number;
    name: string;
    thumbnail: Image;
}
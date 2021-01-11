import { ComicDetailsStaff, Creator } from './../comic.model';
import { ImageUtils } from './../../shared/utils/image.utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ComicDetails } from '../comic.model';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-details',
  template: `
    <section *ngIf="!!comic" class="marvel-comic-details">
      <div class="marvel-comic-details__container">
        <div class="marvel-comic-details__comic-header mb-40">
          <img [src]="thumbnailURL" [alt]="comic.title">
          <div>
            <b>{{comic.title}}</b>
            <p class="marvel-comic-details__comic-header--subtitle">
              {{comic.description}}
            </p>
          </div>
        </div>

        <b>STAFF</b>
        <div class="marvel-comic-details__comic-staff mb-24">
          <div *ngFor="let item of staff" class="marvel-comic-details__staff-group">
            <p class="marvel-comic-details__role">{{item.roleName}}</p>
            <span *ngFor="let creatorName of item.creator; index as index">
              {{creatorName}}
              <span *ngIf="index !== item.creator.length - 1" class="mr-8">,</span>
            </span>
          </div>
          <p *ngIf="comic.creators.length === 0" id="marvel-comic-details__no-comic-staff">
            No Staff registred for this comic
          </p>
        </div>

        <b>CHARACTERS</b>
        <div class="marvel-comic-details__comic-characters">
          <div *ngFor="let character of comic.characters;index as index">
            <span>
              {{character.name}}
              <span *ngIf="index !== comic.characters.length - 1" class="mr-8">,</span>
            </span>
          </div>
          <p *ngIf="comic.characters.length === 0" id="marvel-comic-details__no-comic-character">
            No Characters registred for this comic
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./comic-details.component.scss']
})
export class ComicDetailsComponent implements OnInit {
  public comic!: ComicDetails;
  public thumbnailURL!: string;
  public staff!: ComicDetailsStaff[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly comicService: ComicService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      this.comic = await this.comicService.getComicById(+params.id);
      this.thumbnailURL = ImageUtils.getThumbnailUrl(this.comic.thumbnail);
      this.staff = this.getComicStaff(this.comic.creators);
    });
  }

  private getComicStaff(creators: Creator[]): ComicDetailsStaff[] {
    const uniqueRoles: string[] = [];
    const newStaffValue: ComicDetailsStaff[] = [];

    creators.forEach((creator: Creator) => {
      if (!uniqueRoles.includes(creator.role)) {
        const role = creator.role.toUpperCase();
        uniqueRoles.push(creator.role);

        newStaffValue.push({
          roleName: role,
          creator: creators.filter((author: Creator) => creator.role === author.role).map((c: Creator) => c.name)
        });
      }
    });

    return newStaffValue;
  }
}

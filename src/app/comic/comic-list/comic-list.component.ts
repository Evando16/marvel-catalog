import { Comic, ComicRequest } from './../comic.model';
import { ComicService } from './../comic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic-list',
  template: `
  <marvel-card></marvel-card>
  <!-- <div *ngFor="let item of comics"> {{item | json}}</div> -->
  `,
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  public comics: Comic[] = [];

  constructor(private readonly comicService: ComicService) { }

  public ngOnInit(): void {
    // this.comicService.getComics().subscribe((data: ComicRequest) => {
    //   this.comics = data.results
    // });
  }

}

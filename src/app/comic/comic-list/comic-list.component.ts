import { Comic, ComicRequest } from './../comic.model';
import { ComicService } from './../comic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic-list',
  template: `
  <p>comic-list works!</p>
  <div *ngFor="let item of comics"> {{item | json}}</div>
  `,
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  public comics: Comic[] = [];

  constructor(private readonly comicService: ComicService) { }

  public ngOnInit(): void {
    this.comicService.getComics().subscribe((data: ComicRequest) => {
      debugger
      this.comics = data.results
    });
  }

}

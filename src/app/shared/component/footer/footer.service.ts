import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footer!: string ;

  public setFooter(footerHtml: string): void {
    this.footer = footerHtml;
  }

  public getFooter(): string {
    return this.footer;
  }
}

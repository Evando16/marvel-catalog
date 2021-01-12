import { PaginatorPageDirection } from './paginator.enum';
import { Paginator } from './paginator.model';
import { MarvelSelectFieldOption } from './../select-field/select-field.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

const itemsPerPageOptions: MarvelSelectFieldOption[] = [
  {
    value: 1,
    description: 'option test'
  }
];

const paginator: Paginator = { page: 1, itemsPerPage: +itemsPerPageOptions[0].value };

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.itemsPerPageOptions = [...itemsPerPageOptions];
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should start component with page one and first items per page option value', () => {
      component.itemsPerPageOptions = [...itemsPerPageOptions];

      component.ngOnInit();
      expect(component.paginator).toEqual(paginator);
    });

    it('should change to next page', () => {
      const expectedPaginator: Paginator = { ...paginator, page: 2 };
      const paginatorChangeSpy = spyOn(component.paginatorChange, 'emit');
      component.paginator = { ...paginator };
      component.changePage(PaginatorPageDirection.NEXT);

      expect(component.paginator).toEqual(expectedPaginator);
      expect(paginatorChangeSpy).toHaveBeenCalledWith(expectedPaginator);
    });

    it('should change to previous page', () => {
      const expectedPaginator: Paginator = { ...paginator, page: 1 };
      const paginatorChangeSpy = spyOn(component.paginatorChange, 'emit');
      component.paginator = { ...paginator, page: 2 };
      component.changePage(PaginatorPageDirection.PREVIOUS);

      expect(component.paginator).toEqual(expectedPaginator);
      expect(paginatorChangeSpy).toHaveBeenCalledWith(expectedPaginator);
    });

    it('should not change when pass a invalid page direction', () => {
      const paginatorChangeSpy = spyOn(component.paginatorChange, 'emit');
      component.paginator = { ...paginator };
      component.changePage('invalid direction');

      expect(component.paginator).toEqual(paginator);
      expect(paginatorChangeSpy).toHaveBeenCalledWith(paginator);
    });

    it('should emit change when items per page change', () => {
      const paginatorChangeSpy = spyOn(component.paginatorChange, 'emit');
      component.paginator = { ...paginator };
      component.onChangeItemsPerPage('50');

      expect(component.paginator).toEqual({ ...paginator, itemsPerPage: 50 });
      expect(component.paginator.page).toEqual(1);
      expect(paginatorChangeSpy).toHaveBeenCalledWith({ ...paginator, itemsPerPage: 50 });
    });

    it('should disable previous button', () => {
      const total = 100;
      const firstPage = 1;
      component.total = total;
      component.paginator.page = firstPage;

      expect(component.isPreviousBtnDisabled()).toBeTrue();
    });

    it('should not disable previous button', () => {
      const total = 100;
      const secondPage = 2;
      component.total = total;
      component.paginator.page = secondPage;

      expect(component.isPreviousBtnDisabled()).toBeFalse();
    });

    it('should disable next button', () => {
      const total = 100;
      component.total = total;
      component.paginator = { itemsPerPage: 70, page: 2 };

      expect(component.isNextBtnDisabled()).toBeTrue();
    });

    it('should not disable next button', () => {
      const total = 100;
      component.total = total;
      component.paginator = { itemsPerPage: 50, page: 1 };

      expect(component.isNextBtnDisabled()).toBeFalse();
    });

    it('should not calculate the number of pages on change and total is not valid', () => {
      component.ngOnChanges();
      expect(component.numberOfPage).toBeUndefined();
    });

    it('should calculate the number of pages on change', () => {
      const paginatorChangeSpy = spyOn(component.paginatorChange, 'emit');
      const expectedNumberOfPages = 10;
      const totalItems = 100;
      const itemsPerPage = 10;
      component.numberOfPage = 0;
      component.total = totalItems;
      component.paginator.itemsPerPage = itemsPerPage;

      component.ngOnChanges();

      expect(component.numberOfPage).toEqual(expectedNumberOfPages);
      expect(component.paginator.page).toEqual(1);
      expect(paginatorChangeSpy).toHaveBeenCalledWith({ ...paginator, itemsPerPage });
    });

    it('should calculate the number of pages on init', () => {
      const expectedNumberOfPages = 10;
      const totalItems = 100;
      const itemsPerPage = 10;
      component.numberOfPage = 0;
      component.total = totalItems;
      component.paginator.itemsPerPage = itemsPerPage;
      component.itemsPerPageOptions = [{ ...itemsPerPageOptions[0], value: 10 }];

      component.ngOnInit();

      expect(component.numberOfPage).toEqual(expectedNumberOfPages);
    });
  });
});


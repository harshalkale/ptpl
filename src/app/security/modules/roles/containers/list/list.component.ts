import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ResizedEvent } from 'angular-resize-event/resized-event';
import { RoleService } from '../../../../../shared/services/role/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableFiltersData } from '../../models/datatable-filters-data';
import { User } from '../../../../../shared/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  dtOptions;
  currentUser: User;

  filterData: DatatableFiltersData = {};
  filterHandler = (
    filter = {
      name: '',
      canModify: '',
      active: ''
    }
  ) => {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // filter name
      if (filter.name) {
        const nameColumn = dtInstance.column('col-name:name');
        nameColumn.search(filter.name);
      }

      // filter can modify
      if (filter.canModify) {
        const canModifyColumn = dtInstance.column('col-can-modify:name');
        canModifyColumn.search(filter.canModify);
      }

      // filter status
      if (filter.active) {
        const activeColumn = dtInstance.column('col-active:name');
        activeColumn.search(filter.active);
      }

      dtInstance.draw();

      this.scrollToDatatable();
    });
  };
  filterResetHandler = () => {
    this.initDatatable();
    this.redrawDatatable({
      clearSearch: true
    });
    this.scrollToDatatable();
  };

  constructor(
    private service: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  ngOnInit() {
    this.initDatatable();
  }

  onResize(event: ResizedEvent) {
    if (event.newWidth !== event.oldWidth) {
      if (this.datatableElement && this.datatableElement.dtInstance) {
        this.redrawDatatable({
          adjustColumns: true
        });
      }
    }
  }

  initDatatable() {
    const self = this;
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        self.service.getDataTable(dataTablesParameters).subscribe(callback);
      },
      scrollX: true,
      scrollY: '500px',
      scrollCollapse: true,
      columns: [
        {
          name: 'col-name',
          data: 'name'
        },
        {
          name: 'col-can-modify',
          data: 'canModify',
          className: 'text-center',
          render: (data, type, row) =>
            data
              ? '<span class="text-success">Yes</span>'
              : '<span class="text-danger">No</span>',
          width: '15%'
        },
        {
          name: 'col-active',
          data: 'active',
          className: 'text-center',
          render: (data, type, row) =>
            data
              ? '<span class="text-success">Active</span>'
              : '<span class="text-danger">Inactive</span>',
          width: '15%'
        },
        {
          name: 'col-actions',
          data: '_id',
          width: '15%',
          className: 'text-center',
          searchable: false,
          orderable: false,
          render: (data, type, row) =>
          this.currentUser.role.canModify
            ? `
        <button class="btn btn-sm btn-outline-info" id="btn-edit">
          <i class="fa fa-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" id="btn-remove">
          <i class="fa fa-trash"></i>
        </button>
        `
            : ''
        }
      ],
      rowCallback: (row, data, index) => {
        if (this.currentUser.role.canModify) {
          $('#btn-edit', row).unbind('click');
          $('#btn-edit', row).bind('click', () => {
            self.router.navigate(['../edit', data._id], {
              relativeTo: self.route
            });
          });

          $('#btn-remove', row).unbind('click');
          $('#btn-remove', row).bind('click', () => {
            self.router.navigate(['../remove', data._id], {
              relativeTo: self.route
            });
          });
        }

        return row;
      }
    };
  }

  redrawDatatable(
    options: any = {
      adjustColumns: false,
      clearSearch: false
    }
  ) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (options.adjustColumns) {
        dtInstance.columns.adjust();
      }
      if (options.clearSearch) {
        dtInstance.columns().search('');
        dtInstance.draw();
      }
    });
  }

  scrollToDatatable() {
    $('html, body').animate(
      {
        scrollTop: $('#datatableContainer').offset().top - 20
      },
      'slow'
    );
  }
}

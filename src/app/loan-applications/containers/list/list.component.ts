import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ResizedEvent } from 'angular-resize-event/resized-event';
import { LoanApplicationService } from '../../../shared/services/loan-application/loan-application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanApplicationType } from '../../../shared/models/loan-application-type';
import { Section } from '../../../shared/models/section';
import { DatatableFiltersData } from '../../models/datatable-filters-data';
import { User } from '../../../shared/models/user';

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

  filterData: DatatableFiltersData = {
    applicationId: '',
    loanApplicationTypes: [],
    name: ''
  };

  filterHandler = (
    filter = {
      applicationId: '',
      name: '',
      loanApplicationTypes: [],
      active: ''
    }
  ) => {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // filter applicationId
      if (filter.applicationId) {
        const applicationIdColumn = dtInstance.column(
          'col-application-id:name'
        );
        applicationIdColumn.search(filter.applicationId);
      }

      // filter name
      if (filter.name) {
        const firstNameColumn = dtInstance.column('col-first-name:name'),
          middleNameColumn = dtInstance.column('col-middle-name:name'),
          lastNameColumn = dtInstance.column('col-last-name:name'),
          nameSplit = filter.name.split(' ');

        switch (nameSplit.length) {
          case 3: {
            firstNameColumn.search(nameSplit[0]);
            middleNameColumn.search(nameSplit[1]);
            lastNameColumn.search(nameSplit[2]);
            break;
          }
          case 2: {
            firstNameColumn.search(nameSplit[0]);
            lastNameColumn.search(nameSplit[1]);
            break;
          }
          case 1: {
            firstNameColumn.search(nameSplit[0]);
            lastNameColumn.search(nameSplit[0]);
            break;
          }
          default: {
            firstNameColumn.search(nameSplit.join(' '));
            middleNameColumn.search(nameSplit.join(' '));
            lastNameColumn.search(nameSplit.join(' '));
            break;
          }
        }
      }

      // filter loan appl types
      if (filter.loanApplicationTypes) {
        const loanApplicationTypeIdsColumn = dtInstance.column(
          'col-loan-application-type-ids:name'
        );
        loanApplicationTypeIdsColumn.search(
          filter.loanApplicationTypes.join(',')
        );
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
    private service: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { loanApplicationTypes: LoanApplicationType[] }) => {
        if (data.loanApplicationTypes && data.loanApplicationTypes.length) {
          this.filterData.loanApplicationTypes = data.loanApplicationTypes;
        }
      }
    );

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
          name: 'col-application-id',
          data: 'applicationId',
          className: 'text-center',
          width: '15%'
        },
        {
          name: 'col-first-name',
          data: 'firstName',
          visible: false
        },
        {
          name: 'col-middle-name',
          data: 'middleName',
          visible: false
        },
        {
          name: 'col-last-name',
          data: 'lastName',
          render: (data, type, row) =>
            [row.firstName || '', row.middleName || '', row.lastName || '']
              .filter(s => s)
              .join(' ')
        },
        {
          name: 'col-loan-application-type-ids',
          visible: false,
          data: 'loanApplicationType._id',
          orderable: false
        },
        {
          name: 'col-loan-application-type-names',
          data: 'loanApplicationType.name',
          orderable: false
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
            `
          <button class="btn btn-sm btn-outline-success" id="btn-view">
            <i class="fa fa-eye"></i>
          </button>
          ` +
            (this.currentUser.role.canModify
              ? `
          <!-- <button class="btn btn-sm btn-outline-info" id="btn-edit">
            <i class="fa fa-pencil"></i>
          </button> -->
          <button class="btn btn-sm btn-outline-danger" id="btn-remove">
            <i class="fa fa-trash"></i>
          </button>
          `
              : '')
        }
      ],
      rowCallback: (row, data, index) => {
        $('#btn-view', row).unbind('click');
        $('#btn-view', row).bind('click', () => {
          self.router.navigate(['../view', data._id], {
            relativeTo: self.route
          });
        });

        if (this.currentUser.role.canModify) {
          // $('#btn-edit', row).unbind('click');
          // $('#btn-edit', row).bind('click', () => {
          //   self.router.navigate(['../edit', data._id], {
          //     relativeTo: self.route
          //   });
          // });

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

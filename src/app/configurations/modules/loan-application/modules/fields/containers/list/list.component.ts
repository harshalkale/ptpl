import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { ResizedEvent } from "angular-resize-event";
import { FieldService } from "../../../../../../../shared/services/field/field.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoanApplicationType } from "../../../../../../../shared/models/loan-application-type";
import { Section } from "../../../../../../../shared/models/section";
import { DatatableFiltersData } from "../../models/datatable-filters-data";
import { User } from "../../../../../../../shared/models/user";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;

  dtOptions;
  currentUser: User;

  filterData: DatatableFiltersData = {
    loanApplicationTypes: [],
    sections: [],
    active: false,
    label: ""
  };

  filterHandler = (
    filter = {
      sequenceNo: "",
      label: "",
      sections: [],
      loanApplicationTypes: [],
      active: ""
    }
  ) => {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // filter label
      if (filter.label) {
        const labelColumn = dtInstance.column("col-label:name");
        labelColumn.search(filter.label);
      }

      // filter sections
      if (filter.sections) {
        const sectionIdsColumn = dtInstance.column("col-section-id:name");
        sectionIdsColumn.search(filter.sections.join(","));
      }

      // filter loan appl types
      if (filter.loanApplicationTypes) {
        const loanApplicationTypeIdsColumn = dtInstance.column(
          "col-loan-application-type-ids:name"
        );
        loanApplicationTypeIdsColumn.search(
          filter.loanApplicationTypes.join(",")
        );
      }

      // filter status
      if (filter.active) {
        const activeColumn = dtInstance.column("col-active:name");
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
    private service: FieldService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        sections: Section[];
        loanApplicationTypes: LoanApplicationType[];
      }) => {
        if (
          data.sections &&
          data.sections.length &&
          data.loanApplicationTypes &&
          data.loanApplicationTypes.length
        ) {
          this.filterData.sections = data.sections;
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
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        self.service.getDataTable(dataTablesParameters).subscribe(callback);
      },
      scrollX: true,
      scrollY: "500px",
      scrollCollapse: true,
      columns: [
        {
          name: "col-sequence-no",
          data: "sequenceNo",
          className: "text-center",
          width: "5%"
        },
        {
          name: "col-label",
          data: "label"
        },
        {
          name: "col-section-id",
          visible: false,
          data: "section._id",
          orderable: false
        },
        {
          name: "col-section-names",
          data: "section.name",
          orderable: false
        },
        {
          name: "col-loan-application-type-ids",
          visible: false,
          data: "loanApplicationTypes._id",
          orderable: false,
          render: (data, type, row) =>
            row.loanApplicationTypes
              .map(loanApplicationType => loanApplicationType._id)
              .join(", ")
        },
        {
          name: "col-loan-application-type-names",
          data: "loanApplicationTypes.name",
          orderable: false,
          render: (data, type, row) =>
            row.loanApplicationTypes
              .map(loanApplicationType => loanApplicationType.name)
              .join(", ")
        },
        {
          name: "col-active",
          data: "active",
          className: "text-center",
          width: "10%",
          render: (data, type, row) =>
            data
              ? '<span class="text-success">Active</span>'
              : '<span class="text-danger">Inactive</span>'
        },
        {
          name: "col-actions",
          data: "_id",
          width: "15%",
          className: "text-center",
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
              : ""
        }
      ],
      rowCallback: (row, data, index) => {
        if (this.currentUser.role.canModify) {
          $("#btn-edit", row).unbind("click");
          $("#btn-edit", row).bind("click", () => {
            self.router.navigate(["../edit", data._id], {
              relativeTo: self.route
            });
          });

          $("#btn-remove", row).unbind("click");
          $("#btn-remove", row).bind("click", () => {
            self.router.navigate(["../remove", data._id], {
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
        dtInstance.columns().search("");
        dtInstance.draw();
      }
    });
  }

  scrollToDatatable() {
    $("html, body").animate(
      {
        scrollTop: $("#datatableContainer").offset().top - 20
      },
      "slow"
    );
  }
}

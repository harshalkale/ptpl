import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { LoanApplicationTypeService } from "../../../../../../../shared/services/loan-application-type/loan-application-type.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { User } from "../../../../../../../shared/models/user";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;

  dtOptions;
  currentUser: User;

  constructor(
    private service: LoanApplicationTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
  }

  ngOnInit() {
    const self = this;
    this.dtOptions = {
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
          // title: 'Loan Application Type',
          data: "name"
        },
        {
          // title: 'Status',
          data: "active",
          className: "text-center",
          render: (data, type, row) =>
            data
              ? '<span class="text-success">Active</span>'
              : '<span class="text-danger">Inactive</span>',
          width: "20%"
        },
        {
          // title: '',
          data: "_id",
          width: "20%",
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

  ngAfterViewInit() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function() {
        const that = this;
        $("input", this.footer()).on("keyup change", function() {
          if (that.search() !== this["value"]) {
            that.search(this["value"]).draw();
          }
        });
        // for dropdown filters
        $("select", this.footer()).on("change", function() {
          const val = $.fn.dataTable.util.escapeRegex("" + $(this).val());
          // that.search(val ? '^' + val + '$' : '', true, false).draw();
          that.search(val).draw();
        });
      });
    });
  }
}

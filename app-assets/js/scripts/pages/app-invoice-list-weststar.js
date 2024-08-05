$(function () {
    'use strict';
  
    var dtInvoiceTable = $('.invoice-list-table'),
      assetPath = 'app-assets/',
      invoicePreview = 'app-invoice-preview.html',
      invoiceAdd = 'app-invoice-add.html',
      invoiceEdit = 'app-invoice-edit.html';
  
    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
      invoicePreview = assetPath + 'app/invoice/preview';
      invoiceAdd = assetPath + 'app/invoice/add';
      invoiceEdit = assetPath + 'app/invoice/edit';
    }
  
    // datatable
    if (dtInvoiceTable.length) {
      var dtInvoice = dtInvoiceTable.DataTable({
        ajax: assetPath + 'data/table-datatable-weststar.json', // JSON file to add data
        autoWidth: false,
        columns: [
         // columns according to JSON
         { data: 'responsive_id' },
         { data: 'no' },
         { data: 'street lamp id' },
         { data: 'road' },
         { data: 'pn' },
         { data: 'battery voltage' },
         { data: 'solar voltage'},
         { data:'connectivity'},
         { data: 'solar current'},
         { data: 'solar power'},
         { data: 'light devices' },
         { data: 'last update'},
         { data: ''}
                ],
        columnDefs: [
          {
            // For Responsive
            className: 'control',
            responsivePriority: 2,
            targets: 0
          },
          {
            // Invoice ID
            targets: 1,
            width: '46px',
            render: function (data, type, full, meta) {
              var $invoiceId = full['no'];
              // Creates full output for row
              var $rowOutput = '<a class="font-weight-bold" href="' + invoicePreview + '"> #' + $invoiceId + '</a>';
              return $rowOutput;
            }
          },
          {
            // Invoice status
            targets: 2,
            width: '42px',
            render: function (data, type, full, meta) {
              var $invoiceStatus = full['invoice_status'],
                $dueDate = full['due_date'],
                $balance = full['balance'],
                roleObj = {
                  Sent: { class: 'bg-light-secondary', icon: 'send' },
                  Paid: { class: 'bg-light-success', icon: 'check-circle' },
                  Draft: { class: 'bg-light-primary', icon: 'save' },
                  Downloaded: { class: 'bg-light-info', icon: 'arrow-down-circle' },
                  'Past Due': { class: 'bg-light-danger', icon: 'info' },
                  'Partial Payment': { class: 'bg-light-warning', icon: 'pie-chart' }
                };
              return (
                "<span data-toggle='tooltip' data-html='true' title='<span>" +
                $invoiceStatus +
                '<br> <span class="font-weight-bold">Balance:</span> ' +
                $balance +
                '<br> <span class="font-weight-bold">Due Date:</span> ' +
                $dueDate +
                "</span>'>" +
                '<div class="avatar avatar-status ' +
                roleObj[$invoiceStatus].class +
                '">' +
                '<span class="avatar-content">' +
                feather.icons[roleObj[$invoiceStatus].icon].toSvg({ class: 'avatar-icon' }) +
                '</span>' +
                '</div>' +
                '</span>'
              );
            }
          },
          {
            // Client name and Service
            targets: 3,
            responsivePriority: 4,
            width: '270px',
            render: function (data, type, full, meta) {
              var $name = full['client_name'],
                $email = full['email'],
                $image = full['avatar'],
                stateNum = Math.floor(Math.random() * 6),
                states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
                $state = states[stateNum],
                $name = full['client_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              if ($image) {
                // For Avatar image
                var $output =
                  '<img  src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" width="32" height="32">';
              } else {
                // For Avatar badge
                $output = '<div class="avatar-content">' + $initials + '</div>';
              }
              // Creates full output for row
              var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : ' ';
  
              var $rowOutput =
                '<div class="d-flex justify-content-left align-items-center">' +
                '<div class="avatar-wrapper">' +
                '<div class="avatar' +
                colorClass +
                'mr-50">' +
                $output +
                '</div>' +
                '</div>' +
                '<div class="d-flex flex-column">' +
                '<h6 class="user-name text-truncate mb-0">' +
                $name +
                '</h6>' +
                '<small class="text-truncate text-muted">' +
                $email +
                '</small>' +
                '</div>' +
                '</div>';
              return $rowOutput;
            }
          },
          {
            // Total Invoice Amount
            targets: 4,
            width: '73px',
            render: function (data, type, full, meta) {
              var $total = full['total'];
              return '<span class="d-none">' + $total + '</span>$' + $total;
            }
          },
          {
            // Due Date
            targets: 5,
            width: '130px',
            render: function (data, type, full, meta) {
              var $dueDate = new Date(full['last update']);
              // Creates full output for row
              var $rowOutput =
                '<span class="d-none">' +
                moment($dueDate).format('YYYYMMDD') +
                '</span>' +
                moment($dueDate).format('DD MMM YYYY');
              $dueDate;
              return $rowOutput;
            }
          },
          {
            // Client Balance/Status
            targets: 6,
            width: '98px',
            render: function (data, type, full, meta) {
              var $balance = full['balance'];
              if ($balance === 0) {
                var $badge_class = 'badge-light-success';
                return '<span class="badge badge-pill ' + $badge_class + '" text-capitalized> Paid </span>';
              } else {
                return '<span class="d-none">' + $balance + '</span>' + $balance;
              }
            }
          },
          {
            targets: 7,
            visible: false
          },
          {
            
          }
        ],
        order: [[1, 'desc']],
        dom:
          '<"row d-flex justify-content-between align-items-center m-1"' +
          '<"col-lg-6 d-flex align-items-center"l<"dt-action-buttons text-xl-right text-lg-left text-lg-right text-left "B>>' +
          '<"col-lg-6 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pr-lg-1 p-0"f<"invoice_status ml-sm-2">>' +
          '>t' +
          '<"d-flex justify-content-between mx-2 row"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
        language: {
          sLengthMenu: 'Show _MENU_',
          search: 'Search',
          searchPlaceholder: 'Search Panel Device',
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        },
        // Buttons with Dropdown
        buttons: [
          {
            text: 'Add Record',
            className: 'btn btn-primary btn-add-record ml-2',
            action: function (e, dt, button, config) {
              window.location = invoiceAdd;
            }
          }
        ],
        // For responsive popup
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function (row) {
                var data = row.data();
                return 'Details of ' + data['client_name'];
              }
            }),
            type: 'column',
            renderer: $.fn.dataTable.Responsive.renderer.tableAll({
              tableClass: 'table',
              columnDefs: [
                {
                  targets: 2,
                  visible: false
                },
                {
                  targets: 3,
                  visible: false
                }
              ]
            })
          }
        },
        initComplete: function () {
          $(document).find('[data-toggle="tooltip"]').tooltip();
          // Adding role filter once table initialized
          
        },
        drawCallback: function () {
          $(document).find('[data-toggle="tooltip"]').tooltip();
        }
      });
    }
  });
  
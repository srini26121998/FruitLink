import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [

  // ---------------- AUTH LAYOUT ----------------
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component')
        .then(m => m.AuthLayoutComponent),

    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/login/login.component')
            .then(m => m.LoginComponent)
      },
      {
        path: 'otp-login',
        loadComponent: () =>
          import('./modules/auth/otp-login/otp-login.component')
            .then(m => m.OtpLoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./modules/auth/forgot-password/forgot-password.component')
            .then(m => m.ForgotPasswordComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // ---------------- MAIN LAYOUT AFTER LOGIN ----------------
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),

    children: [

      // ---------------- ADMIN DASHBOARD ----------------
      {
        path: 'admin/dashboard',
        loadComponent: () =>
          import('./modules/admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      // ---------------- ROLES & PERMISSIONS ----------------
      {
        path: 'roles',
        children: [
          {
            path: 'role-list',
            loadComponent: () =>
              import('./modules/roles/role-list/role-list.component')
                .then(m => m.RoleListComponent)
          },
          {
            path: 'create-role',
            loadComponent: () =>
              import('./modules/roles/create-role/create-role.component')
                .then(m => m.CreateRoleComponent)
          },
          {
            path: 'permission-matrix/:id',
            loadComponent: () =>
              import('./modules/roles/permission-matrix/permission-matrix.component')
                .then(m => m.PermissionMatrixComponent)
          },
          {
            path: 'permission-editor',
            loadComponent: () =>
              import('./modules/roles/permission-editor/permission-editor.component')
                .then(m => m.PermissionEditorComponent)
          }
        ]
      },

      // ---------------- SHOP CUSTOMER MODULE ----------------
      {
        path: 'shop',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./modules/shop-customer/dashboard/dashboard.component')
                .then(m => m.ShopDashboardComponent)
          },
          {
            path: 'fruits',
            loadComponent: () =>
              import('./modules/shop-customer/fruits/fruits.component')
                .then(m => m.FruitsComponent)
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('./modules/shop-customer/cart/cart.component')
                .then(m => m.CartComponent)
          },
          {
            path: 'checkout',
            loadComponent: () =>
              import('./modules/shop-customer/checkout/checkout.component')
                .then(m => m.CheckoutComponent)
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./modules/shop-customer/orders/orders.component')
                .then(m => m.OrdersComponent)
          },
          {
            path: 'order-details/:id',
            loadComponent: () =>
              import('./modules/shop-customer/order-details/order-details.component')
                .then(m => m.OrderDetailsComponent)
          },
          {
            path: 'payments-history',
            loadComponent: () =>
              import('./modules/shop-customer/payments-history/payments-history.component')
                .then(m => m.PaymentsHistoryComponent)
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import('./modules/shop-customer/notifications/notifications.component')
                .then(m => m.NotificationsComponent)
          },
          {
            path: 'support',
            loadComponent: () =>
              import('./modules/shop-customer/support/support.component')
                .then(m => m.SupportComponent)
          },

          // Order flow
          {
            path: 'orders-flow',
            loadComponent: () =>
              import('./modules/shop-customer/orders-flow/shop-order-create/shop-order-create.component')
                .then(m => m.ShopOrderCreateComponent)
          },

          // Invoice
          {
            path: 'invoice',
            loadComponent: () =>
              import('./modules/shop-customer/invoice/invoice/invoice.component')
                .then(m => m.ShopInvoiceComponent)
          },

          {
            path: 'order-summary',
            loadComponent: () =>
              import('./modules/shop-customer/order-summary/order-summary.component')
                .then(m => m.OrderSummaryComponent)
          }
        ]
      },

      // ---------------- PRODUCTS MODULE ----------------
      {
        path: 'products',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/products/product-list/product-list.component')
                .then(m => m.ProductListComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./modules/products/product-create/product-create.component')
                .then(m => m.ProductCreateComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./modules/products/product-edit/product-edit.component')
                .then(m => m.ProductEditComponent)
          }
        ]
      },

      // ---------------- ANALYTICS MODULE ----------------
      {
        path: 'analytics',
        children: [

          /* ---------------- DASHBOARDS ---------------- */
          {
            path: 'analytics',
            children: [

              /* ---------------- DASHBOARDS ---------------- */
              {
                path: 'city',
                loadComponent: () =>
                  import('./modules/analytics/dashboards/city-dashboard/city-dashboard.component')
                    .then(m => m.CityDashboardComponent)
              },

              /* ---------------- SALES DRILLDOWN ---------------- */
              {
                path: 'sales/drilldown',
                loadComponent: () =>
                  import('./modules/analytics/drilldown/sales/sales-drilldown/sales-drilldown.component')
                    .then(m => m.SalesDrilldownComponent)
              }
            ]
          },
          {
            path: 'shop',
            loadComponent: () =>
              import('./modules/analytics/dashboards/shop-analytics/shop-analytics.component')
                .then(m => m.ShopAnalyticsComponent)
          },
          {
            path: 'products',
            loadComponent: () =>
              import('./modules/analytics/dashboards/product-analytics/product-analytics.component')
                .then(m => m.ProductAnalyticsComponent)
          },
          {
            path: 'analytics',
            children: [
              {
                path: 'city',
                loadComponent: () =>
                  import('./modules/analytics/dashboards/city-dashboard/city-dashboard.component')
                    .then(m => m.CityDashboardComponent)
              },
              {
                path: 'city/:cityId',
                loadComponent: () =>
                  import('./modules/analytics/drilldown/city/city-drilldown/city-drilldown.component')
                    .then(m => m.CityDrilldownComponent)
              }
            ]
          },

          {
            path: 'delivery',
            loadComponent: () =>
              import('./modules/analytics/dashboards/delivery-analytics/delivery-analytics.component')
                .then(m => m.DeliveryAnalyticsComponent)
          },
          {
            path: 'payments',
            loadComponent: () =>
              import('./modules/analytics/dashboards/payment-analytics/payment-analytics.component')
                .then(m => m.PaymentAnalyticsComponent)
          },
          {
            path: 'growth',
            loadComponent: () =>
              import('./modules/analytics/dashboards/growth-dashboard/growth-dashboard.component')
                .then(m => m.GrowthDashboardComponent)
          },

          /* ---------------- DRILLDOWN (SINGLE ENTRY) ---------------- */

          {
            path: 'drilldown/:entity/:id',
            loadComponent: () =>
              import('./modules/analytics/drilldown/drilldown-host/drilldown-host.component')
                .then(m => m.DrilldownHostComponent)
          },


          /* ---------------- REPORTS ---------------- */

          {
            path: 'reports/sales',
            loadComponent: () =>
              import('./modules/analytics/reports/sales-report/sales-report.component')
                .then(m => m.SalesReportComponent)
          },
          {
            path: 'reports/product',
            loadComponent: () =>
              import('./modules/analytics/reports/product-report/product-report.component')
                .then(m => m.ProductReportComponent)
          },
          {
            path: 'reports/customer',
            loadComponent: () =>
              import('./modules/analytics/reports/customer-report/customer-report.component')
                .then(m => m.CustomerReportComponent)
          },
          {
            path: 'reports/delivery',
            loadComponent: () =>
              import('./modules/analytics/reports/delivery-report/delivery-report.component')
                .then(m => m.DeliveryReportComponent)
          },
          {
            path: 'reports/inventory',
            loadComponent: () =>
              import('./modules/analytics/reports/inventory-report/inventory-report.component')
                .then(m => m.InventoryReportComponent)
          }
        ]
      },


      // ---------------- INVENTORY ----------------
      {
        path: 'inventory',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./modules/inventory/admin-dashboard/admin-dashboard.component')
                .then(m => m.AdminInventoryDashboardComponent)
          },
          {
            path: 'item-demand',
            loadComponent: () =>
              import('./modules/inventory/item-demand/item-demand.component')
                .then(m => m.ItemDemandComponent)
          },
          {
            path: 'shop-suggestions',
            loadComponent: () =>
              import('./modules/inventory/shop-suggestions/shop-suggestions.component')
                .then(m => m.ShopSuggestionsComponent)
          }
        ]
      },

      // ---------------- SHOP PORTAL ----------------
      {
        path: 'shop-portal',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./modules/shop-portal/dashboard/shop-portal-dashboard.component')
                .then(m => m.ShopPortalDashboardComponent)
          },
          {
            path: 'create-order',
            loadComponent: () =>
              import('./modules/orders/create/create.component')
                .then(m => m.CreateComponent)
          },
          {
            path: 'order-history',
            loadComponent: () =>
              import('./modules/shop-portal/order-history/order-history.component')
                .then(m => m.ShopOrderHistoryComponent)
          },
          {
            path: 'track-orders',
            loadComponent: () =>
              import('./modules/shop-portal/track-orders/track-orders.component')
                .then(m => m.ShopTrackOrdersComponent)
          },
          {
            path: 'print-documents',
            loadComponent: () =>
              import('./modules/shop-portal/print-documents/print-documents.component')
                .then(m => m.ShopPrintDocumentsComponent)
          }
        ]
      },

      // ---------------- ORDERS ----------------
      {
        path: 'orders',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/orders/list/list.component')
                .then(m => m.ListComponent)
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import('./modules/orders/details/details.component')
                .then(m => m.OrderDetailsComponent)
          },
          {
            path: 'approve',
            loadComponent: () =>
              import('./modules/orders/approve/approve.component')
                .then(m => m.ApproveComponent)
          },
          {
            path: 'delivery-update',
            loadComponent: () =>
              import('./modules/orders/delivery-update/delivery-update.component')
                .then(m => m.DeliveryUpdateComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./modules/orders/create/create.component')
                .then(m => m.CreateComponent)
          },
          {
            path: 'manage',
            loadComponent: () =>
              import('./modules/orders/manage/manage.component')
                .then(m => m.OrderManageComponent)
          }
        ]
      },

      // ---------------- PAYMENTS ----------------
      {
        path: 'payments',
        children: [
          {
            path: 'checkout',
            loadComponent: () =>
              import('./modules/payments/checkout/checkout.component')
                .then(m => m.CheckoutComponent)
          },
          {
            path: 'details',
            loadComponent: () =>
              import('./modules/payments/details/details.component')
                .then(m => m.DetailsComponent)
          },
          {
            path: 'success',
            loadComponent: () =>
              import('./modules/payments/success/success.component')
                .then(m => m.SuccessComponent)
          },
          {
            path: 'history',
            loadComponent: () =>
              import('./modules/payments/history/history.component')
                .then(m => m.HistoryComponent)
          },

          // Ledger
          {
            path: 'ledger/dashboard',
            loadComponent: () =>
              import('./modules/payments/ledger/ledger-dashboard/ledger-dashboard.component')
                .then(m => m.LedgerDashboardComponent)
          },
          {
            path: 'ledger/detail/:id',
            loadComponent: () =>
              import('./modules/payments/ledger/ledger-detail/ledger-detail.component')
                .then(m => m.LedgerDetailComponent)
          },
          {
            path: 'ledger/settlement/:id',
            loadComponent: () =>
              import('./modules/payments/ledger/ledger-settlement/ledger-settlement.component')
                .then(m => m.LedgerSettlementComponent)
          },
          {
            path: 'ledger/statement/:id',
            loadComponent: () =>
              import('./modules/payments/ledger/ledger-statement/ledger-statement.component')
                .then(m => m.LedgerStatementComponent)
          }
        ]
      },

      // ---------------- REPORTS MODULE ----------------
      {
        path: 'reports',
        children: [
          {
            path: 'weekly',
            loadComponent: () =>
              import('./modules/reports/weekly/weekly.component')
                .then(m => m.WeeklyComponent)
          },
          {
            path: 'monthly',
            loadComponent: () =>
              import('./modules/reports/monthly/monthly.component')
                .then(m => m.MonthlyComponent)
          },
          {
            path: 'yearly',
            loadComponent: () =>
              import('./modules/reports/yearly/yearly.component')
                .then(m => m.YearlyComponent)
          },
          {
            path: 'top-fruits',
            loadComponent: () =>
              import('./modules/reports/top-fruits/top-fruits.component')
                .then(m => m.TopFruitsComponent)
          },
          {
            path: 'pending-payments',
            loadComponent: () =>
              import('./modules/reports/pending-payments/pending-payments.component')
                .then(m => m.PendingPaymentsComponent)
          },
          {
            path: 'shop-frequency',
            loadComponent: () =>
              import('./modules/reports/shop-frequency/shop-frequency.component')
                .then(m => m.ShopFrequencyComponent)
          }
        ]
      },

      // ---------------- HELP DESK ----------------
      {
        path: 'helpdesk',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/helpdesk/list/list.component')
                .then(m => m.ListComponent)
          },
          {
            path: 'ticket-details/:id',
            loadComponent: () =>
              import('./modules/helpdesk/ticket-details/ticket-details.component')
                .then(m => m.TicketDetailsComponent)
          },
          {
            path: 'faq',
            loadComponent: () =>
              import('./modules/helpdesk/faq/faq.component')
                .then(m => m.FaqComponent)
          }
        ]
      },

      // ---------------- DELIVERY ----------------
      {
        path: 'delivery',
        children: [
          {
            path: 'Ops-dashboard',
            loadComponent: () =>
              import('./modules/delivery/ops-dashboard/ops-dashboard.component')
                .then(m => m.DeliveryOpsDashboardComponent)
          },
          {
            path: 'dispatch-panel',
            loadComponent: () =>
              import('./modules/delivery/dispatch-panel/dispatch-panel.component')
                .then(m => m.DispatchPanelComponent)
          },
          {
            path: 'driver-dashboard',
            loadComponent: () =>
              import('./modules/delivery/driver/driver-dashboard/driver-dashboard.component')
                .then(m => m.DriverDashboardComponent)
          },
          {
            path: 'order-details/:id',
            loadComponent: () =>
              import('./modules/delivery/driver/order-details/order-details.component')
                .then(m => m.DriverOrderDetailsComponent)
          },
          {
            path: 'gps-tracking',
            loadComponent: () =>
              import('./modules/delivery/gps-tracking/gps-tracking.component')
                .then(m => m.GpsTrackingComponent)
          },
          {
            path: 'route-optimization',
            loadComponent: () =>
              import('./modules/delivery/route-optimization/route-optimization.component')
                .then(m => m.RouteOptimizationComponent)
          }
        ]
      },

      // ---------------- AUDIT LOGS ----------------
      {
        path: 'audit-logs',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/audit-logs/list/list.component')
                .then(m => m.ListComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./modules/audit-logs/view/view.component')
                .then(m => m.ViewComponent)
          }
        ]
      },

      // ---------------- MASTER DATA ----------------
      {
        path: 'master-data',
        children: [
          {
            path: 'cities',
            loadComponent: () =>
              import('./modules/master-data/cities/cities.component')
                .then(m => m.CitiesComponent)
          },
          {
            path: 'shop-types',
            loadComponent: () =>
              import('./modules/master-data/shop-types/shop-types.component')
                .then(m => m.ShopTypesComponent)
          },
          {
            path: 'fruit-categories',
            loadComponent: () =>
              import('./modules/master-data/fruit-categories/fruit-categories.component')
                .then(m => m.FruitCategoriesComponent)
          }
        ]
      },

      // ---------------- NOTIFICATIONS ----------------
      {
        path: 'notifications',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/notifications/list/list.component')
                .then(m => m.ListComponent)
          },
          {
            path: 'panel',
            loadComponent: () =>
              import('./modules/notifications/panel/panel.component')
                .then(m => m.PanelComponent)
          }
        ]
      },

      // ---------------- SHOP MANAGEMENT ----------------
      {
        path: 'shop-management',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./modules/shop-management/dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
          },
          {
            path: 'list',
            loadComponent: () =>
              import('./modules/shop-management/list/list.component')
                .then(m => m.ListComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./modules/shop-management/create/create.component')
                .then(m => m.CreateComponent)
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import('./modules/shop-management/details/details.component')
                .then(m => m.DetailsComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./modules/shop-management/edit/edit.component')
                .then(m => m.EditComponent)
          },
          {
            path: 'analytics',
            loadComponent: () =>
              import('./modules/shop-management/analytics/analytics.component')
                .then(m => m.AnalyticsComponent)
          },
          {
            path: 'credit-ledger/:id',
            loadComponent: () =>
              import('./modules/shop-management/credit-ledger/credit-ledger.component')
                .then(m => m.CreditLedgerComponent)
          },
          {
            path: 'price-overrides/:id',
            loadComponent: () =>
              import('./modules/shop-management/price-overrides/price-overrides.component')
                .then(m => m.PriceOverridesComponent)
          },
          {
            path: 'salesman-assign',
            loadComponent: () =>
              import('./modules/shop-management/salesman-assign/salesman-assign.component')
                .then(m => m.SalesmanAssignComponent)
          },
          {
            path: 'visit-history/:id',
            loadComponent: () =>
              import('./modules/shop-management/visit-history/visit-history.component')
                .then(m => m.VisitHistoryComponent)
          },
          {
            path: 'follow-ups',
            loadComponent: () =>
              import('./modules/shop-management/follow-ups/follow-ups.component')
                .then(m => m.FollowUpsComponent)
          },
          {
            path: 'reports',
            loadComponent: () =>
              import('./modules/shop-management/reports/reports.component')
                .then(m => m.ReportsComponent)
          }
        ]
      },

      // ---------------- PROFILE + SETTINGS ----------------
      {
        path: 'profile',
        loadComponent: () =>
          import('./modules/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./modules/settings/settings.component')
            .then(m => m.SettingsComponent)
      }
    ]
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];

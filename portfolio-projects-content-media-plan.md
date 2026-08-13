# Portfolio Projects — Content, Order and Media Plan

## Purpose

This document defines the recommended order and commercial presentation of the real projects shown in the BaldurDev portfolio. It includes:

- Recommended prominence and order.
- Repository and live-product references.
- Suggested project titles in English and Spanish.
- Portfolio descriptions in English and Spanish.
- The complete narrative flow that each project should demonstrate.
- Modular videos for the public portfolio.
- Static image sequences for Workana, where video is not available.

The portfolio should maintain two clearly separated collections:

1. **Selected Work:** real client, internal-business and production-oriented systems.
2. **Showcase Lab:** speculative templates and frontend demonstrations from the `showcase` repository.

The projects in this document belong to **Selected Work**. They should not be added to Showcase Lab.

---

## 1. Recommended portfolio order

The order is based on commercial impact, verifiability, relevance to Workana and variety of demonstrated capabilities. It is not simply a ranking by codebase size.

| Order | Project | Recommended prominence | Primary proof |
| ---: | --- | --- | --- |
| 1 | Ticador | `flagship` | Production SaaS, multi-tenant provisioning and complete workforce flow |
| 2 | Invoice System | `large` | Real operational system with a controlled live demo |
| 3 | Hotel Bella del Mar | `large` | Advanced transactional WordPress implementation |
| 4 | Cosmos ERP | `large` or `medium` | Multi-tenant ERP architecture and end-to-end business workflows |
| 5 | Carolina Odontóloga | `small` | Live WordPress/Elementor project with custom booking and payments |

### Why this order works

- The first three projects immediately communicate **SaaS + business software + advanced WordPress**.
- Cosmos adds deep ERP and architecture evidence without making every initial project look like the same type of administrative system.
- Carolina remains useful because it proves the type of WordPress, Elementor, booking and payment work frequently requested on Workana.
- Essential is intentionally deferred until its public presentation and demo are fully prepared.

### Recommended structure in `portfolio`

The entries should be ordered in `app/data/portfolio.ts` as follows:

1. `ticador-platform`
2. `invoice-operations`
3. `bella-mar-hotel`
4. `cosmos-erp`
5. `wordpress-elementor-agenda`

The existing `app/data/showcase.ts` should continue containing only Showcase Lab demos such as VantaPay.

---

## 2. Repository and public-link map

Private repository links are included here as internal references. They should **not** be displayed to public portfolio visitors because clients without access will receive a 404 or permission error.

| Project | Repository name | Repository link | Visibility | Public CTA |
| --- | --- | --- | --- | --- |
| Ticador | `baldurt1992/ticador-landing` | <https://github.com/baldurt1992/ticador-landing> | Private | <https://ticador.online> |
| Ticador | `baldurt1992/mail-center` | <https://github.com/baldurt1992/mail-center> | Private | Do not expose repo |
| Ticador | Main application and provisioning repositories | **Pending confirmation** | Not currently visible in the connected repository list | Do not invent links |
| Invoice System | `baldurt1992/invoice-system` | <https://github.com/baldurt1992/invoice-system> | Private | Controlled demo URL when ready |
| Hotel Bella del Mar | `baldurt1992/bella-mar` | <https://github.com/baldurt1992/bella-mar> | Private | Case-study media; no live link during private final QA |
| Cosmos ERP | `baldurt1992/erp` | <https://github.com/baldurt1992/erp> | Private | Portfolio media; optional controlled demo later |
| Carolina Odontóloga | Repository not identified among connected repositories | **Pending confirmation** | Unknown | <https://carolinaodontologa.com/> |
| Essential — deferred | `baldurt1992/essential` | <https://github.com/baldurt1992/essential> | Public | Demo URL after presentation pass |

### Public-link rule

- Show a **Live Site** or **Live Demo** button only when the visitor can enter without requesting credentials from you.
- Never show a GitHub button for a private repository.
- For private or final-QA client implementations, use **View Case Study** and present screenshots/videos inside the portfolio.
- Demo credentials should be visible next to the demo button or replaced by a one-click demo login.

---

## 3. Global engagement flow

Every project should tell the same high-level story, even though the screens and business domain change.

### Narrative sequence

1. **Outcome:** show the strongest final screen or successful result immediately.
2. **Context:** explain what the product controls or solves in one sentence.
3. **Entry point:** show how a real user begins the workflow.
4. **Core action:** complete the main transaction rather than clicking through unrelated pages.
5. **Proof of state change:** show the created booking, invoice, attendance record or business document.
6. **Operational follow-through:** show what an administrator or operator sees after the user action.
7. **Business visibility:** end with dashboards, reports, status tracking or notifications.

This is the core engagement loop:

> Discover → Act → Confirm → Operate → Measure

### Video production standard

- Resolution: **1920 × 1080**.
- Format: **MP4, H.264, 30 fps**.
- Aspect ratio: **16:9**.
- Each video: normally **35–75 seconds**.
- Maximum recommended modules per project: **five**.
- Record with sanitized, realistic sample data.
- Remove browser bookmarks, personal accounts, development tools and notifications.
- Use a clean browser profile and hide sensitive URLs or tokens.
- Avoid long typing sequences; prepare the data and type only the meaningful fields.
- Remove waiting time, loading pauses and repeated navigation.
- Add a short title card and persistent captions because many visitors watch without sound.
- Use gentle cursor movement and restrained zooms only when a field or status change would otherwise be difficult to see.
- The first video must tell a complete mini-story on its own because many visitors will not watch the remaining modules.

### Workana image standard

Workana does not preserve a reliable narrative through video, so every image must carry enough context by itself.

- Export at **1600 × 900 px** or **1920 × 1080 px**.
- Place a visible sequence marker inside every image: `01/06`, `02/06`, etc.
- Include the project name and the step name inside the artwork, not only in the uploaded filename.
- Use six images per project as the default.
- Keep one primary message per image.
- Avoid tiny UI collages. If several states are essential, use a maximum of three enlarged crops.
- The first image should work as a cover even if Workana changes the upload order.
- If ordering continues to fail, combine the six steps into two self-contained vertical boards of approximately **1600 × 4500 px**. Each board must repeat the project title and contain its own context.

Recommended filenames:

```text
01-project-cover.jpg
02-entry-point.jpg
03-core-workflow.jpg
04-success-state.jpg
05-admin-operations.jpg
06-responsive-and-results.jpg
```

---

# Project 1 — Ticador

## Project identity

- **Project name:** Ticador
- **Recommended prominence:** `flagship`
- **Status:** Production SaaS
- **Confirmed repositories:**
  - `baldurt1992/ticador-landing`: <https://github.com/baldurt1992/ticador-landing>
  - `baldurt1992/mail-center`: <https://github.com/baldurt1992/mail-center>
- **Other repositories:** Main application and automated tenant-provisioning repository links require confirmation.
- **Live product:** <https://ticador.online>
- **Public CTA:** `Visit live product` / `Visitar producto`

## Suggested title

### English

**Ticador — Multi-Tenant Workforce Attendance SaaS**

### Spanish

**Ticador — SaaS multiempresa para control de asistencia laboral**

## Suggested description

### English

Ticador is a production SaaS ecosystem for workforce attendance and operational control. It combines automated tenant provisioning, subscription management, guided company onboarding, employee and device administration, attendance tracking, incident reporting and centralized email delivery. The platform was built as multiple coordinated applications so each business receives an isolated environment while administrators retain visibility over provisioning, access and service status.

### Spanish

Ticador es un ecosistema SaaS en producción para controlar la asistencia laboral y la operación de equipos de trabajo. Integra aprovisionamiento automático de empresas, gestión de suscripciones, configuración guiada, administración de empleados y dispositivos, marcaciones, reportes de incidencias y entrega centralizada de correos. La plataforma está compuesta por varias aplicaciones coordinadas para que cada empresa opere en un entorno aislado mientras la administración conserva visibilidad sobre accesos, aprovisionamiento y estado del servicio.

## Recommended complete engagement flow

The complete story should move from platform acquisition to daily employee use:

1. Visitor arrives at Ticador and chooses a plan or begins registration.
2. The system creates the account and provisions the company environment.
3. The administrator completes the onboarding wizard.
4. The administrator registers employees and configures permitted devices.
5. An employee checks in and checks out.
6. An incident or attendance exception is created.
7. The administrator reviews the resulting record and operational report.
8. The platform sends or tracks the related notification through Mail Center.

The most important proof is not the dashboard itself. It is showing that an action performed by an employee becomes a traceable business record for the administrator.

## Portfolio video modules

### Video 1 — Product and ecosystem overview

- **Filename:** `/videos/ticador/01-product-ecosystem-overview.mp4`
- **Duration:** 40–50 seconds.
- Begin with the production landing page.
- Show plan/registration entry and transition into the platform.
- Show the administration dashboard and tenant/application relationship.
- End with one sentence: “From company registration to daily attendance control.”

### Video 2 — Registration and tenant provisioning

- **Filename:** `/videos/ticador/02-registration-tenant-provisioning.mp4`
- **Duration:** 60–75 seconds.
- Register a sample company.
- Show validation and successful account creation.
- Show the provisioning status or resulting isolated workspace.
- Enter the newly created company environment.
- Finish on the first onboarding step.

### Video 3 — Company onboarding and workforce setup

- **Filename:** `/videos/ticador/03-onboarding-workforce-setup.mp4`
- **Duration:** 50–65 seconds.
- Complete the meaningful onboarding steps.
- Add or display an employee.
- Configure a device or access permission.
- Confirm that the workspace is ready to operate.

### Video 4 — Attendance and incident lifecycle

- **Filename:** `/videos/ticador/04-attendance-incident-lifecycle.mp4`
- **Duration:** 60–75 seconds.
- Perform an employee check-in.
- Perform the corresponding check-out or show the active shift state.
- Create an attendance incident.
- Switch to the administrator view.
- Show the new record and its status.

### Video 5 — Subscription, reporting and notifications

- **Filename:** `/videos/ticador/05-subscriptions-reports-notifications.mp4`
- **Duration:** 50–65 seconds.
- Show plan/subscription status and coupon handling if visually ready.
- Open the attendance or incident report.
- Show a relevant summary or export.
- Close with Mail Center delivery status or notification traceability.

## Workana image sequence

1. **Cover — Complete attendance SaaS:** landing page plus dashboard, with three short proof points: multi-tenant, automated provisioning and attendance control.
2. **Company provisioning:** registration form, provisioning result and isolated workspace confirmation.
3. **Guided onboarding:** setup wizard, employee management and device access.
4. **Employee attendance:** check-in/check-out screen and the resulting attendance record.
5. **Incident and administration:** incident submission, administrator status and resolution view.
6. **Business visibility:** reports, subscription status and centralized email tracking.

### Workana emphasis

Use Ticador for SaaS, multi-tenant, HR, attendance, subscriptions, onboarding, PWA or complex platform proposals.

---

# Project 2 — Invoice System

## Project identity

- **Project name:** Invoice System
- **Repository name:** `baldurt1992/invoice-system`
- **Repository:** <https://github.com/baldurt1992/invoice-system>
- **Visibility:** Private
- **Recommended prominence:** `large`
- **Status:** Completed operational platform; controlled demo recommended
- **Public CTA:** `Open live demo` / `Abrir demo`

## Suggested title

### English

**Business Invoicing & Delivery Operations Platform**

### Spanish

**Plataforma empresarial de facturación y operación de entregas**

## Suggested description

### English

A real business operations platform built with Laravel and Vue to centralize customers, suppliers, products, invoicing and last-mile delivery. It supports invoices, credit notes, printing and exports, route planning, delivery evidence, incident management, payment tracking, driver fees, daily settlements and management reports. Role-based access connects administrative and delivery workflows without exposing operational complexity to each user.

### Spanish

Plataforma de operación empresarial desarrollada con Laravel y Vue para centralizar clientes, proveedores, productos, facturación y entregas de última milla. Incluye facturas, notas crédito, impresión y exportaciones, planificación de rutas, evidencias de entrega, gestión de incidencias, control de pagos, tarifas de repartidores, liquidaciones diarias e informes administrativos. El acceso por roles conecta el trabajo administrativo y logístico sin exponer a cada usuario funciones que no necesita.

## Recommended complete engagement flow

The strongest narrative begins with a sale and ends with a completed delivery and measurable result:

1. Administrator opens the dashboard and sees the current operational state.
2. A customer and branch are selected or created.
3. Products are added to a new invoice.
4. The invoice is confirmed and its printable document is generated.
5. The invoice becomes a delivery stop or is added to a route plan.
6. The driver opens the assigned stop, records payment/evidence and completes delivery.
7. The administrator sees the updated delivery state.
8. The day is closed through settlement and reporting.

This flow differentiates the project from a generic CRUD invoicing application.

## Demo prerequisites

- Use a separate demo environment and sanitized database.
- Never expose real customer, supplier or family-business data.
- Seed customers, products, invoices, routes and deliveries with realistic fictional content.
- Provide a one-click administrator session and, if possible, a second driver session.
- Reset mutable demo data periodically.
- Disable or sandbox outgoing email, real integrations and any production credentials.

## Portfolio video modules

### Video 1 — Operational overview

- **Filename:** `/videos/invoice-system/01-operational-overview.mp4`
- **Duration:** 40–50 seconds.
- Open the dashboard with prepared KPIs.
- Navigate through customers, inventory, invoices, deliveries and reports.
- Do not spend more than three seconds on any navigation transition.
- Finish by showing the relationship between invoice and delivery status.

### Video 2 — Customer, product and invoice creation

- **Filename:** `/videos/invoice-system/02-customer-product-invoice.mp4`
- **Duration:** 60–75 seconds.
- Select or create a customer and branch.
- Add products and quantities.
- Show calculated totals and discounts where relevant.
- Save the invoice.
- Open the resulting invoice detail.

### Video 3 — Documents and credit-note lifecycle

- **Filename:** `/videos/invoice-system/03-documents-credit-notes.mp4`
- **Duration:** 50–65 seconds.
- Open the printable invoice.
- Create a partial or complete credit note.
- Show the relationship between the credit note and original invoice.
- Show PDF/Excel output without exposing local folders or personal filenames.

### Video 4 — Route and delivery execution

- **Filename:** `/videos/invoice-system/04-route-delivery-execution.mp4`
- **Duration:** 65–80 seconds.
- Build or open a route plan.
- Enter one delivery stop as the driver.
- Record payment method, notes or delivery evidence.
- Register an issue if it improves the story.
- Complete the stop and show the updated route state.

### Video 5 — Settlement and business reporting

- **Filename:** `/videos/invoice-system/05-settlement-business-reporting.mp4`
- **Duration:** 50–65 seconds.
- Show day summary and driver fee calculation.
- Complete or preview the daily settlement.
- Open two strong management reports.
- End with the dashboard reflecting the completed operation.

## Workana image sequence

1. **Cover — From invoice to delivery:** dashboard with an invoice, route and completed-delivery visual connection.
2. **Business master data:** customers/branches, suppliers and inventory views.
3. **Invoice creation:** selected customer, product lines, totals and successful document state.
4. **Document control:** printable invoice, credit note and exports.
5. **Delivery operation:** route plan, stop detail, evidence and incident handling.
6. **Management control:** driver settlement and business reports.

### Workana emphasis

Use Invoice System for ERP, CRM, inventory, invoicing, logistics, delivery, internal tools, dashboards and role-based administration proposals.

---

# Project 3 — Hotel Bella del Mar

## Project identity

- **Project name:** Hotel Bella del Mar
- **Repository name:** `baldurt1992/bella-mar`
- **Repository:** <https://github.com/baldurt1992/bella-mar>
- **Visibility:** Private
- **Recommended prominence:** `large`
- **Status:** Implementation completed; private final QA/staging
- **Public CTA:** `View case study` / `Ver caso de estudio`

## Suggested title

### English

**Hotel Booking & Operations Platform on WordPress**

### Spanish

**Plataforma hotelera de reservas y operación en WordPress**

## Suggested description

### English

A complete WordPress implementation for a hotel on Colombia’s Pacific coast, combining a custom RentalHive child theme with HivePress Bookings, WooCommerce and Mercado Pago. Guests can discover rooms, check availability, complete reservations and manage bookings from their account. Hotel staff receive occupancy visibility, manual booking tools and synchronized WooCommerce orders while the transactional plugins remain the authoritative booking and payment layer.

### Spanish

Implementación completa en WordPress para un hotel del Pacífico colombiano, desarrollada mediante un child theme personalizado de RentalHive e integrada con HivePress Bookings, WooCommerce y Mercado Pago. Los huéspedes pueden explorar habitaciones, consultar disponibilidad, completar reservas y administrarlas desde su cuenta. El equipo del hotel obtiene visibilidad de ocupación, herramientas para reservas manuales y pedidos WooCommerce sincronizados, manteniendo los plugins transaccionales como fuente autoritativa para reservas y pagos.

## Recommended complete engagement flow

The story should follow both sides of a hotel reservation:

1. Guest discovers the hotel and room offering.
2. Guest opens a room and reviews price, capacity, amenities and gallery.
3. Guest selects dates and number of guests.
4. The platform validates availability and creates the booking.
5. Guest continues through cart/checkout and reaches the payment stage.
6. Guest sees the reservation in the account area.
7. Hotel staff see the booking in occupancy management.
8. Staff create or inspect a manual booking and its synchronized WooCommerce order.

This dual perspective is the project's primary differentiator: it is both a commercial website and an operating tool.

## Portfolio video modules

### Video 1 — Hotel discovery and brand experience

- **Filename:** `/videos/bella-mar/01-hotel-discovery-brand.mp4`
- **Duration:** 40–55 seconds.
- Show the hero and main value proposition.
- Scroll through rooms, experiences, tides/how-to-arrive content and testimonials.
- Open the rooms catalogue.
- Finish on the strongest room card.

### Video 2 — Room selection and availability

- **Filename:** `/videos/bella-mar/02-room-availability.mp4`
- **Duration:** 45–60 seconds.
- Open a room detail page.
- Show gallery, capacity, amenities and price.
- Select dates and guests.
- Show availability validation and booking summary.

### Video 3 — Booking, checkout and payment handoff

- **Filename:** `/videos/bella-mar/03-booking-checkout-payment.mp4`
- **Duration:** 60–75 seconds.
- Continue from the booking summary.
- Show cart/checkout and hotel-specific fields.
- Reach Mercado Pago in sandbox or stop before any real payment action.
- Return to a successful reservation state using prepared test data.

### Video 4 — Guest account experience

- **Filename:** `/videos/bella-mar/04-guest-account-booking.mp4`
- **Duration:** 40–55 seconds.
- Open the guest account.
- Show reservation list, booking detail and payment status.
- Demonstrate the next available guest action.
- End on a clear confirmed or pending-payment state.

### Video 5 — Occupancy and manual booking operations

- **Filename:** `/videos/bella-mar/05-occupancy-manual-booking.mp4`
- **Duration:** 60–75 seconds.
- Open the occupancy dashboard.
- Show date/room visibility.
- Create or inspect a manual reservation.
- Show the generated/synchronized WooCommerce order.
- End with the occupancy state updated.

## Workana image sequence

1. **Cover — Complete hotel booking platform:** hotel hero plus room and occupancy-dashboard crops.
2. **Hotel discovery:** home sections, room catalogue and responsive presentation.
3. **Room conversion:** room detail, gallery, amenities, capacity and availability selector.
4. **Transactional booking:** booking summary, checkout and Mercado Pago handoff.
5. **Guest self-service:** account, booking detail and payment state.
6. **Hotel operations:** occupancy dashboard, manual booking and synchronized WooCommerce order.

### Workana emphasis

Use Bella del Mar for WordPress, WooCommerce, booking, tourism, hotels, marketplaces, payment gateways, custom themes, HivePress and operational dashboard proposals.

### Privacy and staging rule

- Do not expose staging credentials or temporary autologin helpers.
- Use sanitized guest and booking data in every recording.
- Do not claim production deployment while the project remains in final QA.
- Do not display a disabled or broken live-demo button; use the internal media case study as the CTA.

---

# Project 4 — Cosmos ERP

## Project identity

- **Project name:** Cosmos ERP
- **Repository name:** `baldurt1992/erp`
- **Repository:** <https://github.com/baldurt1992/erp>
- **Visibility:** Private
- **Recommended prominence:** `large` or `medium`
- **Status:** Active development
- **Public CTA:** `View case study` / `Ver caso de estudio`

## Suggested title

### English

**Cosmos ERP — Multi-Tenant Business Management Platform**

### Spanish

**Cosmos ERP — Plataforma multiempresa de gestión empresarial**

## Suggested description

### English

Cosmos ERP is an evolving multi-tenant platform built with Laravel 12, Nuxt 4 and TypeScript for structured business operations. It combines isolated tenant environments, guided setup, customer management, sales documents, document conversion and point-of-sale workflows. Typed API contracts, automated tests, Redis and a Docker-first runtime support a scalable architecture while each showcased workflow remains grounded in real operational use.

### Spanish

Cosmos ERP es una plataforma multiempresa en evolución, desarrollada con Laravel 12, Nuxt 4 y TypeScript para organizar operaciones empresariales. Integra entornos aislados por empresa, configuración guiada, gestión de clientes, documentos de venta, conversión documental y flujos de punto de venta. Los contratos de API tipados, las pruebas automatizadas, Redis y un entorno Docker-first respaldan una arquitectura escalable sin separar los flujos mostrados de su uso operativo real.

## Recommended complete engagement flow

The narrative should explain one complete sales-document lifecycle:

1. Create or enter a tenant environment.
2. Complete the initial company setup.
3. Create a customer.
4. Create a quotation, order or sales invoice using that customer.
5. Convert the document into the next valid business document.
6. Configure or open the POS.
7. Complete a POS sale and show the resulting record.
8. Return to the dashboard or document list to prove persistence and updated state.

Avoid presenting Cosmos as a collection of unfinished modules. Show only completed workflows and label the overall platform honestly as active development.

## Portfolio video modules

### Video 1 — Tenant and initial setup

- **Filename:** `/videos/cosmos/01-tenant-initial-setup.mp4`
- **Duration:** 50–65 seconds.
- Enter or create a sample tenant.
- Complete the essential company configuration.
- Show the resulting workspace/dashboard.
- End with a ready-to-operate company state.

### Video 2 — ERP overview and customer management

- **Filename:** `/videos/cosmos/02-erp-customer-overview.mp4`
- **Duration:** 45–60 seconds.
- Show the navigation architecture briefly.
- Open the customer module.
- Create or inspect a customer.
- Show the customer available for use in sales documents.

### Video 3 — Sales document creation

- **Filename:** `/videos/cosmos/03-sales-document-creation.mp4`
- **Duration:** 60–75 seconds.
- Begin a sales document.
- Select the prepared customer.
- Add items, quantities, prices and taxes.
- Save and show the completed document detail.

### Video 4 — Document conversion lifecycle

- **Filename:** `/videos/cosmos/04-document-conversion.mp4`
- **Duration:** 45–60 seconds.
- Open a prepared source document.
- Convert it into the next business document.
- Show inherited information and traceability.
- Return to the document list and highlight both records.

### Video 5 — POS configuration and sale

- **Filename:** `/videos/cosmos/05-pos-configuration-sale.mp4`
- **Duration:** 60–75 seconds.
- Open POS configuration or select a configured register.
- Add products to a sale.
- Select payment method and complete billing.
- Show the resulting receipt/document and dashboard state.

## Workana image sequence

1. **Cover — Multi-tenant ERP:** dashboard plus document and POS proof points.
2. **Company setup:** tenant context, setup wizard and completed workspace.
3. **Customer operations:** customer list, creation/detail and business context.
4. **Sales documents:** document editor, totals and completed result.
5. **Traceable conversion:** source document, conversion action and generated document.
6. **Point of sale:** POS cart, payment and resulting business document.

### Workana emphasis

Use Cosmos for ERP, multi-tenant, Laravel/Nuxt, POS, business documents, scalable architecture, API contracts and complex system modernization proposals.

---

# Project 5 — Carolina Odontóloga

## Project identity

- **Project name:** Carolina Odontóloga
- **Repository:** Not identified among the currently connected GitHub repositories; confirm before adding an internal repo link.
- **Recommended prominence:** `small`
- **Status:** Live WordPress project
- **Live site:** <https://carolinaodontologa.com/>
- **Public CTA:** `Visit live website` / `Visitar sitio web`

## Suggested title

### English

**Dental Practice Website with Custom Booking and Online Payments**

### Spanish

**Sitio odontológico con reservas personalizadas y pagos en línea**

## Suggested description

### English

A responsive WordPress and Elementor website for a dental practice, extended with a custom appointment-booking workflow, Bold online payments and automated email notifications. The experience allows patients to understand the available services, select an appointment and continue through payment and confirmation while the practice receives the information required to manage each booking.

### Spanish

Sitio responsive en WordPress y Elementor para una práctica odontológica, ampliado mediante un flujo personalizado de reserva de citas, pagos en línea con Bold y notificaciones automáticas por correo. La experiencia permite que los pacientes conozcan los servicios, seleccionen una cita y continúen al pago y la confirmación, mientras la práctica recibe la información necesaria para administrar cada reserva.

## Recommended complete engagement flow

This project should be concise and conversion-focused:

1. Visitor lands on the homepage and understands the professional/service offering.
2. Visitor opens the services or appointment CTA.
3. Visitor selects the available date/time or requested appointment information.
4. Visitor enters the required patient details.
5. Visitor continues to Bold payment or the configured payment step.
6. Visitor receives a confirmation state.
7. Show the related automated notification or administrative appointment record if it can be presented safely.
8. Close with the same flow on mobile.

## Portfolio video modules

Because this is a smaller project, use three strong videos rather than forcing five.

### Video 1 — Website and responsive experience

- **Filename:** `/videos/carolina-dental/01-website-responsive-experience.mp4`
- **Duration:** 35–45 seconds.
- Show the homepage, services and primary appointment CTA.
- Demonstrate desktop and mobile navigation.
- End by opening the booking experience.

### Video 2 — Appointment and payment flow

- **Filename:** `/videos/carolina-dental/02-appointment-payment-flow.mp4`
- **Duration:** 55–70 seconds.
- Select a sample appointment.
- Complete sanitized patient fields.
- Continue to Bold in a safe/test flow.
- Return to or show the successful confirmation state.

### Video 3 — Confirmation and operational follow-through

- **Filename:** `/videos/carolina-dental/03-confirmation-notifications.mp4`
- **Duration:** 35–50 seconds.
- Show the saved appointment or administrative result if available.
- Show a sanitized email notification.
- Finish with the mobile confirmation experience.

## Workana image sequence

1. **Cover — WordPress dental experience:** homepage hero plus booking and mobile crops.
2. **Services and conversion:** service presentation and appointment CTA.
3. **Appointment selection:** calendar/time or booking form entry point.
4. **Patient and payment flow:** sanitized form and Bold handoff.
5. **Confirmation:** success state and automated email evidence.
6. **Responsive delivery:** desktop, tablet and mobile views of the key flow.

### Workana emphasis

Use Carolina Odontóloga for WordPress, Elementor, professional websites, appointment booking, payment gateway, forms, responsive fixes and email-notification proposals.

---

# Deferred project — Essential

## Current decision

Essential should remain outside the main Selected Work grid until its presentation layer is ready. This is a temporary commercial decision, not a judgment that the application lacks value.

- **Repository name:** `baldurt1992/essential`
- **Repository:** <https://github.com/baldurt1992/essential>
- **Visibility:** Public

## Future suggested title

### English

**Digital Products Marketplace & Subscription Platform**

### Spanish

**Marketplace de productos digitales y plataforma de suscripciones**

## Future suggested description

### English

A Laravel and Vue platform for selling digital templates and recurring plans through Stripe. It combines a public catalogue, one-time purchases, subscriptions, protected downloads and separate administrator and client dashboards for managing products, plans, purchases and access rights.

### Spanish

Plataforma desarrollada con Laravel y Vue para vender plantillas digitales y planes recurrentes mediante Stripe. Integra catálogo público, compras individuales, suscripciones, descargas protegidas y paneles separados para administradores y clientes, desde los que se gestionan productos, planes, compras y permisos de acceso.

## Requirements before inclusion

1. Replace the generic Laravel README with a product-focused README.
2. Add a repository description, topics and demo homepage.
3. Prepare a sanitized demo database.
4. Run Stripe exclusively in test mode.
5. Provide one-click admin and client demo access.
6. Record the storefront-to-purchase flow and the resulting client access.
7. Prepare a coherent screenshot sequence.

When these conditions are met, Essential can be added as a sixth project or placed in an **Additional Work** section.

---

## 4. Workana portfolio strategy

The main portfolio can contain all five selected projects, but each Workana proposal should reference only the closest matching case.

| Workana opportunity | Primary project | Secondary proof |
| --- | --- | --- |
| SaaS, subscriptions, onboarding, attendance | Ticador | Cosmos ERP |
| ERP, invoicing, inventory, internal systems | Invoice System | Cosmos ERP |
| Logistics, routes, delivery or operations | Invoice System | Ticador |
| WordPress booking, hotel, tourism, WooCommerce | Hotel Bella del Mar | Carolina Odontóloga |
| Elementor, corporate site, forms, simple booking | Carolina Odontóloga | Hotel Bella del Mar |
| Laravel, Nuxt, multi-tenant or POS | Cosmos ERP | Invoice System |
| Landing page or frontend visual design | Showcase Lab | Ticador landing |

### Workana image-card copy

Every first image should contain:

1. Project title.
2. One-line business outcome.
3. Three capability labels at most.
4. One strong interface capture.
5. A visible `01/06` marker.

Example:

```text
Business Invoicing & Delivery Operations Platform
From invoice creation to traceable last-mile delivery.

Laravel + Vue · Route Planning · Operational Reporting
01/06
```

Avoid adding contact details, external solicitation or long technical paragraphs to Workana artwork.

---

## 5. Recording and screenshot execution checklist

### Before recording

- Create fictional but realistic names, companies, products and transactions.
- Prepare the starting and success states in advance.
- Verify that every button used in the recording works.
- Disable browser notifications and personal extensions.
- Use a clean 100% browser zoom unless the application needs a different scale for readability.
- Confirm that no API key, email address, phone number, address or real customer data appears.
- Decide the exact cursor path before pressing record.

### During recording

- Begin on the strongest screen within the first two seconds.
- Use purposeful clicks only.
- Pause briefly after every important status change.
- Keep the cursor away from text being read.
- Record each module separately rather than cutting one long exploratory session.

### During editing

- Remove authentication waiting time and typing mistakes.
- Add a 1–2 second title card.
- Add short captions for actions and outcomes.
- Use cuts rather than artificial speed when a process takes too long.
- Never fake a successful state; use prepared test data when an external integration cannot safely run live.
- Export a representative poster frame for the portfolio thumbnail.

### For Workana screenshots

- Capture the same prepared data used in the video.
- Highlight the action/result with a restrained callout, not a large arrow covering the UI.
- Number every image inside the canvas.
- Ensure each image is understandable even if Workana displays it out of order.
- Test legibility after scaling the image down to approximately 700 px wide.

---

## Final publication checklist

- [ ] Confirm the missing Ticador main-app and provisioner repository references.
- [ ] Confirm whether Carolina Odontóloga has a Git repository and add it only as an internal reference if private.
- [ ] Keep private repository URLs out of public project cards.
- [ ] Add Invoice System, Bella del Mar and Carolina media assets to the portfolio.
- [ ] Reorder `app/data/portfolio.ts` according to this plan.
- [ ] Add English and Spanish locale entries for every new project and video module.
- [ ] Use a controlled, sanitized Invoice System demo.
- [ ] Present Bella del Mar as a private final-QA case study, not as a public production deployment.
- [ ] Keep Essential deferred until its README and demo are presentation-ready.
- [ ] Preserve Showcase Lab as a separate collection of templates and frontend demonstrations.


# Diagramas PlantUML — Piscinas Mundo Fibra

Pega cada bloque en [https://www.plantuml.com/plantuml/uml](https://www.plantuml.com/plantuml/uml) o usa la extensión **PlantUML** de VS Code para previsualizar.

---

## 1. Diagrama de Infraestructura

```plantuml
@startuml infraestructura
!theme blueprint
skinparam backgroundColor #f8fafc
skinparam defaultFontName Helvetica
skinparam defaultFontSize 12
skinparam ArrowColor #0057a8
skinparam ArrowThickness 1.5
skinparam RoundCorner 10
skinparam shadowing false

title <b>Infraestructura Web — Piscinas Mundo Fibra</b>\n<size:11><color:#888>Next.js 16 · Vercel · PostgreSQL</color></size>

skinparam node {
    BackgroundColor #e0f2fe
    BorderColor #0057a8
    FontColor #003d6b
    FontStyle bold
}

skinparam database {
    BackgroundColor #dbeafe
    BorderColor #2563eb
    FontColor #1e3a5f
}

skinparam cloud {
    BackgroundColor #f0fdf4
    BorderColor #16a34a
    FontColor #14532d
}

skinparam component {
    BackgroundColor #fef9c3
    BorderColor #ca8a04
    FontColor #713f12
}

skinparam actor {
    BackgroundColor #fff
    BorderColor #6b7280
}

actor "Cliente\n(Navegador)" as CLIENTE
actor "Administrador\n(Panel)" as ADMIN

package "Vercel — Edge Network (CDN Global)" #e0f2fe {

    node "Next.js App\n(App Router · SSR/SSG)" as NEXTJS {
        component "Páginas Públicas\nHero · Ventajas · Colores\nTecnología · Cotizador" as PAGES
        component "API Routes\n/api/orders\n/api/auth\n/api/email\n/api/admin" as API
        component "Panel Admin\n/admin/**\n(protegido por auth)" as PANEL
        component "OG Image · Sitemap\nRobots.txt" as SEO_FILES
    }

    node "Edge Functions\n(Runtime: Edge)" as EDGE {
        component "opengraph-image\ntwitter-image" as OG
    }
}

database "PostgreSQL\n(Vercel Postgres\no Supabase)" as DB {
    component "orders" as T1
    component "users" as T2
    component "products" as T3
    component "notifications" as T4
}

cloud "Servicios Externos" {
    node "Resend / SendGrid\n(Email transaccional)" as EMAIL
    node "WhatsApp Business\nAPI / wa.me" as WA
    node "Google Search\nConsole + Analytics" as GSC
    node "Vercel Blob\n(Almacenamiento\nde imágenes)" as BLOB
}

' Relaciones cliente
CLIENTE --> PAGES : HTTPS (GET)\nVisita el sitio
CLIENTE --> API : HTTPS (POST)\nEnvía cotización
CLIENTE --> WA : Redirige a\nWhatsApp
ADMIN --> PANEL : HTTPS\nGestiona órdenes

' Relaciones internas Next.js
PAGES --> API : Server Actions\n/ fetch interno
API --> DB : Queries SQL\n(Prisma ORM)
PANEL --> API : Llamadas REST\nautenticadas

' Servicios externos
API --> EMAIL : Notificaciones\nautomáticas
API --> BLOB : Subida de\nimágenes
SEO_FILES --> GSC : Indexación\nSitemap.xml
EDGE --> OG : Genera imagen\nOpenGraph

note bottom of DB
  Tablas principales:
  orders · users · products
  quotes · notifications · settings
end note

note right of NEXTJS
  Despliegue automático:
  push a main → build → deploy
  en ~30 segundos
end note

@enduml
```

---

## 2. Diagrama de Estados — Orden de Compra

```plantuml
@startuml estados_orden
!theme blueprint
skinparam backgroundColor #f8fafc
skinparam defaultFontName Helvetica
skinparam defaultFontSize 12
skinparam shadowing false
skinparam RoundCorner 12

title <b>Estados de la Orden de Compra</b>\n<size:11><color:#888>Piscinas Mundo Fibra — Plataforma Web</color></size>

skinparam state {
    BackgroundColor #e0f2fe
    BorderColor #0057a8
    FontColor #003d6b
    ArrowColor #0057a8
}

[*] --> Nueva : Cliente envía\nel formulario web

state Nueva #bfdbfe : **NUEVA**\n---\nOrden recibida en el sistema.\nAdmin recibe notificación\npor email y panel.

state EnRevision #fef08a : **EN REVISIÓN**\n---\nAdmin asignó la orden\na un vendedor.\nCliente notificado.

state Cotizada #e9d5ff : **COTIZADA**\n---\nVendedor generó precio\noficial. Email enviado\nal cliente con detalle.

state Aceptada #bbf7d0 : **ACEPTADA**\n---\nCliente aprobó la cotización.\nSe confirma forma de pago\ny fecha de fabricación.

state Rechazada #fecaca : **RECHAZADA**\n---\nCliente no aceptó\no canceló el proceso.\nOrden archivada.

state EnFabricacion #a5f3fc : **EN FABRICACIÓN**\n---\nEquipo de producción\nfabricando la piscina.\nCliente informado.

state ListaEntrega #c7d2fe : **LISTA PARA ENTREGA**\n---\nFabricación completada.\nCoordinando instalación\ncon el cliente.

state Entregada #6ee7b7 : **ENTREGADA**\n---\nPiscina instalada.\nOrden cerrada.\nRegistrada en reportes.

state AjusteSolicitado #fed7aa : **AJUSTE SOLICITADO**\n---\nCliente pide modificar\nespecificaciones antes\nde aceptar.

Nueva --> EnRevision : Admin revisa\ny asigna vendedor

EnRevision --> Cotizada : Vendedor genera\ncotización oficial

EnRevision --> Rechazada : No es factible\n(sin solución)

Cotizada --> Aceptada : Cliente acepta\nla cotización

Cotizada --> Rechazada : Cliente rechaza\nla oferta

Cotizada --> AjusteSolicitado : Cliente pide\ncambios

AjusteSolicitado --> Cotizada : Vendedor recotiza\ncon nuevas especificaciones

AjusteSolicitado --> Rechazada : No se llega\na acuerdo

Aceptada --> EnFabricacion : Pago confirmado\n/ Fabricación iniciada

EnFabricacion --> ListaEntrega : Producción\ncompletada

ListaEntrega --> Entregada : Instalación\nrealizada ✓

Entregada --> [*]

Rechazada --> [*]

note right of Nueva
  🔔 Notificación automática:
  Admin recibe email + alerta
  en el panel de administración
end note

note right of Cotizada
  📧 Email automático al cliente
  con detalle del precio,
  dimensiones y accesorios
end note

note right of Entregada
  📊 Se registra en reportes:
  tiempo de conversión,
  valor de la orden, vendedor
end note

note left of Rechazada
  🗃️ La orden queda archivada.
  El admin puede reactivarla
  si el cliente retoma contacto.
end note

@enduml
```

---

## 3. Diagrama de Flujo — Orden de Compra (Activity)

```plantuml
@startuml flujo_orden
!theme blueprint
skinparam backgroundColor #f8fafc
skinparam defaultFontName Helvetica
skinparam defaultFontSize 11
skinparam shadowing false
skinparam RoundCorner 8
skinparam ArrowColor #0057a8
skinparam ArrowThickness 1.5

skinparam activity {
    BackgroundColor #e0f2fe
    BorderColor #0057a8
    FontColor #1e3a5f
    DiamondBackgroundColor #fef9c3
    DiamondBorderColor #ca8a04
    DiamondFontColor #713f12
    StartColor #003d6b
    EndColor #003d6b
}

title <b>Flujo Completo — Orden de Compra</b>\n<size:11><color:#888>Piscinas Mundo Fibra</color></size>

|#e0f2fe| Cliente |
|#dbeafe| Sistema |
|#f0fdf4| Administrador / Vendedor |

|Cliente|
start

:Ingresa al **cotizador online**\nen piscinasmundofibra.cl;

:Selecciona **dimensiones**\n(largo · ancho · profundidad);

:Elige **color** de la piscina;

:Selecciona **accesorios** opcionales\n(Bomba calor · Filtro · LED · etc.);

:Completa datos de contacto\n(nombre · email · teléfono);

|Sistema|
:Valida formulario;

if (¿Datos completos\ny válidos?) then (No)
    |Cliente|
    :Muestra errores\nen el formulario;
    stop
else (Sí)
endif

:Genera **Orden de Cotización**\ncon número único PMF-YYYYMMDD-XXXX;

:Guarda orden en base de datos\ncon estado **NUEVA**;

:Envía **email de confirmación**\nal cliente;

:Envía **alerta al administrador**\nvía email + panel;

|Cliente|
:Recibe confirmación\ny número de orden;

fork
    :Envía orden por **WhatsApp**\nal +56 9 5408 8120;
fork again
    :Descarga o imprime\nel **PDF** de la orden;
end fork

|Administrador / Vendedor|
:Recibe notificación\nen el **panel de admin**;

:Revisa la orden\ny sus especificaciones;

if (¿Es factible\nla solicitud?) then (No)
    :Contacta al cliente\npara ajustar parámetros;
    |Cliente|
    :Modifica especificaciones;
    |Administrador / Vendedor|
else (Sí)
endif

:Cambia estado a **EN REVISIÓN**;

|Sistema|
:Notifica al cliente\ncambio de estado;

|Administrador / Vendedor|
:Prepara **cotización oficial**\ncon precio y condiciones;

:Cambia estado a **COTIZADA**;

|Sistema|
:Envía email al cliente\ncon cotización detallada;

|Cliente|
:Revisa la cotización\nrecibida por email;

if (¿Acepta la\ncotización?) then (Rechaza)
    |Sistema|
    :Cambia estado a **RECHAZADA**;
    :Notifica al administrador;
    stop
else if (Requiere\nAjustes) then (Sí)
    |Cliente|
    :Solicita modificaciones;
    |Administrador / Vendedor|
    :Recotiza con nuevas\nespecificaciones;
    note right: Vuelve al paso\nde cotización oficial
else (Acepta)
endif

|Cliente|
:Confirma aceptación\ny coordina pago;

|Sistema|
:Cambia estado a **ACEPTADA**;
:Notifica al equipo\nde producción;

|Administrador / Vendedor|
:Confirma recepción de pago;

:Cambia estado a\n**EN FABRICACIÓN**;

|Sistema|
:Notifica al cliente\ninicio de fabricación;

|Administrador / Vendedor|
:Supervisa proceso\nde fabricación;

:Fabricación completada;

:Cambia estado a\n**LISTA PARA ENTREGA**;

|Sistema|
:Notifica al cliente\npara coordinar instalación;

|Administrador / Vendedor|
:Coordina fecha y lugar\nde instalación;

:Realiza la instalación;

:Cambia estado a **ENTREGADA**;

|Sistema|
:Cierra la orden;

:Registra en **reportes**\n(tiempo · valor · vendedor);

:Envía email de\n**satisfacción al cliente**;

|Cliente|
:Recibe su piscina instalada 🏊;

stop

@enduml
```

---

## Cómo usar estos diagramas

### Opción A — Online (sin instalación)
1. Ir a [plantuml.com/plantuml/uml](https://www.plantuml.com/plantuml/uml)
2. Pegar el contenido de cada bloque (sin las comillas del markdown)
3. El diagrama se renderiza automáticamente

### Opción B — VS Code
1. Instalar la extensión **PlantUML** (`jebbs.plantuml`)
2. Instalar Java (requerido por PlantUML)
3. Abrir un archivo `.puml` y presionar `Alt + D` para previsualizar

### Opción C — Exportar como PNG/SVG
En la web de PlantUML, usa los botones **PNG** o **SVG** para descargar la imagen del diagrama lista para incluir en presentaciones o documentos.

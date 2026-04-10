# Piscinas Mundo Fibra

Sitio web y panel administrativo para **Piscinas Mundo Fibra**, empresa especializada en piscinas de fibra de vidrio en Chile.

## Repositorio

| | |
|---|---|
| **Remoto** | [https://github.com/alvaroraulcastro/piscinasMundoFibra](https://github.com/alvaroraulcastro/piscinasMundoFibra) |
| **Clonar** | `git clone https://github.com/alvaroraulcastro/piscinasMundoFibra.git` |

> Rama de trabajo habitual: `dev` (ajusta según tu flujo de equipo).

## Qué incluye el proyecto

### Sitio público

- **Cotizador** — Dimensiones, color y accesorios; el envío registra la orden en base de datos (`POST /api/orders`), correos de confirmación (si SMTP está configurado) y muestra la orden con número devuelto por el servidor.
- **Catálogo dinámico** — Colores y accesorios se leen desde PostgreSQL (administrables en el panel).
- **SEO** — Metadatos de la página de inicio desde la tabla `SeoEntry` (`pageSlug: home`).
- **WhatsApp** — Integración con el número configurado en el sitio.

### Panel de administración (`/admin`)

- Dashboard, órdenes (estados, asignación de vendedor, precio), usuarios, catálogo, plantillas de correo, SEO, configuración del sitio y reportes.
- Autenticación con **NextAuth** (credenciales); middleware que exige sesión en rutas `/admin` (excepto login).
- Vista **imprimir / PDF** por orden: `/admin/orders/[id]/print`.

### APIs relevantes

| Ruta | Descripción |
|------|-------------|
| `POST /api/orders` | Crear orden (público); incluye rate limiting por IP. |
| `GET /api/orders` | Listado (roles admin/vendedor). |
| `GET /api/catalog` | Catálogo público de solo lectura (colores y accesorios activos). |
| ` /api/admin/*` | Operaciones del panel (protegidas por rol). |

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) · React 19 · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Prisma](https://www.prisma.io/) + **PostgreSQL**
- [NextAuth.js](https://authjs.dev/) v5 (beta) — sesión JWT
- [Nodemailer](https://nodemailer.com/) — envío SMTP
- [react-hot-toast](https://react-hot-toast.com/) — notificaciones en el admin
- [Lucide React](https://lucide.dev/) — iconos

Despliegue recomendado: [Vercel](https://vercel.com/) (u otro host compatible con Next.js y Node).

## Requisitos

- **Node.js** 20+ (recomendado)
- **PostgreSQL** accesible con una cadena de conexión (`DATABASE_URL`)

## Configuración local

1. **Clonar e instalar dependencias**

   ```bash
   git clone https://github.com/alvaroraulcastro/piscinasMundoFibra.git
   cd piscinasMundoFibra
   npm install
   ```

2. **Variables de entorno**

   Copia `.env.example` a `.env.local` y completa los valores:

   - `DATABASE_URL` — conexión a PostgreSQL
   - `AUTH_SECRET` — secreto para firmar sesiones; en local puedes generar uno con `npx auth secret` o `openssl rand -base64 32`
   - `AUTH_URL` — en local suele ser `http://localhost:3000`
   - `NEXT_PUBLIC_SITE_URL` — URL pública del sitio (sin barra final)
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — opcional (Search Console)

   En **producción**, `AUTH_SECRET` debe ser obligatoriamente un valor aleatorio fuerte y único.

3. **Base de datos y datos iniciales**

   ```bash
   npx prisma generate
   npx prisma db push
   # o, si usas migraciones:
   # npm run db:migrate

   npm run db:seed
   ```

   El seed crea usuarios, colores, accesorios, configuración del sitio, entrada SEO `home` y plantillas de email. Las credenciales por defecto del administrador están definidas en `prisma/seed.ts` (cámbialas en entornos reales tras el primer acceso).

4. **SMTP (opcional pero recomendado para correos automáticos)**

   Configura en el panel **Administración → Configuración** las claves `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `smtp_from`, o añádelas en la base vía seed/config.

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo ([http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor tras `build` |
| `npm run lint` | ESLint |
| `npm run db:generate` | Genera el cliente Prisma |
| `npm run db:push` | Sincroniza esquema con la BD (desarrollo) |
| `npm run db:migrate` | Migraciones (`prisma migrate dev`) |
| `npm run db:seed` | Ejecuta `prisma/seed.ts` |
| `npm run db:studio` | Prisma Studio |

## Despliegue (Vercel)

1. Conecta el repositorio en [vercel.com](https://vercel.com/).
2. Configura las variables de entorno del proyecto (al menos `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`).
3. Ejecuta migraciones o `db push` contra la base de producción según tu estrategia.
4. Los despliegues suelen activarse en cada push a la rama conectada (por ejemplo `main`).

## Estructura principal

```
app/           # Rutas y layouts (App Router), APIs en app/api/
components/    # UI pública y admin (p. ej. Cotizador, AdminShell)
lib/           # Auth, Prisma, email, utilidades
prisma/        # schema.prisma, seed.ts
middleware.ts  # Protección de rutas /admin
```

## Contacto (negocio)

- **WhatsApp**: +56 9 5408 8120  
- **Instagram**: [@piscinasmundofibra](https://www.instagram.com/piscinasmundofibra)  
- **Web**: [piscinasmundofibra.cl](https://piscinasmundofibra.cl)

---

© Piscinas Mundo Fibra. Uso interno y del proyecto según licencia del repositorio.

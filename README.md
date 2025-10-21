# Flappy Souls

Juego simple estilo "Flappy" hecho con TypeScript, Vite y Tailwindcss.

Descripción
-----------

Proyecto de ejemplo que implementa una versión básica de un juego tipo Flappy Bird. Usa TypeScript para la lógica del juego y Vite como servidor de desarrollo y herramienta de bundling.

Requisitos
----------

- Node.js (>= 18 recomendado) o Deno
- npm (v8+)

Instalación
-----------

Desde la raíz del proyecto ejecuta:

```powershell
npm/deno install 
```

Comandos disponibles
--------------------

- Iniciar servidor de desarrollo (modo HMR):

```powershell
npm/deno run dev
```

- Compilar el proyecto (TypeScript + Vite):

```powershell
npm run build
```

- Previsualizar la build generada:

```powershell
npm run preview
```

Estructura principal
--------------------

- `index.html` — entrada HTML del juego.
- `package.json` — scripts y dependencias.
- `tsconfig.json` — configuración de TypeScript.
- `src/` — código fuente TypeScript:
  - `main.ts` — punto de entrada.
  - `game_machine.ts` — lógica principal del bucle/maquina del juego.
  - `components/`, `elements/`, `common/` — módulos organizados por responsabilidad.
- `public/` — activos estáticos (CSS, imágenes, sprites).

Notas de desarrollo
-------------------

- El proyecto usa Vite (paquete `rolldown-vite` en las dependencias) y TypeScript (~5.9).
- Para editar el código: modificar los archivos bajo `src/` y recargar la página del servidor dev.
- Si añade nuevas dependencias, ejecute `npm install <paquete>` y actualice `package.json` según convenga.

Contribuir
----------

1. Haz un fork o crea una rama nueva.
2. Crea commits claros y descriptivos.
3. Abre un pull request describiendo los cambios.

Licencia y contacto
-------------------

Proyecto para fines educativos/demostración. Contacto: revisa el repositorio remoto para información del autor.

--
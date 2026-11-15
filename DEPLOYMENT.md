# Publicación de MOSAIC

## Estado

La aplicación Next.js se configura para exportación estática: `npm run build`
genera el sitio listo para alojamiento estático en `out/`. La acción de GitHub
construye ese contenido desde `main` y lo publica en la rama `deploy`, que
Porkbun puede sincronizar como sitio estático.

Los datos científicos originales están en `DATA/` (aprox. 6.3 GB) y se excluyen
de Git. El sitio solo debe incluir los recursos web pequeños que utiliza en
`public/`. Los resultados publicados deben describirse como demostrativos
mientras no estén respaldados por cálculos reproducibles.

## Conectar el hosting de Porkbun

1. En Porkbun abre **Account → Domain Management** y busca `mosaicworld.earth`.
2. Si aparece el icono de **Static Hosting**, ábrelo. En la sección **GitHub
   Connect**, conecta GitHub y autoriza solo el repositorio
   `Paimilla/MosaicEarth`.
3. Selecciona el repositorio y la rama **deploy**. La raíz de esa rama contiene
   el sitio ya compilado; no selecciones `main`, que contiene el código fuente.
4. En el panel del dominio, activa el hosting para `mosaicworld.earth` y
   `www.mosaicworld.earth` si quieres ambos. Sigue los registros DNS que el
   mismo panel indique y activa SSL.

La integración GitHub Connect de Porkbun sincroniza el repositorio y la rama que
selecciones. Por eso el flujo de compilación genera una rama de salida estática
separada. Sigue la [guía oficial de conexión GitHub](https://kb.porkbun.com/article/145-how-to-connect-static-hosting-to-github)
y la [guía de hosting estático](https://kb.porkbun.com/article/137-how-to-set-up-static-hosting).
Consulta también la guía
de Porkbun facilitada por Space Apps:
https://assets.spaceappschallenge.org/media/documents/Porkbun_Hosting_Guide_NASA_Space_Apps.pdf

## Nota sobre Next.js

La exportación estática sirve esta aplicación sin servidor Node.js. Si más
adelante se incorpora una API, autenticación con servidor u otra función
dinámica de Next.js, habrá que desplegar en un proveedor que ejecute Next.js y
apuntar el dominio a ese servicio.

Los informes técnicos preliminares se conservan en `docs/borradores/` y se excluyen del sitio y de Git porque contienen puntuaciones no validadas.

# Publicación de MOSAIC

## Estado

La aplicación Next.js se configura para exportación estática: `npm run build`
genera el sitio listo para alojamiento estático en `out/`. Esto permite subirlo
al alojamiento estático de Porkbun desde GitHub o transferir `out/` por SFTP.

Los datos científicos originales están en `DATA/` (aprox. 6.3 GB) y se excluyen
de Git. El sitio solo debe incluir los recursos web pequeños que utiliza en
`public/`. Los resultados publicados deben describirse como demostrativos
mientras no estén respaldados por cálculos reproducibles.

## Preparar el repositorio en GitHub

1. Crea un repositorio **Private** inicialmente en GitHub.
2. En esta carpeta, abre PowerShell y ejecuta:

   ```powershell
   git init
   git add .
   git status --short
   ```

3. Revisa que `git status` no muestre `DATA/`, `.env`, `node_modules/` ni `.next/`.
   Luego crea el primer commit y enlaza el repositorio con la URL que GitHub te
   entregue:

   ```powershell
   git commit -m "Prepare MOSAIC for static web deployment"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

   Reemplaza `USUARIO/REPOSITORIO` por el nombre real. No guardes contraseñas ni
   tokens dentro del proyecto.

## Construir y publicar en el alojamiento de Porkbun

1. En el panel del hosting estático de Porkbun, conecta el repositorio de
   GitHub y selecciona la rama `main`.
2. Configura el comando de build como `npm run build` y el directorio publicado
   como `out`.
3. Si usas transferencia manual, instala dependencias con `npm ci`, ejecuta
   `npm run build` y sube **el contenido de `out/`** al directorio web indicado
   por Porkbun. No subas el proyecto completo ni `DATA/`.
4. Añade el dominio al hosting siguiendo las instrucciones de Porkbun. Configura
   sus registros DNS exactamente como aparecen en el panel y activa SSL allí.

La oferta de Space Apps debe reclamarse primero en https://www.spaceapps.earth/.
El dominio y el alojamiento son pasos separados; los datos DNS definitivos
dependen del dominio y servicio asignados a tu cuenta. Consulta también la guía
de Porkbun facilitada por Space Apps:
https://assets.spaceappschallenge.org/media/documents/Porkbun_Hosting_Guide_NASA_Space_Apps.pdf

## Nota sobre Next.js

La exportación estática sirve esta aplicación sin servidor Node.js. Si más
adelante se incorpora una API, autenticación con servidor u otra función
dinámica de Next.js, habrá que desplegar en un proveedor que ejecute Next.js y
apuntar el dominio a ese servicio.

Los informes técnicos preliminares se conservan en docs/borradores/ y se excluyen del sitio y de Git porque contienen puntuaciones no validadas.

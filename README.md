# MOSAIC

MOSAIC is a NASA Space Apps Challenge 2026 prototype for exploring Earth analog sites alongside Mars and lunar locations. It is built with Next.js, React, TypeScript, Tailwind CSS, and Leaflet.

## What is in this repository

- The web application and its map/analysis interfaces.
- Small processed examples used by the interface under `public/data/` and `src/data/`.
- Scientific source files are kept separately in the local `DATA/` directory and are not committed to GitHub because that directory is about 6.3 GB.

## Scientific status

The interface includes real source references and some observations processed from downloaded files. However, the compatibility scores and several comparison values currently shown are illustrative placeholders; no validated cross-instrument MCDA scores have been calculated. They are not scientific findings and must not be cited as measured results. The reproducible processing summaries record this limitation.

## Run locally

Requirements: Node.js 18 or later.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000.

## Build for static hosting

```powershell
npm ci
npm run build
```

The static website is generated in `out/`. The project is configured for static hosting and can be deployed from GitHub or by uploading the contents of `out/` over SFTP. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Data sources

- [NASA Planetary Data System](https://pds.nasa.gov/)
- [NASA Earthdata Search](https://search.earthdata.nasa.gov/)
- [Copernicus Data Space](https://dataspace.copernicus.eu/)
- [Zenodo dataset, Makgadikgadi](https://doi.org/10.5281/zenodo.22256874)
- [Pajonales study and supplements](https://doi.org/10.3389/fspas.2025.1693302)
- [AMRDC Amundsen–Scott observations](https://doi.org/10.48567/r6wy-as19)

Check the source dataset licenses and citation requirements before redistributing any downloaded data.

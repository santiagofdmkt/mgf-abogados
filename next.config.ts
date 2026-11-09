import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/accidentesdetrabajo.html", destination: "/areas/accidentes-trabajo", permanent: true },
      { source: "/transito.html", destination: "/areas/accidentes-transito", permanent: true },
      { source: "/despidos.html", destination: "/areas/despidos", permanent: true },
      { source: "/propiedadhorizontal.html", destination: "/areas/propiedad-horizontal", permanent: true },
      { source: "/derechosalasalud.html", destination: "/areas/mala-praxis", permanent: true },
      { source: "/areas/derecho-salud", destination: "/areas/mala-praxis", permanent: true },
      { source: "/sucesiones.html", destination: "/areas/sucesiones", permanent: true },
      { source: "/sobrenosotros.html", destination: "/#equipo", permanent: true },
      { source: "/contacto.html", destination: "/#contacto", permanent: true },
      { source: "/veronica.html", destination: "/#equipo", permanent: true },
    ];
  },
};

export default nextConfig;
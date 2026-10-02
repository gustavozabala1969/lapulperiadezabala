
export function buscarLogo(tipo) {

  let logo = "";
  if (tipo=="CERDO") {
    logo = "/imagenes/gastronomicas/Cerdos.png";

  } else if (tipo=="ASADO") {
    logo = "/imagenes/gastronomicas/Costillares.png";

  } else if (tipo=="PASTAS") {
    logo = "/imagenes/gastronomicas/ItaliaPastas.png";

  } else if (tipo=="POLLO") {
    logo = "/imagenes/gastronomicas/PolloAlDisco.png";
  }
  
  return logo;
}

export function obtenerDiaSemana(fecha) {
  const fechaDate = new Date(fecha);

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  return dias[fechaDate.getDay()];
}

export function formatearFechaHoraDate(fecha) {
  if (!fecha) {
    return '';
  }

  const wfecha = new Date(fecha);

  return wfecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');
}

export function formatearFechaHoraString(fechaIso) {
  if (!fechaIso) {
    return '';
  }

  const fecha = new Date(fechaIso);

  return fecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');
}

export function formatearFechaHora(fechaHora) {
  if (!fechaHora) {
    return {
      fecha: "",
      hora: ""
    };
  }

  const fecha = new Date(fechaHora);

  return {
    fecha: fecha.toLocaleDateString("es-AR"),

    hora: fecha.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })
  };
}

export function formatearFecha(fecha) {
  if (!fecha) {
    return '';
  }

  const partes = fecha.split('-');

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function formatearFechaDate(fecha) {
  if (!fecha) {
    return '';
  }

  // Si viene string desde API
  const fechaObj =
    typeof fecha === 'string'
      ? new Date(fecha)
      : fecha;

  const dia = String(fechaObj.getDate()).padStart(2, '0');

  const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');

  const anio = fechaObj.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

export function balanzaFuncionando(fechaHora, tiempoBalanzaFuncionado) {
  if (!fechaHora) {
    return true;
  }

  const fecha =
    fechaHora instanceof Date
      ? fechaHora
      : new Date(fechaHora);

  const diferenciaMs = Date.now() - fecha.getTime();

  return diferenciaMs < tiempoBalanzaFuncionado;
}
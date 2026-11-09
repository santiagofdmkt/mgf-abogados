// lib/areas.ts
// Contenido de cada área de práctica. Para editar, tocá SOLO este archivo.
// El diseño vive en app/areas/[slug]/page.tsx

export type Faq = { q: string; a: string }
export type Seccion = { titulo: string; parrafos: string[] }
export type Dato = { icono: string; titulo: string; texto: string }
export type Paso = { titulo: string; texto: string }
export type Numero = { valor: string; etiqueta: string }
export type Bloque<T> = { etiqueta: string; titulo: string; items: T[] }

export type Area = {
  slug: string
  title: string
  icon: string
  heroImage: string        // Unsplash. Cambiá esta URL si querés otra foto.
  metaTitle: string
  metaDescription: string
  heroLabel: string
  heroDescription: string
  secciones: Seccion[]
  faq: Faq[]
  chips?: string[]
  cubre?: Bloque<Dato>
  corresponde?: Bloque<Dato>
  camino?: Bloque<Paso>
  numeros?: Numero[]
}

export const areas: Area[] = [
  // ───────────────────────── 1. ACCIDENTES DE TRABAJO (completo) ─────────────────────────
  {
    slug: 'accidentes-trabajo',
    title: 'Accidentes de Trabajo',
    icon: '🦺',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Accidentes de Trabajo y ART | MGF Abogados',
    metaDescription: 'Reclamos por accidentes laborales, accidentes in itínere y enfermedades profesionales ante la ART. Primera consulta sin cargo.',
    heroLabel: 'Derecho Laboral · ART',
    heroDescription: 'Gestionamos tu reclamo ante la ART por accidentes laborales, accidentes in itínere y enfermedades profesionales.',
    chips: ['Primera consulta sin cargo', 'Oficinas en CABA y La Plata', 'Trámite en Comisión Médica sin costo para vos'],
    cubre: {
      etiqueta: 'Cobertura',
      titulo: '¿Qué situaciones cubre tu ART?',
      items: [
        { icono: 'trabajo', titulo: 'Accidente en el trabajo', texto: 'Una lesión que ocurre por el trabajo o durante tu jornada.' },
        { icono: 'itinere', titulo: 'Accidente in itínere', texto: 'El que sufrís yendo o volviendo entre tu casa y tu trabajo.' },
        { icono: 'enfermedad', titulo: 'Enfermedad profesional', texto: 'La que se origina por las condiciones de tu trabajo.' },
      ],
    },
    corresponde: {
      etiqueta: 'Tus derechos',
      titulo: '¿Qué te corresponde?',
      items: [
        { icono: 'medico', titulo: 'Atención médica', texto: 'Tratamiento y rehabilitación completos, a cargo de la ART.' },
        { icono: 'salario', titulo: 'Ingreso mensual', texto: 'Una prestación mientras dure tu licencia.' },
        { icono: 'indemnizacion', titulo: 'Indemnización', texto: 'Si el accidente deja una secuela permanente.' },
        { icono: 'traslado', titulo: 'Traslados y medicamentos', texto: 'Los que indique tu médico tratante.' },
      ],
    },


    secciones: [],
    faq: [
      { q: '¿Qué hago si tengo un accidente?', a: 'Avisá de inmediato a tu empleador para que haga la denuncia ante la ART. Si no la hace, podés hacerla vos mismo. Si el médico te indica reposo, no debés prestar tareas.' },
      { q: '¿Qué pasa si la ART rechaza mi caso?', a: 'Suele alegar que la lesión no tiene relación con el trabajo o que ya existía. El rechazo debe notificarse por escrito y muchas veces se puede cuestionar. Consultanos cuanto antes.' },
      { q: '¿Qué pasa cuando me dan el alta?', a: 'La ART evalúa si quedó una secuela. Puede darte el alta sin incapacidad, derivarte a tu obra social o reconocerte una incapacidad e indemnizarte. Antes de firmar o aceptar algo, asesorate.' },
      { q: '¿Cuánto me corresponde de indemnización?', a: 'Depende de tres factores: tu edad, tu salario y el porcentaje de incapacidad que determine la Comisión Médica. Por eso no se puede dar un monto exacto sin analizar tu caso.' },
      { q: '¿Cuánto tarda y cuánto tiempo tengo para reclamar?', a: 'La Comisión Médica tiene un plazo de 60 días hábiles administrativos para expedirse. Si hay que ir a la justicia, el tiempo varía según cada caso. El plazo general para reclamar es de 2 años: conviene consultar cuanto antes.' },
      { q: '¿Tengo que pagar para reclamar?', a: 'La primera consulta es sin cargo. Ante la Comisión Médica, la ley pone a cargo de la ART los honorarios del abogado y los gastos del trabajador. Te explicamos cómo funciona antes de empezar.' },
    ],
  },

  // ───────────────────────── 2-6. PENDIENTES (con imagen; el contenido lo cargamos después) ─────────────────────────
  {
    slug: 'accidentes-transito',
    title: 'Accidentes de Tránsito',
    icon: '🚗',
    heroImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Accidentes de Tránsito | MGF Abogados',
    metaDescription: 'Indemnización por lesiones y daños materiales en accidentes de tránsito ante aseguradoras y responsables. Consulta sin cargo.',
    heroLabel: 'Daños · Seguros',
    heroDescription: 'Reclamamos indemnizaciones por lesiones y daños materiales ante aseguradoras y responsables. Todo daño debe ser reparado.',
    chips: ['Primera consulta sin cargo', 'Oficinas en CABA y La Plata', 'Reclamo ante la aseguradora del responsable'],
    cubre: {
      etiqueta: 'Casos',
      titulo: '¿En qué situaciones podemos ayudarte?',
      items: [
        { icono: 'traslado', titulo: 'Conductor o acompañante', texto: 'Choques con lesiones o daños en tu auto o moto, aunque manejaras vos.' },
        { icono: 'itinere', titulo: 'Peatón o ciclista', texto: 'Atropellos y caídas causadas por un vehículo.' },
        { icono: 'medico', titulo: 'Pasajero de transporte', texto: 'Colectivo, taxi, subte, tren, remís, Uber, Cabify o Didi.' },
        { icono: 'trabajo', titulo: 'Rutas y lugares privados', texto: 'Autopistas, rutas, hoteles, locales o shoppings.' },
      ],
    },
    corresponde: {
      etiqueta: 'Reclamo',
      titulo: '¿Qué podés reclamar?',
      items: [
        { icono: 'medico', titulo: 'Lesiones físicas', texto: 'Tratamientos, estudios, medicamentos y rehabilitación.' },
        { icono: 'indemnizacion', titulo: 'Daño psicológico', texto: 'El estrés postraumático: miedo a circular, a manejar o a salir.' },
        { icono: 'salario', titulo: 'Ingresos perdidos', texto: 'Lo que dejaste de ganar mientras estuviste sin trabajar.' },
        { icono: 'traslado', titulo: 'Daños del vehículo', texto: 'Reparación o valor del vehículo, más gastos de traslado.' },
      ],
    },
    secciones: [],
    faq: [
      { q: '¿Qué hago después de un accidente?', a: 'Si hay lesiones, llamá al SAME y no te muevas. Si estás en condiciones, sacá fotos del lugar y de los vehículos, buscá testigos y pedí los datos del otro conductor.' },
      { q: '¿Qué datos tengo que pedir?', a: 'Nombre, DNI y domicilio, marca, modelo y patente del vehículo, cédula verde, registro de conducir y datos del seguro con número de póliza.' },
      { q: '¿Tengo que avisarle a mi seguro?', a: 'Sí. La ley te exige comunicar el siniestro a tu aseguradora dentro de los 3 días de conocido. Conviene consultarnos antes, para hacerlo sin errores que después te perjudiquen.' },
      { q: 'Intervino la policía, ¿qué significa?', a: 'Si hubo lesiones puede abrirse una causa penal, que reúne pruebas clave como fotos, croquis, pericias y testigos. Los daños materiales solos no la habilitan.' },
      { q: 'Me empezaron dolores días después, ¿qué hago?', a: 'Es frecuente: por la adrenalina, a veces no se siente nada en el momento. Andá a una guardia, pedí el certificado y asegurate de que figure que las lesiones derivan del accidente.' },
      { q: '¿Quién se hace cargo de los daños?', a: 'En la mayoría de los casos responde la aseguradora del responsable. En choques múltiples se analiza cada caso, por eso conviene tomar los datos de todos los involucrados.' },
      { q: '¿Cuánto tiempo tengo para reclamar?', a: 'En general tenés 3 años desde el hecho. Igual conviene consultar cuanto antes, porque la prueba se pierde con el tiempo.' },
    ],
  },
  {
    slug: 'despidos',
    title: 'Despidos e Indemnizaciones',
    icon: '📄',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados Laborales: Despidos e Indemnizaciones | MGF Abogados',
    metaDescription: 'Despidos sin causa, despido de palabra, trabajo en negro, acoso laboral y diferencias salariales. Calculamos tu indemnización. Consulta sin cargo.',
    heroLabel: 'Derecho Laboral',
    heroDescription: 'Te asesoramos antes de que firmes o aceptes nada. El pago de una indemnización justa es tu derecho: calculamos lo que te corresponde sin cargo.',
    chips: ['Primera consulta sin cargo', 'Cálculo de tu indemnización sin cargo', 'Oficinas en CABA y La Plata'],
    cubre: {
      etiqueta: 'Tu situación',
      titulo: '¿Cuál es tu caso?',
      items: [
        { icono: 'trabajo', titulo: 'Me despidieron sin causa', texto: 'Con o sin telegrama, incluso si fue solo de palabra.' },
        { icono: 'itinere', titulo: 'Trabajo en negro o mal registrado', texto: 'Sin registrar, con facturas obligadas o en una categoría que no es la tuya.' },
        { icono: 'enfermedad', titulo: 'Me hacen la vida imposible', texto: 'Acoso, negativa de tareas o cambios de horario o lugar sin tu acuerdo.' },
        { icono: 'medico', titulo: 'Me ofrecen renunciar o un retiro', texto: 'Antes de firmar, conviene que lo revisemos.' },
      ],
    },
    corresponde: {
      etiqueta: 'Tus derechos',
      titulo: '¿Qué podés reclamar?',
      items: [
        { icono: 'indemnizacion', titulo: 'Indemnización por despido', texto: 'Se calcula según tu antigüedad y tu sueldo.' },
        { icono: 'salario', titulo: 'Preaviso e integración del mes', texto: 'Si no te avisaron con anticipación.' },
        { icono: 'traslado', titulo: 'Liquidación final', texto: 'Días trabajados, aguinaldo y vacaciones no gozadas.' },
        { icono: 'trabajo', titulo: 'Diferencias salariales', texto: 'Si te registraron en una categoría o con un sueldo menor al real.' },
      ],
    },
    secciones: [],
    faq: [
      { q: '¿Qué hago si recibo un telegrama de despido?', a: 'Contactanos rápido. Los plazos para responder son muy cortos y un error puede perjudicar tu reclamo.' },
      { q: 'Me despidieron de palabra, ¿qué hago?', a: 'Por lo general conviene seguir yendo a trabajar y enviar un telegrama para que tu empleador aclare tu situación por escrito. Te asesoramos y lo redactamos.' },
      { q: 'Me despidieron sin decir por qué, ¿es legal?', a: 'Sí, el empleador puede despedir sin causa, pero debe indemnizarte y pagarte la liquidación final. Antes de firmar o cobrar, consultanos.' },
      { q: 'Trabajo en negro o me obligan a facturar, ¿qué puedo hacer?', a: 'Facturar o no estar registrado esconde una relación de dependencia. El primer paso es un telegrama para exigir que te registren. Analizamos tu caso y qué te corresponde reclamar.' },
      { q: 'No me dejan entrar o me cambiaron las condiciones, ¿qué hago?', a: 'Una negativa de tareas, un acoso o un cambio de horario o lugar sin tu acuerdo pueden permitirte considerarte despedido y reclamar. Se hace por telegrama y los plazos importan: consultanos antes.' },
      { q: '¿Qué pasa si renuncio o acepto un retiro voluntario?', a: 'En general perdés la indemnización por despido y solo cobrás la liquidación final. No estás obligado a aceptarlo: consultanos antes de firmar.' },
      { q: '¿Cuánto me corresponde de indemnización?', a: 'Depende de tu antigüedad, tu sueldo y la causa de la desvinculación. Calculamos lo que te corresponde sin cargo en la primera consulta.' },
      { q: '¿Cuánto tiempo tengo para reclamar?', a: 'En general tenés 2 años desde el despido. Igual conviene consultar cuanto antes, porque los telegramas tienen plazos muy cortos.' },
    ],
  },
  {
    slug: 'propiedad-horizontal',
    title: 'Propiedad Horizontal',
    icon: '🏢',
    heroImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Propiedad Horizontal y Consorcios | MGF Abogados',
    metaDescription: 'Asesoramiento integral en propiedad horizontal: consorcios, expensas, asambleas, conflictos con encargados y rendición de cuentas. Consulta sin cargo.',
    heroLabel: 'Consorcios · Expensas',
    heroDescription: 'Asesoramos a administraciones, consorcios y propietarios en todas las cuestiones de propiedad horizontal, conjuntos inmobiliarios y clubes de campo.',
    secciones: [
      {
        titulo: 'Un equipo especializado en la materia',
        parrafos: [
          'En Martín · Grisi · Franco creamos una alianza con el Dr. Federico Chiesa para el departamento de Derechos Reales y Propiedad Horizontal. El Dr. Chiesa es reconocido entre sus pares por su conocimiento en la materia y por la redacción de libros y artículos sobre propiedad horizontal, conjuntos inmobiliarios y clubes de campo.',
          'Tenemos el orgullo de ser uno de los pocos estudios del país capaz de resolver cualquier cuestión en materia de propiedad horizontal, con la experiencia de haber asesorado durante años a administraciones de consorcios en Capital Federal y la provincia de Buenos Aires.',
        ],
      },
      {
        titulo: '¿Qué abarca la propiedad horizontal?',
        parrafos: [
          'La mayor parte de la población —sobre todo en la Ciudad de Buenos Aires— vive dentro del sistema de propiedad horizontal: edificios con vecinos y reglas que deben cumplirse, administraciones que deben garantizar ese cumplimiento, y la dinámica diaria de expensas, asambleas y decisiones del consorcio.',
          'Acompañamos en el cobro y la discusión de expensas, los conflictos con encargados de edificios, la rendición de cuentas de las administraciones y, en general, todas las problemáticas que conlleva un sistema tan complejo. Trabajamos tanto para administraciones y consorcios como para propietarios.',
        ],
      },
    ],
    faq: [],
  },
  {
    slug: 'mala-praxis',
    title: 'Mala praxis',
    icon: '⚕️',
    heroImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Mala Praxis Médica | MGF Abogados',
    metaDescription: 'Reclamos por mala praxis médica: errores de diagnóstico, tratamientos y cirugías, y fallas en clínicas y hospitales. Primera consulta sin cargo.',
    heroLabel: 'Responsabilidad médica',
    heroDescription: 'Reclamamos indemnizaciones por errores médicos y fallas en la atención de profesionales, clínicas y hospitales. Evaluamos tu caso en la primera consulta, sin cargo.',
    secciones: [],
    faq: [],
  },
  {
    slug: 'sucesiones',
    title: 'Derecho Sucesorio',
    icon: '📜',
    heroImage: 'https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Sucesiones y Herencias | MGF Abogados',
    metaDescription: 'Tramitamos sucesiones, testamentos y particiones hereditarias con rapidez y precisión. Reconocimiento de herederos y cobro de la herencia. Consulta sin cargo.',
    heroLabel: 'Sucesiones',
    heroDescription: 'Tramitamos sucesiones, testamentos y particiones hereditarias con la celeridad necesaria para que obtengas tu herencia y tu calidad de heredero.',
    secciones: [
      {
        titulo: 'Acompañamos en un momento difícil',
        parrafos: [
          'Cuando una persona fallece surgen muchas dudas sobre los derechos que tienen sus familiares, acreedores y deudores. Contamos con la experiencia y el conocimiento de las leyes que regulan estas situaciones para darte la tranquilidad de tener tu caso en buenas manos.',
          'Trabajamos para que obtengas el reconocimiento de tu calidad de heredero y el cobro de tu herencia con la mayor celeridad posible. Tramitamos sucesiones, testamentos y particiones hereditarias en Capital Federal, la provincia de Buenos Aires y el resto del país.',
        ],
      },
    ],
    faq: [],
  },
]
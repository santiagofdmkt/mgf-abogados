// lib/areas.ts
// Contenido de cada área de práctica. Para editar, tocá SOLO este archivo.
// El diseño vive en app/areas/[slug]/page.tsx

export type Faq = { q: string; a: string }
export type Seccion = { titulo: string; parrafos: string[] }
export type Dato = { icono: string; titulo: string; texto: string }
export type Paso = { titulo: string; texto: string }
export type Numero = { valor: string; etiqueta: string }
export type Bloque<T> = { etiqueta: string; titulo: string; descripcion?: string; items: T[] }

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
  faqDescripcion?: string  // Texto introductorio de la franja de preguntas frecuentes
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
      descripcion: 'La ART cubre los accidentes y las enfermedades que tienen relación con tu trabajo. Estas son las tres situaciones más comunes: ubicá cuál es la tuya.',
      items: [
        { icono: 'trabajo', titulo: 'Accidente en el trabajo', texto: 'Una lesión que ocurre por el trabajo o durante tu jornada.' },
        { icono: 'itinere', titulo: 'Accidente in itínere', texto: 'El que sufrís yendo o volviendo entre tu casa y tu trabajo.' },
        { icono: 'enfermedad', titulo: 'Enfermedad profesional', texto: 'La que se origina por las condiciones de tu trabajo.' },
      ],
    },
    corresponde: {
      etiqueta: 'Tus derechos',
      titulo: '¿Qué te corresponde?',
      descripcion: 'Estos son los derechos que la ley reconoce al trabajador que sufre un accidente. Si tu ART no los cumple, podemos reclamarlos por vos.',
      items: [
        { icono: 'medico', titulo: 'Atención médica', texto: 'Tratamiento y rehabilitación completos, a cargo de la ART.' },
        { icono: 'salario', titulo: 'Ingreso mensual', texto: 'Una prestación mientras dure tu licencia.' },
        { icono: 'indemnizacion', titulo: 'Indemnización', texto: 'Si el accidente deja una secuela permanente.' },
        { icono: 'traslado', titulo: 'Traslados y medicamentos', texto: 'Los que indique tu médico tratante.' },
      ],
    },


    secciones: [],
    faqDescripcion: 'Las dudas que más nos plantean quienes sufrieron un accidente laboral, respondidas en pocas líneas.',
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
      descripcion: 'Un accidente de tránsito puede ocurrir de muchas formas: manejando, caminando o viajando como pasajero. Elegí la situación que más se parezca a la tuya.',
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
      descripcion: 'Cuando otra persona causa el daño, tenés derecho a que se repare. Estos son los principales conceptos que incluye un reclamo por accidente de tránsito.',
      items: [
        { icono: 'medico', titulo: 'Lesiones físicas', texto: 'Tratamientos, estudios, medicamentos y rehabilitación.' },
        { icono: 'indemnizacion', titulo: 'Daño psicológico', texto: 'El estrés postraumático: miedo a circular, a manejar o a salir.' },
        { icono: 'salario', titulo: 'Ingresos perdidos', texto: 'Lo que dejaste de ganar mientras estuviste sin trabajar.' },
        { icono: 'traslado', titulo: 'Daños del vehículo', texto: 'Reparación o valor del vehículo, más gastos de traslado.' },
      ],
    },
    secciones: [],
    faqDescripcion: 'Qué hacer en las primeras horas, cómo tratar con el seguro y cuánto tiempo hay para reclamar.',
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
      descripcion: 'Los problemas laborales no siempre empiezan con un telegrama de despido. Estas son las situaciones por las que más nos consultan: ubicá la tuya.',
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
      descripcion: 'Según tu caso, podés tener derecho a una indemnización y a otros conceptos que tu empleador debe pagarte. Estos son los principales.',
      items: [
        { icono: 'indemnizacion', titulo: 'Indemnización por despido', texto: 'Se calcula según tu antigüedad y tu sueldo.' },
        { icono: 'salario', titulo: 'Preaviso e integración del mes', texto: 'Si no te avisaron con anticipación.' },
        { icono: 'traslado', titulo: 'Liquidación final', texto: 'Días trabajados, aguinaldo y vacaciones no gozadas.' },
        { icono: 'trabajo', titulo: 'Diferencias salariales', texto: 'Si te registraron en una categoría o con un sueldo menor al real.' },
      ],
    },
    secciones: [],
    faqDescripcion: 'Respuestas rápidas sobre telegramas, trabajo en negro, renuncias y plazos. Antes de firmar o aceptar algo, consultanos.',
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
    chips: ['Primera consulta sin cargo', 'Departamento especializado en Propiedad Horizontal', 'Propietarios y administraciones'],
    cubre: {
      etiqueta: 'Quiénes somos para vos',
      titulo: '¿Cuál es tu situación?',
      descripcion: 'En un consorcio conviven propietarios, administradores y consejos, cada uno con intereses distintos. Contanos desde qué lugar nos consultás.',
      items: [
        { icono: 'trabajo', titulo: 'Soy propietario o vecino', texto: 'Expensas, asambleas, obras o conflictos con el consorcio o con otros vecinos.' },
        { icono: 'indemnizacion', titulo: 'Administro un consorcio', texto: 'Cobro de morosos, reglamento, asambleas y rendición de cuentas.' },
        { icono: 'itinere', titulo: 'Integro el consejo de propietarios', texto: 'Control de la administración y aprobación de certificados de deuda.' },
        { icono: 'traslado', titulo: 'Vivo en un club de campo o barrio cerrado', texto: 'Los conjuntos inmobiliarios tienen su propio régimen.' },
      ],
    },
    corresponde: {
      etiqueta: 'Cómo te ayudamos',
      titulo: '¿En qué podemos acompañarte?',
      descripcion: 'Trabajamos tanto con propietarios como con administraciones y consorcios, en los temas que más conflictos generan en la vida de un edificio.',
      items: [
        { icono: 'salario', titulo: 'Expensas', texto: 'Cobro, ejecución de deudas y discusión de liquidaciones.' },
        { icono: 'medico', titulo: 'Rendición de cuentas', texto: 'Control de la gestión del administrador y reclamo de información.' },
        { icono: 'trabajo', titulo: 'Asambleas y reglamento', texto: 'Convocatorias, decisiones, impugnaciones y reformas del reglamento.' },
        { icono: 'enfermedad', titulo: 'Conflictos del consorcio', texto: 'Con encargados, con vecinos o con la administración.' },
      ],
    },
    secciones: [
      {
        titulo: 'Un equipo especializado en la materia',
        parrafos: [
          'En Martín · Grisi · Franco creamos una alianza con el Dr. Federico Chiesa para el departamento de Derechos Reales y Propiedad Horizontal. El Dr. Chiesa es reconocido entre sus pares por su conocimiento en la materia y por la redacción de libros y artículos sobre propiedad horizontal, conjuntos inmobiliarios y clubes de campo.',
        ],
      },
    ],
    faqDescripcion: 'Dudas frecuentes sobre expensas, asambleas, administradores y conjuntos inmobiliarios.',
    faq: [
      { q: '¿Cómo se cobran las expensas atrasadas?', a: 'El administrador puede emitir un certificado de deuda que, aprobado por el consejo de propietarios si existe, funciona como título ejecutivo para reclamar el pago por la vía judicial.' },
      { q: 'Mi inquilino no paga las expensas, ¿quién responde?', a: 'Pueden reclamarse al inquilino u ocupante, pero eso no libera al propietario, que sigue siendo responsable frente al consorcio.' },
      { q: 'Creo que las expensas están mal liquidadas, ¿qué puedo hacer?', a: 'Tenés derecho a pedir información y a que el administrador rinda cuentas de su gestión. Revisamos las liquidaciones y te decimos qué reclamar.' },
      { q: '¿Qué hago si no estoy de acuerdo con lo que se decidió en la asamblea?', a: 'Si la decisión es contraria a la ley o al reglamento, se puede impugnar judicialmente. Hay un plazo corto para hacerlo: consultanos cuanto antes.' },
      { q: 'En CABA, ¿el administrador tiene que estar inscripto?', a: 'Sí. Quien administra consorcios en forma onerosa debe estar inscripto en el Registro Público de Administradores (Ley 941) y puede ser sancionado si incumple sus obligaciones.' },
      { q: 'Soy administrador, ¿pueden ayudarme con propietarios morosos?', a: 'Sí. Trabajamos tanto con administraciones y consorcios como con propietarios. Analizamos cada caso para ver cómo corresponde actuar.' },
      { q: '¿Los barrios cerrados y clubes de campo tienen otro régimen?', a: 'Se rigen por las normas de propiedad horizontal con modificaciones particulares para los conjuntos inmobiliarios. Analizamos tu caso según el reglamento.' },
      { q: '¿Cuánto cuesta la primera consulta?', a: 'La primera consulta es sin cargo. Te explicamos cómo trabajamos antes de empezar.' },
    ],
  },
  {
    slug: 'mala-praxis',
    title: 'Mala praxis',
    icon: '⚕️',
    heroImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Mala Praxis Médica | MGF Abogados',
    metaDescription: 'Mala praxis médica y amparos de salud: reclamos por errores médicos y por cobertura ante obras sociales y prepagas. Primera consulta sin cargo.',
    heroLabel: 'Responsabilidad médica · Salud',
    heroDescription: 'Reclamamos indemnizaciones por errores médicos y hacemos valer tu derecho a la cobertura de salud frente a obras sociales y prepagas. Evaluamos tu caso en la primera consulta, sin cargo.',
    chips: ['Primera consulta sin cargo', 'Departamento de Derecho a la Salud', 'Oficinas en CABA y La Plata'],
    cubre: {
      etiqueta: 'Tu situación',
      titulo: '¿Cuál es tu caso?',
      descripcion: 'Esta área reúne dos tipos de reclamo por tu salud: los daños causados por una mala atención médica y los problemas de cobertura con tu obra social o prepaga.',
      items: [
        { icono: 'medico', titulo: 'Error médico', texto: 'Diagnóstico, tratamiento o cirugía que te causó un daño.' },
        { icono: 'enfermedad', titulo: 'Falla en clínica u hospital', texto: 'Atención deficiente, infecciones o errores de la institución.' },
        { icono: 'itinere', titulo: 'Me niegan una cobertura', texto: 'Tu obra social o prepaga rechaza un tratamiento, medicamento o cirugía.' },
        { icono: 'traslado', titulo: 'Cuota, baja o continuidad', texto: 'Aumentos, desafiliación por falta de pago o problemas al jubilarte.' },
      ],
    },
    corresponde: {
      etiqueta: 'Cómo te ayudamos',
      titulo: '¿Qué podemos reclamar?',
      descripcion: 'Según tu caso, el reclamo puede ser una indemnización por el daño sufrido o una acción urgente para que te den la cobertura que necesitás.',
      items: [
        { icono: 'indemnizacion', titulo: 'Indemnización por daños', texto: 'Por el daño físico, psicológico y los gastos que tuviste.' },
        { icono: 'trabajo', titulo: 'Historia clínica y prueba', texto: 'Reunimos la documentación médica que sostiene tu reclamo.' },
        { icono: 'medico', titulo: 'Amparo de salud', texto: 'Una acción urgente para que te den la cobertura que necesitás.' },
        { icono: 'salario', titulo: 'Cuota y continuidad', texto: 'Revisión de aumentos y defensa frente a bajas indebidas.' },
      ],
    },
    secciones: [
      {
        titulo: 'Un equipo especializado en la materia',
        parrafos: [
          'En Martín · Grisi · Franco creamos una alianza con la Dra. Verónica N. Carrizo para el departamento de Derecho a la Salud. Abogada especialista en derecho a la salud, egresada de la UBA.',
        ],
      },
    ],
    faqDescripcion: 'Respuestas sobre mala praxis, historia clínica, plazos, cuotas de prepagas y cobertura de tratamientos.',
    faq: [
      { q: '¿Qué es la mala praxis y cuándo existe?', a: 'Es el daño causado por un error o una negligencia de un profesional o de un centro de salud. Un mal resultado por sí solo no alcanza: hay que probar que hubo una falla y que ella causó el daño.' },
      { q: '¿Qué hago primero si creo que fue mala praxis?', a: 'Pedí tu historia clínica: es tuya y tenés derecho a recibir una copia. Conservá estudios, recetas, informes y comprobantes de gastos, y consultanos antes de firmar algo.' },
      { q: '¿Responde también la clínica o el hospital?', a: 'Sí, el establecimiento puede responder junto con el profesional. Analizamos en cada caso quién tuvo responsabilidad.' },
      { q: '¿Cuánto tiempo tengo para reclamar?', a: 'En general 3 años. Igual conviene consultar cuanto antes, porque la documentación médica es clave y se pierde con el tiempo.' },
      { q: 'Mi obra social o prepaga me niega un tratamiento, ¿qué puedo hacer?', a: 'Se puede iniciar un amparo de salud con una medida cautelar para que un juez ordene la cobertura en forma urgente. Si te dieron una negativa por escrito, guardala.' },
      { q: 'Me aumentaron la cuota, ¿es legal?', a: 'Las prepagas pueden fijar sus cuotas, pero los aumentos no pueden ser abusivos, y la ley protege especialmente a los mayores de 65 con más de 10 años de antigüedad. Revisamos tu caso y qué corresponde reclamar.' },
      { q: 'Me dieron de baja por falta de pago, ¿es válido?', a: 'La baja tiene que cumplir requisitos legales, como una intimación previa. Muchas bajas no los cumplen y se pueden dejar sin efecto.' },
      { q: 'Tengo una discapacidad o un familiar con discapacidad, ¿qué cobertura corresponde?', a: 'La ley obliga a las obras sociales a cubrir las prestaciones básicas de forma integral, incluidas terapias, medicamentos y, cuando corresponde, hogar o centro de día. Si te cubren menos, consultanos.' },
      { q: 'Fertilización, diabetes o salud mental: ¿puedo reclamar la cobertura?', a: 'Hay normas que garantizan la cobertura de muchos de estos tratamientos, y a veces las empresas los limitan con interpretaciones restrictivas. Si te negaron uno, contanos tu caso.' },
    ],
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
    chips: ['Primera consulta sin cargo', 'Oficinas en CABA y La Plata', 'CABA, Provincia de Buenos Aires y todo el país'],
    cubre: {
      etiqueta: 'Tu situación',
      titulo: '¿Cuál es tu caso?',
      descripcion: 'Cuando fallece un ser querido, la sucesión permite ordenar sus bienes y que los herederos puedan disponer de ellos. Ubicá cuál es tu situación.',
      items: [
        { icono: 'trabajo', titulo: 'Falleció un familiar', texto: 'Necesitás que te reconozcan como heredero y ordenar la sucesión.' },
        { icono: 'indemnizacion', titulo: 'Hay un testamento', texto: 'Hay que presentarlo, aprobarlo y cumplirlo respetando la ley.' },
        { icono: 'traslado', titulo: 'Tenés que transferir o vender bienes', texto: 'Inmuebles, autos o cuentas a nombre de la persona fallecida.' },
        { icono: 'itinere', titulo: 'Hay conflicto entre herederos', texto: 'Partición, exclusiones o un testamento que afecta tu porción.' },
      ],
    },
    corresponde: {
      etiqueta: 'Cómo te ayudamos',
      titulo: '¿En qué podemos acompañarte?',
      descripcion: 'Nos ocupamos de cada etapa de la sucesión: desde que se reconoce a los herederos hasta que los bienes se reparten y se inscriben.',
      items: [
        { icono: 'medico', titulo: 'Declaratoria de herederos', texto: 'Iniciamos y tramitamos la sucesión hasta obtener tu calidad de heredero.' },
        { icono: 'traslado', titulo: 'Inscripción de bienes', texto: 'Para que puedas transferir, vender o disponer de lo heredado.' },
        { icono: 'salario', titulo: 'Partición de la herencia', texto: 'Por acuerdo entre herederos o, si hace falta, por vía judicial.' },
        { icono: 'trabajo', titulo: 'Testamentos y legítima', texto: 'Asesoramiento y defensa de tu porción legítima.' },
      ],
    },
    secciones: [
      {
        titulo: 'Acompañamos en un momento difícil',
        parrafos: [
          'Cuando una persona fallece surgen muchas dudas sobre los derechos que tienen sus familiares, acreedores y deudores. Contamos con la experiencia y el conocimiento de las leyes que regulan estas situaciones para darte la tranquilidad de tener tu caso en buenas manos.',
        ],
      },
    ],
    faqDescripcion: 'Quiénes heredan, qué es la declaratoria, cuánto tarda y qué impuestos hay, explicado en pocas líneas.',
    faq: [
      { q: '¿Cuándo hace falta hacer una sucesión?', a: 'Cuando la persona fallecida dejó bienes registrables, como un inmueble o un auto, o cuentas que hay que transferir. Se tramita ante el juzgado del último domicilio del fallecido.' },
      { q: '¿Qué es la declaratoria de herederos?', a: 'Es la resolución judicial que determina quiénes son los herederos. No reparte los bienes: eso se resuelve después, en la partición.' },
      { q: '¿Quiénes heredan si no hay testamento?', a: 'Heredan los descendientes, los ascendientes y el cónyuge, y si no hay ninguno, los parientes colaterales hasta el cuarto grado. Si no hay herederos, la herencia pasa al Estado. El reparto exacto depende de cada familia.' },
      { q: '¿Puedo dejar mis bienes a quien quiera?', a: 'Solo en parte. La ley reserva una porción legítima para los hijos (2/3), los padres y el cónyuge (1/2). Lo que queda, la porción disponible, sí puede dejarse libremente.' },
      { q: 'Dejó un testamento, ¿igual hay que hacer la sucesión?', a: 'Sí. El testamento se presenta en el juzgado y se lo aprueba para poder transferir los bienes. Si afecta la legítima, puede ser revisado.' },
      { q: '¿Cuánto tarda una sucesión?', a: 'Depende de cada caso: de la documentación, de los bienes y de si los herederos están de acuerdo. Con todo en orden suele ser más ágil. Te lo decimos en la primera consulta.' },
      { q: '¿Se paga impuesto a la herencia?', a: 'A nivel nacional no, pero la Provincia de Buenos Aires aplica el Impuesto a la Transmisión Gratuita de Bienes sobre los bienes ubicados allí. Depende del valor y del parentesco, y puede exigirse presentar la declaración jurada aunque no haya que pagar.' },
      { q: 'No hay acuerdo entre herederos o me excluyeron, ¿qué puedo hacer?', a: 'Si no hay acuerdo, la partición puede resolverse judicialmente. Si un testamento o una donación afecta tu porción legítima, puede reclamarse. Consultanos con la documentación que tengas.' },
      { q: '¿Cuánto cuesta la primera consulta?', a: 'La primera consulta es sin cargo. Te explicamos cómo trabajamos antes de empezar.' },
    ],
  },
]
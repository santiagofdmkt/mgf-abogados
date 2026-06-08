// lib/areas.ts
// Contenido de cada área de práctica. Para editar, tocá SOLO este archivo.
// El diseño vive en app/areas/[slug]/page.tsx

export type Faq = { q: string; a: string }
export type Seccion = { titulo: string; parrafos: string[] }

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
}

export const areas: Area[] = [
  // ───────────────────────── 1. ACCIDENTES DE TRABAJO (completo) ─────────────────────────
  {
    slug: 'accidentes-trabajo',
    title: 'Accidentes de Trabajo',
    icon: '🦺',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Abogados de Accidentes de Trabajo y ART | MGF Abogados',
    metaDescription:
      'Reclamos por accidentes laborales y enfermedades profesionales ante la ART. Primera consulta sin cargo. Trabajamos a porcentaje del resultado.',
    heroLabel: 'Derecho Laboral · ART',
    heroDescription:
      'Gestionamos tu reclamo ante la ART por accidentes laborales, accidentes in itínere y enfermedades profesionales. Cobrás lo que te corresponde, sin adelantar honorarios.',
    secciones: [
      {
        titulo: '¿Qué es un accidente de trabajo?',
        parrafos: [
          'Es un hecho imprevisible en el que un trabajador sufre una lesión física, una enfermedad profesional o una afección psicológica, causada en el trabajo o por el trabajo. La cobertura también alcanza los trayectos de ida y vuelta entre tu domicilio y tu lugar de trabajo.',
        ],
      },
      {
        titulo: '¿Qué es una ART y por qué tengo una?',
        parrafos: [
          'Las Aseguradoras de Riesgos del Trabajo (ART) son compañías que tu empleador está obligado por ley a contratar para cubrirte ante un accidente laboral o una enfermedad profesional. Todos los meses tu empleador paga una suma destinada a proteger tu salud.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué riesgos cubre mi ART?', a: 'La ART debe cubrirte ante tres situaciones: el accidente de trabajo (un hecho repentino durante tu jornada que te causa una lesión física o psíquica), el accidente in itínere (el que ocurre en el trayecto habitual entre tu casa y el trabajo) y la enfermedad profesional (la contraída como consecuencia directa del trabajo o de sus condiciones).' },
      { q: '¿Qué hago si tengo un accidente o una enfermedad profesional?', a: 'Comunicate de inmediato con tu empleador para que haga la denuncia ante la ART. Si no la realiza, podés llamar vos mismo a la ART y denunciarlo. Desde ese momento quedás de licencia médica y no debés prestar tareas.' },
      { q: '¿Qué atención debe brindarme la ART?', a: 'Una vez hecha la denuncia, la ART está obligada a recibirla y darte atención médica inmediata, realizar todo el tratamiento necesario (internación, medicación, cirugías, prótesis), cubrir tu rehabilitación completa y los traslados que indique el médico tratante. Pasados los primeros 10 días, abona tu salario básico hasta el alta. Si quedó una secuela, debe indemnizarte.' },
      { q: '¿Qué pasa si la ART rechaza mi accidente?', a: 'Las ART suelen rechazar denuncias alegando que la lesión es inculpable (sin relación con el trabajo) o preexistente, para derivarte a tu obra social. El rechazo debe notificarte por Carta Documento a tu domicilio. Si esto ocurre, consultá cuanto antes: muchas veces el rechazo es improcedente.' },
      { q: '¿Qué sucede cuando me dan el alta médica?', a: 'La ART debe evaluar si quedó alguna secuela. Hay tres posibilidades: alta sin incapacidad (te consideran recuperado), alta por afección inculpable o preexistente (te derivan a tu obra social), o alta con incapacidad (reconocen una secuela permanente y están obligados a indemnizarte). En los dos primeros casos, si seguís con dolores, consultá con un abogado de forma urgente.' },
      { q: '¿Me pueden despedir si estoy en tratamiento por la ART?', a: 'Si te despiden mientras estás de licencia por ART, el empleador debe indemnizarte como un despido sin causa, con el riesgo adicional de una multa por despido discriminatorio. Además, tu tratamiento continúa aunque termine la relación laboral.' },
      { q: '¿Cuánto me debe pagar la ART de indemnización?', a: 'El monto lo fija la Ley de Riesgos del Trabajo y se calcula con tres factores: tu edad al momento del hecho, el salario promedio que cobrabas y el porcentaje de incapacidad que te quedó como consecuencia del accidente. Ningún abogado serio puede prometerte un monto exacto de antemano.' },
      { q: '¿En qué consiste el trámite para cobrar mi indemnización?', a: 'Tiene tres etapas. Primero, la consulta con tu abogado de confianza. Segundo, el reclamo administrativo ante la Comisión Médica de la Superintendencia de Riesgos del Trabajo, donde se determina la incapacidad y el monto. Tercero, si no hay acuerdo o el ofrecimiento es insuficiente, el juicio ante los tribunales competentes.' },
      { q: '¿Cuánto tiempo lleva todo el trámite?', a: 'No hay forma de saberlo con certeza, y desconfiá de quien te prometa plazos exactos. Algunos casos se resuelven en 3 a 6 meses y otros pueden demorar entre 2 y 5 años. Lo importante es que la indemnización te corresponde y reclamarla es tu derecho.' },
      { q: '¿Cuánto tiempo tengo para iniciar el reclamo?', a: 'Desde que te dan el alta médica tenés 2 años para iniciar el reclamo.' },
      { q: 'Tengo miedo de que me despidan si reclamo, ¿es así?', a: 'No. El reclamo es exclusivamente contra la ART: a tu empleador nunca lo citamos ni le reclamamos nada. De hecho, es él quien paga el seguro todos los meses y le interesa que la ART cumpla. Si te despidieran, no sería por hacer este reclamo.' },
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
    secciones: [
      {
        titulo: '¿Sabías que todo daño debe ser reparado?',
        parrafos: [
          'Si fuiste víctima de un accidente de tránsito, te corresponde una indemnización. No importa si manejabas, ibas como acompañante o eras peatón: quien genera un daño está obligado a repararlo.',
          'También te corresponde si te accidentaste siendo pasajero de un colectivo, taxi, tren, subte, remís, Uber, Cabify o Didi; si sufriste daños en la vía pública, autopistas o rutas; o si el hecho ocurrió dentro de un establecimiento privado como un hotel, local o shopping.',
        ],
      },
      {
        titulo: '¿Qué reclamamos?',
        parrafos: [
          'Reclamamos tanto las lesiones físicas y el daño psicológico (el estrés postraumático que muchas veces deja un accidente) como los daños materiales de tu vehículo. En la mayoría de los casos responde la compañía de seguros del responsable.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué debo hacer ante un accidente de tránsito?', a: 'Lo primero es mantener la calma. Si sufriste lesiones, pedí que llamen al SAME y no te muevas del lugar. Si estás en condiciones, sacá fotos del lugar y de los vehículos, identificá dónde ocurrió, buscá testigos y pedí los datos de quien te embistió.' },
      { q: '¿Qué datos debo solicitar?', a: 'Nombre completo, DNI y domicilio de quien te chocó, los datos del vehículo (marca, modelo, patente y color), la cédula verde, el registro de conducir y los datos del seguro con su número de póliza.' },
      { q: 'Intervino la policía, ¿qué significa?', a: 'Si intervino la policía y hubo lesiones, es porque puede haberse cometido un delito. Se dará intervención a una fiscalía o juzgado correccional, que investigará el hecho y determinará la culpa. Esa causa penal reúne pruebas clave: fotos, croquis, pericias y declaraciones de testigos. Solo se forma si hubo lesiones; los daños materiales por sí solos no habilitan la denuncia penal.' },
      { q: '¿Debo hacer la denuncia en mi seguro?', a: 'Siempre. Ante un accidente entre dos vehículos tenés la obligación de denunciar el siniestro en tu compañía dentro de las 72 horas. Te conviene hablar antes con tu abogado para hacerla sin cometer errores que después te perjudiquen.' },
      { q: 'Fui pasajero de un colectivo o transporte público, ¿qué necesito?', a: 'Al subir a un transporte público se genera un contrato de transporte: la empresa está obligada a llevarte sano y salvo. Conservá la tarjeta SUBE, buscá testigos, guardá las constancias médicas y hacé la denuncia policial. Anotá los datos del transporte: línea, interno, empresa, aseguradora y datos del chofer.' },
      { q: 'Era pasajero de un Uber, Cabify o Didi y chocamos, ¿qué hago?', a: 'Guardá el comprobante de la aplicación con el que tomaste el servicio, los datos del conductor y del dueño del vehículo, la compañía de seguros y el lugar geográfico donde ocurrió el daño.' },
      { q: 'Fue un choque en cadena, ¿quién responde?', a: 'Por regla general responde el último de la cadena. Por eso es importante que tomes los datos de todos los intervinientes, del primero al último: cuantos más datos tengamos, mejor.' },
      { q: '¿Quién se hace cargo de las lesiones y los daños?', a: 'Si el responsable del daño tiene compañía de seguros, será esta la que afronte los daños y perjuicios que sufriste.' },
      { q: 'A los pocos días empecé con dolores que antes no tenía, ¿qué hago?', a: 'Es normal: muchas veces, por la adrenalina del momento, no sentimos nada y los dolores aparecen después. Acercate a una guardia médica para que te revisen y pedí el certificado de atención, asegurándote de que figure que las lesiones derivan del accidente.' },
      { q: '¿Qué es el daño psicológico?', a: 'Es el daño que queda después del hecho, lo que se conoce como estrés postraumático: el miedo a circular, a manejar o a salir solo a la calle. Es un daño resarcible y debe hacerse cargo el seguro de quien lo provocó.' },
      { q: '¿Cómo reclamo los daños materiales de mi vehículo?', a: 'Sacale fotos al vehículo donde se vea la patente y todos los daños, por mínimos que sean. Después pedí 2 o 3 presupuestos de reparación en talleres de tu confianza para reclamarlos a la compañía de seguros del tercero.' },
      { q: '¿Cuánto tiempo tengo para hacer el reclamo?', a: 'Tenés 3 años desde que ocurrió el hecho para iniciar el reclamo.' },
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
    secciones: [
      {
        titulo: 'Asesorate antes de firmar o aceptar nada',
        parrafos: [
          'Si te despidieron —de palabra o por carta documento—, si están por despedirte o si tenés problemas de registración en tu trabajo, lo más importante es que no firmes ni aceptes nada antes de asesorarte. El pago de una indemnización justa es tu derecho.',
          'Te acompañamos con todo el asesoramiento y la representación legal para que cobres la mayor indemnización que te corresponde, en el menor tiempo posible. La primera consulta y el cálculo de tu indemnización son sin cargo.',
        ],
      },
      {
        titulo: 'Los tres tipos de despido',
        parrafos: [
          'Despido con causa: lo dispone el empleador por un incumplimiento grave y reiterado del trabajador, que debe notificarse por escrito y tener entidad suficiente para justificar la medida. En ese caso solo corresponde la liquidación final (días trabajados, aguinaldo proporcional y vacaciones no gozadas). Si la causa no se justifica, se trata como un despido sin causa y te corresponde la indemnización completa.',
          'Despido sin causa: el empleador puede despedirte sin motivo, pero debe indemnizarte dentro de los 4 días. La indemnización suele incluir un sueldo por año trabajado, el preaviso, la integración del mes de despido, las vacaciones proporcionales y las multas que correspondan (entre ellas las de las leyes 24.013 y 25.323 y el artículo 80 de la Ley de Contrato de Trabajo).',
          'Despido indirecto: cuando el empleador incumple gravemente —te tiene mal registrado, no hace aportes, cambia tus condiciones, te niega tareas, no paga horas extras o hay acoso—, podés intimarlo por telegrama. Si se niega o guarda silencio, quedás habilitado a considerarte despedido y reclamar la indemnización como si fuera un despido sin causa.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué hago si recibo un telegrama de despido?', a: 'Contactanos rápidamente. Es fundamental contestarlo de forma inmediata, porque los plazos para responder son muy cortos y un error puede perjudicar tu reclamo.' },
      { q: '¿Cuánto tiempo tengo para iniciar un juicio por despido?', a: 'Tenés 2 años desde el despido para iniciar el reclamo.' },
      { q: 'Me despidieron de palabra, ¿qué hago?', a: 'El despido de palabra no es válido, pero es muy usado por los empleadores. Mientras tanto tenés que seguir yendo a trabajar. Te asesoramos sin cargo y redactamos el telegrama laboral que debés enviar para que tu empleador aclare tu situación por escrito.' },
      { q: 'Me despidieron sin decir por qué, ¿es legal?', a: 'Sí. Cualquier empleador puede despedir a un trabajador aún sin motivo, pero en ese caso tenés derecho a que te indemnicen dentro de los 4 días posteriores al despido. Ante cualquier duda o retraso, comunicate con nosotros.' },
      { q: '¿Cómo sé si estoy registrado (en blanco) o en negro?', a: 'A través de la AFIP podés averiguar si tu trabajo está registrado o no. Si trabajás fuera de registro, tu empleador se ahorra las cargas sociales, lo que afecta tu jubilación, tu obra social, tus vacaciones y tu aguinaldo. Ante cualquier duda, asesorate con nosotros sin costo.' },
      { q: 'Trabajo en negro y me despidieron de palabra, ¿qué puedo hacer?', a: 'Como estás en negro, tu empleador nunca te va a despedir por escrito, porque sería reconocer la relación laboral. Te asesoramos sin cargo y redactamos el telegrama que debés enviarle pidiendo que te registre. Aunque es poco probable que lo haga, es el medio formal para iniciar tu reclamo por la indemnización que te corresponde.' },
      { q: 'En mi trabajo me obligan a facturar, ¿está bien?', a: 'No. Facturar para encubrir una relación de dependencia es otra forma de trabajo en negro. Tenés derecho a hacer respetar tu situación como trabajador: asesorate con nosotros sin costo.' },
      { q: 'Estoy registrado en una categoría que no corresponde, ¿qué puedo reclamar?', a: 'Tenés derecho a que te registren en la categoría correcta según tus tareas o convenio, y a que te abonen las diferencias salariales de los últimos dos años, con su incidencia en vacaciones y aguinaldo.' },
      { q: 'Me cambiaron el horario o el lugar de trabajo sin avisar, ¿puedo reclamar?', a: 'Sí. Los cambios de horario y de lugar de trabajo requieren tu consentimiento previo. Si no lo hubo, podés reclamar que se restituyan tus condiciones iniciales o considerarte despedido y reclamar la indemnización que te corresponde.' },
      { q: 'No me dejan entrar a trabajar o no me dan tareas, ¿qué hago?', a: 'Eso es una negativa de tareas. Te asesoramos sin cargo y redactamos el telegrama pidiendo que te permitan trabajar o te asignen tareas. Si el empleador no lo hace, podés darte por despedido y debe pagarte la indemnización completa, como si fuera un despido sin causa.' },
      { q: 'Sufro acoso laboral, ¿qué puedo hacer?', a: 'Si te discriminan, te tratan distinto que a tus compañeros, te persiguen o te hostigan psicológicamente, estás sufriendo acoso laboral. Contactanos de inmediato: podemos ayudarte.' },
      { q: '¿Qué pasa si renuncio?', a: 'Perdés el derecho a una indemnización. Tu empleador solo te abonará la liquidación final: salario proporcional del mes, aguinaldo proporcional y vacaciones no gozadas. Por eso conviene asesorarte antes de tomar cualquier decisión.' },
      { q: 'Me ofrecen un retiro voluntario, ¿me conviene?', a: 'Contactanos antes de aceptar. El retiro voluntario se asemeja a una renuncia: quedás desamparado y dependés de lo que negocies con tu empleador. No estás obligado a aceptarlo.' },
      { q: 'Si me despiden, ¿pierdo la obra social?', a: 'No de inmediato. La obra social te sigue cubriendo hasta 3 meses después del despido.' },
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
    slug: 'derecho-salud',
    title: 'Derecho a la Salud',
    icon: '⚕️',
    heroImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&q=80&auto=format&fit=crop',
    metaTitle: 'Amparos de Salud contra Obras Sociales y Prepagas | MGF Abogados',
    metaDescription: 'Amparos por cobertura médica: discapacidad, fertilización, medicamentos, aumentos de cuota, desafiliaciones y prestaciones negadas. Consulta sin cargo.',
    heroLabel: 'Amparos · Salud',
    heroDescription: 'Reclamamos ante obras sociales y prepagas para que se respete tu derecho a la cobertura: tratamientos, medicamentos, prestaciones de discapacidad y mucho más.',
    secciones: [
      {
        titulo: 'La salud es un derecho fundamental',
        parrafos: [
          'En Martín · Grisi · Franco contamos con la Dra. Verónica N. Carrizo, abogada especialista en derecho a la salud egresada de la UBA, al frente del departamento de la materia.',
          'El derecho a la salud es uno de los derechos fundamentales, reconocido por la Constitución Nacional y por múltiples tratados internacionales. Además, una gran cantidad de normas establece de forma expresa coberturas que no pueden negarte. Si dudás de lo que te corresponde, te brindamos todo el asesoramiento para que tu derecho a la vida, la salud y la integridad física se haga valer.',
        ],
      },
    ],
    faq: [
      { q: 'Afiliación', a: 'Las empresas no pueden rechazar una afiliación, sea nueva o de un nuevo integrante del grupo familiar. Si tu pareja tiene otra obra social o prepaga, podés elegir a cuál incorporar a tu hijo: no pueden impedirlo con el pretexto de que nació con la cobertura de la madre. Hay amplia jurisprudencia que respalda este derecho.' },
      { q: 'Fertilización asistida', a: 'Nuestro país garantiza por ley el acceso integral a las técnicas de reproducción médicamente asistida, pero muchas veces las coberturas lo limitan con interpretaciones restrictivas. Tenemos amplia experiencia en reclamos de fertilización de alta y baja complejidad, y en criopreservación de embriones.' },
      { q: 'Aumentos en la cuota', a: 'Si tenés dudas sobre si los aumentos por edad o los incrementos que te aplicaron se ajustan a derecho, podemos asesorarte. Existe normativa y jurisprudencia específica sobre los aumentos de cuota en la medicina prepaga.' },
      { q: 'Jubilación y continuidad de la cobertura', a: 'Es cada vez más frecuente que las prepagas informen que, al jubilarte, no podés derivar tus aportes y debés optar por PAMI o continuar como socio directo, a un costo mayor (con el 10,5% de IVA). Mediante una acción judicial podés hacer valer tu derecho a continuar derivando tus aportes como jubilado.' },
      { q: 'Cobertura de tratamientos, cirugías, insumos y medicamentos', a: 'Si necesitás un tratamiento, una cirugía, insumos, prótesis, ortesis o medicamentos y tu prepaga no te da una respuesta favorable, podemos ayudarte a reclamar la cobertura que te corresponde.' },
      { q: 'Prestaciones de discapacidad (Ley 24.901)', a: 'La Ley 24.901 obliga a obras sociales y prepagas a cubrir de manera integral una gran cantidad de prestaciones para personas con discapacidad. Si te niegan el acceso, te reconocen una cobertura inferior a la prevista o te rechazan estudios, medicamentos o tratamientos, contactanos.' },
      { q: 'Leches maternizadas y medicamentosas', a: 'La normativa contempla la cobertura integral (100%) de leches medicamentosas y maternizadas cuando, por razones médicamente justificadas, el menor no puede acceder a la lactancia. No pueden negarte esa cobertura durante el tiempo que establezca la autoridad de aplicación.' },
      { q: 'Restricción del servicio y Programa Médico Obligatorio', a: 'Las obras sociales y prepagas deben cubrir las prestaciones del Programa Médico Obligatorio desde el ingreso, y solo pueden fijar períodos de carencia para prestaciones superadoras. No pueden negarte el acceso a prestaciones esenciales.' },
      { q: 'Tratamientos oncológicos y medicamentos nuevos', a: 'La ANMAT aprueba con frecuencia tratamientos nuevos y más eficaces contra el cáncer, pero la cobertura no siempre acompaña ese avance. Si tu médico te indicó un tratamiento que la obra social no quiere cubrir, podemos asesorarte.' },
      { q: 'Niños, niñas y adolescentes con cáncer', a: 'Existe normativa específica que garantiza el acceso integral a las prestaciones relacionadas con el diagnóstico, sin coseguros ni copagos. Si tenés dudas sobre la cobertura que corresponde, podemos asesorarte.' },
      { q: 'Diabetes', a: 'Cada vez hay mejores dispositivos para el control de la diabetes. Si tu médico especialista los indicó y la cobertura te niega el acceso, podemos asesorarte sobre las acciones disponibles para hacer valer tus derechos.' },
      { q: 'Salud mental', a: 'Si tenés dudas sobre tus derechos o los de un familiar con problemas de salud mental, podemos ayudarte. Existen muchas herramientas para acceder a la cobertura y para salvaguardar sus derechos e intereses.' },
      { q: 'Geriátrico, hogar o centro de tercer nivel', a: 'La Ley 24.901 prevé la cobertura de hogar permanente para personas con discapacidad, y la justicia ha ordenado reiteradamente a prepagas y obras sociales brindar esa prestación. Si tenés dudas sobre el alcance de esta cobertura, comunicate con nosotros.' },
      { q: 'Baja o desafiliación de la cobertura', a: 'La normativa es clara sobre cuándo se puede rescindir el contrato. Si la baja es por deuda, esta nunca puede ser menor a tres meses consecutivos, deben notificarte de manera fehaciente y darte la posibilidad de cancelarla. Muchas prepagas no cumplen estos requisitos e intentan dar bajas ilegales: si te pasó, podemos asesorarte.' },
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
// Información de las seis regiones naturales y su ilustración.
//
// Imágenes (en public/assets/regiones/):
//   <id>.jpeg       1280 px, para el panel del mapa
//   <id>-mini.jpeg   640 px, para las tarjetas de actividades
//
// Para cambiar un texto basta con editarlo aquí: el panel del mapa y las tarjetas lo toman de este archivo.
// Lo que va entre **dobles asteriscos** se muestra en negrita.
import type { InfoRegion, SeccionInfo } from '../types/explora'

const ficha = (
  clave: SeccionInfo['clave'],
  texto: string
): SeccionInfo => {
  const base = {
    geografia: { titulo: 'Geografía y clima', etiqueta: 'Geografía', icono: '⛰️' },
    flora: { titulo: 'Flora y fauna', etiqueta: 'Flora y fauna', icono: '🌿' },
    economia: { titulo: 'Economía', etiqueta: 'Economía', icono: '💼' },
    cultura: { titulo: 'Cultura y tradición', etiqueta: 'Cultura', icono: '🎭' }
  }[clave]
  return { clave, ...base, texto }
}

const rutas = (id: string) => ({
  imagen: `/assets/regiones/${id}.jpeg`,
  imagenMini: `/assets/regiones/${id}-mini.jpeg`
})

export const INFO_REGIONES: InfoRegion[] = [
  {
    id: 'andina',
    ...rutas('andina'),
    imagenAlt: 'Cañones verdes con cascadas y picos nevados, con un cóndor volando y un oso de anteojos en primer plano',
    resumen:
      'Es el corazón geográfico, político y demográfico de Colombia. La cordillera de los Andes, al entrar al país, se divide en tres ramales: **Occidental, Central y Oriental**.',
    secciones: [
      ficha(
        'geografia',
        'Presenta todos los pisos térmicos, desde el cálido de los valles hasta los glaciales de los picos nevados. Alberga profundos cañones (como el del **Chicamocha**), altiplanos fértiles (como la **Sabana de Bogotá**) y los ríos más importantes del país: el **Magdalena** y el **Cauca**.'
      ),
      ficha(
        'flora',
        'Sus bosques de niebla, páramos y selvas altoandinas son el hogar de frailejones y orquídeas, y de osos de anteojos, cóndores de los Andes, pumas, dantas y cientos de especies de aves.'
      ),
      ficha(
        'economia',
        'Es el motor económico del país: industria, comercio, agricultura (café, papa y flores) y minería (carbón, oro y esmeraldas).'
      ),
      ficha(
        'cultura',
        'Es una región muy diversa. Destacan la **Feria de las Flores** en Medellín, el **Carnaval de Negros y Blancos** en Pasto y ritmos tradicionales como el bambuco, el pasillo y la carranga.'
      )
    ]
  },
  {
    id: 'caribe',
    ...rutas('caribe'),
    imagenAlt: 'Playa con botes de colores, un desierto con cactus y la Sierra Nevada de Santa Marta al fondo',
    resumen:
      'Ubicada en el extremo norte del país, limita con el mar Caribe y se extiende desde el golfo de Urabá hasta la península de La Guajira.',
    secciones: [
      ficha(
        'geografia',
        'Su relieve es casi todo plano (sabanas y llanuras), pero tiene un accidente monumental: la **Sierra Nevada de Santa Marta**, el sistema montañoso costero más alto del mundo, con todos los pisos térmicos hasta las nieves perpetuas. El clima es cálido y mayormente seco, con zonas desérticas en La Guajira y grandes ciénagas.'
      ),
      ficha(
        'flora',
        'Manglares costeros, cactus y cardones en el desierto y bosques secos. Su fauna incluye flamencos rosados, manatíes (en peligro de extinción), caimanes, titíes cabeciblancos y una rica vida marina en sus arrecifes de coral.'
      ),
      ficha(
        'economia',
        'Se basa en la ganadería extensiva, la agricultura (banano, algodón, arroz), los puertos marítimos de comercio internacional, la minería a gran escala (carbón en El Cerrejón y gas natural) y un turismo muy activo.'
      ),
      ficha(
        'cultura',
        'Mezcla herencias indígenas, africanas y españolas. Su máxima fiesta es el **Carnaval de Barranquilla**, proclamado por la UNESCO Obra Maestra del Patrimonio Oral e Intangible de la Humanidad en 2003. Otra gran cita es el Festival de la Leyenda Vallenata, en Valledupar. Sus ritmos alegres son la cumbia, el porro, el fandango y el vallenato.'
      )
    ]
  },
  {
    id: 'pacifica',
    ...rutas('pacifica'),
    imagenAlt: 'Selva lluviosa que llega hasta una playa de arena oscura, con ballenas jorobadas saltando en el mar',
    resumen:
      'Situada en el occidente de Colombia, entre el océano Pacífico y la cordillera Occidental. Abarca el departamento del Chocó y las costas de Valle del Cauca, Cauca y Nariño.',
    secciones: [
      ficha(
        'geografia',
        'Es una zona de selva húmeda tropical con una red de ríos muy densa (como el **Atrato** y el **San Juan**). Su clima es cálido y húmedo, y es una de las zonas más lluviosas del planeta.'
      ),
      ficha(
        'flora',
        'Manglares enormes y selvas casi vírgenes. Es un santuario mundial de biodiversidad: viven ranas venenosas, jaguares y, en sus aguas costeras, llegan a reproducirse las **ballenas jorobadas**.'
      ),
      ficha(
        'economia',
        'Predominan la pesca artesanal, el aprovechamiento forestal, la minería artesanal e industrial de oro y platino y las iniciativas de ecoturismo.'
      ),
      ficha(
        'cultura',
        'De fuerte raíz afrodescendiente e indígena. Destacan los cantos tradicionales como el **alabao** y el **gualí** (cantos fúnebres y espirituales), el **currulao** y festivales como el Festival de Música del Pacífico Petronio Álvarez, en Cali, y el Festival Folclórico del Litoral Pacífico, en Buenaventura. Su gastronomía usa coco, mariscos y piangua.'
      )
    ]
  },
  {
    id: 'orinoquia',
    ...rutas('orinoquia'),
    imagenAlt: 'Llanura al atardecer con un llanero a caballo, un chigüiro y corocoras rojas volando',
    resumen:
      'Ubicada en el oriente del país, comprende las cuencas de los ríos que desembocan en el Orinoco. Abarca departamentos como Meta, Casanare, Arauca y Vichada.',
    secciones: [
      ficha(
        'geografia',
        'Predominan las sabanas inmensas, los pastizales planos y los bosques de galería a orillas de los ríos; en el Parque Nacional Natural El Tuparro (Vichada) aparecen rocas muy antiguas del escudo guayanés. Su clima es tropical de sabana, con dos estaciones muy marcadas: invierno (lluvias intensas) y verano (sequía fuerte).'
      ),
      ficha(
        'flora',
        'Pastos naturales, morichales y bosques de galería. Allí viven el **chigüiro** (el roedor más grande del mundo), el venado sabanero, el caimán del Orinoco, las anacondas y cientos de especies de aves, como la corocora roja.'
      ),
      ficha(
        'economia',
        'Ganadería extensiva de grandes hatos, agricultura tecnificada (arroz, maíz, palma de aceite) y una de las zonas petroleras más importantes de Colombia.'
      ),
      ficha(
        'cultura',
        'La cultura del **llanero** a caballo: el trabajo de llano, el coleo, la música de arpa, cuatro y maracas, y el **joropo**, un baile zapateado.'
      )
    ]
  },
  {
    id: 'amazonia',
    ...rutas('amazonia'),
    imagenAlt: 'Río en la selva amazónica con un delfín rosado, guacamayas, un jaguar y victorias amazónicas',
    resumen:
      'Es la región más extensa de Colombia: ocupa cerca del 42 % del territorio nacional, al sur del país, y está cubierta por la selva tropical húmeda del Amazonas.',
    secciones: [
      ficha(
        'geografia',
        'Llanuras selváticas atravesadas por grandes ríos como el **Amazonas**, el Caquetá, el Putumayo y el Vaupés. El clima es cálido, húmedo y lluvioso durante todo el año.'
      ),
      ficha(
        'flora',
        'Miles de especies de plantas medicinales, árboles gigantes como la ceiba (lupuna) y la **victoria amazónica**, una planta acuática de hojas enormes. Su fauna incluye jaguares, pumas, perezosos, tapires, el **delfín rosado** de agua dulce, guacamayas y tucanes.'
      ),
      ficha(
        'economia',
        'Se basa en la pesca, la agricultura de subsistencia, el aprovechamiento de frutos del bosque (como el asaí, el copoazú y el camu-camu) y proyectos de turismo ecológico y científico.'
      ),
      ficha(
        'cultura',
        'Allí viven decenas de pueblos indígenas ancestrales (como los ticunas, los uitotos y los nukak), con una profunda conexión espiritual con la selva. Sus saberes tradicionales y sus malocas son patrimonio vivo de la nación.'
      )
    ]
  },
  {
    id: 'insular',
    ...rutas('insular'),
    imagenAlt: 'Isla caribeña con casas de colores, un muelle, arrecifes de coral y una tortuga marina',
    resumen:
      'Es la región más pequeña de Colombia: islas, cayos e islotes alejados de la costa continental, repartidos en dos océanos.',
    secciones: [
      ficha(
        'geografia',
        'En el mar Caribe está el archipiélago de **San Andrés, Providencia y Santa Catalina**, y en el océano Pacífico, las islas de **Malpelo y Gorgona**. San Andrés es de origen coralino, rodeada por el famoso «Mar de los Siete Colores»; Providencia, Santa Catalina y Malpelo son de origen volcánico, y Gorgona es una isla montañosa cubierta de selva. El clima es tropical marino, suavizado por la brisa constante.'
      ),
      ficha(
        'flora',
        'Arrecifes de coral, manglares y bosques tropicales insulares. Son refugio de aves marinas, tortugas carey y verdes, tiburones (en Malpelo) y del fenómeno migratorio del **cangrejo negro** en Providencia.'
      ),
      ficha(
        'economia',
        'Depende sobre todo del turismo, el comercio libre de impuestos (en San Andrés) y la pesca artesanal.'
      ),
      ficha(
        'cultura',
        'En el archipiélago del Caribe predomina la cultura **raizal**, descendiente de colonos ingleses y de africanos esclavizados; su lengua es el creole sanandresano y su música incluye el calypso y el reggae. Su plato típico es el **rondón** (run down). Gorgona y Malpelo son hoy áreas protegidas dedicadas a la conservación y la investigación científica: el Parque Nacional Natural Gorgona y el Santuario de Fauna y Flora Malpelo.'
      )
    ]
  }
]

/** Información de una región por su id (undefined para 'general') */
export const infoDeRegion = (id: string): InfoRegion | undefined => INFO_REGIONES.find((r) => r.id === id)
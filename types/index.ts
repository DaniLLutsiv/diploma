export enum Language {
    EN = "en",
    UA = "ua",
}

export enum MarkerType {
    COMMON = "common",
}

export enum MarkerStatus {
    Open = "open",
    Hidden = "hidden",
}

export enum CategoryType {
    Historical = "Historical",
    Nature = "Nature",
    Museums = "Museums",
    Architecture = "Architecture",
    Culture = "Culture",
    Sports = "Sports",
    Gastronomy = "Gastronomy",
    Handicrafts = "Handicrafts",
    Family = "Family",
    Common = "Common",
}

export interface ILocation {
    id: string;
    title: Record<string, string>;
    coordinates: google.maps.LatLngLiteral;
    images: string[];
    description: Record<string, string>;
    categories?: CategoryType[];
    status: MarkerStatus;
    type: CategoryType;
}

export interface ICategory {
    id: string;
    locations: string[];
    name: Record<string, string>;
    description: string;
    icon: string;
    type: CategoryType;
}

// Historical	Історичні пам’ятки	Historical Sites
// Nature	Природні локації	Nature & Parks
// Museums	Музеї та галереї	Museums & Galleries
// Architecture	Архітектура	Architecture
// Culture	Культура та розваги	Culture & Entertainment
// Sports	Спорт і активності	Sports & Activities
// Gastronomy	Гастрономія	Food & Gastronomy
// Handicrafts	Сувеніри та ремесла	Handicrafts & Souvenirs
// Family	Для сімей з дітьми	Family & Kids
// Panorama	Панорамні точки	Scenic Views & Photo Spots

// Історичні пам’ятки
// Запорізька Січ (о. Хортиця)
//
// Музей історії козацтва
//
// Пам’ятник Богдану Хмельницькому
//
// Історико-культурний комплекс «Стара Січ»
//
// 🌿 Природні локації
// Острів Хортиця
//
// Центральний парк «Дубовий гай»
//
// Парк Перемоги
//
// Ботанічний сад ЗНУ
//
// Лісопарк на Великому Лузі
//
// 🖼️ Музеї та галереї
// Музей техніки «Фаетон»
//
// Обласний краєзнавчий музей
//
// Музей зброї
//
// Музей ретро-автомобілів
//
// 🏙️ Архітектура та визначні місця
// Проспект Соборний
//
// Будинок з годинником
//
// Запорізький обласний драматичний театр
//
// Вежа Водонапірна (сталінський ампір)
//
// 🎭 Культура та розваги
// Театр ім. Магара
//
// Концертний зал ім. Глінки
//
// Кінотеатри: ім. Довженка, Байда
//
// Арт-простори та креативні хаби
//
// ⚽ Спорт і активності
// Стадіон «Славутич-Арена»
//
// Скейт-парк
//
// Веломаршрути Хортиці
//
// База активного відпочинку (кайт, SUP, катамарани)
//
// 🍽️ Гастрономія (рекомендоване)
// Ресторани з традиційною кухнею
//
// Місцеві кав’ярні
//
// Етно-ресторани на Хортиці
//
// 🛍️ Сувеніри та ремесла
// Ярмарки народних майстрів
//
// Центри народної творчості
//
// Лавки з автентичними виробами
//
// 👨‍👩‍👧‍👦 Для сімей та дітей
// Дитячий зоопарк
//
// Планетарій
//
// Розважальні центри (типу Fly Kids)
//
// 📸 Панорамні точки та фотозони
// Види на ДніпроГЕС
//
// Мости через Хортицю
//
// Панорамний майданчик біля музею Фаетон

// [
//                         {
//                             "_id": "6820950f6bbf733059b4656a",
//                             "coordinates": {
//                                 "lat": 47.8290584,
//                                 "lng": 35.1549364
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656b"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Хортиця",
//                             "type": "Historical",
//                             "id": "6820950f6bbf733059b4656a"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4656b",
//                             "coordinates": {
//                                 "lat": 47.838786,
//                                 "lng": 35.138431
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656b"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Музей історії запорозького козацтва",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b4656b"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4656c",
//                             "coordinates": {
//                                 "lat": 47.857957,
//                                 "lng": 35.117707
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656c"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Прогулянкова алея на Хортиці",
//                             "type": "Family",
//                             "id": "6820950f6bbf733059b4656c"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4656d",
//                             "coordinates": {
//                                 "lat": 47.859005,
//                                 "lng": 35.143888
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656d"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Святилище скіфських часів",
//                             "type": "Panorama",
//                             "id": "6820950f6bbf733059b4656d"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4656e",
//                             "coordinates": {
//                                 "lat": 47.857398,
//                                 "lng": 35.103497
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656e"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Запорізька Січ",
//                             "type": "Handicrafts",
//                             "id": "6820950f6bbf733059b4656e"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4656f",
//                             "coordinates": {
//                                 "lat": 47.838125,
//                                 "lng": 35.155642
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4656f"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Критий міст Преображенського",
//                             "type": "Sports",
//                             "id": "6820950f6bbf733059b4656f"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46570",
//                             "coordinates": {
//                                 "lat": 47.843141,
//                                 "lng": 35.115785
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46570"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Дніпровська ГЕС",
//                             "type": "Gastronomy",
//                             "id": "6820950f6bbf733059b46570"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46571",
//                             "coordinates": {
//                                 "lat": 47.841641,
//                                 "lng": 35.109424
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46571"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Парк «Дубовий гай»",
//                             "type": "Nature",
//                             "id": "6820950f6bbf733059b46571"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46572",
//                             "coordinates": {
//                                 "lat": 47.849777,
//                                 "lng": 35.140826
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46572"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Парк Перемоги",
//                             "type": "Architecture",
//                             "id": "6820950f6bbf733059b46572"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46573",
//                             "coordinates": {
//                                 "lat": 47.831773,
//                                 "lng": 35.144216
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46573"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Фонтан «Райдуга»",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46573"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46574",
//                             "coordinates": {
//                                 "lat": 47.843241,
//                                 "lng": 35.117145
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46574"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Музей техніки «Фаетон»",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46574"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46575",
//                             "coordinates": {
//                                 "lat": 47.865870,
//                                 "lng": 35.165097
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46575"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Парк Ковалівського",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46575"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46576",
//                             "coordinates": {
//                                 "lat": 47.820850,
//                                 "lng": 35.178963
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46576"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Театр ім. Магара",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46576"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46577",
//                             "coordinates": {
//                                 "lat": 47.839624,
//                                 "lng": 35.123577
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46577"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Вознесенівський парк",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46577"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46578",
//                             "coordinates": {
//                                 "lat": 47.836558,
//                                 "lng": 35.113364
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46578"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Будинок культури «Орбіта»",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46578"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b46579",
//                             "coordinates": {
//                                 "lat": 47.841056,
//                                 "lng": 35.172213
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b46579"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Площа Маяковського",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b46579"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4657a",
//                             "coordinates": {
//                                 "lat": 47.844016,
//                                 "lng": 35.185821
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4657a"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Центральний пляж",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b4657a"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4657b",
//                             "coordinates": {
//                                 "lat": 47.851113,
//                                 "lng": 35.133131
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4657b"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Туристичний пляж Хортиці",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b4657b"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4657c",
//                             "coordinates": {
//                                 "lat": 47.827194,
//                                 "lng": 35.193052
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4657c"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Свято-Покровський собор",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b4657c"
//                         },
//                         {
//                             "_id": "6820950f6bbf733059b4657d",
//                             "coordinates": {
//                                 "lat": 47.837115,
//                                 "lng": 35.183524
//                             },
//                             "description": "",
//                             "categories": ["682095966bbf733059b4657d"],
//                             "status": "open",
//                             "image": "",
//                             "title": "Торговий центр City Mall",
//                             "type": "common",
//                             "id": "6820950f6bbf733059b4657d"
//                         }
//                     ]
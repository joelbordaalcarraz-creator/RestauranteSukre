import { useEffect, useMemo, useState } from "react";
import logo from "./assets/sukre-logo.webp";
import salonPrincipal from "./public/Salones/salonprincipal.webp";
import salonEntrada from "./public/Salones/salonentrada.webp";
import salonBalcon from "./public/Salones/salonbalcon.webp";
import piano from "./public/Salones/Referencias/piano.webp";
import barra from "./public/Salones/Referencias/barra.webp";
import catedral from "./public/Salones/Referencias/catedral.webp";

type Page = "historia" | "carta" | "reservas" | "contacto";
type Dish = {
  id: string;
  category: string;
  name: string;
  group?: string;
  description?: string;
  price?: number;
};

const images = {
  plaza:
    "https://images.unsplash.com/photo-1580530719837-952e0515b69a?auto=format&fit=crop&w=1800&q=85",
  carnival:
    "https://images.unsplash.com/photo-1589150186133-ceba5b253151?auto=format&fit=crop&w=1200&q=85",
  holyWeek:
    "https://images.unsplash.com/photo-1659554398979-bc7e6c16b110?auto=format&fit=crop&w=1200&q=85",
  salonColonial:
    "https://images.unsplash.com/photo-1785496638357-c8e58103ecf3?auto=format&fit=crop&w=1200&q=85",
  salonArcos:
    "https://images.unsplash.com/photo-1785960862235-ec47243e0a94?auto=format&fit=crop&w=1200&q=85",
  salonPatio:
    "https://images.unsplash.com/photo-1785960862212-c95a6d5b1da3?auto=format&fit=crop&w=1200&q=85",
  ceviche:
    "https://images.unsplash.com/photo-1562707774-553917f561df?auto=format&fit=crop&w=900&q=85",
  cocina:
    "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=900&q=85",
  fondo:
    "https://images.unsplash.com/photo-1726514730572-7e0f664f60d2?auto=format&fit=crop&w=900&q=85",
};

const menuCategories = [
  "Desayunos",
  "Piqueos",
  "Entradas",
  "Sándwiches",
  "Sopas",
  "Arroces",
  "Ensaladas",
  "Aves",
  "Carnes",
  "Cortes de carne",
  "Pastas",
  "Regionales",
  "Pescados y mariscos",
  "Bebidas frías",
  "Nuestra barra",
];

const menuItems: { category: string; group?: string; names: string[] }[] = [
  {
    category: "Desayunos",
    names: [
      "Desayuno americano",
      "Desayuno a lo pobre",
      "Desayuno fitness",
      "Desayuno criollo",
      "Desayuno Sukre",
      "Desayuno express",
      "Omelette clásico",
      "Omelette con champiñones",
      "Tortilla española a nuestro estilo",
    ],
  },
  {
    category: "Piqueos",
    names: [
      "Alitas a la BBQ",
      "Alitas al estilo chino",
      "Salchipapa clásica",
      "Crujientes de pollo",
      "Crocantes de pollo estilo coreano",
      "Salchipapa especial Sukre",
      "Anticucho de corazón",
      "Tequeños de lomo",
      "Tequeños de queso",
      "Maki con atún acevichado",
      "Maki crocante con langostino",
    ],
  },
  {
    category: "Entradas",
    names: [
      "Causa de pollo a la parrilla",
      "Causa de langostino al panko",
      "Causa acevichada",
      "Langostinos al panko con puré de camote",
      "Ceviche de trucha",
      "Tiradito de salmón a la crema de ají amarillo",
      "Tiradito acevichado oriental",
      "Champiñones a la crema con ajíes peruanos",
      "Quesadilla mixta",
      "Langostinos al Thermidor",
    ],
  },
  {
    category: "Sándwiches",
    names: [
      "Sándwich mixto doble",
      "Sándwich parrillero con pollo",
      "Ciabatta al estrogonoff",
      "Hamburguesa de pollo crujiente",
      "Hamburguesa clásica",
    ],
  },
  {
    category: "Sopas",
    names: ["Crema de zapallo", "Crema de espárragos y champiñones", "Dieta de pollo", "Sopa criolla"],
  },
  {
    category: "Arroces",
    names: ["Chaufa de lomo", "Chaufa de pollo", "Chaufa de chicharrón", "Arroz con langostino"],
  },
  {
    category: "Ensaladas",
    names: ["Ensalada parrillera", "Ensalada light", "Ensalada marina", "Ensalada oriental", "Ensalada falafel"],
  },
  {
    category: "Aves",
    names: [
      "Pollo parrillero estilo BBQ",
      "Cordon bleu al grill",
      "Enrollado de pollo",
      "Pollo a la plancha",
      "Milanesa de pollo",
      "Milanesa estilo Milano",
      "Pollo a la tocineta",
      "Pollo a la parrilla",
    ],
  },
  {
    category: "Carnes",
    names: [
      "Lomo saltado clásico",
      "Lomo saltado de alpaca",
      "Medallón de lomo de alpaca a la parrilla",
      "Lomo a lo pobre",
      "Lomo al champiñón",
      "Filete de lomo fino",
    ],
  },
  {
    category: "Cortes de carne",
    names: [
      "Medallón de lomo a la parrilla",
      "Entraña Angus americano",
      "Bife angosto Angus americano",
      "Bife ancho Angus americano",
      "Costilla St. Louis americana a la BBQ",
      "Filet mignon",
    ],
  },
  {
    category: "Pastas",
    names: [
      "Lomo a la pimienta con pesto genovés",
      "Dúo de pastas",
      "Alfredo mixto",
      "Alfredo con pollo",
      "Tallarín saltado de lomo fino",
      "Lasagna clásica",
    ],
  },
  {
    category: "Regionales",
    names: ["Trucha chactada", "Trucha quinua", "Chicharrón huamanguino", "Quinotto con trucha"],
  },
  {
    category: "Pescados y mariscos",
    names: ["Salmón a la parrilla", "Atún a la parrilla"],
  },
  {
    category: "Bebidas frías",
    group: "Refreshers",
    names: ["Refresher tropical", "Refresher andino", "Refresher de frutos rojos"],
  },
  {
    category: "Bebidas frías",
    group: "Refrescantes al tiempo",
    names: ["Limonada clásica", "Arándano", "Limomuña", "Maracumango", "Hierbabuena limón", "Frutos rojos"],
  },
  {
    category: "Bebidas frías",
    group: "Frozen",
    names: [
      "Limonada clásica frozen",
      "Arándano frozen",
      "Limomuña frozen",
      "Maracumango frozen",
      "Hierbabuena limón frozen",
      "Frutos rojos frozen",
    ],
  },
  {
    category: "Bebidas frías",
    group: "Gaseosas y agua",
    names: ["Gaseosa de 1,5 litros", "Gaseosa Zero de 600 ml", "Gaseosa de 600 ml", "Agua mineral"],
  },
  {
    category: "Bebidas frías",
    group: "Infusiones y aromáticos",
    names: ["Té frutal", "Popurrí", "Té de hierbas frescas"],
  },
  {
    category: "Bebidas frías",
    group: "Infusiones Fidelia",
    names: [
      "Caricia Silvestre",
      "Tentación de los Andes",
      "Delirio de Amor",
      "Divina Amazonia",
      "Muña Celestial",
      "Armonía del Cielo",
    ],
  },
  {
    category: "Nuestra barra",
    group: "Bebidas calientes a base de café",
    names: [
      "Espresso",
      "Café americano",
      "Café pasado",
      "Macchiatto",
      "Capuccino caramelo",
      "Capuccino chocolate",
      "Capuccino avellana",
      "Latte caramelo",
      "Latte chocolate Milano",
      "Latte canela",
      "Latte vainilla",
      "Café bom bom",
    ],
  },
  {
    category: "Nuestra barra",
    group: "Bebidas frías a base de café",
    names: [
      "Café Sukre",
      "Limón Coffee",
      "Frapuccino clásico",
      "Frapuccino de fresa",
      "Frapuccino de menta con Oreo",
    ],
  },
  {
    category: "Nuestra barra",
    group: "Bebidas calientes a base de leche",
    names: ["Infusión india con leche", "Chocolate caliente", "Caramelo caliente"],
  },
  {
    category: "Nuestra barra",
    group: "Bebidas frías a base de leche",
    names: [
      "Milkshake de fresa",
      "Milkshake de frutos rojos",
      "Milkshake de mango",
      "Milkshake de lúcuma",
      "Milkshake de arándanos",
      "Milkshake de Oreo",
    ],
  },
  {
    category: "Nuestra barra",
    group: "Jugos y batidos",
    names: [
      "Jugo clásico: papaya, piña, plátano, fresa, naranja o mango",
      "Jugo surtido",
      "Combinaciones de la casa: naranja con papaya; fresa con mango; piña con manzana y plátano; mango con durazno y plátano",
      "Jugo especial",
      "Batidos de fruta con leche: papaya, piña, plátano o fresa",
    ],
  },
];

const dishDetails: Record<string, { description: string; price: number }> = {
  "Desayuno americano": {
    description: "Huevos revueltos con jamón, tostadas, mermelada, mantequilla y café o jugo a elección.",
    price: 18,
  },
  "Desayuno a lo pobre": {
    description: "Huevo, plátano frito, arroz, ensalada, papas fritas y café de la casa.",
    price: 18,
  },
  "Desayuno fitness": {
    description: "Ensalada de frutas con yogurt y granola, huevo sancochado, tostadas, mermelada y jugo de papaya.",
    price: 18,
  },
  "Desayuno criollo": {
    description: "Un pan con chicharrón, sarsa criolla, camotes fritos, tamal y café de la casa.",
    price: 20,
  },
  "Desayuno Sukre": {
    description: "Dos chaplas a la waflera con queso pasteurizado, humita, mermelada, jugo de papaya y latte de caramelo.",
    price: 20,
  },
  "Desayuno express": {
    description: "Una chapla a la waflera con queso, dos tostadas, mermelada, mantequilla y café o jugo de papaya.",
    price: 15,
  },
  "Omelette clásico": {
    description: "Huevo relleno de jamón, queso y crema, acompañado de chapla y/o tostada y latte de avellanas.",
    price: 20,
  },
  "Omelette con champiñones": {
    description: "Huevo relleno de champiñones, cebolla, crema y pimiento, acompañado de chai latte.",
    price: 20,
  },
  "Tortilla española a nuestro estilo": {
    description: "Pastel de papas, tocino, cebolla, huevo y pimiento morroneado, acompañado de chai latte.",
    price: 20,
  },
  "Alitas a la BBQ": {
    description: "Alitas bañadas en salsa BBQ, acompañadas de ensalada, papas fritas y/o papas chips.",
    price: 28,
  },
  "Alitas al estilo chino": {
    description: "Alitas fritas bañadas en salsa china, con papas fritas y/o chips, salsa Wai Yen y encurtido de nabo al ají.",
    price: 28,
  },
  "Salchipapa clásica": {
    description: "Papitas crocantes con embutidos cóctel, huevo frito y cremas.",
    price: 25,
  },
  "Crujientes de pollo": {
    description: "Trozos de pollo crocante con papas fritas, ensalada y cremas.",
    price: 28,
  },
  "Crocantes de pollo estilo coreano": {
    description: "Trozos crujientes de pollo bañados en salsa agridulce coreana, con nabo encurtido y papitas fritas.",
    price: 28,
  },
  "Salchipapa especial Sukre": {
    description: "Papitas crocantes con embutidos cóctel, huevo frito, queso a la parrilla, chicharroncitos crocantes y cremas.",
    price: 32,
  },
  "Anticucho de corazón": {
    description: "Brochetas de corazón de res con choclo salteado, ensalada, ají parrillero y papa.",
    price: 28,
  },
  "Tequeños de lomo": {
    description: "Masa wantán rellena de lomo fino saltado, acompañada de salsa de ají amarillo.",
    price: 24,
  },
  "Tequeños de queso": {
    description: "Masa rellena de queso, acompañada de guacamole y pico de gallo.",
    price: 20,
  },
  "Maki con atún acevichado": {
    description: "Enrollado de arroz japonés relleno de atún y queso crema, con salsa acevichada nikkei.",
    price: 30,
  },
  "Maki crocante con langostino": {
    description: "Enrollado crocante de arroz japonés relleno de langostino y queso crema, con salsa panca miel.",
    price: 30,
  },
  "Causa de pollo a la parrilla": {
    description: "Masa de papa y ajíes peruanos, rellena de verduras, palta y mayonesa, acompañada de pollo a la parrilla.",
    price: 30,
  },
  "Causa de langostino al panko": {
    description: "Masa de papa y ajíes peruanos, rellena de langostinos en salsa golf y palta, acompañada de langostinos al panko.",
    price: 35,
  },
  "Causa acevichada": {
    description: "Masa de papa y ajíes peruanos, rellena de palta y mayonesa, coronada con ceviche de trucha salmonada y camotes fritos.",
    price: 32,
  },
  "Langostinos al panko con puré de camote": {
    description: "Langostinos crocantes sobre una cama de puré de camote, con salsa de maracuyá y balsámico.",
    price: 32,
  },
  "Ceviche de trucha": {
    description: "Cubos de trucha salmonada con leche de tigre peruana, acompañados de choclo, lechuga y camote.",
    price: 35,
  },
  "Tiradito de salmón a la crema de ají amarillo": {
    description: "Tiradito de salmón con crema de ají amarillo.",
    price: 35,
  },
  "Tiradito acevichado oriental": {
    description: "Láminas de trucha en salsa acevichada estilo nikkei, con choclo, palta y camote crocante.",
    price: 35,
  },
  "Champiñones a la crema con ajíes peruanos": {
    description: "Champiñones salteados y bañados en salsa cremosa de ajíes y parmesano, con chapla crocante.",
    price: 28,
  },
  "Quesadilla mixta": {
    description: "Masa rellena de lomo fino, pollo, chimichurri y quesos, con guacamole y pico de gallo.",
    price: 30,
  },
  "Langostinos al Thermidor": {
    description: "Langostinos jumbo al grill, flameados con brandy, con salsa Thermidor, verduras salteadas y papitas cóctel.",
    price: 35,
  },
  "Sándwich mixto doble": {
    description: "Pan de molde relleno de jamón y queso Edam en doble versión, acompañado de papitas y lechuga al balsámico.",
    price: 20,
  },
  "Sándwich parrillero con pollo": {
    description: "Pan ciabatta con pollo a la parrilla, verduras salteadas y papas fritas.",
    price: 22,
  },
  "Ciabatta al estrogonoff": {
    description: "Pan ciabatta con carne salteada a la crema, champiñones y papas chips.",
    price: 22,
  },
  "Hamburguesa de pollo crujiente": {
    description: "Pan de ajonjolí con pollo crispy, aros de cebolla, pepinillo encurtido, tomate, lechuga y salsa mil islas.",
    price: 22,
  },
  "Hamburguesa clásica": {
    description: "Hamburguesa de la casa con huevo, tocino, quesos y pepinillo encurtido, acompañada de papas fritas y/o chips.",
    price: 22,
  },
  "Crema de zapallo": {
    description: "Crema de zapallo macre con leche y crutones de pan chapla.",
    price: 22,
  },
  "Crema de espárragos y champiñones": {
    description: "Preparación cremosa de espárragos y champiñones con leche y crutones de pan chapla.",
    price: 22,
  },
  "Dieta de pollo": {
    description: "Sopa ligera de pollo con fideos cabello de ángel y verduras.",
    price: 19,
  },
  "Sopa criolla": {
    description: "Concentrado de carne con aderezo de ajíes peruanos, verduras, cabello de ángel, huevo a la inglesa y leche.",
    price: 20,
  },
  "Chaufa de lomo": {
    description: "Arroz salteado al estilo chino con lomo fino, cebolla china y salsa de tamarindo.",
    price: 34,
  },
  "Chaufa de pollo": {
    description: "Arroz salteado al estilo chino con filetes de pollo, cebolla china y salsa de tamarindo.",
    price: 28,
  },
  "Chaufa de chicharrón": {
    description: "Arroz salteado al estilo chino con chancho, cebolla china y salsa de tamarindo.",
    price: 30,
  },
  "Arroz con langostino": {
    description: "Arroz cremoso con verduras y langostinos flambeados.",
    price: 32,
  },
  "Ensalada parrillera": {
    description: "Mix de lechugas, verduras salteadas, aceituna, rabanito, champiñones y pollo a la parrilla con chimichurri y salsa de ají confitado.",
    price: 27,
  },
  "Ensalada light": {
    description: "Mix de lechugas, verduras, aceituna, rabanito y pollo a la plancha, con aliño de oliva y reducción balsámica.",
    price: 25,
  },
  "Ensalada marina": {
    description: "Mix de lechugas, verduras, aceituna, palta y filete de atún en conserva, con vinagreta clásica.",
    price: 25,
  },
  "Ensalada oriental": {
    description: "Mix de lechugas, verduras, durazno en almíbar, palta, brócoli y langostinos al panko, con vinagreta oriental.",
    price: 32,
  },
  "Ensalada falafel": {
    description: "Hamburguesa de garbanzo al estilo árabe con mix de verduras, aliño de oliva y crocantes de pan chapla.",
    price: 25,
  },
  "Pollo parrillero estilo BBQ": {
    description: "Filete de pollo a la parrilla bañado en salsa BBQ con chimichurri, papitas al grill y verduras a la parrilla.",
    price: 34,
  },
  "Cordon bleu al grill": {
    description: "Filete de pollo enrollado con queso y jamón inglés, servido sobre papas fritas, con salsa blanca y ensalada.",
    price: 34,
  },
  "Enrollado de pollo": {
    description: "Filete de pollo enrollado con verduras y jamón inglés, sobre una cama de puré y acompañado de arroz mediterráneo.",
    price: 34,
  },
  "Pollo a la plancha": {
    description: "Pollo light con ensalada, arroz y papas sancochadas.",
    price: 30,
  },
  "Milanesa de pollo": {
    description: "Pollo empanizado con papas fritas, ensalada y cremas.",
    price: 32,
  },
  "Milanesa estilo Milano": {
    description: "Filete empanizado crocante bañado en salsa pomodoro con pesto genovés y papas fritas.",
    price: 35,
  },
  "Pollo a la tocineta": {
    description: "Filete de pollo bañado en salsa de tocino crocante, sobre una cama de puré y con arroz mediterráneo.",
    price: 30,
  },
  "Pollo a la parrilla": {
    description: "Filete de pollo a la parrilla con chimichurri, chorizo, papitas al grill y verduras a la parrilla.",
    price: 33,
  },
  "Lomo saltado clásico": {
    description: "Cubos de lomo fino salteados con tomate, cebolla y ají amarillo, acompañados de papas fritas y arroz blanco.",
    price: 40,
  },
  "Lomo saltado de alpaca": {
    description: "Cubos de lomo de alpaca salteados con tomate, cebolla y ají amarillo, acompañados de papas nativas y arroz blanco.",
    price: 42,
  },
  "Medallón de lomo de alpaca a la parrilla": {
    description: "Filete de lomo de alpaca de 300 g a la parrilla, con ensalada parrillera, ajíes parrilleros y papas nativas.",
    price: 55,
  },
  "Lomo a lo pobre": {
    description: "Lomo fino al grill con plátano al panko, huevo frito a la inglesa, papas fritas, arroz y ensalada.",
    price: 40,
  },
  "Lomo al champiñón": {
    description: "Filete de lomo al grill con salsa de champiñones, tocino y vino rosé, acompañado de vegetales y papas fritas.",
    price: 40,
  },
  "Filete de lomo fino": {
    description: "Filete de lomo de 200 g a la parrilla con chorizo parrillero, papas doradas, ensalada y cremas.",
    price: 42,
  },
  "Medallón de lomo a la parrilla": {
    description: "Filete de lomo de 300 g a la parrilla con ensalada parrillera, ajíes parrilleros y papas fritas.",
    price: 60,
  },
  "Entraña Angus americano": {
    description: "Corte de res de 400 g con ensalada parrillera, ajíes parrilleros y papas fritas.",
    price: 98,
  },
  "Bife angosto Angus americano": {
    description: "Corte de res de 400 g con ensalada parrillera, ajíes parrilleros y papas fritas.",
    price: 85,
  },
  "Bife ancho Angus americano": {
    description: "Corte de res de 400 g con ensalada parrillera, ajíes parrilleros y papas fritas.",
    price: 98,
  },
  "Costilla St. Louis americana a la BBQ": {
    description: "Corte de cerdo de 500 g con ensalada parrillera, salsa BBQ, ajíes parrilleros y papas fritas.",
    price: 65,
  },
  "Filet mignon": {
    description: "Corte de res de 300 g con salsa de vino, sobre una cama de puré y mantequilla.",
    price: 65,
  },
  "Lomo a la pimienta con pesto genovés": {
    description: "Fettuccini con pesto genovés, queso parmesano y crema blanca, acompañado de lomo fino de 200 g al grill.",
    price: 45,
  },
  "Dúo de pastas": {
    description: "Combinación de pasta a la huancaína con pollo al grill y tallarines verdes criollos con lomo fino.",
    price: 45,
  },
  "Alfredo mixto": {
    description: "Pasta al estilo italiano con jamón inglés, queso parmesano y champiñones.",
    price: 33,
  },
  "Alfredo con pollo": {
    description: "Pasta al estilo italiano con jamón inglés, queso parmesano y filete de pollo a la parrilla.",
    price: 37,
  },
  "Tallarín saltado de lomo fino": {
    description: "Pasta al estilo criollo peruano con sillao, verduras y lomo fino.",
    price: 35,
  },
  "Lasagna clásica": {
    description: "Preparación al horno con salsa boloñesa y salsa blanca, gratinada con mozzarella y parmesano.",
    price: 35,
  },
  "Trucha chactada": {
    description: "Trucha chactada con maíz de la zona, acompañada de qapchi, papas y sarsa.",
    price: 30,
  },
  "Trucha quinua": {
    description: "Trucha frita con quinua, acompañada de qapchi, papas y sarsa.",
    price: 32,
  },
  "Chicharrón huamanguino": {
    description: "Chicharrón de preparación huamanguina con qapchi, papas y sarsa.",
    price: 35,
  },
  "Quinotto con trucha": {
    description: "Preparación cremosa de quinua de colores con quesos y verduras, acompañada de trucha a la plancha.",
    price: 32,
  },
  "Salmón a la parrilla": {
    description: "Salmón a la parrilla con salsa Thermidor, vegetales salteados y papas cóctel.",
    price: 58,
  },
  "Atún a la parrilla": {
    description: "Atún a la parrilla con salsa oriental, vegetales salteados y papas cóctel.",
    price: 50,
  },
};

let nextDishId = 1;
const dishes: Dish[] = menuItems.flatMap(({ category, group, names }) =>
  names.map((name) => ({
    id: String(nextDishId++),
    category,
    name,
    ...(group ? { group } : {}),
    ...(dishDetails[name] ?? {}),
  })),
);

const salons = [
  {
    name: "Salón Entrada",
    capacity: "2–24 personas",
    detail: "Un espacio acogedor junto a nuestra barra.",
    image: salonEntrada,
  },
  {
    name: "Salón Principal",
    capacity: "2–40 personas",
    detail: "Nuestro espacio principal, luminoso y elegante.",
    image: salonPrincipal,
  },
  {
    name: "Salón Balcón",
    capacity: "2–18 personas",
    detail: "Disfruta de la vista a la Plaza Mayor desde el balcón.",
    image: salonBalcon,
  },
];

function Icon({
  name,
  size = 20,
}: {
  name: "menu" | "close" | "chevron" | "bag" | "plus" | "minus" | "arrow" | "pin" | "phone" | "clock" | "check";
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-5-3-6.5-6.5l2-2L7 3Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Header({
  page,
  setPage,
  openDelivery,
}: {
  page: Page;
  setPage: (p: Page) => void;
  openDelivery: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Navegación principal">
        <div className="nav-dropdown">
          <button
            className={`nav-link menu-toggle ${page !== "historia" ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
          {menuOpen && (
            <div className="dropdown-panel">
              {([
                ["historia", "Historia"],
                ["reservas", "Reservas"],
                ["carta", "Carta"],
                ["contacto", "Contáctanos"],
              ] as [Page, string][]).map(([key, label]) => (
                <button key={key} className={page === key ? "selected" : ""} onClick={() => navigate(key)}>
                  <span>{label}</span><Icon name="arrow" size={16} />
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="brand" onClick={() => navigate("historia")} aria-label="Ir al inicio">
          <img src={logo} alt="Sukre Cocina Peruana, Plaza Mayor Ayacucho" />
        </button>
        <button className="delivery-button" onClick={openDelivery}>
          <Icon name="bag" size={18} /> Delivery
        </button>
      </nav>
    </header>
  );
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className={`section-title ${light ? "light" : ""}`}><p>{eyebrow}</p><h2>{title}</h2></div>;
}

function HistoryPage({ setPage, openDelivery }: { setPage: (p: Page) => void; openDelivery: () => void }) {
  return (
    <main>
      <section className="hero" style={{ backgroundImage: `url(${catedral})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">Cocina ayacuchana contemporánea</p>
          <h1>El sabor de nuestra<br /><em>historia</em></h1>
          <p className="hero-copy">Una casona, una ciudad y una mesa donde el pasado de Huamanga conversa con el presente.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => { setPage("reservas"); window.scrollTo(0, 0); }}>Reservar una mesa <Icon name="arrow" /></button>
            <button className="text-button light" onClick={openDelivery}>Pedir en casa <Icon name="arrow" /></button>
          </div>
        </div>
        <div className="hero-caption"><span>01</span><div /><p>Plaza Mayor de Huamanga<br />Ayacucho, Perú</p></div>
      </section>

      <section className="intro-section">
        <div className="ornament">✦</div>
        <p className="eyebrow">Bienvenidos a Sukre</p>
        <h2>Una celebración de<br />lo que somos</h2>
        <p className="intro-copy">Sukre nace en el corazón de Huamanga para contar la historia de Ayacucho a través de sus ingredientes, sus memorias y la calidez de su gente.</p>
        <button className="text-button" onClick={() => setPage("carta")}>Descubre nuestra carta <Icon name="arrow" /></button>
      </section>

      <section className="story-grid">
        <article className="story-card large">
          <img src={images.carnival} alt="Danzantes con vestimenta tradicional en los carnavales" />
          <div className="story-shade" />
          <div className="story-content"><span>Tradición viva</span><h3>Carnavales de<br />Ayacucho</h3><p>Color, música y encuentro. Una fiesta que inspira nuestra cocina generosa.</p></div>
        </article>
        <article className="story-card">
          <img src={images.holyWeek} alt="Procesión tradicional de Semana Santa en Perú" />
          <div className="story-shade" />
          <div className="story-content"><span>Fe y memoria</span><h3>Semana Santa</h3><p>Diez días en los que Huamanga se transforma y comparte su profunda devoción.</p></div>
        </article>
      </section>

      <section className="manifesto">
        <div className="manifesto-image"><img src={images.cocina} alt="Plato elaborado con ingredientes peruanos" /></div>
        <div className="manifesto-copy">
          <SectionTitle eyebrow="Nuestra cocina" title="Raíz, producto y memoria" />
          <p>Respetamos el recetario ayacuchano y lo llevamos a una expresión contemporánea. Trabajamos con pequeños productores y elegimos cada ingrediente por su origen.</p>
          <div className="values"><div><strong>Local</strong><span>Ingredientes de nuestra tierra</span></div><div><strong>Honesta</strong><span>Sabores claros y reconocibles</span></div><div><strong>Viva</strong><span>Tradición que evoluciona</span></div></div>
          <button className="outline-button" onClick={() => setPage("carta")}>Ver la carta <Icon name="arrow" /></button>
        </div>
      </section>

      <section className="reservation-cta" style={{ backgroundImage: `url(${barra})` }}>
        <div className="hero-overlay" />
        <div><p className="eyebrow light">Tu mesa te espera</p><h2>Ven a vivir Sukre</h2><p>Almuerzos que se alargan, cenas para recordar.</p><button className="cream-button" onClick={() => { setPage("reservas"); window.scrollTo(0, 0); }}>Hacer una reserva</button></div>
      </section>
    </main>
  );
}

function MenuPage() {
  const categories = menuCategories;
  const [active, setActive] = useState(categories[0]);
  const activeDishes = dishes.filter((dish) => dish.category === active);
  const groups = [...new Set(activeDishes.map((dish) => dish.group ?? ""))];
  const dishImages = [images.ceviche, images.cocina, images.fondo];
  return (
    <main className="inner-page menu-page">
      <div className="menu-catalog">
        <aside className="menu-sidebar" aria-label="Categorías de la carta">
          <p className="menu-sidebar-title">Categorías</p>
          <nav>
            {categories.map((category) => (
              <button
                className={active === category ? "active" : ""}
                onClick={() => setActive(category)}
                key={category}
                aria-pressed={active === category}
              >
                {category}
              </button>
            ))}
          </nav>
        </aside>
        <section className="menu-catalog-content" aria-live="polite">
          <header className="menu-catalog-heading">
            <h1>{active}</h1>
            <span>{activeDishes.length} {activeDishes.length === 1 ? "plato" : "platos"}</span>
            <div className="menu-heading-rule"><i /></div>
          </header>
          {groups.map((group) => {
            const groupDishes = activeDishes.filter((dish) => (dish.group ?? "") === group);
            return (
              <div className="menu-group" key={group || active}>
                {group && <h2 className="menu-subheading">{group}</h2>}
                <div className="dish-grid menu-catalog-grid">
                  {groupDishes.map((dish, index) => (
                    <article className="dish-card menu-catalog-card" key={dish.id}>
                      <img src={dishImages[index % dishImages.length]} alt={`Imagen referencial de ${dish.name}`} />
                      <div className="menu-catalog-card-content">
                        <div className="menu-card-heading">
                          <h3>{dish.name}</h3>
                          <strong>{dish.price !== undefined ? `S/ ${dish.price.toFixed(2)}` : "Consultar"}</strong>
                        </div>
                        {dish.description && <p>{dish.description}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <div className="menu-note"><span>✦</span><p>Los precios y descripciones de bebidas estarán disponibles próximamente. Si tienes alguna alergia o restricción alimentaria, por favor comunícaselo a nuestro equipo.</p></div>
    </main>
  );
}

function ReservationsPage() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState<"salons" | "schedule" | "details" | "success">("salons");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [terms, setTerms] = useState(false);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const week = Array.from({ length: 7 }, (_, index) => {
    const value = new Date(today);
    value.setDate(today.getDate() + index);
    return value;
  });
  const dateValue = (value: Date) => {
    const offset = value.getTimezoneOffset();
    return new Date(value.getTime() - offset * 60000).toISOString().slice(0, 10);
  };
  const dayLabel = (value: Date) => value.toLocaleDateString("es-PE", { weekday: "short" }).replace(".", "");
  const monthLabel = (value: Date) => value.toLocaleDateString("es-PE", { month: "short" }).replace(".", "");
  const chooseSalon = (index: number) => {
    setSelected(index);
    setStage("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const restart = () => {
    setStage("salons");
    setPeople(2);
    setDate("");
    setTime("");
    setTerms(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "schedule") {
    return (
      <main className="inner-page reservation-flow">
        <section className="salon-hero" style={{ backgroundImage: `url(${salons[selected].image})` }}>
          <div className="hero-overlay" />
          <button className="back-button light" onClick={() => setStage("salons")}>← Cambiar de salón</button>
          <div className="salon-hero-copy"><p className="eyebrow light">Tu espacio seleccionado</p><h1>{salons[selected].name}</h1><p>{salons[selected].detail} · {salons[selected].capacity}</p></div>
          <div className="booking-progress"><span className="active">1 <small>Fecha y hora</small></span><i /><span>2 <small>Tus datos</small></span><i /><span>3 <small>Confirmación</small></span></div>
        </section>
        <section className="reservation-choice">
          <div className="choice-heading"><span>01</span><div><p>¿Cuántos serán?</p><h2>Personas</h2></div></div>
          <div className="people-picker">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => <button className={people === number ? "active" : ""} onClick={() => setPeople(number)} key={number}>{number}</button>)}
            <button className={people === 11 ? "active" : ""} onClick={() => setPeople(11)}>10+</button>
          </div>
        </section>
        <section className="reservation-choice alternate">
          <div className="choice-heading"><span>02</span><div><p>Selecciona el día</p><h2>Fecha</h2></div></div>
          <div className="current-week">
            {week.map((day, index) => {
              const value = dateValue(day);
              return <button className={date === value ? "active" : ""} onClick={() => setDate(value)} key={value}><small>{index === 0 ? "Hoy" : dayLabel(day)}</small><strong>{day.getDate()}</strong><span>{monthLabel(day)}</span></button>;
            })}
          </div>
          <label className="calendar-field"><span>¿Otra fecha?</span><input type="date" min={dateValue(today)} value={date} onChange={event => setDate(event.target.value)} /></label>
        </section>
        <section className="reservation-choice">
          <div className="choice-heading"><span>03</span><div><p>Elige tu horario</p><h2>Hora</h2></div></div>
          <div className="time-groups">
            <div><p>Almuerzo</p><div>{["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"].map(slot => <button className={time === slot ? "active" : ""} onClick={() => setTime(slot)} key={slot}>{slot}</button>)}</div></div>
            <div><p>Cena</p><div>{["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map(slot => <button className={time === slot ? "active" : ""} onClick={() => setTime(slot)} key={slot}>{slot}</button>)}</div></div>
          </div>
          <div className="flow-action"><p>{date && time ? `${people > 10 ? "Más de 10" : people} personas · ${new Date(`${date}T12:00:00`).toLocaleDateString("es-PE", { day: "numeric", month: "long" })} · ${time}` : "Selecciona una fecha y una hora para continuar"}</p><button className="primary-button" disabled={!date || !time} onClick={() => { setStage("details"); window.scrollTo(0, 0); }}>Continuar <Icon name="arrow" /></button></div>
        </section>
      </main>
    );
  }

  if (stage === "details") {
    return (
      <main className="inner-page guest-page">
        <div className="guest-summary" style={{ backgroundImage: `url(${salons[selected].image})` }}><div className="hero-overlay" /><button className="back-button light" onClick={() => setStage("schedule")}>← Volver</button><div><p className="eyebrow light">Tu reserva</p><h1>{salons[selected].name}</h1><ul><li><strong>{people > 10 ? "10+" : people}</strong><span>Personas</span></li><li><strong>{new Date(`${date}T12:00:00`).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}</strong><span>Fecha</span></li><li><strong>{time}</strong><span>Hora</span></li></ul></div></div>
        <section className="guest-form-section">
          <div className="booking-progress dark"><span className="active">1</span><i /><span className="active">2 <small>Tus datos</small></span><i /><span>3</span></div>
          <p className="eyebrow">Último paso</p><h2>¿A nombre de quién?</h2><p className="form-intro">Usaremos estos datos únicamente para confirmar y gestionar tu reserva.</p>
          <form className="guest-form" onSubmit={event => { event.preventDefault(); if (terms) { setStage("success"); window.scrollTo(0, 0); } }}>
            <label><span>Nombres</span><input required placeholder="Tus nombres" autoComplete="given-name" /></label>
            <label><span>Apellidos</span><input required placeholder="Tus apellidos" autoComplete="family-name" /></label>
            <label><span>Correo electrónico</span><input required type="email" placeholder="nombre@correo.com" autoComplete="email" /></label>
            <label><span>Número de celular</span><input required type="tel" placeholder="+51 999 999 999" autoComplete="tel" /></label>
            <label className="terms-check"><input type="checkbox" checked={terms} onChange={event => setTerms(event.target.checked)} /><span>Acepto los <button type="button">términos y condiciones</button> y la política de privacidad para gestionar mi reserva.</span></label>
            <button className="primary-button wide" disabled={!terms}>Confirmar reserva <Icon name="arrow" /></button>
          </form>
        </section>
      </main>
    );
  }

  if (stage === "success") {
    return (
      <main className="reservation-success">
        <div className="success-icon"><Icon name="check" size={40} /></div><p className="eyebrow">Todo está listo</p><h1>Reserva realizada</h1><p>Te esperamos en Sukre. Enviamos los detalles de tu reserva al correo registrado.</p>
        <div className="reservation-ticket"><img src={salons[selected].image} alt={salons[selected].name} /><div><span>Salón</span><strong>{salons[selected].name}</strong><dl><div><dt>Personas</dt><dd>{people > 10 ? "10+" : people}</dd></div><div><dt>Fecha</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}</dd></div><div><dt>Hora</dt><dd>{time}</dd></div></dl><small>Código de reserva · SKR-{String(today.getDate()).padStart(2, "0")}24</small></div></div>
        <button className="outline-button" onClick={restart}>Hacer otra reserva</button>
      </main>
    );
  }

  return (
    <main className="inner-page">
      <div className="page-hero reservation-page-hero">
        <img src={piano} alt="" aria-hidden="true" />
        <div className="reservation-page-copy">
          <p className="eyebrow">Una mesa para ti</p><h1>Reserva en Sukre</h1>
          <p>Elige el espacio que más te guste y déjanos preparar una experiencia especial.</p>
        </div>
      </div>
      <section className="salons-section">
        <div className="step-title"><span>01</span><div><p>Elige tu ambiente</p><h2>Nuestros salones</h2></div></div>
        <div className="salon-grid">
          {salons.map((salon, index) => (
            <button className="salon-card" onClick={() => chooseSalon(index)} key={salon.name}>
              <img src={salon.image} alt={salon.name} />
              <div className="salon-overlay" />
              <div className="salon-copy"><span><Icon name="arrow" /></span><small>0{index + 1}</small><h3>{salon.name}</h3><p>{salon.capacity}</p><small>{salon.detail}</small></div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="inner-page contact-page">
      <div className="contact-intro">
        <div><p className="eyebrow">Estamos cerca</p><h1>Conversemos</h1><p>Será un gusto ayudarte con una reserva, evento o consulta.</p></div>
        <div className="contact-details">
          <article><Icon name="pin" /><div><span>Visítanos</span><p>Jr. 28 de Julio 178<br />Centro Histórico, Ayacucho</p></div></article>
          <article><Icon name="phone" /><div><span>Llámanos</span><p>+51 966 123 456<br />hola@sukre.pe</p></div></article>
          <article><Icon name="clock" /><div><span>Horario</span><p>Lun–Sáb · 12:00 a 22:30<br />Dom · 12:00 a 17:00</p></div></article>
        </div>
      </div>
      <section className="contact-form-wrap">
        {sent ? <div className="success-message dark"><div><Icon name="check" size={30} /></div><h3>Mensaje enviado</h3><p>Gracias por escribirnos. Te responderemos muy pronto.</p></div> :
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <h2>Escríbenos</h2>
          <label><span>Nombre</span><input required placeholder="Tu nombre" /></label>
          <label><span>Correo</span><input required type="email" placeholder="nombre@correo.com" /></label>
          <label><span>Asunto</span><select defaultValue=""><option value="" disabled>Selecciona un motivo</option><option>Consulta general</option><option>Eventos privados</option><option>Reserva</option></select></label>
          <label><span>Mensaje</span><textarea required rows={5} placeholder="Cuéntanos cómo podemos ayudarte" /></label>
          <button className="primary-button">Enviar mensaje <Icon name="arrow" /></button>
        </form>}
      </section>
    </main>
  );
}

function DeliveryModal({
  open,
  close,
  cart,
  add,
  remove,
}: {
  open: boolean;
  close: () => void;
  cart: Record<string, number>;
  add: (d: Dish) => void;
  remove: (d: Dish) => void;
}) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Todos");
  const items = dishes.filter((dish) => dish.price !== undefined && cart[dish.id]);
  const total = items.reduce((sum, dish) => sum + dish.price * cart[dish.id], 0);
  useEffect(() => { if (!open) setStep(1); }, [open]);
  if (!open) return null;
  const visible = category === "Todos" ? dishes : dishes.filter((dish) => dish.category === category);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Pedido delivery">
      <div className="delivery-modal">
        <header className="modal-header">
          <div><img className="modal-logo" src={logo} alt="Sukre" /><div><strong>Delivery Sukre</strong><p>{step === 1 ? "Consulta la carta" : step === 2 ? "Datos de entrega" : step === 3 ? "Método de pago" : "Pedido confirmado"}</p></div></div>
          <div className="steps"><span className={step >= 1 ? "active" : ""}>1</span><i /><span className={step >= 2 ? "active" : ""}>2</span><i /><span className={step >= 3 ? "active" : ""}>3</span></div>
          <button className="icon-button" onClick={close} aria-label="Cerrar"><Icon name="close" /></button>
        </header>
        {step === 1 && <div className="delivery-body">
          <section className="delivery-menu">
            <p className="delivery-paused-notice">Los pedidos están disponibles para los platos con precio publicado. Estamos completando la información de bebidas.</p>
            <div className="delivery-categories">{["Todos", ...menuCategories].map(cat => <button onClick={() => setCategory(cat)} className={category === cat ? "active" : ""} key={cat}>{cat}</button>)}</div>
            <div className="delivery-list">{visible.map(dish => <article key={dish.id}><div><span>{dish.category}</span><h3>{dish.name}</h3>{dish.group && <p>{dish.group}</p>}{dish.description && <p>{dish.description}</p>}<strong>{dish.price !== undefined ? `S/ ${dish.price.toFixed(2)}` : "Precio por confirmar"}</strong></div><button className="add-button" onClick={() => add(dish)} disabled={dish.price === undefined}><Icon name="plus" size={17} /> {dish.price !== undefined ? "Agregar" : "No disponible"}</button></article>)}</div>
          </section>
          <aside className="cart-panel"><h2>Tu pedido <span>{items.reduce((sum, dish) => sum + cart[dish.id], 0)}</span></h2>
            {items.length === 0 ? <div className="empty-cart"><Icon name="bag" size={28} /><p>Tu carrito está vacío</p><span>Agrega platos con precio publicado.</span></div> :
              <div className="cart-items">{items.map(dish => <div className="cart-item" key={dish.id}><div><h4>{dish.name}</h4><span>S/ {(dish.price * cart[dish.id]).toFixed(2)}</span></div><div className="quantity"><button onClick={() => remove(dish)}><Icon name="minus" size={14} /></button><span>{cart[dish.id]}</span><button onClick={() => add(dish)}><Icon name="plus" size={14} /></button></div></div>)}</div>}
            <div className="cart-total"><div><span>Subtotal</span><strong>S/ {total.toFixed(2)}</strong></div><div><span>Envío</span><strong>{total ? "S/ 6.00" : "—"}</strong></div><div className="total"><span>Total</span><strong>S/ {total ? (total + 6).toFixed(2) : "0.00"}</strong></div><button disabled={!total} className="primary-button" onClick={() => setStep(2)}>Continuar <Icon name="arrow" /></button></div>
          </aside>
        </div>}
        {step === 2 && <form className="checkout-step" onSubmit={e => { e.preventDefault(); setStep(3); }}><div className="checkout-title"><span>02</span><div><p>Llevamos Sukre a tu mesa</p><h2>Datos de entrega</h2></div></div><div className="checkout-fields"><label><span>Nombre completo</span><input required placeholder="Tu nombre" /></label><label><span>Teléfono</span><input required placeholder="+51 999 999 999" /></label><label className="wide"><span>Dirección</span><input required placeholder="Calle, número y distrito" /></label><label className="wide"><span>Referencia</span><input placeholder="Piso, puerta o referencia cercana" /></label></div><div className="checkout-footer"><button type="button" className="text-button" onClick={() => setStep(1)}>Volver al pedido</button><div><span>Total · S/ {total + 6}</span><button className="primary-button">Ir al pago <Icon name="arrow" /></button></div></div></form>}
        {step === 3 && <form className="checkout-step" onSubmit={e => { e.preventDefault(); setStep(4); }}><div className="checkout-title"><span>03</span><div><p>Pago seguro</p><h2>Elige cómo pagar</h2></div></div><div className="payment-options"><label><input type="radio" name="payment" defaultChecked /><span><strong>Tarjeta de crédito o débito</strong><small>Visa · Mastercard · Amex</small></span></label><label><input type="radio" name="payment" /><span><strong>Yape o Plin</strong><small>Pago con código QR</small></span></label></div><div className="card-fields"><label className="wide"><span>Número de tarjeta</span><input placeholder="0000 0000 0000 0000" /></label><label><span>Vencimiento</span><input placeholder="MM / AA" /></label><label><span>CVV</span><input placeholder="123" /></label></div><div className="checkout-footer"><button type="button" className="text-button" onClick={() => setStep(2)}>Volver</button><div><span>Total · S/ {total + 6}</span><button className="primary-button">Pagar pedido <Icon name="arrow" /></button></div></div></form>}
        {step === 4 && <div className="order-success"><div className="success-icon"><Icon name="check" size={40} /></div><p className="eyebrow">Pedido confirmado</p><h2>¡Gracias por elegir Sukre!</h2><p>Tu pedido <strong>#SKR-2408</strong> ya está en cocina.<br />Llegará aproximadamente en 35–45 minutos.</p><div className="order-summary"><span>Total pagado</span><strong>S/ {total + 6}</strong></div><button className="primary-button" onClick={close}>Volver al inicio</button></div>}
      </div>
    </div>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return <footer><div className="footer-brand"><span className="brand-mark">S</span><strong>SUKRE</strong><p>Cocina ayacuchana contemporánea</p></div><div><span>Explora</span><button onClick={() => setPage("historia")}>Historia</button><button onClick={() => setPage("carta")}>Carta</button><button onClick={() => setPage("reservas")}>Reservas</button></div><div><span>Encuéntranos</span><p>Jr. 28 de Julio 178<br />Centro Histórico<br />Ayacucho, Perú</p></div><div><span>Reservas</span><p>+51 966 123 456<br />hola@sukre.pe</p></div><small>© 2025 Sukre Restaurante. Ayacucho, Perú.</small></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>("historia");
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const add = (dish: Dish) => {
    if (dish.price === undefined) return;
    setCart(current => ({ ...current, [dish.id]: (current[dish.id] || 0) + 1 }));
  };
  const remove = (dish: Dish) => setCart(current => {
    const next = { ...current };
    if ((next[dish.id] || 0) <= 1) delete next[dish.id]; else next[dish.id] -= 1;
    return next;
  });
  const pageContent = useMemo(() => {
    if (page === "carta") return <MenuPage />;
    if (page === "reservas") return <ReservationsPage />;
    if (page === "contacto") return <ContactPage />;
    return <HistoryPage setPage={setPage} openDelivery={() => setDeliveryOpen(true)} />;
  }, [page]);
  return <><Header page={page} setPage={setPage} openDelivery={() => setDeliveryOpen(true)} />{pageContent}<Footer setPage={setPage} /><DeliveryModal open={deliveryOpen} close={() => setDeliveryOpen(false)} cart={cart} add={add} remove={remove} /></>;
}

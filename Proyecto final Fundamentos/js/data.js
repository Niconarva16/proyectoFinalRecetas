const recetas = [
  {
    nombre: "Pasta Carbonara",
    categoria: "Italiana",
    imagen: "images/carbonara.jpg", 
    precio: 25000,
    codigo: "PasCa202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["huevo", "panceta", "queso"]
  },
  
  {
    nombre: "Pizza Margherita",
    categoria: "Italiana",
    imagen: "images/pizza margarita.jpg", 
    precio: 30000,
    codigo: "PizMa202",
    tiempoPreparacion: "45 mins",
    ingredientes: ["masa", "tomate", "mozzarella"]
  },
  
  {
    nombre: "Tacos al Pastor",
    categoria: "Mexicana",
    imagen: "images/tacosalPastor.jpg", 
    precio: 15000,
    codigo: "TacAl202",
    tiempoPreparacion: "20 mins",
    ingredientes: ["carne", "tortilla", "piña"]
  },
  
  {
    nombre: "Sushi",
    categoria: "Japonesa",
    imagen: "images/sushi.jpg", 
    precio: 50000,
    codigo: "Sus202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["arroz", "pescado", "alga"]
  },
  
  {
    nombre: "Paella",
    categoria: "Española",
    imagen: "images/paella.jpg", 
    precio: 40000,
    codigo: "Pae202",
    tiempoPreparacion: "90 mins",
    ingredientes: ["arroz", "mariscos", "azafrán"]
  },
  
  {
    nombre: "Ceviche",
    categoria: "Peruana",
    imagen: "images/ceviche.jpg", 
    precio: 20000,
    codigo: "Cev202",
    tiempoPreparacion: "15 mins",
    ingredientes: ["pescado", "limón", "cebolla"]
  },
  
  {
    nombre: "Falafel",
    categoria: "Mediterránea",
    imagen: "images/falafel.jpg", 
    precio: 12000,
    codigo: "Fal202",
    tiempoPreparacion: "25 mins",
    ingredientes: ["garbanzos", "especias", "pan pita"]
  },
  
  {
    nombre: "Biryani",
    categoria: "India",
    imagen: "images/biryani.jpg", 
    precio: 35000,
    codigo: "Bir202",
    tiempoPreparacion: "75 mins",
    ingredientes: ["arroz", "pollo", "especias"]
  },
  
  {
    nombre: "Baklava",
    categoria: "Turca",
    imagen: "images/baklava.jpg", 
    precio: 15000,
    codigo: "Bak202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["masa filo", "nueces", "miel"]
  },
  
  {
    nombre: "Chili con Carne",
    categoria: "Americana",
    imagen: "images/chili con carne.jpg", 
    precio: 22000,
    codigo: "ChCa202",
    tiempoPreparacion: "40 mins",
    ingredientes: ["carne molida", "frijoles", "chile"]
  },

  {
    nombre: "Ramen",
    categoria: "Japonesa",
    imagen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", 
    precio: 30000,
    codigo: "Ram202",
    tiempoPreparacion: "50 mins",
    ingredientes: ["fideos", "caldo", "verduras"]
  },
  
  {
    nombre: "Goulash",
    categoria: "Húngara",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", 
    precio: 28000,
    codigo: "Gou202",
    tiempoPreparacion: "70 mins",
    ingredientes: ["carne", "papas", "pimientos"]
  },
  
  {
    nombre: "Poutine",
    categoria: "Canadiense",
    imagen: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop", 
    precio: 18000,
    codigo: "Pou202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["papas fritas", "queso", "salsa gravy"]
  },
  
  {
    nombre: "Borscht",
    categoria: "Rusa",
    imagen: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop", 
    precio: 22000,
    codigo: "Bor202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["remolacha", "carne", "crema agria"]
  },
  
  {
    nombre: "Bratwurst",
    categoria: "Alemana",
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "Bra202",
    tiempoPreparacion: "40 mins",
    ingredientes: ["salchicha", "pan", "mostaza"]
  },
  
  {
    nombre: "Kebab",
    categoria: "Turca",
    imagen: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop", 
    precio: 25000,
    codigo: "Keb202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["carne", "pan pita", "salsas"]
  },
  
  {
    nombre: "Tortilla Española",
    categoria: "Española",
    imagen: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop", 
    precio: 12000,
    codigo: "Tor202",
    tiempoPreparacion: "20 mins",
    ingredientes: ["huevo", "papas", "cebolla"]
  },
  
  {
    nombre: "Pho",
    categoria: "Vietnamita",
    imagen: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop", 
    precio: 25000,
    codigo: "Pho202",
    tiempoPreparacion: "45 mins",
    ingredientes: ["fideos", "caldo", "hierbas"]
  },
  
  {
    nombre: "Bakso",
    categoria: "Indonesa",
    imagen: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "BakSo202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["albóndigas", "fideos", "sopa"]
  },
  
  {
    nombre: "Kimchi Jjigae",
    categoria: "Coreana",
    imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", 
    precio: 22000,
    codigo: "KimJj202",
    tiempoPreparacion: "50 mins",
    ingredientes: ["kimchi", "tofu", "cerdo"]
  },
  
  {
    nombre: "Samosa",
    categoria: "India",
    imagen: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", 
    precio: 15000,
    codigo: "Sam202",
    tiempoPreparacion: "40 mins",
    ingredientes: ["masa", "verduras", "especias"]
  },
  
  {
    nombre: "Churros",
    categoria: "Española",
    imagen: "https://images.unsplash.com/photo-1571167106548-85bf82616c16?w=400&h=300&fit=crop", 
    precio: 8000,
    codigo: "Chu202",
    tiempoPreparacion: "25 mins",
    ingredientes: ["masa", "azúcar", "canela"]
  },
  
  {
    nombre: "Pavlova",
    categoria: "Australiana",
    imagen: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop", 
    precio: 12000,
    codigo: "Pav202",
    tiempoPreparacion: "90 mins",
    ingredientes: ["merengue", "frutas", "nata"]
  },
  
  {
    nombre: "Tiramisu",
    categoria: "Italiana",
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "Tir202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["café", "queso mascarpone", "bizcochos"]
  },
  
  {
    nombre: "Panna Cotta",
    categoria: "Italiana",
    imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop", 
    precio: 18000,
    codigo: "Pan202",
    tiempoPreparacion: "45 mins",
    ingredientes: ["nata", "azúcar", "gelatina"]
  },
  
  {
    nombre: "Mousse de Chocolate",
    categoria: "Francesa",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", 
    precio: 15000,
    codigo: "Mou202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["chocolate", "nata", "huevo"]
  },
  
  {
    nombre: "Crêpes Suzette",
    categoria: "Francesa",
    imagen: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "Cre202",
    tiempoPreparacion: "50 mins",
    ingredientes: ["masa", "naranja", "mantequilla"]
  },
  
  {
    nombre: "Flan",
    categoria: "Mexicana",
    imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", 
    precio: 10000,
    codigo: "Fla202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["huevo", "leche", "caramelo"]
  },
  
  {
    nombre: "Gelato",
    categoria: "Italiana",
    imagen: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop", 
    precio: 12000,
    codigo: "Gel202",
    tiempoPreparacion: "180 mins",
    ingredientes: ["leche", "azúcar", "sabores"]
  },
  
  {
    nombre: "Empanadas",
    categoria: "Latina",
    imagen: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", 
    precio: 10000,
    codigo: "Emp202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["masa", "carne", "especias"]
  },
  
  {
    nombre: "Pad Thai",
    categoria: "Tailandesa",
    imagen: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop", 
    precio: 25000,
    codigo: "Pad202",
    tiempoPreparacion: "40 mins",
    ingredientes: ["fideos", "maní", "salsa tamarindo"]
  },
  
  {
    nombre: "Croissant",
    categoria: "Francesa",
    imagen: "https://images.unsplash.com/photo-1555507036-ab794f4ade1d?w=400&h=300&fit=crop", 
    precio: 8000,
    codigo: "Cro202",
    tiempoPreparacion: "120 mins",
    ingredientes: ["masa", "mantequilla", "huevo"]
  },
  
  {
    nombre: "Arepas",
    categoria: "Latina",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", 
    precio: 5000,
    codigo: "Are202",
    tiempoPreparacion: "20 mins",
    ingredientes: ["harina de maíz", "queso", "mantequilla"]
  },
  
  {
    nombre: "Pierogi",
    categoria: "Polaca",
    imagen: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop", 
    precio: 15000,
    codigo: "Pie202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["masa", "papas", "queso"]
  },
  
  {
    nombre: "Shakshuka",
    categoria: "Mediterránea",
    imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", 
    precio: 18000,
    codigo: "Sha202",
    tiempoPreparacion: "35 mins",
    ingredientes: ["huevo", "tomate", "especias"]
  },
  
  {
    nombre: "Bibimbap",
    categoria: "Coreana",
    imagen: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop", 
    precio: 22000,
    codigo: "Bib202",
    tiempoPreparacion: "50 mins",
    ingredientes: ["arroz", "verduras", "huevo"]
  },
  
  {
    nombre: "Gyoza",
    categoria: "Japonesa",
    imagen: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop", 
    precio: 15000,
    codigo: "Gyo202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["masa", "carne", "especias"]
  },
  
  {
    nombre: "Ratatouille",
    categoria: "Francesa",
    imagen: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "Rat202",
    tiempoPreparacion: "60 mins",
    ingredientes: ["berenjena", "calabacín", "tomate"]
  },
  
  {
    nombre: "Tamales",
    categoria: "Latina",
    imagen: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop", 
    precio: 12000,
    codigo: "Tam202",
    tiempoPreparacion: "120 mins",
    ingredientes: ["masa", "carne", "hoja de plátano"]
  },
  
  {
    nombre: "Clam Chowder",
    categoria: "Americana",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", 
    precio: 25000,
    codigo: "Cla202",
    tiempoPreparacion: "45 mins",
    ingredientes: ["almejas", "papa", "crema"]
  },
  
  {
    nombre: "Chow Mein",
    categoria: "China",
    imagen: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop", 
    precio: 20000,
    codigo: "Cho202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["fideos", "pollo", "verduras"]
  },
  
  {
    nombre: "Curry Verde",
    categoria: "Tailandesa",
    imagen: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop", 
    precio: 28000,
    codigo: "Cur202",
    tiempoPreparacion: "50 mins",
    ingredientes: ["curry verde", "pollo", "leche de coco"]
  },
  
  {
    nombre: "Poke Bowl",
    categoria: "Hawaiana",
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", 
    precio: 30000,
    codigo: "Pok202",
    tiempoPreparacion: "25 mins",
    ingredientes: ["arroz", "pescado", "aguacate"]
  },
  
  {
    nombre: "Fondue",
    categoria: "Suiza",
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", 
    precio: 35000,
    codigo: "Fon202",
    tiempoPreparacion: "30 mins",
    ingredientes: ["queso", "vino blanco", "pan"]
  },
  
  {
    nombre: "Moussaka",
    categoria: "Griega",
    imagen: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop", 
    precio: 25000,
    codigo: "Mou202",
    tiempoPreparacion: "90 mins",
    ingredientes: ["berenjena", "carne", "queso"]
  },
  
  {
    nombre: "Gazpacho",
    categoria: "Española",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", 
    precio: 15000,
    codigo: "Gaz202",
    tiempoPreparacion: "20 mins",
    ingredientes: ["tomate", "pepino", "pimiento"]
  },
  
  {
    nombre: "Churro Ice Cream Sandwich",
    categoria: "Fusión",
    imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", 
    precio: 18000,
    codigo: "ChuIce202",
    tiempoPreparacion: "40 mins",
    ingredientes: ["churros", "helado", "chocolate"]
  }
];
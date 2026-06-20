require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Recipe = require('./models/Recipe');

const sampleRecipes = [
  {
    title: "Masala Dosa",
    ingredients: ["2 cups rice", "1/2 cup urad dal", "1/4 tsp fenugreek seeds", "3 large potatoes, boiled and mashed", "1 onion, sliced", "1/2 tsp mustard seeds", "1/2 tsp turmeric powder", "Curry leaves", "Oil", "Salt"],
    instructions: "1. Soak rice, dal, and fenugreek for 6 hours. Grind into a smooth batter and ferment overnight.\n2. Heat oil, splutter mustard seeds, add curry leaves and onions. Sauté until translucent.\n3. Add turmeric, mashed potatoes, and salt. Mix well to make the masala filling.\n4. Heat a tawa, pour a ladle of batter, and spread it in a thin circle.\n5. Drizzle oil and cook until crispy. Place potato masala in the center and fold.\n6. Serve hot with coconut chutney and sambar.",
    cookingTime: 30,
    servings: 4
  },
  {
    title: "Idli and Sambar",
    ingredients: ["2 cups idli rice", "1/2 cup urad dal", "1 cup toor dal", "Mixed vegetables (drumstick, carrots, beans)", "2 tbsp sambar powder", "1 lemon-sized tamarind", "Mustard seeds", "Curry leaves", "Coriander leaves"],
    instructions: "1. Grind soaked rice and dal separately, mix, and ferment overnight to make idli batter.\n2. Pour batter into idli molds and steam for 10-12 minutes until soft.\n3. Pressure cook toor dal with vegetables until soft.\n4. Extract tamarind juice and boil it with sambar powder, salt, and water.\n5. Add the cooked dal and vegetables. Simmer for 10 minutes.\n6. Temper mustard seeds and curry leaves in oil, pour over sambar, and garnish with coriander.",
    cookingTime: 40,
    servings: 4
  },
  {
    title: "Hyderabadi Chicken Biryani",
    ingredients: ["500g basmati rice", "500g chicken, bone-in", "1 cup yogurt", "2 onions, thinly sliced and fried", "2 tbsp biryani masala", "Ginger-garlic paste", "Mint and coriander leaves", "Saffron soaked in milk", "Ghee", "Whole spices (cloves, cardamom, cinnamon)"],
    instructions: "1. Marinate chicken with yogurt, biryani masala, ginger-garlic paste, mint, and half the fried onions for at least 2 hours.\n2. Boil rice with whole spices until 70% cooked. Drain water.\n3. In a heavy-bottomed pot, layer the marinated chicken at the bottom.\n4. Cover with the par-boiled rice.\n5. Top with remaining fried onions, saffron milk, and ghee.\n6. Seal the pot with dough or foil and cook on dum (low heat) for 30 minutes.",
    cookingTime: 60,
    servings: 5
  },
  {
    title: "Medu Vada",
    ingredients: ["1 cup urad dal", "1 green chili, chopped", "1/2 inch ginger, finely chopped", "Curry leaves", "Pinch of asafoetida (hing)", "1 tsp black peppercorns, crushed", "Salt", "Oil for deep frying"],
    instructions: "1. Wash and soak urad dal for 3-4 hours.\n2. Grind the dal with very little water to a thick, fluffy batter.\n3. Mix in chopped green chili, ginger, curry leaves, hing, crushed pepper, and salt.\n4. Heat oil in a deep frying pan.\n5. Wet your hands, take a portion of batter, make a hole in the center, and carefully drop it into the hot oil.\n6. Fry on medium heat until golden brown and crispy on both sides.",
    cookingTime: 30,
    servings: 4
  },
  {
    title: "Kerala Fish Curry (Meen Curry)",
    ingredients: ["500g firm fish pieces (seer fish or kingfish)", "1 cup grated coconut", "3 dry red chilies", "1/2 tsp turmeric powder", "1 tsp coriander powder", "Kudampuli (Malabar tamarind)", "Shallots", "Curry leaves", "Coconut oil"],
    instructions: "1. Soak kudampuli in warm water for 15 minutes.\n2. Grind grated coconut, red chilies, turmeric, and coriander into a smooth paste.\n3. Heat coconut oil in a clay pot. Sauté chopped shallots and curry leaves.\n4. Pour in the coconut paste, soaked kudampuli with its water, and salt. Bring to a boil.\n5. Gently slide in the fish pieces. Cover and cook on low heat until fish is cooked through and gravy thickens.\n6. Drizzle a little fresh coconut oil and curry leaves before serving.",
    cookingTime: 35,
    servings: 4
  },
  {
    title: "Ven Pongal",
    ingredients: ["1 cup raw rice", "1/2 cup moong dal (yellow lentils)", "2 tbsp ghee", "1 tsp cumin seeds", "1 tsp black peppercorns", "1 inch ginger, chopped", "Curry leaves", "Cashew nuts", "Salt"],
    instructions: "1. Dry roast the moong dal lightly until fragrant.\n2. Wash rice and roasted dal together. Pressure cook with 4.5 cups of water and salt until mushy (about 4-5 whistles).\n3. Mash the cooked rice and dal mixture well.\n4. In a small pan, heat ghee. Add cumin seeds, black peppercorns, ginger, and cashews. Fry until cashews are golden.\n5. Add curry leaves and pour this tempering over the mashed pongal.\n6. Mix well and serve hot with sambar and coconut chutney.",
    cookingTime: 25,
    servings: 3
  },
  {
    title: "Chettinad Chicken",
    ingredients: ["500g chicken, cut into pieces", "3 dry red chilies", "1 tbsp coriander seeds", "1 tsp fennel seeds", "1 tsp cumin seeds", "1/2 tsp black peppercorns", "1 star anise", "1 cup shallots, chopped", "1 tomato, chopped", "Curry leaves", "Oil"],
    instructions: "1. Dry roast red chilies, coriander seeds, fennel, cumin, peppercorns, and star anise. Grind to a fine powder (Chettinad masala).\n2. Heat oil in a pan, add fennel seeds and curry leaves.\n3. Sauté shallots until golden brown, then add ginger-garlic paste and tomatoes.\n4. Add the chicken pieces and cook until they turn opaque.\n5. Add the freshly ground Chettinad masala and salt. Mix well.\n6. Add half a cup of water, cover, and cook until chicken is tender and oil separates.",
    cookingTime: 40,
    servings: 4
  },
  {
    title: "Appam with Vegetable Stew",
    ingredients: ["2 cups raw rice", "1/2 cup cooked rice", "1/2 cup grated coconut", "1/2 tsp dry yeast", "1 tsp sugar", "Mixed vegetables (carrots, potatoes, peas) for stew", "1 cup thick coconut milk", "2 cups thin coconut milk", "Green chilies", "Ginger", "Whole spices"],
    instructions: "1. Soak rice for 4 hours. Grind with cooked rice, grated coconut, and yeast into a smooth batter. Ferment overnight.\n2. Pour a ladle of batter into an appachatti (appam pan), swirl to coat the edges, cover and cook until edges are crisp and center is soft.\n3. For stew: Heat oil, add whole spices, sliced onions, ginger, and green chilies. Sauté lightly.\n4. Add vegetables and thin coconut milk. Simmer until vegetables are cooked.\n5. Lower the heat, pour in thick coconut milk, heat gently without boiling.\n6. Serve soft appams with the creamy vegetable stew.",
    cookingTime: 45,
    servings: 4
  },
  {
    title: "Bisi Bele Bath",
    ingredients: ["1 cup rice", "1/2 cup toor dal", "Mixed vegetables (carrots, beans, peas, potatoes)", "1 lemon-sized tamarind", "2 tbsp Bisi Bele Bath powder", "Jaggery (small piece)", "Ghee", "Mustard seeds", "Cashews", "Curry leaves"],
    instructions: "1. Pressure cook rice, dal, and vegetables together with turmeric and water until very soft.\n2. Extract tamarind juice and boil it with Bisi Bele Bath powder, jaggery, and salt until raw smell disappears.\n3. Add the tamarind mixture to the cooked rice and dal. Mix well, adding hot water if it is too thick.\n4. Simmer for 5 minutes on low heat.\n5. Heat ghee in a pan, temper with mustard seeds, curry leaves, and cashews.\n6. Pour tempering over the Bisi Bele Bath and serve hot with potato chips or boondi.",
    cookingTime: 40,
    servings: 4
  },
  {
    title: "Lemon Rice (Chitranna)",
    ingredients: ["2 cups cooked rice (cooled)", "Juice of 2 lemons", "2 tbsp oil", "1 tsp mustard seeds", "1 tbsp chana dal", "1 tbsp urad dal", "1/4 cup peanuts", "2 green chilies, slit", "1/2 tsp turmeric powder", "Curry leaves", "Salt"],
    instructions: "1. Spread cooked rice on a wide plate to cool completely so grains remain separate.\n2. Heat oil in a pan. Add mustard seeds and let them splutter.\n3. Add chana dal, urad dal, and peanuts. Fry until peanuts are roasted and dals turn golden.\n4. Add green chilies, curry leaves, and turmeric powder. Sauté for a few seconds.\n5. Turn off the heat. Pour the lemon juice and add salt. Mix well.\n6. Pour this tempering over the cooled rice and mix gently until uniformly yellow.",
    cookingTime: 15,
    servings: 3
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('Inserting 10 South Indian dishes...');
    await Recipe.insertMany(sampleRecipes);
    
    console.log('South Indian dishes seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
};

seedData();

// ========== HypeLooT - Albion Online Cooking App ==========
let currentLang = 'es';

// TRANSLATIONS
const UI_TEXT = {
    es: {
        tabWiki: "Cocina - Wiki", tabPL: "Power Level / Study",
        lblCategory: "Tipo de Comida", lblRecipe: "Receta", lblEnchant: "Encantamiento",
        optSelectCat: "-- Selecciona --", optSelectRecipe: "-- Selecciona tipo primero --",
        lblIngredients: "Ingredientes Necesarios", lblEnchantVariants: "Variantes de Encantamiento",
        placeholderText: "Selecciona un tipo de comida y una receta para ver los ingredientes",
        enchNormal: "Sin encantamiento", ench1: "Encantamiento 1", ench2: "Encantamiento 2", ench3: "Encantamiento 3",
        noSauce: "Sin salsa",
        plTitle: "Calculadora Power Level / Study",
        plDesc: "Calcula cuantos items necesitas estudiar para subir tu especializacion de cocina",
        plLblFood: "Comida a estudiar", plLblEnchant: "Encantamiento",
        plLblFrom: "Nivel actual", plLblTo: "Nivel objetivo",
        plLblPrice: "Precio por unidad (silver)", plCalcBtn: "Calcular",
        plResFood: "Comida", plResFameItem: "Fama por item (study)",
        plResFameTotal: "Fama total necesaria", plResQty: "Cantidad de items", plResPrice: "Precio total"
    },
    en: {
        tabWiki: "Cooking - Wiki", tabPL: "Power Level / Study",
        lblCategory: "Food Type", lblRecipe: "Recipe", lblEnchant: "Enchantment",
        optSelectCat: "-- Select --", optSelectRecipe: "-- Select type first --",
        lblIngredients: "Required Ingredients", lblEnchantVariants: "Enchantment Variants",
        placeholderText: "Select a food type and recipe to see ingredients",
        enchNormal: "No enchantment", ench1: "Enchantment 1", ench2: "Enchantment 2", ench3: "Enchantment 3",
        noSauce: "No sauce",
        plTitle: "Power Level / Study Calculator",
        plDesc: "Calculate how many items you need to study to level up your cooking specialization",
        plLblFood: "Food to study", plLblEnchant: "Enchantment",
        plLblFrom: "Current level", plLblTo: "Target level",
        plLblPrice: "Price per unit (silver)", plCalcBtn: "Calculate",
        plResFood: "Food", plResFameItem: "Fame per item (study)",
        plResFameTotal: "Total fame needed", plResQty: "Items needed", plResPrice: "Total price"
    }
};

const INGREDIENT_NAMES = {
    es: { "Carrots":"Zanahorias","Wheat":"Trigo","Cabbage":"Col","Beans":"Judias","Turnips":"Nabos","Potatoes":"Patatas","Raw Chicken":"Pollo Crudo","Raw Goose":"Ganso Crudo","Raw Pork":"Cerdo Crudo","Raw Goat":"Cabra Cruda","Raw Mutton":"Cordero Crudo","Raw Beef":"Ternera Cruda","Hen Eggs":"Huevos de Gallina","Goose Eggs":"Huevos de Ganso","Flour":"Harina","Bread":"Pan","Goat's Milk":"Leche de Cabra","Sheep's Milk":"Leche de Oveja","Cow's Milk":"Leche de Vaca","Goat's Butter":"Mantequilla de Cabra","Sheep's Butter":"Mantequilla de Oveja","Cow's Butter":"Mantequilla de Vaca","Bundle of Corn":"Mazorcas de Maiz","Pumpkin":"Calabaza","Avalonian Energy":"Energia Avaloniana","Basic Fish Sauce":"Salsa Pescado Basica","Fancy Fish Sauce":"Salsa Pescado Fina","Special Fish Sauce":"Salsa Pescado Especial" },
    en: {}
};

const CAT_NAMES = {
    es: { soup:"Sopa", salad:"Ensalada", omelette:"Tortilla", pie:"Pastel", stew:"Guiso", sandwich:"Bocadillo", roast:"Asado" },
    en: { soup:"Soup", salad:"Salad", omelette:"Omelette", pie:"Pie", stew:"Stew", sandwich:"Sandwich", roast:"Roast" }
};

function t(key) { return UI_TEXT[currentLang][key] || key; }
function ingName(name) { return (currentLang === 'es' && INGREDIENT_NAMES.es[name]) ? INGREDIENT_NAMES.es[name] : name; }
function recipeName(r) { return currentLang === 'es' ? r.nameEs : r.name; }
function catName(key) { return CAT_NAMES[currentLang][key] || key; }

function setLang(lang) {
    currentLang = lang;
    document.getElementById('btn-es').classList.toggle('active', lang==='es');
    document.getElementById('btn-en').classList.toggle('active', lang==='en');
    updateUI();
}

function updateUI() {
    document.getElementById('tab-wiki-btn').textContent = t('tabWiki');
    document.getElementById('tab-pl-btn').textContent = t('tabPL');
    document.getElementById('lbl-category').textContent = t('lblCategory');
    document.getElementById('lbl-recipe').textContent = t('lblRecipe');
    document.getElementById('lbl-enchant').textContent = t('lblEnchant');
    document.getElementById('lbl-ingredients').textContent = t('lblIngredients');
    document.getElementById('lbl-enchant-variants').textContent = t('lblEnchantVariants');
    document.getElementById('placeholder-text').textContent = t('placeholderText');
    document.getElementById('pl-title').textContent = t('plTitle');
    document.getElementById('pl-desc').textContent = t('plDesc');
    document.getElementById('pl-lbl-food').textContent = t('plLblFood');
    document.getElementById('pl-lbl-enchant').textContent = t('plLblEnchant');
    document.getElementById('pl-lbl-from').textContent = t('plLblFrom');
    document.getElementById('pl-lbl-to').textContent = t('plLblTo');
    document.getElementById('pl-lbl-price').textContent = t('plLblPrice');
    document.getElementById('pl-calc-btn').textContent = t('plCalcBtn');
    document.getElementById('pl-res-food-lbl').textContent = t('plResFood');
    document.getElementById('pl-res-fame-item-lbl').textContent = t('plResFameItem');
    document.getElementById('pl-res-fame-total-lbl').textContent = t('plResFameTotal');
    document.getElementById('pl-res-qty-lbl').textContent = t('plResQty');
    document.getElementById('pl-res-price-lbl').textContent = t('plResPrice');
    // Refresh dropdowns
    populateCategories();
    populatePLFood();
    const recipeId = document.getElementById('recipe-select').value;
    if (recipeId) displayRecipe();
}

// TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// WIKI TAB
const categorySelect = document.getElementById('category-select');
const recipeSelect = document.getElementById('recipe-select');
const enchantSelect = document.getElementById('enchant-select');

function populateCategories() {
    const val = categorySelect.value;
    categorySelect.innerHTML = `<option value="">${t('optSelectCat')}</option>`;
    Object.keys(CATEGORIES).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = catName(key);
        categorySelect.appendChild(opt);
    });
    if (val) categorySelect.value = val;
}

categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    recipeSelect.innerHTML = '';
    if (!category) {
        recipeSelect.disabled = true;
        recipeSelect.innerHTML = `<option value="">${t('optSelectRecipe')}</option>`;
        enchantSelect.disabled = true;
        hideRecipe(); return;
    }
    recipeSelect.disabled = false;
    enchantSelect.disabled = false;
    recipeSelect.innerHTML = `<option value="">${t('optSelectRecipe')}</option>`;
    RECIPES.filter(r => r.category === category).sort((a,b) => a.tier - b.tier).forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = `T${r.tier} - ${recipeName(r)}`;
        recipeSelect.appendChild(opt);
    });
    hideRecipe();
});

recipeSelect.addEventListener('change', displayRecipe);
enchantSelect.addEventListener('change', displayRecipe);

function hideRecipe() {
    document.getElementById('recipe-display').classList.add('hidden');
    document.getElementById('placeholder').classList.remove('hidden');
}

function displayRecipe() {
    const recipeId = recipeSelect.value;
    if (!recipeId) { hideRecipe(); return; }
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;
    const enchant = parseInt(enchantSelect.value);

    document.getElementById('recipe-display').classList.remove('hidden');
    document.getElementById('placeholder').classList.add('hidden');

    const img = document.getElementById('recipe-img');
    img.src = getItemImageUrl(recipe.itemId, enchant).replace('size=64','size=128');
    img.onerror = function() { this.src = getItemImageUrl(recipe.itemId, 0).replace('size=64','size=128'); };

    document.getElementById('recipe-name').textContent = recipeName(recipe);
    document.getElementById('recipe-tier').textContent = `Tier ${recipe.tier}.${enchant} | ${catName(recipe.category)}`;
    document.getElementById('recipe-effect').textContent = recipe.effect;

    const list = document.getElementById('ingredients-list');
    list.innerHTML = '';
    (recipe.ingredients[enchant] || recipe.ingredients[0]).forEach(ing => {
        const card = document.createElement('div');
        card.className = 'ingredient-card';
        card.innerHTML = `<img src="${getItemImageUrl(ing.id, 0)}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect fill=%22%232a2a4a%22 width=%2264%22 height=%2264%22 rx=%228%22/%3E%3Ctext x=%2232%22 y=%2238%22 text-anchor=%22middle%22 fill=%22%23ccff00%22 font-size=%2220%22%3E?%3C/text%3E%3C/svg%3E'"><div class="ingredient-info"><div class="ingredient-name">${ingName(ing.name)}</div><div class="ingredient-qty">x${ing.qty}</div></div>`;
        list.appendChild(card);
    });

    const variants = document.getElementById('enchant-variants');
    variants.innerHTML = '';
    [{l:0,k:'enchNormal'},{l:1,k:'ench1'},{l:2,k:'ench2'},{l:3,k:'ench3'}].forEach(enc => {
        const card = document.createElement('div');
        card.className = `enchant-card ${enc.l===enchant?'active':''}`;
        const ings = recipe.ingredients[enc.l];
        const sauce = ings ? ings.find(i => i.name.includes('Fish Sauce')) : null;
        const sauceText = sauce ? `+ <span>${ingName(sauce.name)}</span> x${sauce.qty}` : `<span>${t('noSauce')}</span>`;
        card.innerHTML = `<div class="enchant-card-header"><img src="${getItemImageUrl(recipe.itemId, enc.l)}" class="enchant-mini-img" onerror="this.style.display='none'"><div class="enchant-card-title">${t(enc.k)}</div></div><div class="enchant-card-sauce">${sauceText}</div>`;
        card.onclick = () => { enchantSelect.value = enc.l; displayRecipe(); };
        variants.appendChild(card);
    });
}

// POWER LEVEL TAB
function populatePLFood() {
    const sel = document.getElementById('pl-food-select');
    const val = sel.value;
    sel.innerHTML = `<option value="">${t('optSelectCat')}</option>`;
    RECIPES.sort((a,b) => a.tier - b.tier).forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = `T${r.tier} ${recipeName(r)} [${catName(r.category)}]`;
        sel.appendChild(opt);
    });
    if (val) sel.value = val;
}

// Fame per craft by tier (base crafting fame for food)
const FAME_PER_CRAFT = { 1: 90, 2: 270, 3: 540, 4: 1080, 5: 2160, 6: 4320, 7: 8640, 8: 17280 };
// Enchantment multiplier
const ENCHANT_FAME_MULT = { 0: 1, 1: 2, 2: 4, 3: 8 };
// Study gives 275% of crafting fame
const STUDY_MULTIPLIER = 2.75;

// Fame required per specialization level (cumulative formula)
// Each level requires: base_fame * level^1.2 (approximation from wiki data)
// Level 1 = ~14424, and it grows. Using known formula approximation.
function fameForLevel(level) {
    if (level <= 0) return 0;
    // Approx: fame_per_level = 14424 * (level / 1)^1.0 -> linear growth simplified
    // More accurate: total fame 0->100 is approx 23,000,000 for standard nodes
    // Per level: starts at ~14424 and increases ~3% each level
    const baseFame = 14424;
    let total = 0;
    for (let i = 1; i <= level; i++) {
        total += Math.floor(baseFame * Math.pow(i / 1, 1.0) * (1 + (i-1) * 0.02));
    }
    return total;
}

function totalFameBetweenLevels(from, to) {
    return fameForLevel(to) - fameForLevel(from);
}

function calculatePowerLevel() {
    const foodId = document.getElementById('pl-food-select').value;
    const enchant = parseInt(document.getElementById('pl-enchant').value);
    const levelFrom = parseInt(document.getElementById('pl-level-from').value) || 0;
    const levelTo = parseInt(document.getElementById('pl-level-to').value) || 100;
    const price = parseInt(document.getElementById('pl-price').value) || 0;

    if (!foodId) { alert(currentLang==='es' ? 'Selecciona una comida' : 'Select a food'); return; }
    if (levelFrom >= levelTo) { alert(currentLang==='es' ? 'El nivel objetivo debe ser mayor' : 'Target level must be higher'); return; }

    const recipe = RECIPES.find(r => r.id === foodId);
    if (!recipe) return;

    const baseFame = FAME_PER_CRAFT[recipe.tier] || 540;
    const famePerItem = Math.floor(baseFame * ENCHANT_FAME_MULT[enchant] * STUDY_MULTIPLIER);
    const totalFame = totalFameBetweenLevels(levelFrom, levelTo);
    const itemsNeeded = Math.ceil(totalFame / famePerItem);
    const totalPrice = itemsNeeded * price;

    document.getElementById('pl-results').classList.remove('hidden');
    document.getElementById('pl-res-food').textContent = recipeName(recipe);
    document.getElementById('pl-res-fame-item').textContent = famePerItem.toLocaleString();
    document.getElementById('pl-res-fame-total').textContent = totalFame.toLocaleString();
    document.getElementById('pl-res-qty').textContent = itemsNeeded.toLocaleString();
    document.getElementById('pl-res-price').textContent = price > 0 ? totalPrice.toLocaleString() + ' silver' : '-';
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    populatePLFood();
});

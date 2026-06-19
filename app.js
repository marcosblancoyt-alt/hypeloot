// ========== HypeLooT - Albion Online Cooking App ==========
let currentLang = 'es';

const UI_TEXT = {
    es: {
        tabWiki: "Cocina", tabPL: "Power Level / Study",
        lblCategory: "Tipo de Comida", lblRecipe: "Receta", lblEnchant: "Encantamiento",
        optSelectCat: "-- Selecciona --", optSelectRecipe: "-- Selecciona tipo primero --",
        lblIngredients: "Ingredientes Necesarios", lblEnchantVariants: "Variantes de Encantamiento",
        placeholderText: "Selecciona un tipo de comida y una receta para ver los ingredientes",
        enchNormal: "Sin encantamiento", ench1: "Encantamiento 1", ench2: "Encantamiento 2", ench3: "Encantamiento 3",
        noSauce: "Sin salsa",
        plTitle: "Power Level de Cocina",
        plDesc: "Calcula cuantos items necesitas estudiar para subir tu especializacion",
        plLblMastery: "Especialidad", plLblLevelFrom: "Nivel Actual",
        plLblFamaCurrent: "Fama Actual", plLblLevelTo: "Nivel Meta",
        plStation: "Estacion", plCalcBtn: "Calcular",
        plColReceta: "Receta", plColPrecio: "Precio", plColCostoEstudio: "Costo de Estudio",
        plColPlataFama: "Plata/Fama", plColRestantes: "Restantes", plColCostoTotal: "Costo Total",
        plFamaReq: "Fama Requerida"
    },
    en: {
        tabWiki: "Cooking", tabPL: "Power Level / Study",
        lblCategory: "Food Type", lblRecipe: "Recipe", lblEnchant: "Enchantment",
        optSelectCat: "-- Select --", optSelectRecipe: "-- Select type first --",
        lblIngredients: "Required Ingredients", lblEnchantVariants: "Enchantment Variants",
        placeholderText: "Select a food type and recipe to see ingredients",
        enchNormal: "No enchantment", ench1: "Enchantment 1", ench2: "Enchantment 2", ench3: "Enchantment 3",
        noSauce: "No sauce",
        plTitle: "Cooking Power Level",
        plDesc: "Calculate how many items you need to study to level your specialization",
        plLblMastery: "Specialization", plLblLevelFrom: "Current Level",
        plLblFamaCurrent: "Current Fame", plLblLevelTo: "Target Level",
        plStation: "Station", plCalcBtn: "Calculate",
        plColReceta: "Recipe", plColPrecio: "Price", plColCostoEstudio: "Study Cost",
        plColPlataFama: "Silver/Fame", plColRestantes: "Remaining", plColCostoTotal: "Total Cost",
        plFamaReq: "Fame Required"
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

// MASTERY DATA (fama total 0->100)
const MASTERY_FAME = {
    ingrediente: 4032320,
    asados: 4032320,
    guisos: 4032320,
    sopas: 3909508,
    ensaladas: 4032320,
    bocadillo: 4032320,
    pastel: 4032320,
    tortillas: 4032320
};

const MASTERY_NAMES = {
    es: { ingrediente:"Ingrediente", asados:"Asados", guisos:"Guisos", sopas:"Sopas", ensaladas:"Ensaladas", bocadillo:"Bocadillo", pastel:"Pastel", tortillas:"Tortillas" },
    en: { ingrediente:"Ingredient", asados:"Roast", guisos:"Stew", sopas:"Soup", ensaladas:"Salad", bocadillo:"Sandwich", pastel:"Pie", tortillas:"Omelette" }
};

// Study fame per item (from real data)
const STUDY_FAME = {
    "carrot_soup": 23,
    "bean_salad": 23,
    "wheat_soup": 71,
    "chicken_pie": 20,
    "chicken_omelette": 20,
    "roast_chicken": 23,
    "turnip_salad": 71,
    "goat_stew": 23,
    "goat_sandwich": 20,
    "cabbage_soup": 213,
    "goose_pie": 71,
    "goose_omelette": 62,
    "roast_goose": 71,
    "potato_salad": 213,
    "mutton_stew": 71,
    "mutton_sandwich": 62,
    "pork_pie": 213,
    "pork_omelette": 187,
    "roast_pork": 213,
    "beef_stew": 213,
    "beef_sandwich": 213,
    "avalonian_goat_stew": 23,
    "avalonian_beef_stew": 213,
    "avalonian_chicken_omelette": 20
};

// Which mastery each recipe belongs to
const RECIPE_MASTERY = {
    "carrot_soup":"sopas", "wheat_soup":"sopas", "cabbage_soup":"sopas",
    "bean_salad":"ensaladas", "turnip_salad":"ensaladas", "potato_salad":"ensaladas",
    "chicken_omelette":"tortillas", "goose_omelette":"tortillas", "pork_omelette":"tortillas", "avalonian_chicken_omelette":"tortillas",
    "chicken_pie":"pastel", "goose_pie":"pastel", "pork_pie":"pastel",
    "goat_stew":"guisos", "mutton_stew":"guisos", "beef_stew":"guisos", "avalonian_goat_stew":"guisos", "avalonian_beef_stew":"guisos",
    "goat_sandwich":"bocadillo", "mutton_sandwich":"bocadillo", "beef_sandwich":"bocadillo",
    "roast_chicken":"asados", "roast_goose":"asados", "roast_pork":"asados"
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
    document.getElementById('pl-calc-btn').textContent = t('plCalcBtn');
    populateCategories();
    populateMasteries();
    renderPLTable();
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

// ============ WIKI TAB ============
const categorySelect = document.getElementById('category-select');
const recipeSelect = document.getElementById('recipe-select');
const enchantSelect = document.getElementById('enchant-select');

function populateCategories() {
    const val = categorySelect.value;
    categorySelect.innerHTML = `<option value="">${t('optSelectCat')}</option>`;
    Object.keys(CATEGORIES).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key; opt.textContent = catName(key);
        categorySelect.appendChild(opt);
    });
    if (val) categorySelect.value = val;
}

categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    recipeSelect.innerHTML = '';
    if (!category) { recipeSelect.disabled = true; recipeSelect.innerHTML = `<option value="">${t('optSelectRecipe')}</option>`; enchantSelect.disabled = true; hideRecipe(); return; }
    recipeSelect.disabled = false; enchantSelect.disabled = false;
    recipeSelect.innerHTML = `<option value="">${t('optSelectRecipe')}</option>`;
    RECIPES.filter(r => r.category === category).sort((a,b) => a.tier - b.tier).forEach(r => {
        const opt = document.createElement('option'); opt.value = r.id;
        opt.textContent = `T${r.tier} - ${recipeName(r)}`; recipeSelect.appendChild(opt);
    });
    hideRecipe();
});

recipeSelect.addEventListener('change', displayRecipe);
enchantSelect.addEventListener('change', displayRecipe);

function hideRecipe() { document.getElementById('recipe-display').classList.add('hidden'); document.getElementById('placeholder').classList.remove('hidden'); }

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
    const list = document.getElementById('ingredients-list'); list.innerHTML = '';
    (recipe.ingredients[enchant] || recipe.ingredients[0]).forEach(ing => {
        const card = document.createElement('div'); card.className = 'ingredient-card';
        card.innerHTML = `<img src="${getItemImageUrl(ing.id, 0)}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect fill=%22%232a2a4a%22 width=%2264%22 height=%2264%22 rx=%228%22/%3E%3Ctext x=%2232%22 y=%2238%22 text-anchor=%22middle%22 fill=%22%23ccff00%22 font-size=%2220%22%3E?%3C/text%3E%3C/svg%3E'"><div class="ingredient-info"><div class="ingredient-name">${ingName(ing.name)}</div><div class="ingredient-qty">x${ing.qty}</div></div>`;
        list.appendChild(card);
    });
    const variants = document.getElementById('enchant-variants'); variants.innerHTML = '';
    [{l:0,k:'enchNormal'},{l:1,k:'ench1'},{l:2,k:'ench2'},{l:3,k:'ench3'}].forEach(enc => {
        const card = document.createElement('div'); card.className = `enchant-card ${enc.l===enchant?'active':''}`;
        const ings = recipe.ingredients[enc.l]; const sauce = ings ? ings.find(i => i.name.includes('Fish Sauce')) : null;
        const sauceText = sauce ? `+ <span>${ingName(sauce.name)}</span> x${sauce.qty}` : `<span>${t('noSauce')}</span>`;
        card.innerHTML = `<div class="enchant-card-header"><img src="${getItemImageUrl(recipe.itemId, enc.l)}" class="enchant-mini-img" onerror="this.style.display='none'"><div class="enchant-card-title">${t(enc.k)}</div></div><div class="enchant-card-sauce">${sauceText}</div>`;
        card.onclick = () => { enchantSelect.value = enc.l; displayRecipe(); };
        variants.appendChild(card);
    });
}

// ============ POWER LEVEL TAB ============
function populateMasteries() {
    const sel = document.getElementById('pl-mastery-select');
    if (!sel) return;
    const val = sel.value;
    sel.innerHTML = '';
    Object.keys(MASTERY_FAME).forEach((key, i) => {
        const opt = document.createElement('option'); opt.value = key;
        opt.textContent = MASTERY_NAMES[currentLang][key];
        if (i === 0 && !val) opt.selected = true;
        sel.appendChild(opt);
    });
    if (val) sel.value = val;
}

// Map category to mastery key
const CAT_TO_MASTERY = { soup:"sopas", salad:"ensaladas", omelette:"tortillas", pie:"pastel", stew:"guisos", sandwich:"bocadillo", roast:"asados" };

function getRecipesForMastery(mastery) {
    if (mastery === 'ingrediente') return RECIPES; // All recipes
    const catKey = Object.keys(CAT_TO_MASTERY).find(k => CAT_TO_MASTERY[k] === mastery);
    if (!catKey) return RECIPES;
    return RECIPES.filter(r => r.category === catKey);
}

function getFameRequired(mastery, levelFrom, levelTo) {
    const totalFame = MASTERY_FAME[mastery] || 4032320;
    const famePerLevel = totalFame / 100;
    return Math.floor(famePerLevel * (levelTo - levelFrom));
}

// Price storage to preserve values between re-renders
const savedPrices = {};

function renderPLTable() {
    const mastery = document.getElementById('pl-mastery-select') ? document.getElementById('pl-mastery-select').value : 'sopas';
    const levelFrom = parseInt(document.getElementById('pl-level-from') ? document.getElementById('pl-level-from').value : 0) || 0;
    const levelTo = parseInt(document.getElementById('pl-level-to') ? document.getElementById('pl-level-to').value : 100) || 100;
    const fameReq = getFameRequired(mastery, levelFrom, levelTo);

    const fameEl = document.getElementById('pl-fame-req-value');
    if (fameEl) fameEl.textContent = fameReq.toLocaleString();

    const tbody = document.getElementById('pl-table-body');
    if (!tbody) return;
    
    // Save current prices before clearing
    document.querySelectorAll('.price-input').forEach(inp => {
        if (inp.value && parseInt(inp.value) > 0) savedPrices[inp.id] = inp.value;
    });
    
    tbody.innerHTML = '';

    const relevantRecipes = getRecipesForMastery(mastery);

    relevantRecipes.sort((a,b) => a.tier - b.tier).forEach(r => {
        const studyFame = STUDY_FAME[r.id] || 23;
        const savedPrice = savedPrices['price-' + r.id] || 0;
        const price = parseInt(savedPrice) || 0;
        const silverPerFame = price > 0 ? (price / studyFame).toFixed(2) : '-';
        const remaining = Math.ceil(fameReq / studyFame);
        const totalCost = price > 0 ? (remaining * price) : 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="td-recipe"><img src="${getItemImageUrl(r.itemId, 0)}" class="table-img" onerror="this.style.display='none'"> ${recipeName(r)}</td>
            <td><input type="number" class="price-input" id="price-${r.id}" value="${price}" min="0" oninput="savePriceAndUpdate(this)"></td>
            <td>${studyFame}</td>
            <td>${silverPerFame}</td>
            <td>${remaining.toLocaleString()}</td>
            <td>${totalCost > 0 ? totalCost.toLocaleString() : '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function calculatePL() { renderPLTable(); }

function savePriceAndUpdate(el) {
    savedPrices[el.id] = el.value;
    renderPLTable();
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    populateMasteries();
    renderPLTable();

    // Attach events to PL inputs
    const masteryEl = document.getElementById('pl-mastery-select');
    const fromEl = document.getElementById('pl-level-from');
    const toEl = document.getElementById('pl-level-to');
    if (masteryEl) masteryEl.addEventListener('change', renderPLTable);
    if (fromEl) fromEl.addEventListener('change', renderPLTable);
    if (toEl) toEl.addEventListener('change', renderPLTable);
});

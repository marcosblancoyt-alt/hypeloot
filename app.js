// ========== HypeLooT - Albion Online Cooking Calculator ==========
const TRANSLATIONS = {
    "Carrots": "Zanahorias", "Wheat": "Trigo", "Cabbage": "Col", "Beans": "Judias",
    "Turnips": "Nabos", "Potatoes": "Patatas", "Raw Chicken": "Pollo Crudo",
    "Raw Goose": "Ganso Crudo", "Raw Pork": "Cerdo Crudo", "Raw Goat": "Cabra Cruda",
    "Raw Mutton": "Cordero Crudo", "Raw Beef": "Ternera Cruda", "Hen Eggs": "Huevos de Gallina",
    "Goose Eggs": "Huevos de Ganso", "Flour": "Harina", "Bread": "Pan",
    "Goat's Milk": "Leche de Cabra", "Sheep's Milk": "Leche de Oveja", "Cow's Milk": "Leche de Vaca",
    "Goat's Butter": "Mantequilla de Cabra", "Sheep's Butter": "Mantequilla de Oveja",
    "Cow's Butter": "Mantequilla de Vaca", "Bundle of Corn": "Mazorcas de Maiz",
    "Pumpkin": "Calabaza", "Avalonian Energy": "Energia Avaloniana",
    "Basic Fish Sauce": "Salsa de Pescado Basica", "Fancy Fish Sauce": "Salsa de Pescado Fina",
    "Special Fish Sauce": "Salsa de Pescado Especial"
};

const CATEGORY_NAMES_EN = { soup: "Soup", salad: "Salad", omelette: "Omelette", pie: "Pie", stew: "Stew", sandwich: "Sandwich", roast: "Roast" };

function translateIngredient(name) { return TRANSLATIONS[name] || name; }

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category-select');
    const recipeSelect = document.getElementById('recipe-select');
    const enchantSelect = document.getElementById('enchant-select');
    const recipeDisplay = document.getElementById('recipe-display');
    const placeholder = document.getElementById('placeholder');

    Object.entries(CATEGORIES).forEach(([key, cat]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${cat.name} / ${CATEGORY_NAMES_EN[key]}`;
        categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        recipeSelect.innerHTML = '';
        if (!category) {
            recipeSelect.disabled = true;
            recipeSelect.innerHTML = '<option value="">-- Selecciona tipo primero --</option>';
            enchantSelect.disabled = true;
            hideRecipe(); return;
        }
        recipeSelect.disabled = false;
        enchantSelect.disabled = false;
        recipeSelect.innerHTML = '<option value="">-- Selecciona receta --</option>';
        const recipes = RECIPES.filter(r => r.category === category).sort((a, b) => a.tier - b.tier);
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.id;
            option.textContent = `T${recipe.tier} - ${recipe.nameEs} / ${recipe.name}`;
            recipeSelect.appendChild(option);
        });
        hideRecipe();
    });

    recipeSelect.addEventListener('change', () => displayRecipe());
    enchantSelect.addEventListener('change', () => displayRecipe());

    function hideRecipe() {
        recipeDisplay.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }

    function displayRecipe() {
        const recipeId = recipeSelect.value;
        if (!recipeId) { hideRecipe(); return; }
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (!recipe) return;
        const enchant = parseInt(enchantSelect.value);

        recipeDisplay.classList.remove('hidden');
        placeholder.classList.add('hidden');

        const recipeImg = document.getElementById('recipe-img');
        recipeImg.src = getItemImageUrl(recipe.itemId, enchant).replace('size=64', 'size=128');
        recipeImg.alt = recipe.name;
        recipeImg.onerror = function() { this.src = getItemImageUrl(recipe.itemId, 0).replace('size=64', 'size=128'); };

        document.getElementById('recipe-name').innerHTML = `<span class="name-es">${recipe.nameEs}</span><span class="name-en">${recipe.name}</span>`;
        document.getElementById('recipe-tier').textContent = `Tier ${recipe.tier}.${enchant} | ${CATEGORIES[recipe.category].name} / ${CATEGORY_NAMES_EN[recipe.category]}`;
        document.getElementById('recipe-effect').textContent = recipe.effect;

        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        const ingredients = recipe.ingredients[enchant] || recipe.ingredients[0];
        ingredients.forEach(ing => {
            const card = document.createElement('div');
            card.className = 'ingredient-card';
            const nameEs = translateIngredient(ing.name);
            card.innerHTML = `
                <img src="${getItemImageUrl(ing.id, 0)}" alt="${ing.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect fill=%22%232a2a4a%22 width=%2264%22 height=%2264%22 rx=%228%22/%3E%3Ctext x=%2232%22 y=%2238%22 text-anchor=%22middle%22 fill=%22%23ccff00%22 font-size=%2220%22%3E?%3C/text%3E%3C/svg%3E'">
                <div class="ingredient-info">
                    <div class="ingredient-name">${nameEs}</div>
                    <div class="ingredient-name-en">${ing.name}</div>
                    <div class="ingredient-qty">x${ing.qty}</div>
                </div>`;
            ingredientsList.appendChild(card);
        });

        const enchantVariants = document.getElementById('enchant-variants');
        enchantVariants.innerHTML = '';
        const enchantNames = [
            { level: 0, name: "Normal (.0)", nameEs: "Sin encantamiento" },
            { level: 1, name: "Enchantment 1 (.1)", nameEs: "Encantamiento 1" },
            { level: 2, name: "Enchantment 2 (.2)", nameEs: "Encantamiento 2" },
            { level: 3, name: "Enchantment 3 (.3)", nameEs: "Encantamiento 3" }
        ];
        enchantNames.forEach(enc => {
            const card = document.createElement('div');
            card.className = `enchant-card ${enc.level === enchant ? 'active' : ''}`;
            const ings = recipe.ingredients[enc.level];
            const sauceIng = ings ? ings.find(i => i.name.includes('Fish Sauce')) : null;
            let sauceHtml = sauceIng
                ? `<div class="enchant-card-sauce">+ <span>${translateIngredient(sauceIng.name)}</span> x${sauceIng.qty}</div><div class="enchant-card-sauce-en">+ ${sauceIng.name} x${sauceIng.qty}</div>`
                : `<div class="enchant-card-sauce"><span>Sin salsa / No sauce</span></div>`;
            const miniImg = getItemImageUrl(recipe.itemId, enc.level);
            card.innerHTML = `<div class="enchant-card-header"><img src="${miniImg}" alt="" class="enchant-mini-img" onerror="this.style.display='none'"><div><div class="enchant-card-title">${enc.nameEs}</div><div class="enchant-card-title-en">${enc.name}</div></div></div>${sauceHtml}`;
            card.addEventListener('click', () => { enchantSelect.value = enc.level; displayRecipe(); });
            enchantVariants.appendChild(card);
        });
    }
});

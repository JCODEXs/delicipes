//MEAL MATRIX 
// Versión alternativa usando Date.UTC para evitar problemas de zona horaria
export function generateCalendarDaysUTC(count) {
  const dates = [];
  const today = new Date();
  
  // Usar UTC para cálculos consistentes
  const currentYear = today.getUTCFullYear();
  const currentMonth = today.getUTCMonth();
  const currentDate = today.getUTCDate();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.UTC(currentYear, currentMonth, currentDate + i));
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

// Convert "yyyy-mm-dd" to display format "Lun 3" (Spanish) - Corregido
export function formatDateForDisplay(dateString) {
  console.log(dateString, "dateString");
  // Parsear la fecha correctamente considerando zona horaria
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Crear fecha usando hora local (mediodía para evitar problemas de medianoche)
  const date = new Date(year, month - 1, day, 12, 0, 0);
  
  const formatter = new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Usar zona horaria del sistema
  });
  
  let formatted = formatter.format(date);
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  
  // Remove any dot from abbreviation
  formatted = formatted.replace('.', '');
  
  return formatted;
}

// Convert display format "Lun 3" to "yyyy-mm-dd" (for parsing existing data)
export function parseDisplayDateToISO(displayDate) {
  const [dayAbbr, dayNum] = displayDate.replace('.', '').split(' ');
  const dayOfMonth = parseInt(dayNum);
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  // Map Spanish day abbreviations to day numbers (0-6)
  const dayAbbrMap = {
    'Dom': 0, 'Lun': 1, 'Mar': 2, 'Mié': 3, 'Mie': 3,
    'Jue': 4, 'Vie': 5, 'Sáb': 6, 'Sab': 6
  };
  
  const targetDayOfWeek = dayAbbrMap[dayAbbr];
  
  // Try current month
  let date = new Date(currentYear, currentMonth, dayOfMonth);
  
  if (date.getDay() !== targetDayOfWeek) {
    // Try next month
    date = new Date(currentYear, currentMonth + 1, dayOfMonth);
    
    if (date.getDay() !== targetDayOfWeek) {
      // Try previous month
      date = new Date(currentYear, currentMonth - 1, dayOfMonth);
    }
  }
  
  return formatDateToISO(date);
}

// Convert Date object to "yyyy-mm-dd"
export function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

// Convert existing program data to use ISO dates
export function migrateProgramToISODates(programData) {
  const migrated = {
    selectedRecipes: {},
    portions: {},
    ingredientsTotList: programData.ingredientsTotList || []
  };
  
  // Convert selectedRecipes keys
  Object.entries(programData.selectedRecipes || {}).forEach(([displayDate, recipes]) => {
    const isoDate = parseDisplayDateToISO(displayDate);
    migrated.selectedRecipes[isoDate] = recipes;
  });
  
  // Convert portions keys
  Object.entries(programData.portions || {}).forEach(([key, value]) => {
    // Parse old key like "recipeIdVie 5"
    // Find the display date at the end
    const parts = key.split(/(?=[A-Za-z]{3} \d+$)/);
    
    if (parts.length === 2) {
      const [recipeId, displayDate] = parts;
      const isoDate = parseDisplayDateToISO(displayDate);
      const newKey = recipeId + isoDate;
      migrated.portions[newKey] = value;
    } else {
      // Keep as-is if can't parse
      migrated.portions[key] = value;
    }
  });
  
  return migrated;
}

// Filter to keep only today and future dates
export function filterFutureRecipes(programData) {
  const todayISO = formatDateToISO(new Date());
  const newIngredientsTotList = updateIngredientsTotList(programData.ingredientsTotList);
  
  const filteredSelectedRecipes = {};
  const filteredPortions = {};
  
  // Filter selectedRecipes
  Object.entries(programData.selectedRecipes || {}).forEach(([isoDate, recipes]) => {
    if (isoDate >= todayISO) {
      filteredSelectedRecipes[isoDate] = recipes;
      
      // Filter corresponding portions
      Object.entries(programData.portions || {}).forEach(([portionKey, value]) => {
        if (portionKey.includes(isoDate)) {
          filteredPortions[portionKey] = value;
        }
      });
    }
  });
  
  return {
    ...programData,
    ingredientsTotList: newIngredientsTotList,
    selectedRecipes: filteredSelectedRecipes,
    portions: filteredPortions
  };
}

// Create a new program structure with future dates
export function createFutureProgram(template, daysCount = 7) {
  const futureDates = generateCalendarDates(daysCount);
  
  const program = {
    selectedRecipes: {},
    portions: {},
    ingredientsTotList: template.ingredientsTotList || []
  };
  
  // You can initialize with empty arrays or copy from template
  futureDates.forEach(date => {
    // Initialize with empty recipes or copy from template if date matches
    const displayDate = formatDateForDisplay(date);
    
    // Try to find matching date in template
    let recipes = [];
    Object.entries(template.selectedRecipes || {}).forEach(([templateDate, templateRecipes]) => {
      if (formatDateForDisplay(templateDate) === displayDate) {
        recipes = [...templateRecipes];
      }
    });
    
    program.selectedRecipes[date] = recipes;
  });
  
  return program;
}

// Get display version of program (for UI)
export function getDisplayProgram(programData) {
  const displayProgram = {
    selectedRecipes: {},
    portions: {},
    ingredientsTotList: programData.ingredientsTotList || []
  };
  
  // Convert ISO dates to display format
  Object.entries(programData.selectedRecipes || {}).forEach(([isoDate, recipes]) => {
    const displayDate = formatDateForDisplay(isoDate);
    displayProgram.selectedRecipes[displayDate] = recipes;
  });
  
  // Convert portions keys
  Object.entries(programData.portions || {}).forEach(([key, value]) => {
    // Parse key like "recipeId2024-01-05"
    const parts = key.split(/(?=\d{4}-\d{2}-\d{2}$)/);
    
    if (parts.length === 2) {
      const [recipeId, isoDate] = parts;
      const displayDate = formatDateForDisplay(isoDate);
      const newKey = recipeId + displayDate;
      displayProgram.portions[newKey] = value;
    } else {
      displayProgram.portions[key] = value;
    }
  });
  
  return displayProgram;
}
// actulizar el ingredientsTotList
export function updateIngredientsTotList(ingredientsTotList) {
  if (!Array.isArray(ingredientsTotList) || ingredientsTotList.length < 2) {
    return [[], {}];
  }

  const [, dailyTotals] = ingredientsTotList;
  const todayISO = formatDateToISO(new Date());
  
  // Reconstruir desde cero
  const newGlobalTotals = {};
  const newDailyTotals = {};
  
  // Solo procesar días futuros
  Object.entries(dailyTotals).forEach(([date, dayIngredients]) => {
    if (date >= todayISO) {
      newDailyTotals[date] = dayIngredients;
      
      // Acumular en totales globales
      Object.entries(dayIngredients).forEach(([ingredientName, ingredientData]) => {
        if (!newGlobalTotals[ingredientName]) {
          newGlobalTotals[ingredientName] = {
            cantidad: 0,
            precio: 0,
            unidad: ingredientData.unidad || 'und'
          };
        }
        
        newGlobalTotals[ingredientName].cantidad += ingredientData.cantidad || 0;
        newGlobalTotals[ingredientName].precio += ingredientData.precio || 0;
      });
    }
  });
  
  return [newGlobalTotals, newDailyTotals];
}

// Helper: Check if date is in the future
export function isFutureDate(isoDate) {
  const today = formatDateToISO(new Date());
  return isoDate >= today;
}

// Helper: Sort dates chronologically
export function sortProgramByDate(programData) {
  const sortedSelectedRecipes = {};
  const sortedPortions = {};
  
  // Sort selectedRecipes
  const sortedDates = Object.keys(programData.selectedRecipes || {}).sort();
  sortedDates.forEach(date => {
    sortedSelectedRecipes[date] = programData.selectedRecipes[date];
    
    // Sort corresponding portions
    Object.entries(programData.portions || {}).forEach(([key, value]) => {
      if (key.includes(date)) {
        sortedPortions[key] = value;
      }
    });
  });
  
  return {
    ...programData,
    selectedRecipes: sortedSelectedRecipes,
    portions: sortedPortions
  };
}
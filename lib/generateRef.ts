export const generateReference = (type: string, birtday: string) => {
    // 1. Préfixe
    const prefix = type.toUpperCase();

    console.log(birtday);
    
  
    // 2. Date actuelle au format YYYYMM
    const date = new Date();
    const yearMonthDay = new Date(birtday).getFullYear().toString() + new Date(birtday).getMonth().toString().padStart(2, '0') + new Date(birtday).getDay().toString().padStart(2, '0');
  
    // 3. Générer un identifiant unique (par exemple, incrémenté ou aléatoire)
    const uniqueId = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Exemple d'ID aléatoire
  
    // 4. Combiner les éléments
    return `${prefix}_${yearMonthDay}_${uniqueId}`;
  }
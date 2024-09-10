class RecintosZoo {
    constructor() {
      // Definir dados dos recintos
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      // Definir dados dos animais
      this.animais = {
        LEAO: { tamanho: 3, bioma: 'savana' },
        LEOPARDO: { tamanho: 2, bioma: 'savana' },
        CROCODILO: { tamanho: 3, bioma: 'rio' },
        MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
        GAZELA: { tamanho: 2, bioma: 'savana' },
        HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      // Valide o tipo de animal
      if (!this.animais[tipoAnimal]) {
        return { erro: "Animal inválido" };
      }
  
      // Valide a quantidade
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const animal = this.animais[tipoAnimal];
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        if (this.ehAdequadoRecinto(recinto, animal, quantidade)) {
          const espacoOcupado = quantidade * animal.tamanho + this.getEspacoExtra(recinto);
          const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
          if (espacoLivre >= 0) {
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
          }
        }
      }
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: "Não há recinto viável" };
      }
    }
  
    ehAdequadoRecinto(recinto, animal, quantidade) {
      const biomasAdequados = animal.bioma.split(' ou ');
      if (!biomasAdequados.includes(recinto.bioma) && (recinto.bioma !== 'savana e rio' || animal.bioma !== 'savana ou rio')) {
        return false;
      }
  
      // Verificar regras adicionais
      const animaisExistentes = recinto.animaisExistentes;
      const animaisExistem = animaisExistentes.length > 0;
  
      if (animal.tamanho === 1 && animal.bioma.includes('savana') && !animaisExistem && quantidade === 1) {
        return false; // Macacos não podem estar sozinhos
      }
  
      if (animal.bioma.includes('savana') && animal.bioma.includes('rio') && recinto.bioma !== 'savana e rio') {
        return false; // Hipopótamos devem estar em "savana e rio"
      }
  
      if (animal.tamanho === 1 && animaisExistem) {
        const especiesExistentes = animaisExistentes.map(a => a.especie);
        if (especiesExistentes.some(e => e !== tipoAnimal)) {
          return false; // Não pode compartilhar recinto com espécies diferentes
        }
      }
  
      return true;
    }
  
    getEspacoExtra(recinto) {
      const numEspeciesExistentes = new Set(recinto.animaisExistentes.map(a => a.especie)).size;
      return numEspeciesExistentes > 1 ? 1 : 0; // Considera espaço extra se houver mais de uma espécie
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  
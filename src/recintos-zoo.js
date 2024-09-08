class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
  
      this.animaisPermitidos = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      // Validações de entrada
      if (!this.animaisPermitidos[animal]) {
        return { erro: "Animal inválido" };
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const infoAnimal = this.animaisPermitidos[animal];
      const espacoNecessario = infoAnimal.tamanho * quantidade;
  
      const recintosViaveis = this.recintos.filter((recinto) => {
        // Verifica se o bioma é adequado
        if (!infoAnimal.biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
          return false;
        }
  
        // Verifica se o recinto tem espaço suficiente
        const espacoOcupado = recinto.animais.reduce((total, a) => {
          const animalInfo = this.animaisPermitidos[a.especie];
          return total + animalInfo.tamanho * a.quantidade;
        }, 0);
  
        // Se há mais de uma espécie, conta o espaço extra
        const espacoExtra = recinto.animais.length > 0 ? 1 : 0;
        const espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra;
  
        if (espacoDisponivel < espacoNecessario) {
          return false;
        }
  
        // Regras adicionais para carnívoros
        if (infoAnimal.carnivoro && recinto.animais.some(a => a.especie !== animal)) {
          return false;
        }
  
        // Hipopótamos precisam estar em recintos de savana e rio
        if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
          return false;
        }
  
        // Macacos precisam de companhia
        if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) {
          return false;
        }
  
        return true;
      }).map(recinto => {
        const espacoOcupado = recinto.animais.reduce((total, a) => {
          const animalInfo = this.animaisPermitidos[a.especie];
          return total + animalInfo.tamanho * a.quantidade;
        }, 0);
        const espacoExtra = recinto.animais.length > 0 ? 1 : 0;
        const espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra - espacoNecessario;
  
        return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`;
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };

  
const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2)); 

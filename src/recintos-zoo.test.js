import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

   
    
    test('Deve encontrar recinto para 2 crocodilos e 2 macacos', () => {
        let resultadoMacaco = new RecintosZoo().analisaRecintos('MACACO', 2);
        let resultadoCrocodilo = new RecintosZoo().analisaRecintos('CROCODILO', 2);

        expect(resultadoMacaco.erro).toBeFalsy();
        expect(resultadoMacaco.recintosViaveis.length).toBeGreaterThan(0);

        expect(resultadoCrocodilo.erro).toBeFalsy();
        expect(resultadoCrocodilo.recintosViaveis.length).toBeGreaterThan(0);
    });

    
    test('Não deve encontrar recintos para 100 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 100);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recinto para 2 hipopótamos', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 2);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    test('Não deve encontrar recinto para 2 leões', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 2);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    
    
});


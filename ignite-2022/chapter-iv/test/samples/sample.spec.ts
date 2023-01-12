describe("Criar categoria", () => {
  it("Espero que 2 + 2 = 4", () => {
    const soma = 2 + 2;
    const esperado = 4;

    expect(soma).toBe(esperado);
  });

  it("Espero que 2 + 2 não seja 5", () => {
    const soma = 2 + 2;
    const esperado = 5;

    expect(soma).not.toBe(esperado);
  });
});

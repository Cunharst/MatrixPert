function obterMatriz(id) {
  const inputs = document.querySelectorAll(`#${id} input`);
  let matriz = [];
  for (let i = 0; i < 3; i++) {
    let linha = [];
    for (let j = 0; j < 3; j++) {
      const valor = parseFloat(inputs[i * 3 + j].value) || 0;
      linha.push(valor);
    }
    matriz.push(linha);
  }
  return matriz;
}

function calcular(operacao) {
  const A = obterMatriz("matrizA");
  const B = obterMatriz("matrizB");
  let resultado = [];
  let passos = [];

  if (operacao === "soma" || operacao === "subtracao") {
    for (let i = 0; i < 3; i++) {
      resultado[i] = [];
      for (let j = 0; j < 3; j++) {
        const r = operacao === "soma" ? A[i][j] + B[i][j] : A[i][j] - B[i][j];
        resultado[i][j] = r;
        passos.push(`C[${i + 1}][${j + 1}] = ${A[i][j]} ${operacao === "soma" ? "+" : "-"} ${B[i][j]} = ${r}`);
      }
    }
  } else if (operacao === "multiplicacao") {
    for (let i = 0; i < 3; i++) {
      resultado[i] = [];
      for (let j = 0; j < 3; j++) {
        let soma = 0;
        let detalhe = [];
        for (let k = 0; k < 3; k++) {
          soma += A[i][k] * B[k][j];
          detalhe.push(`${A[i][k]}×${B[k][j]}`);
        }
        resultado[i][j] = soma;
        passos.push(`C[${i + 1}][${j + 1}] = ${detalhe.join(" + ")} = ${soma}`);
      }
    }
  }

  mostrarResultado(resultado, passos, operacao);
}

function mostrarResultado(resultado, passos, operacao) {
  const div = document.getElementById("resultado");
  div.style.display = "block";

  const explicacoes = {
    soma: {
      titulo: "📘 Vamos somar matrizes!",
      texto: "A gente soma cada quadradinho da Matriz A com o mesmo da Matriz B. É como somar figurinhas! 🧮✨"
    },
    subtracao: {
      titulo: "📙 Vamos subtrair matrizes!",
      texto: "Subtrair é tirar. Tiramos os números da Matriz B dos números da Matriz A, quadradinho por quadradinho. 😯➖🎲"
    },
    multiplicacao: {
      titulo: "📗 Multiplicando matrizes!",
      texto: "Multiplicar é como uma dança entre linhas e colunas 💃🕺! A linha da Matriz A encontra a coluna da Matriz B! Lembrando, que o número de colunas da primeira matriz deve ser igual ao número de linhas da segunda!"
    }
  };

  let html = `
    <div style="background:#fff0f6; border-left: 8px solid #ff6b81; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
      <h2 style="margin-top:0;">${explicacoes[operacao].titulo}</h2>
      <p style="font-size: 16px;">${explicacoes[operacao].texto}</p>
    </div>

    <h3 style="text-align:center;">🎯 Resultado da Matriz</h3>
    <table style="margin:auto; border-collapse: collapse; background-color:#ffeaa7; border-radius: 10px;">
      ${resultado.map(linha =>
        `<tr>${linha.map(valor =>
          `<td style="border:2px solid #dfe6e9; padding:15px; font-size:20px; font-weight:bold; text-align:center;">${valor}</td>`).join("")}</tr>`).join("")}
    </table>

    <h3 style="text-align:center; margin-top: 30px;">👣 Passo a passo divertido!</h3>
    <div style="display: flex; flex-direction: column; gap: 10px; align-items: center; margin-top: 10px;">
      ${passos.map((texto, i) =>
        `<div style="background-color: #dfe6e9; padding: 12px 18px; border-radius: 10px; width: 90%; max-width: 600px; font-size: 16px; box-shadow: 2px 2px 6px rgba(0,0,0,0.1);">
          🧩 <strong>Passo ${i + 1}:</strong> ${formatarPasso(texto)}
        </div>`
      ).join("")}
    </div>
  `;

  div.innerHTML = html;
}

function formatarPasso(texto) {
  return texto
    .replace(/C\[(\d+)\]\[(\d+)\]/g, '<strong>Resultado[$1][$2]</strong>')
    .replace(/\*/g, ' × ')
    .replace(/\+/g, ' ➕ ')
    .replace(/-/g, ' ➖ ');
}

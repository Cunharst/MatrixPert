function criarInputs(id, linhas, colunas) {
    const container = document.getElementById(id);
    for (let i = 0; i < linhas; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < colunas; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = "0";
        input.id = `${id}_${i}_${j}`;
        row.appendChild(input);
      }
      container.appendChild(row);
    }
  }
  
  function obterMatriz(id, linhas = 3, colunas = 3) {
    const matriz = [];
    for (let i = 0; i < linhas; i++) {
      const linha = [];
      for (let j = 0; j < colunas; j++) {
        const valor = parseFloat(document.getElementById(`${id}_${i}_${j}`).value) || 0;
        linha.push(valor);
      }
      matriz.push(linha);
    }
    return matriz;
  }
  
  function exibirResultado(matriz, passos) {
    const resultadoDiv = document.getElementById("saidaTexto");
    resultadoDiv.innerHTML = "";
  
    const titulo = document.createElement("h3");
    titulo.textContent = "Resultado da operação:";
    resultadoDiv.appendChild(titulo);
  
    const tabela = document.createElement("table");
    matriz.forEach((linha) => {
      const tr = document.createElement("tr");
      linha.forEach((valor) => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
      });
      tabela.appendChild(tr);
    });
    resultadoDiv.appendChild(tabela);
  
    const passosTitulo = document.createElement("h4");
    passosTitulo.textContent = "Passo a passo:";
    resultadoDiv.appendChild(passosTitulo);
  
    const containerPassos = document.createElement("div");
    containerPassos.classList.add("passos-container");
  
    passos.forEach((texto) => {
      const passoDiv = document.createElement("div");
      passoDiv.classList.add("passo");
      passoDiv.textContent = texto;
      containerPassos.appendChild(passoDiv);
    });
  
    resultadoDiv.appendChild(containerPassos);
  }
  
  function calcular() {
    const A = obterMatriz("matrizA");
    const B = obterMatriz("matrizB");
    const operacao = document.getElementById("operacao").value;
    let resultado = [];
    let passos = [];
  
    if (operacao === "soma" || operacao === "subtracao") {
      for (let i = 0; i < 3; i++) {
        let linha = [];
        for (let j = 0; j < 3; j++) {
          let valor;
          if (operacao === "soma") {
            valor = A[i][j] + B[i][j];
            passos.push(`C[${i}][${j}] = ${A[i][j]} + ${B[i][j]} = ${valor}`);
          } else {
            valor = A[i][j] - B[i][j];
            passos.push(`C[${i}][${j}] = ${A[i][j]} - ${B[i][j]} = ${valor}`);
          }
          linha.push(valor);
        }
        resultado.push(linha);
      }
    } else if (operacao === "multiplicacao") {
      for (let i = 0; i < 3; i++) {
        let linha = [];
        for (let j = 0; j < 3; j++) {
          let soma = 0;
          let detalhes = [];
          for (let k = 0; k < 3; k++) {
            soma += A[i][k] * B[k][j];
            detalhes.push(`A[${i}][${k}]*B[${k}][${j}] = ${A[i][k]}*${B[k][j]}`);
          }
          linha.push(soma);
          passos.push(`C[${i}][${j}] = ${detalhes.join(" + ")} = ${soma}`);
        }
        resultado.push(linha);
      }
    }
  
    exibirResultado(resultado, passos);
  }
  
  criarInputs("matrizA", 3, 3);
  criarInputs("matrizB", 3, 3);
  
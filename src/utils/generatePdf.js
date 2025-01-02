import * as FileSystem from 'expo-file-system'; 
import * as Print from 'expo-print'; 
import * as Sharing from 'expo-sharing'; 

const saveImageLocally = async (imageUri, imageName) => {
    try {
      const imageExtension = imageUri.split('.').pop(); // Pega a extensão da imagem (ex: .png, .jpg)
      const imagePath = `${FileSystem.documentDirectory}${imageName}.${imageExtension}`;
      await FileSystem.copyAsync({ from: imageUri, to: imagePath });
      console.log(`Imagem salva em: ${imagePath}`);
      return imagePath;
    } catch (error) {
      console.error('Erro ao salvar a imagem localmente:', error);
      return ''; // Retorna uma string vazia em caso de erro
    }
  };
  
  export const generatePDF = async (data) => {
    try {
      console.log('Iniciando geração de PDF com os dados:', data);
  
      const { formulario1Data, formulario2Data, formulario3Data, formulario4Data, formulario5Data, formulario6Images, formulario7Images, formulario8Images, formulario9Images } = data;
  
      // Combina todas as imagens dos diferentes formulários em um único array
      const allImages = [
        ...formulario6Images,
        ...formulario7Images,
        ...formulario8Images,
        ...formulario9Images
      ];
  
      // Salvar as imagens localmente e gerar um array de caminhos
      const imagePaths = await Promise.all(
        allImages.map((uri, index) => saveImageLocally(uri, `imagem${index + 1}`))
      );
  
      // Cria o conteúdo do PDF (HTML ou qualquer outro formato aceito)
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1, h2 {
                color: #333;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f4f4f4;
              }
              img {
                width: 30%;
                max-width: 150px;
                margin: 10px;
                display: inline-block;
                vertical-align: top;
              }
              .image-container {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 10px;
              }
            </style>
          </head>
          <body>
            <h1>Relatório de Formulários</h1>
            <h2>Formulário 1</h2>
            <table>
              <tr><th>Histórico</th><td>${formulario1Data?.historico || ''}</td></tr>
              <tr><th>Perícia</th><td>${formulario1Data?.pericia || ''}</td></tr>
              <tr><th>Preâmbulo</th><td>${formulario1Data?.preambulo || ''}</td></tr>
            </table>
  
            <h2>Imagens</h2>
            <div class="image-container">
              ${imagePaths.map((path, index) => path ? `<img src="file://${path}" alt="Imagem ${index + 1}" />` : '').join('')}
            </div>
  
            <h2>Formulário 2</h2>
            <table>
              ${Object.entries(formulario2Data || {}).map(([key, value]) => 
                `<tr><th>${key}</th><td>${value}</td></tr>`
              ).join('')}
            </table>
  
            <h2>Formulário 3</h2>
            <table>
              ${Object.entries(formulario3Data || {}).map(([key, value]) => 
                `<tr><th>${key}</th><td>${value}</td></tr>`
              ).join('')}
            </table>
  
            <h2>Formulário 4</h2>
            <table>
              ${Object.entries(formulario4Data || {}).map(([key, value]) => 
                `<tr><th>${key}</th><td>${value}</td></tr>`
              ).join('')}
            </table>
  
            <h2>Formulário 5</h2>
            <table>
              ${Object.entries(formulario5Data || {}).map(([key, value]) => 
                `<tr><th>${key}</th><td>${value}</td></tr>`
              ).join('')}
            </table>
          </body>
        </html>
      `;
  
      // Gera o PDF a partir do conteúdo HTML
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF gerado com sucesso! URI:', uri);
  
      // Salva o PDF localmente
      const pdfUri = `${FileSystem.documentDirectory}laudo_tecnico.pdf`;
      await FileSystem.moveAsync({ from: uri, to: pdfUri });
      console.log('PDF salvo em:', pdfUri);
  
      // Compartilha o PDF, se necessário
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfUri);
      } else {
        console.log('Compartilhamento não disponível no dispositivo.');
      }
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      throw error; // Certifique-se de que erros são propagados para serem tratados
    }
  };
  
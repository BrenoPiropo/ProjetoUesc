import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Função para converter URI de imagem para Base64
const convertImageToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Erro ao converter imagem para Base64:', error, 'URI:', uri);
    return ''; // Retorna string vazia em caso de erro
  }
};

export const generatePDF = async (data) => {
  try {
    console.log('Iniciando geração de PDF com os dados:', data);

    const {
      formulario1Data,
      formulario2Data,
      formulario3Data,
      formulario4Data,
      formulario5Data,
      formulario6Images = [],
      formulario7Images = [],
      formulario8Images = [],
      formulario9Images = [],
      formulario10Images = [],
    } = data;

    // Converte as imagens de cada formulário para Base64
    const base64Form6Images = await Promise.all(formulario6Images.map((uri) => convertImageToBase64(uri)));
    const base64Form7Images = await Promise.all(formulario7Images.map((uri) => convertImageToBase64(uri)));
    const base64Form8Images = await Promise.all(formulario8Images.map((uri) => convertImageToBase64(uri)));
    const base64Form9Images = await Promise.all(formulario9Images.map((uri) => convertImageToBase64(uri)));
    const base64Form10Images = await Promise.all(formulario10Images.map((uri) => convertImageToBase64(uri)));

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Laudo de Exame Pericial</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  font-size: 25px;                   
              }
              .header {
                  text-align: center;
                  margin: 10px 0;
              }
              .section {
                  margin: 20px 0;
              }
              .section-title {
                  font-weight: bold;
                  text-decoration: underline;
              }
              .image-container {
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                  gap: 20px;
                  margin-top: 20px;
              }
              .image-container img {
                  width: 45%;
                  max-width: 400px;
                  height: auto;
              }
              .large-text {
                  font-size: 25px;
              }
              .inline {
                  font-size: 25px;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <h5>SECRETARIA DA SEGURANÇA PÚBLICA</h2>
              <h5>Departamento de Polícia Técnica</h3>
              <h5>Diretoria do Interior</h4>
              <h5>Coordenadoria de Polícia Técnica de Ilhéus</h5>
              <h1>LAUDO DE EXAME PERICIAL</h6>
          </div>

          <div class="section">
              <p class="large-text"><strong>Órgão Requisitante:</strong> ${formulario1Data?.orgaoRequisitante || ''}</p>
              <p class="large-text"><strong>Autoridade Requisitante:</strong> ${formulario1Data?.autoridadeRequisitante || ''}</p>
              <p class="large-text"><strong>Guia/Ofício:</strong> ${formulario1Data?.guia || ''}</p>
              <p class="large-text"><strong>Data Guia/Ofício:</strong> ${formulario1Data?.dataGuia || ''}</p>
              <p class="large-text"><strong>Ocorrência Policial:</strong> ${formulario1Data?.ocorrencia || ''}</p>
              <br>
              <br>
              <br>
              <br>
          </div>

          <div class="section">
              <div class="inline"><strong>OBJETIVO DA PERÍCIA:</strong> <span>${formulario1Data?.pericia || ''}</span></div>
          </div>

          <div class="section">
              <div class="inline"><strong>PREÂMBULO:</strong> <span>${formulario1Data?.preambulo || ''}</span></div>
          </div>

          <div class="section">
              <div class="inline"><strong>HISTÓRICO:</strong> <span>${formulario1Data?.historico || ''}</span></div>
          </div>

          <div class="section">
              <p class="section-title">EXAMES:</p>
              <ul>
                  <li><strong>Placa Portada:</strong> ${formulario2Data?.placaPortada || ''}</li>
                  <li><strong>Marca /Modelo:</strong> ${formulario2Data?.marcaModelo || ''}</li>
                  <li><strong>Espécie/Tipo:</strong> ${formulario2Data?.especieTipo || ''}</li>
                  <li><strong>Cor:</strong> ${formulario2Data?.cor || ''}</li>
                  <li><strong>Vidro:</strong> ${formulario2Data?.vidros || ''}</li>
                  <li><strong>Numeração do motor:</strong> ${formulario2Data?.numeracaoMotor || ''}</li>
                  <li><strong>CHASSI:</strong> ${formulario2Data?.chassi || ''}</li>
                  <li><strong>Outras numerações:</strong> ${formulario2Data?.outrasNumeracoes || ''}</li>
                </ul>
          </div>

          <div class="section">
              <p class="section-title">Fotos do Veículo:</p>
              <div class="image-container">
                  ${base64Form6Images.map((base64) => base64 ? `<img src="${base64}" />` : '').join('')}
              </div>
          </div>
          <div class="section">
              <div class="inline"><strong>placas:</strong> <span>${formulario3Data?.placas || ''}</span></div>
          </div>
          <div class="section">
              <p class="section-title">Fotos das placas:</p>
              <div class="image-container">
                  ${base64Form7Images.map((base64) => base64 ? `<img src="${base64}" />` : '').join('')}
              </div>
          <div class="section">
              <div class="inline"><strong>Vidros:</strong> <span>${formulario3Data?.vidros || ''}</span></div>
          </div>
          <div class="section">
              <p class="section-title">Fotos dos vidros:</p>
              <div class="image-container">
                  ${base64Form8Images.map((base64) => base64 ? `<img src="${base64}" />` : '').join('')}
              </div>
          </div>
          <div class="section">
              <div class="inline"><strong>chassi/vin:</strong> <span>${formulario3Data?.chassiVin || ''}</span></div>
          </div>
          <div class="section">
              <p class="section-title">Fotos do chassi/vin:</p>
              <div class="image-container">
                  ${base64Form9Images.map((base64) => base64 ? `<img src="${base64}" />` : '').join('')}
              </div>
          <div class="section">
              <div class="inline"><strong>Do motor:</strong> <span>${formulario3Data?.motor || ''}</span></div>
          </div>  
          <div class="section">
              <p class="section-title">Fotos do Motor:</p>
              <div class="image-container">
                  ${base64Form10Images.map((base64) => base64 ? `<img src="${base64}" />` : '').join('')}
              </div>
          </div>
          <div class="section">
              <p class="section-title">Central eletronica e outros:</p>
              <ul>
                  <li><strong>Das etiquetas:</strong> ${formulario3Data?.etiquetas || ''}</li>
                  <li><strong>Da plataqueta do ano de fabricação:</strong> ${formulario3Data?.plaquetaFabricacao || ''}</li>
                  <li><strong>Dados da central eletronica:</strong> ${formulario3Data?.dadosCentralEletronica || ''}</li>
                </ul>
          </div>
        <div class="section">
              <p class="section-title">Series auxiliares e outros: :</p>
              <ul>
                  <li><strong>Placa Portada:</strong> ${formulario4Data?.seriesAuxiliares || ''}</li>
                  <li><strong>Marca /Modelo:</strong> ${formulario4Data?.placa || ''}</li>
                  <li><strong>Espécie/Tipo:</strong> ${formulario4Data?.vin || ''}</li>
                  <li><strong>marcaModelo:</strong> ${formulario4Data?.marcaModelo || ''}</li>
                  <li><strong>categoria:</strong> ${formulario4Data?.categoria || ''}</li>
                  <li><strong>cor:</strong> ${formulario4Data?.cor || ''}</li>
                  <li><strong>Ano de fabricacao:</strong> ${formulario4Data?.anoFabricacao || ''}</li>
                  <li><strong>serieMotor:</strong> ${formulario4Data?.serieMotor || ''}</li>
                  <li><strong>licenciado em Nome de:</strong> ${formulario4Data?.licenciadoNome || ''}</li>
                </ul>
          </div>
          <div class="section">
              <p class="section-title">Conclusões: :</p>
              <ul>
                  <li><strong>Das condições tecnicas do veiculo :</strong> ${formulario5Data?.condicoesTecnicas || ''}</li>
                  <li><strong>Conclusão:</strong> ${formulario5Data?.conclusao || ''}</li>
                  
                </ul>
          </div>


      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    console.log('PDF gerado com sucesso! URI:', uri);

    const pdfUri = `${FileSystem.documentDirectory}laudo_tecnico.pdf`;
    await FileSystem.moveAsync({ from: uri, to: pdfUri });
    console.log('PDF salvo em:', pdfUri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri);
    } else {
      console.log('Compartilhamento não disponível no dispositivo.');
    }
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
    throw error;
  }
};

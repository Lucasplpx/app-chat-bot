import api from '../services/api';

let params = {}, context;
export default async function sendMessageBot(message) {
    try {
        const msg = { text: message };

        if (context) {
            params = { ...msg, ...context };
        }

        const data = context ? params : { ...msg };
        const resp = await api.post("/mensagem", data);

        if(resp.data.conteudo){            
            let chat_text = '<div class="txtDados">Segue os Dados</div>';
            resp.data.conteudo.forEach((item)=>{

                chat_text += `                
                <b>Titulo:</b> ${item.title} <br/>
                <b>Descricão:</b> ${item.desc} <br/>
                <b>Link:</b>  <a class="linkAce" href="${item.link}" target="_blanck">Acessar</a> <br/><br/>`;
            });

            return chat_text;
        }

        const resp_chat_text = resp.data.output.text[0]
        context = { context: { ...resp.data.context } };
        
        return resp_chat_text;
    } catch (error) {
        return "Putz, deu um tilt aqui. Você pode tentar novamente.";
    }
}


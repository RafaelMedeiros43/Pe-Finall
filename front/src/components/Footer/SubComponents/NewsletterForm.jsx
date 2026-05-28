import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '../../..//contexts/LanguageContext';
import { useNewsletterDB } from '../../../contexts/NewsletterContext';
import { useToast } from '../../../contexts/ToastContext';
import { useClickOutside } from '../../../hooks/useClickOutside'; 

export default function NewsletterForm() {
  const { t, translations } = useContext(LanguageContext);
  const { salvarSubscritor, verificarSubscritor } = useNewsletterDB();
  const { show: showToast } = useToast();

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  // Estados dos dropdowns
  const [indicativo, setIndicativo] = useState('+351');
  const [indicativoText, setIndicativoText] = useState('Portugal');
  const [isIndicativoOpen, setIsIndicativoOpen] = useState(false);

  const [assunto, setAssunto] = useState('');
  const [assuntoText, setAssuntoText] = useState('');
  const [isAssuntoOpen, setIsAssuntoOpen] = useState(false);

  // Estado para gestão de erros de validação
  const [errors, setErrors] = useState({});

  const indicativoRef = useRef(null);
  const assuntoRef = useRef(null);

  useClickOutside(indicativoRef, () => setIsIndicativoOpen(false));
  useClickOutside(assuntoRef, () => setIsAssuntoOpen(false));

  useEffect(() => {
    if (!assunto) {
      setAssuntoText(t('form_assunto_default', 'Seleciona um assunto...'));
    }
  }, [assunto, t]);

  const handleAssuntoSelect = (val, text) => {
    setAssunto(val);
    setAssuntoText(text);
    setIsAssuntoOpen(false);

    const msgKey = `msg_${val}`;
    const mensagemTraduzida = translations[msgKey] || (
        val === 'ajuda' ? 'Boa tarde, gostava de pedir ajuda com...' :
        val === 'evento' ? 'Olá, tenho interesse em saber mais informações sobre o evento...' :
        val === 'marcacao' ? 'Olá, quero marcar uma consulta no dia...' :
        val === 'ensino' ? 'Olá, gostaria de saber mais sobre o vosso programa de ensino' : ''
    );
    setMensagem(mensagemTraduzida);
  };

  const validadeForm = async (event) => {
    event.preventDefault();
    const localErrors = {};
    const telemovelRaw = telemovel.trim().replace(/\s/g, '');

    const regexpNome = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pais = {
        "+351": /^9[1236]\d{7}$/, "+49": /^1[5-7]\d{8,9}$/, "+61": /^4\d{8}$/,
        "+55": /^[1-9]{2}9\d{8}$/, "+1": /^[2-9]\d{9}$/, "+33": /^[67]\d{8}$/,
        "+39": /^3\d{8,9}$/, "+81": /^[789]0\d{8}$/, "+44": /^7\d{9}$/, "+41": /^7[5-9]\d{7}$/
    };
    const regexpTelemovel = pais[indicativo];

    let formValido = true;

    if (nome.trim() === '') {
        localErrors.nome = t('form_nome_vazio', 'Nome é obrigatório');
        formValido = false;
    } else if (!regexpNome.test(nome)) {
        localErrors.nome = t('form_nome_invalido', 'Nome deve ter pelo menos 2 letras');
        formValido = false;
    }

    if (email.trim() === '') {
        localErrors.email = t('form_email_vazio', 'Email é obrigatório');
        formValido = false;
    } else if (!regexpEmail.test(email)) {
        localErrors.email = t('form_email_invalido', 'Email inválido (ex: nome@dominio.com)');
        formValido = false;
    }

    if (telemovelRaw === '') {
        localErrors.telemovel = t('form_telemovel_vazio', 'Telemóvel é obrigatório');
        formValido = false;
    } else if (regexpTelemovel && !regexpTelemovel.test(telemovelRaw)) {
        localErrors.telemovel = t('form_telemovel_invalido', 'Número inválido para o país selecionado');
        formValido = false;
    }

    if (!assunto || assunto === '') {
        localErrors.assunto = t('form_assunto_vazio', 'Selecione um assunto');
        formValido = false;
    }

    if (mensagem.trim() === '') {
        localErrors.mensagem = t('form_mensagem_vazio', 'Mensagem é obrigatória');
        formValido = false;
    }

    setErrors(localErrors);

    if (formValido) {
        const existe = await verificarSubscritor(email);
            if (existe) {
              showToast(t('form_email_existente', 'Este email já está subscrito!'), 'error');
            return;
        }

        const telefoneCompleto = indicativo + telemovelRaw;
        try {
            await salvarSubscritor(nome, email, telefoneCompleto);
            showToast(t('form_success', 'Sucesso! A sua inscrição foi enviada.'), 'success');
            
            setNome('');
            setTelemovel('');
            setEmail('');
            setMensagem('');
            setIndicativo('+351');
            setIndicativoText('Portugal');
            setAssunto('');
            setAssuntoText(t('form_assunto_default', 'Seleciona um assunto...'));
            setErrors({});
        } catch (err) {
            console.error("Erro ao guardar subscritor:", err);
            showToast(t('form_db_error', 'Erro ao guardar os dados. Tente novamente.'), 'error');
        }
    } else {
        showToast(t('form_error', 'Por favor, corrija os campos assinalados.'), 'error');
    }
  };

  return (
    <div className="newsletter">
      <form action="#" method="post" className="footer-form" id="form-newsletter" onSubmit={validadeForm} noValidate>
        <div className="footer-col newsletter-info">
          <h5 data-i18n="newsletter_titulo">{t('newsletter_titulo', 'Newsletter')}</h5>
          
          <input 
            id="nome" 
            name="nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder={t('form_nome_placeholder', 'Nome e Apelido')} 
            style={{ border: errors.nome ? '2px solid red' : '' }}
          />
          {errors.nome && <div className="mensagem-erro" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.nome}</div>}

          <div className="telemovel-container">
            <div className="dropdown-indicativo" id="dropdown-indicativo" ref={indicativoRef}>
              <div className="dropdown-selected" onClick={() => setIsIndicativoOpen(!isIndicativoOpen)}>
                {indicativoText}
              </div>
              <ul className={`dropdown-options ${isIndicativoOpen ? 'open' : ''}`}>
                <li onClick={() => { setIndicativo('+351'); setIndicativoText('Portugal'); setIsIndicativoOpen(false); }}>Portugal</li>
                <li onClick={() => { setIndicativo('+49'); setIndicativoText('Alemanha'); setIsIndicativoOpen(false); }}>Alemanha</li>
                <li onClick={() => { setIndicativo('+61'); setIndicativoText('Austrália'); setIsIndicativoOpen(false); }}>Austrália</li>
                <li onClick={() => { setIndicativo('+55'); setIndicativoText('Brasil'); setIsIndicativoOpen(false); }}>Brasil</li>
                <li onClick={() => { setIndicativo('+1'); setIndicativoText('EUA'); setIsIndicativoOpen(false); }}>EUA</li>
                <li onClick={() => { setIndicativo('+33'); setIndicativoText('França'); setIsIndicativoOpen(false); }}>França</li>
                <li onClick={() => { setIndicativo('+39'); setIndicativoText('Itália'); setIsIndicativoOpen(false); }}>Itália</li>
                <li onClick={() => { setIndicativo('+81'); setIndicativoText('Japão'); setIsIndicativoOpen(false); }}>Japão</li>
                <li onClick={() => { setIndicativo('+44'); setIndicativoText('Reino Unido'); setIsIndicativoOpen(false); }}>Reino Unido</li>
                <li onClick={() => { setIndicativo('+41'); setIndicativoText('Suíça'); setIsIndicativoOpen(false); }}>Suíça</li>
              </ul>
              <input type="hidden" id="indicativo" name="indicativo" value={indicativo} />
            </div>
            <input 
              id="telemovel" 
              name="telemovel" 
              value={telemovel}
              onChange={(e) => setTelemovel(e.target.value)}
              placeholder={t('form_telemovel_placeholder', 'Telemóvel')} 
              style={{ border: errors.telemovel ? '2px solid red' : '' }}
            />
          </div>
          {errors.telemovel && <div className="mensagem-erro" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.telemovel}</div>}

          <input 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form_email_placeholder', 'exemplo@email.com')} 
            style={{ border: errors.email ? '2px solid red' : '' }}
          />
          {errors.email && <div className="mensagem-erro" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
        </div>

        <div className="footer-col newsletter-msg">
          <h5 data-i18n="form_enviar_mensagem">{t('form_enviar_mensagem', 'Enviar Mensagem')}</h5>
          
          <div className="dropdown-assunto" id="dropdown-assunto" ref={assuntoRef} style={{ border: errors.assunto ? '2px solid red' : '' }}>
            <div className="dropdown-selected" id="assunto-selected" onClick={() => setIsAssuntoOpen(!isAssuntoOpen)}>
              {assuntoText}
            </div>
            <ul className={`dropdown-options ${isAssuntoOpen ? 'open' : ''}`} id="assunto-options">
              <li onClick={() => handleAssuntoSelect('ajuda', t('form_assunto_ajuda', 'Ajuda'))}>{t('form_assunto_ajuda', 'Ajuda')}</li>
              <li onClick={() => handleAssuntoSelect('evento', t('form_assunto_evento', 'Nossos Eventos'))}>{t('form_assunto_evento', 'Nossos Eventos')}</li>
              <li onClick={() => handleAssuntoSelect('marcacao', t('form_assunto_marcacao', 'Marcação'))}>{t('form_assunto_marcacao', 'Marcação')}</li>
              <li onClick={() => handleAssuntoSelect('ensino', t('form_assunto_ensino', 'Dúvida sobre Ensino'))}>{t('form_assunto_ensino', 'Dúvida sobre Ensino')}</li>
            </ul>
            <input type="hidden" id="assunto" name="assunto" value={assunto} />
          </div>
          {errors.assunto && <div className="erro-custom" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.assunto}</div>}

          <textarea 
            id="mensagem" 
            name="mensagem" 
            rows="4" 
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder={t('form_mensagem_placeholder', 'A sua mensagem')}
            style={{ border: errors.mensagem ? '2px solid red' : '' }}
          ></textarea>
          {errors.mensagem && <div className="mensagem-erro" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.mensagem}</div>}
        </div>

        <div className="newsletter-actions">
          <div id="mensagem-feedback" className="pop-up" aria-live="polite"></div>
          <div>
            <button type="submit" className="btn btn-submit" data-i18n="form_submeter">{t('form_submeter', 'Submeter')}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
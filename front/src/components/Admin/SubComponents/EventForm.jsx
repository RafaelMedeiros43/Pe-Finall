import React, { useState, useEffect, useContext, useRef } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { useEventosDB } from '../../../contexts/EventosContext';
import { useToast } from '../../../contexts/ToastContext';

export default function EventForm({ eventoParaEditar, limparEdicao }) {
  const { t } = useContext(LanguageContext);
  const { salvarEvento } = useEventosDB();
  const { show: showToast } = useToast();

  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [horaEvento, setHoraEvento] = useState('');
  const [local, setLocal] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [imagem, setImagem] = useState('');
  
  const [clima, setClima] = useState(null);
  const [erroClima, setErroClima] = useState(false);
  const [errosForm, setErrosForm] = useState({});

  const localInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Preenche o formulário se receber um evento para editar
  useEffect(() => {
    if (eventoParaEditar) {
      setId(eventoParaEditar.id);
      setTitulo(eventoParaEditar.titulo);
      setDescricao(eventoParaEditar.descricao);
      setDataEvento(eventoParaEditar.data);
      setHoraEvento(eventoParaEditar.hora);
      setLocal(eventoParaEditar.local);
      setImagem(eventoParaEditar.imagem);
      setLat(eventoParaEditar.latitude || '');
      setLng(eventoParaEditar.longitude || '');
      
      setTimeout(() => document.getElementById('event-titulo')?.focus(), 100);
    }
  }, [eventoParaEditar]);

  // Google Maps Autocomplete
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(localInputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'pt' }
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
          setLocal(place.name || place.formatted_address);
          setLat(place.geometry.location.lat());
          setLng(place.geometry.location.lng());
        }
      });
    }
  }, []);

  // Meteorologia
  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lng || !dataEvento || !horaEvento) return;
      const apiKey = typeof window !== 'undefined' && window.CONFIG ? window.CONFIG.WEATHER_API_KEY : '';
      if (!apiKey) return;

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=pt`;

      try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro na API");
        
        const dados = await resposta.json();
        const hora = parseInt(horaEvento.split(':')[0]);
        
        const forecast = dados.list.find(item => {
          const mesmoDia = item.dt_txt.startsWith(dataEvento);
          const horaApi = parseInt(item.dt_txt.split(" ")[1].split(":")[0]);
          return mesmoDia && Math.abs(horaApi - hora) <= 2;
        });

        if (forecast) {
          setClima({
            temp: `${Math.round(forecast.main.temp)}°C`,
            desc: forecast.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`,
            time: forecast.dt_txt.split(' ')[1].substring(0,5)
          });
          setErroClima(false);
        } else {
          setClima(null);
          setErroClima(true);
        }
      } catch (error) {
        console.error("Erro meteorologia:", error);
      }
    };

    fetchWeather();
  }, [lat, lng, dataEvento, horaEvento]);

  const resetForm = () => {
    setId(''); setTitulo(''); setDescricao(''); setDataEvento('');
    setHoraEvento(''); setLocal(''); setLat(''); setLng('');
    setImagem(''); setClima(null); setErroClima(false); setErrosForm({});
    limparEdicao(); // Comunica ao pai que a edição terminou
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrosForm({});
    
    let isValid = true;
    let errors = {};

    if (!titulo.trim()) { errors.titulo = 'Título obrigatório'; isValid = false; }
    if (!descricao.trim()) { errors.descricao = 'Descrição obrigatória'; isValid = false; }
    if (!dataEvento) { errors.dataEvento = 'Data obrigatória'; isValid = false; }
    if (!horaEvento.trim()) { errors.horaEvento = 'Hora obrigatória'; isValid = false; }
    if (!local.trim()) { errors.local = 'Local obrigatório'; isValid = false; }
    if (!imagem.trim()) { errors.imagem = 'Imagem obrigatória'; isValid = false; }

    if (!isValid) return setErrosForm(errors);

    const evento = {
      titulo, descricao, data: dataEvento, hora: horaEvento,
      local, imagem, latitude: lat ? parseFloat(lat) : null,
      longitude: lng ? parseFloat(lng) : null, clima
    };

    if (id) evento.id = parseInt(id);

    try {
      await salvarEvento(evento);
      showToast(t('admin_event_saved', 'Evento guardado com sucesso!'), 'success');
      resetForm();
    } catch (e) {
      showToast(t('admin_event_save_error', 'Erro ao guardar evento.'), 'error');
    }
  };

  return (
    <div className="admin-form-container">
      <h3>{id ? t('admin_form_title_edit', 'Editar Evento') : t('admin_form_title', 'Adicionar Evento')}</h3>
      <form onSubmit={handleSubmit} noValidate>
        {/* Título */}
        <div className="form-group">
          <label>{t('admin_titulo_label', 'Título')}</label>
          <input id="event-titulo" type="text" value={titulo} onChange={e => setTitulo(e.target.value)} style={{ border: errosForm.titulo ? '2px solid red' : '' }} />
          {errosForm.titulo && <span style={{color: 'red', fontSize: '12px'}}>{errosForm.titulo}</span>}
        </div>
        
        {/* Descrição */}
        <div className="form-group">
          <label>{t('admin_desc_label', 'Descrição')}</label>
          <textarea rows="3" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ border: errosForm.descricao ? '2px solid red' : '' }}></textarea>
          {errosForm.descricao && <span style={{color: 'red', fontSize: '12px'}}>{errosForm.descricao}</span>}
        </div>
        
        {/* Data e Hora */}
        <div className="admin-form-row">
          <div className="form-group">
            <label>{t('admin_data_label', 'Data')}</label>
            <input type="date" value={dataEvento} onChange={e => setDataEvento(e.target.value)} style={{ border: errosForm.dataEvento ? '2px solid red' : '' }} />
          </div>
          <div className="form-group">
            <label>{t('admin_hora_label', 'Hora')}</label>
            <input type="time" value={horaEvento} onChange={e => setHoraEvento(e.target.value)} style={{ border: errosForm.horaEvento ? '2px solid red' : '' }} />
          </div>
        </div>
        
        {/* Local */}
        <div className="form-group">
          <label>{t('admin_local_label', 'Local')}</label>
          <input ref={localInputRef} value={local} onChange={e => setLocal(e.target.value)} style={{ border: errosForm.local ? '2px solid red' : '' }} />
        </div>
        
        {/* Previsão Metereológica */}
        <div className="weather-preview">
          {clima && (
            <div className="weather-preview-container">        
              <div className="weather-info-row">
                <span className="weather-preview-temperatura">{clima.temp}</span>
                <img className="weather-preview-icon" src={clima.icon} alt="Tempo" /> 
                <span className="weather-preview-descricao">{clima.desc}</span> 
              </div>
              <p className="weather-preview-dados">Previsão para: {clima.time}</p>
            </div>
          )}
          {erroClima && <p>Previsão detalhada apenas disponível para os próximos 5 dias.</p>}
        </div>

        {/* Imagem */}
        <div className="form-group">
          <label>{t('admin_imagem_label', 'URL da Imagem')}</label>
          <input type="text" value={imagem} onChange={e => setImagem(e.target.value)} style={{ border: errosForm.imagem ? '2px solid red' : '' }} />
        </div>
        
        {/* Botões */}
        <div className="admin-actions">
          <button type="submit" className="btn btn-primary">{t('admin_save_btn', 'Guardar Evento')}</button>
          {id && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              {t('admin_cancel_btn', 'Cancelar')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
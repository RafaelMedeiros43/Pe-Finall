const Event = require('../models/Event');

createEvent = async (req, res) => {
    try {
        const { titulo, descricao, data, hora, local, imagem} = req.body;

        const newEvent = await Event.create({
            titulo,
            descricao,
            data,
            hora,
            local,
            imagem,
        });

        return res.status(201).json({ message: 'Evento criado com sucesso.', event: newEvent });
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao criar o evento.' });
    }
};

getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['data', 'ASC'], ['hora', 'ASC']]
        });
        return res.status(200).json({ message: 'Eventos conseguidos com sucesso.', events });
    } catch (error) {
        console.error('Erro ao conseguir eventos:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao conseguir os eventos.' });
    }
};

updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, data, hora, local, imagem, clima } = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        await event.update({
            titulo: titulo || event.titulo,
            descricao: descricao || event.descricao,
            data: data || event.data,
            hora: hora || event.hora,
            local: local || event.local,
            imagem: imagem || event.imagem,
        });
        return res.status(200).json({ message: 'Evento atualizado com sucesso.', event });
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o evento.' });
    }
};

deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        await event.destroy();
        return res.status(200).json({ message: 'Evento excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao excluir o evento.' });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
};
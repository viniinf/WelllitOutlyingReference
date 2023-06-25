import React, { useEffect, useState } from 'react';
import { getQuotes, createQuote, updateQuote, deleteQuote } from '../../services/firebase';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const data = await getQuotes();
    setQuotes(data);
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();

    if (newQuote.trim() === '') {
      return;
    }

    await createQuote(newQuote);
    setNewQuote('');
    fetchQuotes();
  };

  const handleEdit = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (editText.trim() === '') {
      return;
    }

    await updateQuote(editId, editText);
    setEditMode(false);
    setEditId('');
    setEditText('');
    fetchQuotes();
  };

  const handleDelete = async (id) => {
    await deleteQuote(id);
    fetchQuotes();
  };

  return (
    <div>
      <h2>Criar Nova Cotação</h2>
      <form onSubmit={handleCreateQuote}>
        <input
          type="text"
          placeholder="Digite o título da cotação"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>

      <h2>Cotações</h2>
      {quotes.length === 0 ? (
        <p>Nenhuma cotação encontrada.</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id}>
              {editMode && editId === quote.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button type="submit">Salvar</button>
                </form>
              ) : (
                <>
                  {quote.title}
                  <button onClick={() => handleEdit(quote.id, quote.title)}>Editar</button>
                  <button onClick={() => handleDelete(quote.id)}>Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuoteList;
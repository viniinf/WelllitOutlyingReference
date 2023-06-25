// src/components/Quotes/QuoteList.js

import React, { useEffect, useState } from 'react';
import { getQuotes } from '../../services/firebase';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await getQuotes();
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      {quotes.map((quote) => (
        <div key={quote.id}>{quote.title}</div>
      ))}
    </div>
  );
};

export default QuoteList;
